export interface Product {
  id: number;
  imageCover: string;
  title: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
}

export async function getProducts(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_PRODUCTS_API || "https://ecommerce.routemisr.com/api/v1/products";
  const res = await fetch(apiUrl, {
      cache: "no-store", 
      next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.data || [];
}
