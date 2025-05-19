// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold font-lora mb-3">Bookstock Nook</h3>
            <p className="text-sm">Your modern-vintage haven for cherished books. Discover, buy, and sell with fellow book lovers.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-lora mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/browse" className="hover:text-primary transition-colors">Browse All Books</Link></li>
              <li><Link href="/sell" className="hover:text-primary transition-colors">Sell Your Books</Link></li>
              <li><Link href="/#faq" className="hover:text-primary transition-colors">FAQ</Link></li> {/* Assuming FAQ section on home */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-lora mb-3">Connect With Us</h3>
            <div className="flex space-x-4 mb-3">
              <Link href="#" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="hover:text-primary transition-colors"><Twitter size={20} /></Link>
              <Link href="#" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram size={20} /></Link>
            </div>
            <div className="space-y-1 text-sm">
              <p className="flex items-center gap-2"><Mail size={16} /> devbookstock@gmail.com</p>
              <p className="flex items-center gap-2"><Phone size={16} /> +91 99999-99999</p>
              <p className="flex items-center gap-2"><MapPin size={16} /> 123 Any City, India</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm">
          <p>&copy; {currentYear} Bookstock Nook. All rights reserved. Created by Dev Singh Parihar.</p>
        </div>
      </div>
    </footer>
  );
}
