export interface Product {
  id: number;
  imageCover: string;
  title: string;
  description: string;
  price: number;
}
export async function fetchAllProducts(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_PRODUCTS_API || 'https://ecommerce.routemisr.com/api/v1/products';
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 60 },
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await res.json();
    return data.data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error("Request timeout: API took too long to respond");
    }
    throw error;
  }
}