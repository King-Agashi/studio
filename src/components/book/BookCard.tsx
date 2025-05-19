
// src/components/book/BookCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <Link href={`/books/${book.slug}`} className="block group">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] w-full overflow-hidden">
            <Image
              src={book.imageUrl}
              alt={book.title}
              width={300}
              height={450}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={`${book.category} book cover`}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-lora leading-normal mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {book.title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-3">{book.author}</CardDescription>
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-semibold text-primary">₹{book.price.toFixed(2)}</p>
            <Badge variant={book.condition === 'new' ? 'default' : 'secondary'} className="capitalize">
              {book.condition}
            </Badge>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            onClick={() => addToCart(book)}
            variant="outline"
            className="flex-1"
            aria-label={`Add ${book.title} to cart`}
            disabled={book.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <Link href={`/books/${book.slug}`} className="flex-1" legacyBehavior>
             <Button variant="default" className="w-full">View Details</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
