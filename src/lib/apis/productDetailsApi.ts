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

export async function getProductDetails(id: string): Promise<Product> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
    cache: "no-store",
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }

  const data = await res.json();
  return data.data;
}
