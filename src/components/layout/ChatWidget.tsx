// src/components/layout/ChatWidget.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MessageSquare, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to a backend or a service like Genkit for processing.
    // For this dummy version, we'll use a mailto link.
    const subject = `Support Inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:devbookstock@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsOpen(false); // Close popover after attempting to send
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground"
          aria-label="Open chat support"
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 rounded-lg shadow-xl mr-2 mb-1" side="top" align="end">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold font-lora text-lg">Chat Support</h4>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="chat-name" className="text-sm">Name</Label>
            <Input 
              id="chat-name" 
              placeholder="Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required 
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="chat-email" className="text-sm">Email</Label>
            <Input 
              id="chat-email" 
              type="email"
              placeholder="your@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="chat-message" className="text-sm">Message</Label>
            <Textarea
              id="chat-message"
              placeholder="How can we help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 h-24"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Your message will be sent to devbookstock@gmail.com.
          </p>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Send Message
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
