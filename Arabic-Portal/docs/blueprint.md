# **App Name**: Arabic Portal

## Core Features:

- Dashboard: Dashboard to display learning progress and available activities.
- Activity Selection: Activity Selection: A page with buttons to launch Writing, Speaking, Listening, and Reading practice activities.
- Writing Practice: Writing Practice: Gemini generates an English sentence; the user translates it into Arabic. Gemini provides feedback, including hints with root Arabic words, upon submission.
- Speaking Practice: Speaking Practice: Gemini generates an English sentence; the user speaks the Arabic translation. Gemini checks the recording and provides feedback upon submission.
- Listening Practice: Listening Practice: Gemini generates an Arabic audio clip of a short conversation and a multiple-choice question. Gemini checks the answer and provides feedback upon submission.
- Reading Practice: Reading Practice: Gemini generates a short Arabic conversation or article and a multiple-choice question. Gemini checks the answer and provides feedback upon submission.

## Style Guidelines:

- Primary color: A warm, inviting sand color (#F4EAD4) to evoke the desert landscape.
- Secondary color: A deep turquoise (#30666E) reminiscent of the Red Sea.
- Accent color: Saffron (#FF9933) to highlight important elements and calls to action.
- Clean and modern layout with a clear visual hierarchy to avoid overwhelming the user.
- Simple, clear icons to represent different activities and concepts, aiding in intuitive navigation.
- Subtle animations to provide feedback and enhance the user experience without being distracting.

## Original User Request:
make me a b1 level arabic language learning app.
there will be 5 pages:
1. dashboard 
2. study activities (displaying "launch" buttons for each study activities, ie. 'writing practice', 'speaking practice', 'listening practice', and 'reading practice')
3. the page for writing practice
4. the page for speaking practice
5. the page for listening practice
6. the page for reading practice

writing practice: gemini will generate an english sentence, the user will input the translation in a text field. below the text field is where feedbacks are given. there is a "submit" button for the user to submit answer, when it is clicked, gemini will check the user's answer. if:
- the user's attempt is incorrect, give warning.
- the user gave the right answer, congratulate and pop up a "next" button to proceed to the next sentence.
- give hints in the form of the root arabic words of the answer if the user submitted incorrectly in the feedback

speaking practice: gemini will generate an english sentence, the user will speak into the microphone for an attempt at the translation in arabic. there is a button for turning the microphone on and recording the user's answer, when clicked again, the button will stop recording. there is a "submit" button for the user to submit the recording, when it is clicked, gemini will check the user's answer. if:
- the user's attempt is incorrect, give warning.
- the user gave the right answer, congratulate and pop up a "next" button to proceed to the next sentence.

listening practice: gemini will generate an audio of a short conversation between 2 people about simple topics. gemini will also generate a multiple-choice question regarding the conversation. the user will choose an answer and submit by clicking the "submit" button. gemini will then check the user's answer. if:
- the user's attempt is incorrect, give warning.
- the user gave the right answer, congratulate and pop up a "next" button to proceed to the next sentence.

reading practice: gemini will generate either:
a. a short conversation between 2 people about a simple topic or,
b. a short article about a simple topic.
gemini will also generate a multiple-choice question regarding the conversation. the user will choose an answer and submit by clicking the "submit" button. gemini will then check the user's answer. if:
- the user's attempt is incorrect, give warning.
- the user gave the right answer, congratulate and pop up a "next" button to proceed to the next sentence.

  