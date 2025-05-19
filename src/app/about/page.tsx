// src/app/about/page.tsx
import Image from 'next/image';
import { Mail, Phone, MapPin, UserCircle, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-lora text-foreground">About Bookstock Nook</h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          Discover the story behind our passion for books and community.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-square max-w-md mx-auto w-full">
          <Image
            src="https://placehold.co/600x600.png"
            alt="Dev Singh Parihar - Founder of Bookstock Nook"
            layout="fill"
            objectFit="cover"
            className="rounded-xl shadow-2xl"
            data-ai-hint="founder portrait books"
          />
        </div>
        
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-lora flex items-center gap-2">
                <UserCircle className="h-7 w-7 text-primary" />
                Meet the Creator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-lg font-semibold">Dev Singh Parihar</p>
              <p className="text-muted-foreground">
                As the founder of Bookstock Nook, my vision is to create a vibrant, welcoming space where book lovers can connect,
                discover rare finds, and share their literary passions. This platform blends modern technology with the timeless charm of vintage books.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
               <CardTitle className="text-2xl font-lora flex items-center gap-2">
                <Globe className="h-7 w-7 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                At Bookstock Nook, we aim to foster a community around the love of reading. We provide a seamless platform for buying and selling a diverse range of books, from classic comics to contemporary novels, all while embracing a unique modern-vintage aesthetic.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 bg-card p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold font-lora text-center text-foreground mb-8">Contact Information</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Mail className="h-10 w-10 text-accent mb-3" />
            <h3 className="text-xl font-semibold font-lora mb-1">Email</h3>
            <a href="mailto:devbookstock@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              devbookstock@gmail.com
            </a>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <Phone className="h-10 w-10 text-accent mb-3" />
            <h3 className="text-xl font-semibold font-lora mb-1">Phone</h3>
            <p className="text-muted-foreground">+91 99999-99999</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <MapPin className="h-10 w-10 text-accent mb-3" />
            <h3 className="text-xl font-semibold font-lora mb-1">Address</h3>
            <p className="text-muted-foreground">123 Any City, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
