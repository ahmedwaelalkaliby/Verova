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
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      cache: "no-store", 
      next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.data || [];
}
