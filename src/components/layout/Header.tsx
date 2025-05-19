// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { BookOpen, Home, Search, ShoppingCart, User, Menu, Feather } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavLink } from './NavLink';
import { SearchBar } from '../shared/SearchBar';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/browse', label: 'Browse Books', Icon: Search },
  { href: '/sell', label: 'Sell a Book', Icon: Feather },
  { href: '/about', label: 'About Us', Icon: BookOpen },
];

export function Header() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const logoUrl = "https://www.shutterstock.com/image-vector/outlined-logotype-letter-b-book-600nw-2118306167.jpg";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold font-lora text-primary" aria-label="Bookstock Nook Home">
          <Image src={logoUrl} alt="Bookstock Nook Logo" width={32} height={32} data-ai-hint="vintage book logo" className="rounded-sm" />
          Bookstock Nook
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} Icon={item.Icon}
              activeClassName="text-accent font-semibold"
              inactiveClassName="text-foreground/70 hover:text-accent"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <SearchBar />
          <Link href="/cart" passHref legacyBehavior>
            <Button variant="ghost" size="icon" aria-label={`Shopping cart with ${itemCount} items`}>
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/auth" passHref legacyBehavior>
            <Button variant="ghost" size="icon" aria-label="User account">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col p-6 space-y-4">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold font-lora text-primary mb-4">
                 <Image src={logoUrl} alt="Bookstock Nook Logo" width={28} height={28} data-ai-hint="vintage book logo" className="rounded-sm"/>
                  Bookstock Nook
                </Link>
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                     <NavLink key={item.href} href={item.href} Icon={item.Icon}
                        activeClassName="bg-accent/20 text-accent font-semibold"
                        inactiveClassName="text-foreground/80 hover:bg-accent/10 hover:text-accent"
                        className="text-base py-3"
                      >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t">
                   <SearchBar />
                   <div className="flex items-center justify-around mt-4">
                      <Link href="/cart" passHref legacyBehavior>
                        <Button variant="ghost" className="flex-1" aria-label={`Shopping cart with ${itemCount} items`}>
                          <ShoppingCart className="h-5 w-5 mr-2" /> Cart
                          {itemCount > 0 && (
                            <Badge variant="destructive" className="ml-2">{itemCount}</Badge>
                          )}
                        </Button>
                      </Link>
                      <Link href="/auth" passHref legacyBehavior>
                        <Button variant="ghost" className="flex-1" aria-label="User account">
                          <User className="h-5 w-5 mr-2" /> Account
                        </Button>
                      </Link>
                   </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
