// src/app/books/[slug]/page.tsx
import { mockBooks } from '@/lib/mockData';
import { BookDetailsClient } from '@/components/book/BookDetailsClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface BookDetailsPageProps {
  params: {
    slug: string;
  };
}

// Function to generate metadata dynamically
export async function generateMetadata({ params }: BookDetailsPageProps): Promise<Metadata> {
  const book = mockBooks.find((b) => b.slug === params.slug);

  if (!book) {
    return {
      title: 'Book Not Found',
    };
  }

  return {
    title: `${book.title} by ${book.author} | Bookstock Nook`,
    description: book.description.substring(0, 160), // Use first 160 chars of description for meta
    openGraph: {
      title: book.title,
      description: book.description.substring(0, 160),
      images: [
        {
          url: book.imageUrl,
          width: 300, // Example width
          height: 450, // Example height
          alt: book.title,
        },
      ],
    },
  };
}

// Function to generate static paths
export async function generateStaticParams() {
  return mockBooks.map((book) => ({
    slug: book.slug,
  }));
}

export default function BookDetailsPage({ params }: BookDetailsPageProps) {
  const book = mockBooks.find((b) => b.slug === params.slug);

  if (!book) {
    notFound();
  }

  return (
    <div className="py-8 md:py-12">
      <BookDetailsClient book={book} />
      {/* Consider adding related books or reviews section here */}
    </div>
  );
}
