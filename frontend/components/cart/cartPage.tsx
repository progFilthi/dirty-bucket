/* eslint-disable react/no-unescaped-entities */
"use client";

import { useCartStore } from "@/store/cartStore";
import { TrashIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const backToBeats = () => {
    router.push("/beats");
  };
  const cartItems = useCartStore((state) => state.cartItems);
  const removeItem = useCartStore((state) => state.removeItem);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-32">
        <div className="text-center py-16">
          <ShoppingCartIcon className="mx-auto h-24 w-24 text-muted-foreground/50" />
          <h1 className="text-3xl font-bold tracking-tight mt-6 mb-2">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any beats to your cart yet.
          </p>
          <Button onClick={backToBeats} size="lg" className="cursor-pointer">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-semibold text-lg leading-tight truncate">
                        {item.title}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {item.bpm || "N/A"} BPM
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {item.key || "N/A"} Key
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Beat #{index + 1}
                      </div>
                      <div className="text-xl font-bold">
                        ${Number(item.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing fee</span>
                  <span>$0.00</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <Button
                className="w-full cursor-pointer"
                size="lg"
                onClick={async () => {
                  try {
                    const res = await fetch(
                      "http://localhost:8080/api/payment/checkout",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          title: "Beat Cart Order",
                          price: totalPrice,
                        }),
                      }
                    );

                    const data = await res.json();
                    if (data.hostedUrl) {
                      window.open(data.hostedUrl, "_blank");
                    } else {
                      alert("Checkout failed.");
                    }
                  } catch (err) {
                    console.error("Checkout error:", err);
                    alert("Something went wrong during checkout.");
                  }
                }}
              >
                Proceed to Checkout
              </Button>
              <Button
                onClick={backToBeats}
                variant="outline"
                className="w-full cursor-pointer"
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
