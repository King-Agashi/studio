// src/app/page.tsx
import { FeaturedBooksSection } from '@/components/book/FeaturedBooksSection';
import { mockBooks, bookCategories } from '@/lib/mockData';
import type { Book, BookCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { SearchBar } from '@/components/shared/SearchBar';
import { BookOpen, Zap, Tag } from 'lucide-react';

export default function HomePage() {
  const featuredComics = mockBooks.filter(
    (book) => book.category === 'Comic Books' && book.featured
  );
  const featuredHarryPotter = mockBooks.filter(
    (book) => book.category === 'Harry Potter' && book.featured
  );
  const popularNovels = mockBooks.filter(
    (book) => book.category === 'Novels' && book.popular
  );

  const categories = [
    { name: 'Comic Books', href: '/browse?category=Comic+Books', Icon: Zap, hint: 'comic books' },
    { name: 'Harry Potter', href: '/browse?category=Harry+Potter', Icon: BookOpen, hint: 'magic books' },
    { name: 'Novels', href: '/browse?category=Novels', Icon: Tag, hint: 'fiction books' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/30 via-background to-background py-16 md:py-24 rounded-lg overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Subtle background texture, e.g., vintage paper */}
          <Image src="https://placehold.co/1200x400.png" alt="Vintage paper texture" layout="fill" objectFit="cover" data-ai-hint="vintage paper"/>
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-lora text-foreground mb-6">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore a curated collection of comic books, Harry Potter editions, and captivating novels. 
            Bookstock Nook is where modern convenience meets vintage charm.
          </p>
          <div className="max-w-xl mx-auto mb-8">
            <SearchBar placeholder="Search by title, author, or ISBN..." />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/browse" legacyBehavior>
              <Button size="lg" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">Explore All Books</Button>
            </Link>
            <Link href="/sell" legacyBehavior>
              <Button size="lg" variant="outline">Sell Your Books</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8">
        <h2 className="text-3xl font-bold font-lora text-center text-foreground mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="block group">
              <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center border border-transparent hover:border-primary">
                <category.Icon className="h-12 w-12 text-accent mx-auto mb-4 transition-transform group-hover:scale-110" />
                <h3 className="text-xl font-semibold font-lora text-foreground group-hover:text-primary">{category.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">Explore our collection of {category.hint}.</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedBooksSection title="Featured Comic Books" books={featuredComics} categoryLink="/browse?category=Comic+Books" />
      <FeaturedBooksSection title="Beloved Harry Potter Editions" books={featuredHarryPotter} categoryLink="/browse?category=Harry+Potter" />
      <FeaturedBooksSection title="Popular Novels" books={popularNovels} categoryLink="/browse?category=Novels" />
    </div>
  );
}
