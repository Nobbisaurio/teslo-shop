import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSumaryInformation: () => {
    subTotal: number;
    taxes: number;
    total: number;
    itemsInCart: number;
};

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantityInCart: (product: CartProduct, quantity:number) => void;
  removeProductInCart: (product: CartProduct) => void;
  
}

export const useCartStore = create<State> () (
  
  persist(
    (set, get) => ({
      cart: [],

      // methods

      removeProductInCart(product: CartProduct){
        const { cart } = get();
        const updatedCartProducts = cart.filter((item) => item.id !== product.id || item.size !== product.size);
        set({ cart: updatedCartProducts });
      },

      updateProductQuantityInCart(product: CartProduct, quantity:number){
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: quantity,
            };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
    
      getTotalItems() {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSumaryInformation(){
        const {cart} = get();

        const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const taxes = subTotal * 0.15;

        const total = subTotal + taxes;

        const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

        return{
          subTotal,
          taxes,
          total,
          itemsInCart
        }
      },

      addProductToCart(product: CartProduct) {
        const { cart } = get();
    
        // verificar si el producto existe en el carrito
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
    
        // si el producto no existe en el carrito, agregarlo
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
    
        // si el producto y la talla ya existe en el carrito, actualizar la cantidad
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          // si el producto y la talla no existe en el carrito, mantener el producto
          return item;
        });
    
        // actualizar el carrito
        set({ cart: updatedCartProducts });
      },
    }),
   {
    name: "cart-shoping",
   }
  )
  
);
