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
  const baseUrl = process.env.NEXT_PUBLIC_PRODUCT_DETAILS_API || "https://ecommerce.routemisr.com/api/v1/products";
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const res = await fetch(`${baseUrl}/${id}`, {
      cache: "no-store",
      next: { revalidate: 60 },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error("Failed to fetch product details");
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
