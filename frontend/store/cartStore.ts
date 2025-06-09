import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Beat {
  id: string;
  title: string;
  price: number | string;
  cover: string;
  audio: string;
  bpm?: number;
  key?: string;
  quantity: number;
}

interface CartStore {
  cartItems: Beat[];
  addItem: (beat: Beat) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addItem: (beat) => {
        const existingItem = get().cartItems.find(
          (item) => item.id === beat.id
        );
        if (existingItem) {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === beat.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cartItems: [...get().cartItems, { ...beat, quantity: 1 }] });
        }
      },
      removeItem: (id) => {
        set({ cartItems: get().cartItems.filter((item) => item.id !== id) });
      },
      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "beat-cart-storage", // unique key for localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);
