import Image from "next/image";
import React from "react";

export default function BeatCard() {
  return (
    <div className="pt-4">
      <div>
        <Image
          src="/gang8.jpeg"
          alt="dp"
          width={120}
          height={120}
          className="rounded-sm shadow-lg"
        />
        <h1>MONEY KING</h1>
        <div className="flex gap-4">
          <p>C#m</p>
          <p>120</p>
        </div>
        <button type="button">$29.99</button>
      </div>
    </div>
  );
}
