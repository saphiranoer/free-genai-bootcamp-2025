'use server';
/**
 * @fileOverview This file defines the Genkit flow for the speaking practice activity.
 *
 * It includes:
 * - SpeakingPracticeInput: The input schema for the speaking practice flow.
 * - SpeakingPracticeOutput: The output schema for the speaking practice flow.
 * - speakingPractice: The main function to initiate the speaking practice flow.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SpeakingPracticeInputSchema = z.object({
  englishSentence: z.string().describe('The English sentence to be translated.'),
  userRecordingUrl: z.string().describe('URL of the user-submitted audio recording.'),
});
export type SpeakingPracticeInput = z.infer<typeof SpeakingPracticeInputSchema>;

const SpeakingPracticeOutputSchema = z.object({
  feedback: z.string().describe('Feedback on the user\'s Arabic translation and pronunciation.'),
  isCorrect: z.boolean().describe('Whether the translation was correct.'),
});
export type SpeakingPracticeOutput = z.infer<typeof SpeakingPracticeOutputSchema>;

export async function speakingPractice(input: SpeakingPracticeInput): Promise<SpeakingPracticeOutput> {
  return speakingPracticeFlow(input);
}

const speakingPracticePrompt = ai.definePrompt({
  name: 'speakingPracticePrompt',
  input: {
    schema: z.object({
      englishSentence: z.string().describe('The English sentence to be translated.'),
      userRecordingUrl: z.string().describe('URL of the user-submitted audio recording.'),
    }),
  },
  output: {
    schema: z.object({
      feedback: z.string().describe('Feedback on the user\'s Arabic translation and pronunciation.'),
      isCorrect: z.boolean().describe('Whether the translation was correct.'),
    }),
  },
  prompt: `You are an Arabic language tutor providing feedback on a student\'s spoken translation.

  The student was asked to translate the following English sentence into Arabic:
  {{englishSentence}}

  Here is a link to the student\'s audio recording of their attempt: {{media url=userRecordingUrl}}

  Provide feedback to the student, focusing on both the accuracy of the translation and the clarity of their pronunciation. Be encouraging, and if the translation is incorrect, provide the correct translation. Indicate the isCorrect field appropriately.
  `,
});

const speakingPracticeFlow = ai.defineFlow<
  typeof SpeakingPracticeInputSchema,
  typeof SpeakingPracticeOutputSchema
>(
  {
    name: 'speakingPracticeFlow',
    inputSchema: SpeakingPracticeInputSchema,
    outputSchema: SpeakingPracticeOutputSchema,
  },
  async input => {
    const {output} = await speakingPracticePrompt(input);
    return output!;
  }
);
