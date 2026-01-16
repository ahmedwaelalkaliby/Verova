"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    category?: { name: string };
    imageCover: string;
    images?: string[];
  };
}
export interface Product {
  id: string;
  title: string;
  description: string;
  imageCover: string;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const sizes = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  const colors = ["#111", "#3b82f6", "#d1d5db"];
  const images = [product.imageCover, ...(product.images || [])];
  
  // Handle quantity change
  
  const [quantity, setQuantity] = useState(1);
  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  // Interactive main image
  const [selectedImage, setSelectedImage] = useState(product.imageCover);

  return (
    <div className=" mt-2 max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left: Images */}
      <div>
        {/* Main Image at the top */}
        <div className="mb-4 flex justify-center">
          <Image
            src={selectedImage}
            alt={product.title}
            width={400}
            height={600}
            className=" shadow-lg object-cover w-full h-[600px] max-w-xl"
          />
        </div>
        {/* Thumbnails below main image */}
        <div className="flex gap-3 justify-center">
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`border overflow-hidden transition ${
                selectedImage === img ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`${product.title} thumbnail ${idx + 1}`}
                width={80}
                height={80}
                className="object-cover w-16 h-16"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex flex-col justify-start">
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-500 mb-2">
          {product.category?.name || "Uncategorized"}
        </p>
        <p className="text-2xl font-semibold mb-4">${product.price}.00</p>
        <p className="text-gray-600 mb-6">
          {product.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan nibh quam."}
        </p>

        {/* Sizes */}
        <div className="mb-4">
          <span className="font-medium mr-4">Size</span>
          {sizes.map((size) => (
            <button
              key={size}
              className="px-2 py-1 mx-1 border rounded hover:bg-gray-100 focus:bg-blue-100 focus:outline-none"
            >
              {size}
            </button>
          ))}
        </div>

        {/* Colors */}
        <div className="mb-4 flex items-center">
          <span className="font-medium mr-4">Color</span>
          {colors.map((color, idx) => (
            <button
              key={idx}
              className="w-6 h-6 rounded-full border-2 mx-1"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Quantity */}
        <div className="mb-6 flex items-center">
          <span className="font-medium mr-4">QT:</span>
          <button onClick={decrease} className="px-2 py-1 border rounded-l bg-gray-100">-</button>
          <span className="px-4 py-1 border-t border-b">{quantity}</span>
          <button onClick={increase} className="px-2 py-1 border rounded-r bg-gray-100">+</button>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition font-medium">
            Add to Cart
          </button>
          <button className="border border-blue-500 text-blue-500 px-8 py-3 rounded-lg hover:bg-blue-50 transition font-medium">
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}