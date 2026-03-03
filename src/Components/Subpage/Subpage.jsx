import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarTop from "../Navbar/NavbarTop/NavbarTop";
import CategoryPageLayout2 from "../CategoryPageLayout2/CategoryPageLayout2";
import Footer from "../Footer/Footer";
import CategoriesBanner from "../CategoriesPage/CategoriesBanner/CategoriesBanner";
import { getCategoryBySubpageType } from "../../API/categoriesApi";
import { fetchProductsByCategory } from "../../API/productApi";

export function Subpage() {
  const { brandName } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [allProductsForFilters, setAllProductsForFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    brand: [],
    colors: [],
    priceRange: [0, 100000],
  });
  const itemsPerPage = 12;

  // Convert brandName slug to proper subpageType
  const reverseLinkprof = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const mapProduct = (item) => ({
    id: item._id,
    title: item.name,
    brand: item.brand,
    category: item.category?.category_name,
    availability: item.stock > 0 ? "In Stock" : "Out of Stock",
    price: item.price,
    oldPrice: item.compare_price,
    discount: item.discount?.value || 0,
    rating: 4.5,
    tech_spec: item.tech_spec,
    image: item.images?.[0],
    hoverImage: item.images?.[1] || item.images?.[0],
    colors: item.variant?.map((v) => v.value) || ["#000"],
    features: item.features?.map((f) => f.title) || [],
    icons: item.key_features,
    variant: item.variant,
  });

  const buildQueryParams = () => {
    const { brand, colors, priceRange, ...dynamicFilters } = filters;
    const queryParams = {
      page: currentPage,
      limit: itemsPerPage,
    };

    if (brand?.length > 0) {
      queryParams.brand = brand.join(",");
    }

    if (colors?.length > 0) {
      queryParams.color = colors.join(",");
    }

    if (priceRange?.length === 2 && (priceRange[0] > 0 || priceRange[1] < 100000)) {
      queryParams.minPrice = priceRange[0];
      queryParams.maxPrice = priceRange[1];
    }

    // Append all dynamic API filters
    Object.keys(dynamicFilters).forEach((key) => {
      const filterValue = dynamicFilters[key];
      if (Array.isArray(filterValue) && filterValue.length > 0) {
        if (typeof filterValue[0] === "number" && filterValue.length === 2) {
          queryParams[`min_${key}`] = filterValue[0];
          queryParams[`max_${key}`] = filterValue[1];
        } else {
          queryParams[key] = filterValue.join(",");
        }
      }
    });

    return queryParams;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let currentCategory = category;
        // Step 1: get category by subpage type if missing or changed
        if (!currentCategory || currentCategory.subpageType?.toLowerCase() !== reverseLinkprof(brandName).toLowerCase()) {
          currentCategory = await getCategoryBySubpageType(brandName);
          setCategory(currentCategory);
        }

        // Step 2: fetch products for that category with filters
        if (currentCategory?._id) {
          const res = await fetchProductsByCategory(
            currentCategory._id,
            buildQueryParams()
          );
          const data = res?.data || [];
          setProducts(data.map(mapProduct));
          setTotalCount(res?.pagination?.totalProducts || 0);
        }
      } catch (err) {
        console.error("Error fetching category or products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [brandName, currentPage, filters]);

  // Fetch all products just once per category for the filter dropdowns sidebar
  useEffect(() => {
    const fetchAllForFilters = async () => {
      try {
        if (category?._id) {
          const res = await fetchProductsByCategory(category._id, { limit: 1000 });
          setAllProductsForFilters((res?.data || []).map(mapProduct));
        }
      } catch (err) {
        setAllProductsForFilters([]);
      }
    };
    fetchAllForFilters();
  }, [category?._id]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(totalCount / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  if (loading && !products.length) return <p>Loading...</p>;

  return (
    <>
      <NavbarTop />
      <div className="categories-page-container">
        <img
          src={category?.bannerImageUrl || "/fallback.png"}
          className="background-image"
        />
        <div className="categories-image-overlay"></div>
        <div className="categories-image-overlay-text">
          <p>
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              HOME / {reverseLinkprof(brandName)}
            </span>
          </p>
          <h1>{reverseLinkprof(brandName)}</h1>
        </div>
      </div>

      <CategoryPageLayout2
        products={products}
        allProducts={allProductsForFilters.length > 0 ? allProductsForFilters : products}
        categoryData={category?._id}
        totalCount={totalCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        filters={filters}
        setFilters={setFilters}
      />
      <CategoriesBanner />
      <Footer />
    </>
  );
}
