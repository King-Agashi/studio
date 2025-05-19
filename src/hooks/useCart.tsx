
// src/hooks/useCart.tsx
"use client";

import type { Book, CartItem } from '@/lib/types';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useIsClient } from './useIsClient'; // Import useIsClient
import { useToast } from './use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const isClient = useIsClient();
  const { toast } = useToast();

  useEffect(() => {
    if (isClient) {
      const storedCart = localStorage.getItem('bookstockNookCart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('bookstockNookCart', JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  const addToCart = useCallback((book: Book, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === book.id);
      if (existingItem) {
        if (existingItem.quantity + quantity > book.stock) {
          setTimeout(() => toast({
            title: "Stock limit reached",
            description: `Cannot add more than ${book.stock} items for ${book.title}.`,
            variant: "destructive",
          }), 0);
          return prevItems.map((item) =>
            item.id === book.id ? { ...item, quantity: book.stock } : item
          );
        }
        setTimeout(() => toast({
          title: "Item updated in cart",
          description: `${book.title} quantity increased.`,
        }), 0);
        return prevItems.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      if (quantity > book.stock) {
        setTimeout(() => toast({
            title: "Stock limit reached",
            description: `Cannot add more than ${book.stock} items for ${book.title}.`,
            variant: "destructive",
          }), 0);
        return [...prevItems, { ...book, quantity: book.stock }];
      }
      setTimeout(() => toast({
        title: "Item added to cart",
        description: `${book.title} has been added to your cart.`,
      }), 0);
      return [...prevItems, { ...book, quantity }];
    });
  }, [toast]);

  const removeFromCart = useCallback((bookId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== bookId));
    setTimeout(() => toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    }), 0);
  }, [toast]);

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === bookId) {
          if (quantity <= 0) {
            setTimeout(() => toast({
              title: "Item removed",
              description: "Quantity set to 0, item removed.",
            }), 0);
            return null; // Mark for removal
          }
          if (quantity > item.stock) {
            setTimeout(() => toast({
              title: "Stock limit reached",
              description: `Cannot set quantity more than ${item.stock} for ${item.title}.`,
              variant: "destructive",
            }), 0);
            return { ...item, quantity: item.stock };
          }
          setTimeout(() => toast({
            title: "Quantity updated",
            description: `Quantity for ${item.title} updated.`,
          }), 0);
          return { ...item, quantity };
        }
        return item;
      }).filter(item => item !== null) as CartItem[] // Filter out nulls
    );
  }, [toast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setTimeout(() => toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    }), 0);
  }, [toast]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const getItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
