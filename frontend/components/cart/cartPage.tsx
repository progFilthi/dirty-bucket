"use client";

import { useCartStore } from "@/store/cartStore";
import { TrashIcon } from "@heroicons/react/16/solid";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-red-500">Your cart is empty.</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-4 text-sm font-mono whitespace-pre-wrap">
          <p className="font-bold border-b pb-2 mb-2">
            Title | BPM | Key | Price
          </p>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <p>
                {item.title.padEnd(20)} | {item.toString().padEnd(5)} |{" "}
                {item.toString().padEnd(5)} | ${item.price}
              </p>
              <TrashIcon
                onClick={() => removeItem(item.id)}
                className="h-4 w-4 text-red-500 hover:text-red-700 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
