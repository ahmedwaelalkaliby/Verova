import { notFound } from "next/navigation";
import { getProductDetails } from "@/lib/apis/productDetailsApi";
import ProductDetails from "./ProductDetails";

// ✅ SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductDetails(id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.title,
    description: product.description || "Shop the best products at our store.",
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.imageCover],
    },
  };
}

export interface Product {
  id: number;
  title: string;
    description: string;
    imageCover: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
  };
}


// ✅ Page Component
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductDetails(id);
    

  if (!product) return notFound();

  return <ProductDetails product={{ ...product, id: String(product.id) }} />;
}