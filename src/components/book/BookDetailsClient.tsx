
// src/components/book/BookDetailsClient.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { Book } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, ShoppingCart, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface BookDetailsClientProps {
  book: Book;
}

export function BookDetailsClient({ book }: BookDetailsClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(book, quantity);
  };

  const incrementQuantity = () => {
    if (quantity < book.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > book.stock) {
      value = book.stock;
    }
    setQuantity(value);
  };
  
  const stockStatus = book.stock > 0 
    ? (book.stock < 5 ? { text: `Only ${book.stock} left in stock!`, Icon: AlertTriangle, className: "text-orange-600" } 
                      : { text: "In Stock", Icon: CheckCircle, className: "text-green-600" })
    : { text: "Out of Stock", Icon: Info, className: "text-red-600" };


  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Book Image */}
      <div className="aspect-[2/3] w-full max-w-md mx-auto md:sticky md:top-24">
        <Image
          src={book.imageUrl}
          alt={book.title}
          width={600}
          height={900}
          className="object-cover w-full h-full rounded-lg shadow-xl border"
          data-ai-hint={`${book.category} book high resolution`}
          priority // Eager load main image
        />
      </div>

      {/* Book Info */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold font-lora text-foreground">{book.title}</h1>
          <p className="text-xl text-muted-foreground">by {book.author}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-3xl font-semibold text-primary">₹{book.price.toFixed(2)}</p>
          <Badge variant={book.condition === 'new' ? 'default' : 'secondary'} className="text-sm px-3 py-1 capitalize">
            {book.condition}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
            <stockStatus.Icon className={`h-5 w-5 ${stockStatus.className}`} />
            <span className={`text-sm font-medium ${stockStatus.className}`}>{stockStatus.text}</span>
        </div>

        <Separator />

        <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{book.description}</p>
        
        <Separator />

        <div className="space-y-2 text-sm">
          <p><strong className="font-medium text-foreground">Category:</strong> <Badge variant="outline">{book.category}</Badge></p>
          {book.isbn && <p><strong className="font-medium text-foreground">ISBN:</strong> {book.isbn}</p>}
          {book.publisher && <p><strong className="font-medium text-foreground">Publisher:</strong> {book.publisher}</p>}
          {book.publishedDate && <p><strong className="font-medium text-foreground">Published:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>}
          {book.pages && <p><strong className="font-medium text-foreground">Pages:</strong> {book.pages}</p>}
        </div>
        
        {book.tags && book.tags.length > 0 && (
          <div>
            <strong className="font-medium text-foreground text-sm">Tags:</strong>
            <div className="flex flex-wrap gap-2 mt-1">
              {book.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>
          </div>
        )}
        
        <Separator />

        {book.stock > 0 ? (
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={decrementQuantity} disabled={quantity <= 1} aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </Button>
              <Input 
                type="number"
                className="w-16 h-10 text-center border-0 focus-visible:ring-0"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={book.stock}
                aria-label="Book quantity"
              />
              <Button variant="ghost" size="icon" onClick={incrementQuantity} disabled={quantity >= book.stock} aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" onClick={handleAddToCart} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        ) : (
          <Alert variant="default" className="bg-muted">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Out of Stock</AlertTitle>
            <AlertDescription>
              This book is currently unavailable. Please check back later.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
