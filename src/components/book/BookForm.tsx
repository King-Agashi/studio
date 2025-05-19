// src/components/book/BookForm.tsx
"use client";

import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { bookCategories } from '@/lib/mockData';
import type { BookCategory, BookCondition } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { generateBookDescriptionHints, type GenerateBookDescriptionHintsInput } from '@/ai/flows/generate-book-description-hints';
import { Wand2, Loader2, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';


const bookFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  author: z.string().min(2, { message: "Author name must be at least 2 characters." }),
  category: z.enum(bookCategories, { required_error: "Please select a category." }),
  price: z.coerce.number().min(0.01, { message: "Price must be positive." }),
  condition: z.enum(['new', 'used'] as [BookCondition, ...BookCondition[]], { required_error: "Please select the book's condition." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(1000, { message: "Description must be 1000 characters or less."}),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }).optional().or(z.literal('')),
  stock: z.coerce.number().min(1, { message: "Stock must be at least 1." }),
  isbn: z.string().optional(),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

export function BookForm() {
  const { toast } = useToast();
  const [isLoadingHints, setIsLoadingHints] = useState(false);
  const [descriptionHints, setDescriptionHints] = useState<string[]>([]);

  const { control, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: '',
      author: '',
      category: undefined,
      price: 0,
      condition: undefined,
      description: '',
      imageUrl: '',
      stock: 1,
      isbn: '',
    },
  });

  const currentTitle = watch('title');
  const currentCategory = watch('category');

  const handleGenerateHints = async () => {
    if (!currentTitle || !currentCategory) {
      toast({
        title: 'Missing Information',
        description: 'Please enter a title and select a category to generate hints.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoadingHints(true);
    setDescriptionHints([]);
    try {
      const input: GenerateBookDescriptionHintsInput = { title: currentTitle, category: currentCategory };
      const result = await generateBookDescriptionHints(input);
      setDescriptionHints(result.hints);
      toast({
        title: 'Hints Generated',
        description: 'AI-powered description hints are ready!',
      });
    } catch (error) {
      console.error("Error generating hints:", error);
      toast({
        title: 'Error Generating Hints',
        description: 'Could not generate hints at this time. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingHints(false);
    }
  };

  const addHintToDescription = (hint: string) => {
    const currentDescription = watch('description');
    setValue('description', currentDescription ? `${currentDescription} ${hint}` : hint, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<BookFormValues> = async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Book data submitted:', data);
    toast({
      title: 'Book Listed Successfully!',
      description: `${data.title} by ${data.author} is now up for sale.`,
    });
    // TODO: Reset form or redirect user
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-lora">Sell Your Book</CardTitle>
        <CardDescription>Fill in the details below to list your book on Bookstock Nook.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => <Input id="title" placeholder="e.g., The Great Gatsby" {...field} />}
              />
              {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Controller
                name="author"
                control={control}
                render={({ field }) => <Input id="author" placeholder="e.g., F. Scott Fitzgerald" {...field} />}
              />
              {errors.author && <p className="text-sm text-destructive mt-1">{errors.author.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {bookCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
            </div>
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => <Input id="price" type="number" step="0.01" placeholder="e.g., 19.99" {...field} />}
              />
              {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Controller
                    name="stock"
                    control={control}
                    render={({ field }) => <Input id="stock" type="number" step="1" placeholder="e.g., 10" {...field} />}
                />
                {errors.stock && <p className="text-sm text-destructive mt-1">{errors.stock.message}</p>}
            </div>
             <div>
              <Label>Condition</Label>
              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new" className="font-normal">New</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="used" />
                      <Label htmlFor="used" className="font-normal">Used</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.condition && <p className="text-sm text-destructive mt-1">{errors.condition.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="isbn">ISBN (Optional)</Label>
            <Controller
                name="isbn"
                control={control}
                render={({ field }) => <Input id="isbn" placeholder="e.g., 978-3-16-148410-0" {...field} />}
            />
            {errors.isbn && <p className="text-sm text-destructive mt-1">{errors.isbn.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => <Input id="imageUrl" placeholder="https://example.com/book-cover.jpg" {...field} />}
            />
            {errors.imageUrl && <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>}
            <p className="text-xs text-muted-foreground mt-1">Tip: Use a service like <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="underline">Postimages</a> to upload and get a direct image URL.</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="description">Description</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGenerateHints}
                disabled={isLoadingHints || !currentTitle || !currentCategory}
              >
                {isLoadingHints ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Get AI Hints
              </Button>
            </div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea id="description" placeholder="Describe the book, its plot, edition details, etc." {...field} rows={5} />}
            />
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
          </div>

          {descriptionHints.length > 0 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle className="font-semibold">AI Description Hints</AlertTitle>
              <AlertDescription>
                <p className="mb-2">Click a hint to add it to your description:</p>
                <div className="flex flex-wrap gap-2">
                  {descriptionHints.map((hint, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      onClick={() => addHintToDescription(hint)}
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                    >
                      {hint}
                    </Badge>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            List Book for Sale
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
