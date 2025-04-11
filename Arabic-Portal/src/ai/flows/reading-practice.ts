// src/ai/flows/reading-practice.ts
'use server';
/**
 * @fileOverview A reading comprehension practice AI agent.
 *
 * - readingPractice - A function that handles the reading practice process.
 * - ReadingPracticeInput - The input type for the readingPractice function.
 * - ReadingPracticeOutput - The return type for the readingPractice function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ReadingPracticeInputSchema = z.object({
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).describe('The proficiency level of the user.'),
  topic: z.string().describe('The topic of the reading material.'),
});
export type ReadingPracticeInput = z.infer<typeof ReadingPracticeInputSchema>;

const ReadingPracticeOutputSchema = z.object({
  readingMaterial: z.string().describe('The Arabic reading material (conversation or article).'),
  question: z.string().describe('A multiple-choice question about the reading material.'),
  options: z.array(z.string()).describe('The multiple-choice options for the question.'),
  correctAnswerIndex: z.number().min(0).max(3).describe('The index of the correct answer in the options array.'),
});
export type ReadingPracticeOutput = z.infer<typeof ReadingPracticeOutputSchema>;

export async function readingPractice(input: ReadingPracticeInput): Promise<ReadingPracticeOutput> {
  return readingPracticeFlow(input);
}

const readingPracticePrompt = ai.definePrompt({
  name: 'readingPracticePrompt',
  input: {
    schema: z.object({
      level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).describe('The proficiency level of the user.'),
      topic: z.string().describe('The topic of the reading material.'),
    }),
  },
  output: {
    schema: z.object({
      readingMaterial: z.string().describe('The Arabic reading material (conversation or article).'),
      question: z.string().describe('A multiple-choice question about the reading material.'),
      options: z.array(z.string()).describe('The multiple-choice options for the question.'),
      correctAnswerIndex: z.number().min(0).max(3).describe('The index of the correct answer in the options array.'),
    }),
  },
  prompt: `You are an Arabic language learning assistant. Generate Arabic reading material and a multiple-choice question based on the user's level and specified topic.

Proficiency Level: {{{level}}}
Topic: {{{topic}}}

Instructions:
1.  Generate either a short conversation between 2 people or a short article in Arabic related to the given topic.
2.  Create one multiple-choice question about the generated reading material.
3.  Provide four answer options for the question.
4.  Specify the index of the correct answer within the options array (0-3).

Output the reading material, question, answer options, and the index of the correct answer in the JSON format.
`,
});

const readingPracticeFlow = ai.defineFlow<
  typeof ReadingPracticeInputSchema,
  typeof ReadingPracticeOutputSchema
>(
  {
    name: 'readingPracticeFlow',
    inputSchema: ReadingPracticeInputSchema,
    outputSchema: ReadingPracticeOutputSchema,
  },
  async input => {
    const {output} = await readingPracticePrompt(input);
    return output!;
  }
);
