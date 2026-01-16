import { BsHandbag } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { Product } from "@/lib/apis/productsApi";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="w-[353px] m-5 group">
      {/* product image  */}
      <div className="relative w-[353px] h-[378px] border rounded-2xl flex items-center justify-center overflow-hidden">
        <Image
          src={product.imageCover}
          alt={product.title}
          width={253}
          height={278}
          className="rounded-2xl object-contain"
        />

        {/* buttons hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
          {/* cart button */}
          <Link
            href={`/cart`}
            className="bg-white text-black p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <BsHandbag className="text-2xl text-black hover:text-blue-500" />
          </Link>

          {/* product details button */}
          <Link
            href={`/product-details/${product.id}`}
            className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <FaRegEye className="text-2xl text-black hover:text-blue-500" />
          </Link>
        </div>
      </div>

      {/* title + price */}
      <div className="mt-3 flex justify-between items-center">
        <h2 className="font-semibold">{product.title.slice(0, 20)}</h2>
        <p className="text-lg font-bold">${product.price}</p>
      </div>
    </div>
  );
}
