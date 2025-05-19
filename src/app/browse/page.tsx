// src/app/browse/page.tsx
"use client"

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockBooks, bookCategories } from '@/lib/mockData';
import type { Book, BookCategory, BookCondition } from '@/lib/types';
import { BookCard } from '@/components/book/BookCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { FilterX, ListFilter } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';


const MAX_PRICE = Math.max(...mockBooks.map(b => b.price), 100); // Ensure max price is at least 100

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | 'all'>(
    (searchParams.get('category') as BookCategory) || 'all'
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [authorSearch, setAuthorSearch] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<BookCondition | 'all'>('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedCategory((searchParams.get('category') as BookCategory) || 'all');
  }, [searchParams]);


  const filteredBooks = useMemo(() => {
    return mockBooks.filter((book) => {
      const matchesSearchTerm =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.isbn && book.isbn.includes(searchTerm)) ||
        (book.tags && book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCategory =
        selectedCategory === 'all' || book.category === selectedCategory;
      const matchesPrice =
        book.price >= priceRange[0] && book.price <= priceRange[1];
      const matchesAuthor =
        authorSearch === '' ||
        book.author.toLowerCase().includes(authorSearch.toLowerCase());
      const matchesCondition =
        selectedCondition === 'all' || book.condition === selectedCondition;

      return (
        matchesSearchTerm &&
        matchesCategory &&
        matchesPrice &&
        matchesAuthor &&
        matchesCondition
      );
    });
  }, [searchTerm, selectedCategory, priceRange, authorSearch, selectedCondition]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, MAX_PRICE]);
    setAuthorSearch('');
    setSelectedCondition('all');
  };
  
  const FilterControls = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search-title" className="text-base font-semibold">Search Title/Keyword</Label>
        <Input
          id="search-title"
          type="text"
          placeholder="e.g., Spider-Man, Dystopian..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="category" className="text-base font-semibold">Category</Label>
        <Select
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value as BookCategory | 'all')}
        >
          <SelectTrigger id="category" className="mt-1">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {bookCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-semibold">Price Range</Label>
        <div className="mt-2 space-y-2">
            <Slider
                min={0}
                max={MAX_PRICE}
                step={1}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
            </div>
        </div>
      </div>

      <div>
        <Label htmlFor="author" className="text-base font-semibold">Author</Label>
        <Input
          id="author"
          type="text"
          placeholder="e.g., J.K. Rowling"
          value={authorSearch}
          onChange={(e) => setAuthorSearch(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label className="text-base font-semibold">Condition</Label>
        <RadioGroup
          value={selectedCondition}
          onValueChange={(value) => setSelectedCondition(value as BookCondition | 'all')}
          className="mt-2 space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="condition-all" />
            <Label htmlFor="condition-all" className="font-normal">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="condition-new" />
            <Label htmlFor="condition-new" className="font-normal">New</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="used" id="condition-used" />
            <Label htmlFor="condition-used" className="font-normal">Used</Label>
          </div>
        </RadioGroup>
      </div>

      <Button onClick={resetFilters} variant="outline" className="w-full">
        <FilterX className="mr-2 h-4 w-4" /> Reset Filters
      </Button>
    </div>
  );


  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-lora text-foreground">Browse Our Collection</h1>
        <p className="text-lg text-muted-foreground mt-2">Find your next literary adventure.</p>
      </div>
      
      <div className="md:hidden mb-6 flex justify-end">
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <ListFilter className="mr-2 h-4 w-4" /> Filters
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[350px] p-0 flex flex-col">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>Filter Books</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-grow p-4">
                    <FilterControls />
                </ScrollArea>
                <SheetFooter className="p-4 border-t">
                    <Button onClick={() => setIsFiltersOpen(false)} className="w-full">Apply Filters</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block md:w-1/4 lg:w-1/5 p-6 bg-card rounded-lg shadow-sm self-start sticky top-24">
          <h2 className="text-2xl font-semibold font-lora mb-6">Filters</h2>
          <FilterControls />
        </aside>

        <main className="md:w-3/4 lg:w-4/5">
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-muted-foreground">No books match your criteria.</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your filters or search terms.</p>
              <Button onClick={resetFilters} variant="link" className="mt-4">
                Clear all filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
