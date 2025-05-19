// src/components/book/FeaturedBooksSection.tsx
import type { Book } from '@/lib/types';
import { BookCard } from './BookCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedBooksSectionProps {
  title: string;
  books: Book[];
  categoryLink?: string;
}

export function FeaturedBooksSection({ title, books, categoryLink }: FeaturedBooksSectionProps) {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-lora text-foreground">{title}</h2>
        {categoryLink && (
          <Link href={categoryLink} legacyBehavior>
            <Button variant="link" className="text-primary hover:text-primary/80">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.slice(0, 4).map((book) => ( // Display up to 4 books
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
