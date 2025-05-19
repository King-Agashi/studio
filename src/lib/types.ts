
export type BookCategory = 'Comic Books' | 'Harry Potter' | 'Novels' | 'Other';
export type BookCondition = 'new' | 'used';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  price: number;
  condition: BookCondition;
  description: string;
  imageUrl: string;
  featured?: boolean;
  popular?: boolean;
  slug: string; // For URL generation, e.g., book-title-author
  isbn?: string;
  pages?: number;
  publisher?: string;
  publishedDate?: string;
  stock: number; // Number of items in stock
  tags?: string[]; // For additional filtering or keywords
}

export interface CartItem extends Book {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerDetails: {
    name: string;
    email: string;
    address: string;
  };
  orderDate: Date;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}
