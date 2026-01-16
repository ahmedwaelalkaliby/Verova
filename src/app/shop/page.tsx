import { getProducts } from "@/lib/apis/productsApi";
import ProductCard from "@/components/productCard";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
