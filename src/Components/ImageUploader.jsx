import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { Trash2, CloudUpload } from "lucide-react"; // Import CloudUpload for the empty state icon
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import './uploader.css'
// Add a 'multiple' prop to control single/multiple file uploads
export default function ImageUploader({
    image,
    onImageUpload,
    multiple = false,
}) {
    // Only use internal preview and deleteToken if we're dealing with a single image
    const [singlePreview, setSinglePreview] = useState(image || null);
    const [singleDeleteToken, setSingleDeleteToken] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0); // This can still be for the current upload
    const [isUploading, setIsUploading] = useState(false); // New state to show overall uploading status
    const [multiPreviews, setMultiPreviews] = useState([]);
    const fileInputRef = useRef(null); // Keep for direct input click

    const cloudName = import.meta.env.cloudinery_name || "dpea4iv0b";
    const uploadPreset =
        import.meta.env.cloudinery_presetName || "product_upload";

    const s3 = useMemo(() => {
        return new S3Client({
            endpoint: "https://blr1.digitaloceanspaces.com",
            region: "us-east-1", // Required by AWS SDK, irrelevant for DO
            credentials: {
                accessKeyId: import.meta.env.VITE_DO_SPACES_KEY,
                secretAccessKey: import.meta.env.VITE_DO_SPACES_SECRET,
            },
        });
    }, []);

    const uploadToSpaces = useCallback(
        async (file, onProgress) => {
            if (!file) return null;
            const safeFileName = file.name.replace(/\s+/g, "_");

            const bucketName = "knobsshopcdn";
            const fileKey = `uploads/${Date.now()}-${safeFileName}`;

            try {
                const parallelUploads3 = new Upload({
                    client: s3,
                    params: {
                        Bucket: bucketName,
                        Key: fileKey,
                        Body: file,
                        ACL: "public-read",
                        ContentType: file.type,
                    },
                    queueSize: 1, // optional: helps show accurate progress for single files
                    partSize: 5 * 1024 * 1024, // optional: default is 5MB
                    leavePartsOnError: false,
                });

                parallelUploads3.on("httpUploadProgress", (progress) => {
                    if (
                        progress.loaded &&
                        progress.total &&
                        typeof onProgress === "function"
                    ) {
                        const percent = Math.round(
                            (progress.loaded / progress.total) * 100
                        );
                        onProgress(percent);
                    }
                });

                await parallelUploads3.done();

                const publicUrl = `https://${bucketName}.blr1.cdn.digitaloceanspaces.com/${fileKey}`;
                console.log("🖼️ Uploaded Image URL (Spaces):", publicUrl);
                return { url: publicUrl, deleteToken: null };
            } catch (err) {
                console.error("Error uploading to Spaces:", err);
                throw err;
            }
        },
        [s3]
    );

    useEffect(() => {
        // Only update internal preview if it's a single image uploader
        if (!multiple) {
            setSinglePreview(image || null);
        }
    }, [image, multiple]);

    // Handle single image delete (only relevant for multiple: false)
    const handleSingleImageDelete = async () => {
        if (singleDeleteToken) {
            try {
                await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/delete_by_token`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token: singleDeleteToken }),
                    }
                );
                toast.success("Image removed");
            } catch (err) {
                console.error("Image delete failed", err);
                toast.error("Failed to remove image");
            }
        }

        setSinglePreview(null);
        setUploadProgress(0);
        setSingleDeleteToken(null);
        if (onImageUpload) onImageUpload(""); // Notify parent of removal for single image
    };

    // Helper to upload a single file to Cloudinary
    const uploadFileToCloudinary = useCallback(
        async (file) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", uploadPreset);

                const xhr = new XMLHttpRequest();

                xhr.upload.addEventListener("progress", (e) => {
                    if (e.lengthComputable) {
                        // This progress is for the current *individual* file being uploaded if multiple
                        setUploadProgress(Math.round((e.loaded * 100) / e.total));
                    }
                });

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        try {
                            const res = JSON.parse(xhr.responseText);
                            if (res.secure_url) {
                                resolve({ url: res.secure_url, deleteToken: res.delete_token });
                            } else {
                                reject(
                                    new Error("Cloudinary upload failed: " + JSON.stringify(res))
                                );
                            }
                        } catch (error) {
                            reject(
                                new Error("Error parsing Cloudinary response: " + error.message)
                            );
                        }
                    }
                };

                xhr.open(
                    "POST",
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    true
                );
                xhr.send(formData);
            });
        },
        [cloudName, uploadPreset]
    );

    const onDrop = useCallback(
        async (acceptedFiles) => {
            if (!acceptedFiles.length) return;

            setIsUploading(true);
            setUploadProgress(0);

            // Helper: upload files in batches of 3 (configurable)
            const uploadInBatches = async (files, batchSize = 3) => {
                const results = [];
                for (let i = 0; i < files.length; i += batchSize) {
                    const batch = files.slice(i, i + batchSize);

                    // Upload this batch in parallel
                    const batchResults = await Promise.allSettled(
                        batch.map(async (file) => {
                            let attempts = 0;
                            while (attempts < 3) {
                                try {
                                    const result = await uploadToSpaces(file, (p) => {
                                        // Each file progress contributes proportionally
                                        const fileIndex = i + batch.indexOf(file);
                                        const overallPercent = Math.min(
                                            100,
                                            Math.round(
                                                ((fileIndex + p / 100) / acceptedFiles.length) * 100
                                            )
                                        );
                                        setUploadProgress(overallPercent);
                                    });
                                    return result;
                                } catch (err) {
                                    attempts++;
                                    console.warn(
                                        `Retrying ${file.name} (attempt ${attempts}/3)...`
                                    );
                                    if (attempts >= 3) throw err;
                                    await new Promise((res) => setTimeout(res, 1000 * attempts));
                                }
                            }
                        })
                    );

                    // Merge successful results
                    batchResults.forEach((res) => {
                        if (res.status === "fulfilled" && res.value?.url)
                            results.push(res.value);
                    });

                    // Optional delay between batches to avoid hitting rate limits
                    await new Promise((res) => setTimeout(res, 300));
                }
                return results;
            };

            if (multiple) {
                try {
                    // ✅ Create local previews immediately
                    const localPreviews = acceptedFiles.map((file) => ({
                        preview: URL.createObjectURL(file),
                    }));

                    setMultiPreviews((prev) => [...prev, ...localPreviews]);

                    const uploadedImagesData = await uploadInBatches(acceptedFiles, 3);

                    if (onImageUpload) onImageUpload(uploadedImagesData);

                    toast.success(`${uploadedImagesData.length} image(s) uploaded successfully`);
                } catch (err) {
                    console.error("Multi-image upload failed", err);
                    toast.error("Some uploads failed — check console for details");
                } finally {
                    setIsUploading(false);
                    setUploadProgress(0);
                }
            } else {
                // Single image mode
                const file = acceptedFiles[0];
                const localUrl = URL.createObjectURL(file);
                setSinglePreview(localUrl);
                try {
                    const { url, deleteToken } = await uploadToSpaces(
                        file,
                        setUploadProgress
                    );
                    setSingleDeleteToken(deleteToken);
                    if (onImageUpload) onImageUpload(url);
                    toast.success("Image uploaded successfully");
                } catch (err) {
                    console.error("Single image upload failed", err);
                    toast.error("Upload failed");
                    setSinglePreview(null);
                } finally {
                    setIsUploading(false);
                    setUploadProgress(0);
                }
            }
        },
        [multiple, onImageUpload, uploadToSpaces]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: multiple, // Use the prop value for multiple
    });

    // Clean up image on unmount (only for single image)
    useEffect(() => {
        return () => {
            if (!multiple && singleDeleteToken) {
                fetch(`https://api.cloudinary.com/v1_1/${cloudName}/delete_by_token`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: singleDeleteToken }),
                }).catch((err) => console.error("Failed to delete temp image", err));
            }
        };
    }, [singleDeleteToken, multiple]);

    const currentPreview = !multiple ? singlePreview : null;

    return (
        <div>
            <div
                {...getRootProps()}
                className={`IUP-container group
    ${isDragActive ? "IUP-active" : "IUP-default"}
    ${isUploading ? "IUP-disabled" : ""}
  `}
            >
                <input ref={fileInputRef} {...getInputProps()} />

                {isUploading ? (
                    <div className="IUP-uploading">
                        <p className="IUP-uploading-text">Uploading...</p>

                        {uploadProgress > 0 && (
                            <div className="IUP-progress-bar">
                                <div
                                    className="IUP-progress-fill"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {currentPreview ? (
                            <div className="IUP-preview-wrapper">
                                <img
                                    src={currentPreview}
                                    alt="Preview"
                                    className="IUP-preview-image"
                                />

                                <div className="IUP-overlay">
                                    Change Image
                                </div>

                                {!multiple && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSingleImageDelete();
                                        }}
                                        className="IUP-delete-btn"
                                        title="Remove image"
                                    >
                                        <Trash2 className="IUP-delete-icon" />
                                    </button>
                                )}

                                {uploadProgress > 0 && uploadProgress < 100 && (
                                    <div className="IUP-bottom-progress">
                                        <div
                                            className="IUP-bottom-progress-fill"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="IUP-empty">
                                <CloudUpload size={24} className="IUP-upload-icon" />
                                <p className="IUP-empty-text">
                                    <span className="IUP-upload-link">
                                        Click to Upload
                                    </span>{" "}
                                    or
                                </p>
                                <p className="IUP-drag-text">Drag & Drop</p>
                            </div>
                        )}
                    </>
                )}


            </div>
            {multiple && multiPreviews.length > 0 && (
                <div className="IUP-multi-preview-container">
                    {multiPreviews.map((img, index) => (
                        <div key={index} className="IUP-multi-preview-item">
                            <img src={img.preview} alt="preview" />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMultiPreviews((prev) =>
                                        prev.filter((_, i) => i !== index)
                                    );
                                }}
                                className="IUP-multi-delete-btn"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}