import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ Import useParams
import NavbarTop from "../Components/Navbar/NavbarTop/NavbarTop";
import Footer from "../Components/Footer/Footer";
import ProductDetailsHead from "../Components/ProductDetailsHead/ProductDetailsHead";
import ProductTabs from "../Components/ProductTabs/ProductTabs";
import RelatedProductsSection from "../Components/RelatedProductsSection/RelatedProductsSection";
import { getProductById } from "../API/productApi"; // ✅ Import the API function to fetch a single product

export const ProductDetails = () => {
  const { id } = useParams(); // ✅ Get the product ID from the URL
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) {
        setLoading(false);
        setError("Product ID is missing.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await getProductById(id);
        setProductData(res);
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]); // ✅ Re-run this effect whenever the product ID in the URL changes

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <img
            src="/favIcon.png"
            alt="logo"
            className="spinner-border"
            style={{ width: "60px", height: "60px", border: "none" }}
          />
          <p className="mt-3 fw-semibold">Loading product details...</p>
        </div>
      </div>
    );
  }
  console.log("product detils",productData)

  if (error || !productData) {
    return (
      <div className="text-center py-5">
        <p className="text-danger">{error || "Product not found."}</p>
      </div>
    );
  }

  return (
    <>
      <NavbarTop />
      {/* ✅ Pass the fetched productData to other components */}
      <ProductDetailsHead product={productData} />
      <ProductTabs product={productData} />
      {/* ✅ Pass the category ID to the RelatedProductsSection */}
        <RelatedProductsSection categoryId={productData?.category?._id} />
      <Footer />
    </>
  );
};