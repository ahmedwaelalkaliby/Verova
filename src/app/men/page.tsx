import { getProducts } from "@/lib/apis/productsApi";
import ProductCard from "@/components/productCard";

export const dynamic = 'force-dynamic';

export default async function Men() {
  try {
    const products = await getProducts();

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-center">
        {products
          .filter((product) => product?.category?.name === "Men's Fashion")
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    );
  } catch (error: any) {
    return <p className="text-red-500 text-center">Failed to load products: {error.message}</p>;
  }
}
