'use server';
/**
 * @fileOverview A writing practice AI agent.
 *
 * - writingPractice - A function that handles the writing practice process.
 * - WritingPracticeInput - The input type for the writingPractice function.
 * - WritingPracticeOutput - The return type for the writingPractice function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const WritingPracticeInputSchema = z.object({
  englishSentence: z.string().describe('The English sentence to translate.'),
  userTranslation: z.string().describe('The user provided Arabic translation.'),
});
export type WritingPracticeInput = z.infer<typeof WritingPracticeInputSchema>;

const WritingPracticeOutputSchema = z.object({
  isCorrect: z.boolean().describe('Whether the translation is correct.'),
  feedback: z.string().describe('Feedback on the translation, including hints.'),
  nextSentence: z.string().optional().describe('The next English sentence to translate if the answer was correct.'),
  rootWords: z.array(z.string()).optional().describe('Root Arabic words that are hints for the translation'),
});
export type WritingPracticeOutput = z.infer<typeof WritingPracticeOutputSchema>;

export async function writingPractice(input: WritingPracticeInput): Promise<WritingPracticeOutput> {
  return writingPracticeFlow(input);
}

const writingPracticePrompt = ai.definePrompt({
  name: 'writingPracticePrompt',
  input: {
    schema: z.object({
      englishSentence: z.string().describe('The English sentence to translate.'),
      userTranslation: z.string().describe('The user provided Arabic translation.'),
    }),
  },
  output: {
    schema: z.object({
      isCorrect: z.boolean().describe('Whether the translation is correct.'),
      feedback: z.string().describe('Feedback on the translation, including hints.'),
      nextSentence: z.string().optional().describe('The next English sentence to translate if the answer was correct.'),
      rootWords: z.array(z.string()).optional().describe('Root Arabic words that are hints for the translation'),
    }),
  },
  prompt: `You are an Arabic language tutor. A user is learning Arabic and you are helping them practice.

You will generate feedback for the user's Arabic translation of an English sentence. If the translation is incorrect, provide feedback and hints.
If the translation is correct, congratulate the user and provide a new English sentence for them to translate.

Consider these points when providing feedback:
* Grammatical correctness
* Accuracy of the translation
* Naturalness of the Arabic phrasing
* Use root words as hints when the user is incorrect

English Sentence: {{{englishSentence}}}
User's Translation: {{{userTranslation}}}
`,
});

const writingPracticeFlow = ai.defineFlow<
  typeof WritingPracticeInputSchema,
  typeof WritingPracticeOutputSchema
>(
  {
    name: 'writingPracticeFlow',
    inputSchema: WritingPracticeInputSchema,
    outputSchema: WritingPracticeOutputSchema,
  },
  async input => {
    const {output} = await writingPracticePrompt(input);
    return output!;
  }
);
