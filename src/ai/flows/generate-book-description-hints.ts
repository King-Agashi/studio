'use server';

/**
 * @fileOverview A Genkit flow for suggesting book description hints based on book title and category.
 *
 * - generateBookDescriptionHints - A function that generates book description hints.
 * - GenerateBookDescriptionHintsInput - The input type for the generateBookDescriptionHints function.
 * - GenerateBookDescriptionHintsOutput - The return type for the generateBookDescriptionHints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBookDescriptionHintsInputSchema = z.object({
  title: z.string().describe('The title of the book.'),
  category: z.string().describe('The category of the book (e.g., Comic Books, Harry Potter, Novels).'),
});
export type GenerateBookDescriptionHintsInput = z.infer<typeof GenerateBookDescriptionHintsInputSchema>;

const GenerateBookDescriptionHintsOutputSchema = z.object({
  hints: z.array(z.string()).describe('An array of suggested keywords and description hints.'),
});
export type GenerateBookDescriptionHintsOutput = z.infer<typeof GenerateBookDescriptionHintsOutputSchema>;

export async function generateBookDescriptionHints(
  input: GenerateBookDescriptionHintsInput
): Promise<GenerateBookDescriptionHintsOutput> {
  return generateBookDescriptionHintsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBookDescriptionHintsPrompt',
  input: {schema: GenerateBookDescriptionHintsInputSchema},
  output: {schema: GenerateBookDescriptionHintsOutputSchema},
  prompt: `You are an AI assistant helping book sellers create compelling listings.

  Based on the book's title and category, suggest relevant keywords and description hints that the seller can use in their listing.

  Title: {{{title}}}
  Category: {{{category}}}

  Provide the output as an array of strings.
  `,
});

const generateBookDescriptionHintsFlow = ai.defineFlow(
  {
    name: 'generateBookDescriptionHintsFlow',
    inputSchema: GenerateBookDescriptionHintsInputSchema,
    outputSchema: GenerateBookDescriptionHintsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
