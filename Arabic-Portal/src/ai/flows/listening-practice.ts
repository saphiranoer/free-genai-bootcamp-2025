// src/ai/flows/listening-practice.ts
'use server';
/**
 * @fileOverview This file defines the Genkit flow for the listening practice activity.
 *
 * It generates an Arabic audio clip of a short conversation, a multiple-choice question,
 * and evaluates the user's answer, providing feedback.
 *
 * - listeningPractice - The main function to initiate the listening practice flow.
 * - ListeningPracticeInput - The input type for the listeningPractice function.
 * - ListeningPracticeOutput - The return type for the listeningPractice function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ListeningPracticeInputSchema = z.object({
  level: z.string().describe('The level of the user (e.g., B1).'),
});
export type ListeningPracticeInput = z.infer<typeof ListeningPracticeInputSchema>;

const ListeningPracticeOutputSchema = z.object({
  audioUrl: z.string().describe('URL of the Arabic audio clip.'),
  question: z.string().describe('A multiple-choice question about the conversation.'),
  options: z.array(z.string()).describe('The multiple-choice options.'),
  correctAnswerIndex: z.number().describe('The index of the correct answer in the options array.'),
  feedback: z.string().describe('Feedback on the user answer.'),
});
export type ListeningPracticeOutput = z.infer<typeof ListeningPracticeOutputSchema>;

export async function listeningPractice(input: ListeningPracticeInput): Promise<ListeningPracticeOutput> {
  return listeningPracticeFlow(input);
}

const listeningPracticePrompt = ai.definePrompt({
  name: 'listeningPracticePrompt',
  input: {
    schema: z.object({
      level: z.string().describe('The level of the user (e.g., B1).'),
    }),
  },
  output: {
    schema: z.object({
      audioUrl: z.string().describe('URL of the Arabic audio clip.'),
      question: z.string().describe('A multiple-choice question about the conversation.'),
      options: z.array(z.string()).describe('The multiple-choice options.'),
      correctAnswerIndex: z.number().describe('The index of the correct answer in the options array.'),
    }),
  },
  prompt: `You are an Arabic language learning assistant. Generate a short Arabic audio clip of a conversation between two people about simple topics for a user of level {{{level}}}.

  Also generate a multiple-choice question regarding the conversation, along with plausible options and the index of the correct answer.
  The audioUrl should be a placeholder URL, e.g., "https://example.com/arabic_audio.mp3".

  Ensure that the question and options are in Arabic.
  The options should be short and concise.
  The conversation should be appropriate for the given user level.
  `,
});

const checkAnswerTool = ai.defineTool({
  name: 'checkAnswer',
  description: 'Checks if the user provided the correct answer to the question.',
  inputSchema: z.object({
    answerIndex: z.number().describe('The index of the user selected answer.'),
    correctAnswerIndex: z.number().describe('The index of the correct answer.'),
  }),
  outputSchema: z.string(),
}, async (input) => {
  if (input.answerIndex === input.correctAnswerIndex) {
    return 'Congratulations! That is the correct answer.  Click next to proceed to the next question.';
  } else {
    return 'Incorrect. Please try again.';
  }
});

const listeningPracticeFlow = ai.defineFlow<
  typeof ListeningPracticeInputSchema,
  typeof ListeningPracticeOutputSchema
>({
  name: 'listeningPracticeFlow',
  inputSchema: ListeningPracticeInputSchema,
  outputSchema: ListeningPracticeOutputSchema,
}, async (input) => {
  const {output} = await listeningPracticePrompt(input);

  const answerCheck = await checkAnswerTool({
    answerIndex: 0, // Placeholder, the UI has to capture user answer and pass it through to the checkAnswerTool
    correctAnswerIndex: output!.correctAnswerIndex,
  });

  return {
    ...output!,
    feedback: answerCheck,
  };
});
