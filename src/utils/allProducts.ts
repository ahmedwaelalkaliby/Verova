export interface Product {
  id: number;
  imageCover: string;
  title: string;
  description: string;
  price: number;
}
export async function fetchAllProducts(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_PRODUCTS_API || 'https://ecommerce.routemisr.com/api/v1/products';
  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data.data;
}