
// src/app/cart/page.tsx
"use client";

import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, ShoppingBag, Minus, Plus, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart, getItemCount } = useCart();
  const { toast } = useToast();
  const totalItems = getItemCount();
  const cartTotal = getCartTotal();

  const handleCheckout = () => {
    // Dummy checkout logic
    if (cartItems.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add items to your cart before proceeding to checkout.',
        variant: 'destructive',
      });
      return;
    }
    console.log('Proceeding to checkout with items:', cartItems);
    toast({
      title: 'Checkout Initiated (Dummy)',
      description: `Thank you for your order of ${totalItems} item(s) totaling ₹${cartTotal.toFixed(2)}. This is a demo.`,
    });
    clearCart(); // Optionally clear cart after dummy checkout
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold font-lora mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any books yet.</p>
        <Link href="/browse" legacyBehavior>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <ArrowLeft className="mr-2 h-5 w-5" /> Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold font-lora text-center mb-10">Your Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <Card key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 shadow-sm">
              <div className="sm:w-1/4 aspect-[2/3] sm:aspect-auto self-center sm:self-start">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={120}
                  height={180}
                  className="rounded-md object-cover w-full h-full max-w-[120px] mx-auto"
                  data-ai-hint="book cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Link href={`/books/${item.slug}`} className="hover:underline">
                  <h2 className="text-xl font-semibold font-lora">{item.title}</h2>
                </Link>
                <p className="text-sm text-muted-foreground">by {item.author}</p>
                <p className="text-lg font-medium text-primary">₹{item.price.toFixed(2)}</p>
                <div className="flex items-center space-x-2 pt-2">
                  <Label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</Label>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="h-8 w-8"
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity <= item.stock) {
                           updateQuantity(item.id, newQuantity);
                        } else if (!isNaN(newQuantity) && newQuantity > item.stock) {
                           updateQuantity(item.id, item.stock); // Cap at stock
                        }
                      }}
                      className="w-12 h-8 text-center border-0 focus-visible:ring-0"
                      min="1"
                      max={item.stock}
                      aria-label={`Quantity for ${item.title}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="h-8 w-8"
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                   {item.quantity >= item.stock && <p className="text-xs text-orange-500">Max stock</p>}
                </div>
              </div>
              <div className="flex flex-col sm:items-end justify-between pt-2 sm:pt-0">
                 <p className="text-lg font-semibold sm:text-right mb-2 sm:mb-0">Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="text-destructive hover:bg-destructive/10"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-1 sticky top-24 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-lora">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span> {/* Dummy shipping */}
            </div>
            <Separator />
            <div className="flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
            <Button variant="outline" className="w-full" onClick={clearCart}>
              Clear Cart
            </Button>
            <Link href="/browse" legacyBehavior>
                <Button variant="link" className="text-primary hover:text-primary/80">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
