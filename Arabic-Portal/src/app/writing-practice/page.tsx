"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { writingPractice, WritingPracticeOutput } from "@/ai/flows/writing-practice";
import { useToast } from "@/hooks/use-toast";

const WritingPracticePage = () => {
  const [englishSentence, setEnglishSentence] = useState("");
  const [userTranslation, setUserTranslation] = useState("");
  const [practiceData, setPracticeData] = useState<WritingPracticeOutput | null>(null);
  const { toast } = useToast();

  const handleStartPractice = async () => {
    if (!englishSentence) {
      toast({
        title: "Error",
        description: "Please enter an English sentence.",
      });
      return;
    }
    if (!userTranslation) {
      toast({
        title: "Error",
        description: "Please provide translation.",
      });
      return;
    }

    const result = await writingPractice({ englishSentence, userTranslation });
    setPracticeData(result);
  };

  const handleNextQuestion = () => {
    setPracticeData(null);
    setEnglishSentence("");
    setUserTranslation("");
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Writing Practice</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="englishSentence">English Sentence</Label>
            <Input
              id="englishSentence"
              value={englishSentence}
              onChange={(e) => setEnglishSentence(e.target.value)}
              placeholder="Enter English sentence"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="userTranslation">Your Translation</Label>
            <Textarea
              id="userTranslation"
              value={userTranslation}
              onChange={(e) => setUserTranslation(e.target.value)}
              placeholder="Enter your Arabic translation"
            />
          </div>
          <Button onClick={handleStartPractice}>Start Practice</Button>
        </CardContent>
      </Card>

      {practiceData && (
        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea value={practiceData.feedback} readOnly />
            <Button variant="secondary" onClick={handleNextQuestion}>
              Next Question
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WritingPracticePage;
