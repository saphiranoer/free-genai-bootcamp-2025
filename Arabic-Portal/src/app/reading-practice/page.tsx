"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { readingPractice, ReadingPracticeOutput } from "@/ai/flows/reading-practice";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ReadingPracticePage = () => {
  const [level, setLevel] = useState<"A1" | "A2" | "B1" | "B2" | "C1" | "C2">("B1");
  const [topic, setTopic] = useState("");
  const [practiceData, setPracticeData] = useState<ReadingPracticeOutput | null>(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleStartPractice = async () => {
    if (!topic) {
      toast({
        title: "Error",
        description: "Please enter a topic.",
      });
      return;
    }

    const result = await readingPractice({ level, topic });
    setPracticeData(result);
    setSelectedAnswerIndex(null); // Reset selected answer when starting a new practice
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex === null) {
      toast({
        title: "Error",
        description: "Please select an answer.",
      });
      return;
    }

    if (!practiceData) return;

    if (selectedAnswerIndex === practiceData.correctAnswerIndex) {
      toast({
        title: "Correct!",
        description: "Congratulations! You chose the right answer.",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Please try again.",
      });
    }
  };

  const handleNextQuestion = () => {
    setPracticeData(null);
    setSelectedAnswerIndex(null);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Reading Practice</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="level">Proficiency Level</Label>
            <RadioGroup defaultValue={level} className="flex flex-row space-x-2" onValueChange={(value) => setLevel(value as "A1" | "A2" | "B1" | "B2" | "C1" | "C2")}>
              <RadioGroupItem value="A1" id="r1" />
              <Label htmlFor="r1">A1</Label>
              <RadioGroupItem value="A2" id="r2" />
              <Label htmlFor="r2">A2</Label>
              <RadioGroupItem value="B1" id="r3" />
              <Label htmlFor="r3">B1</Label>
              <RadioGroupItem value="B2" id="r4" />
              <Label htmlFor="r4">B2</Label>
              <RadioGroupItem value="C1" id="r5" />
              <Label htmlFor="r5">C1</Label>
              <RadioGroupItem value="C2" id="r6" />
              <Label htmlFor="r6">C2</Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic"
            />
          </div>
          <Button onClick={handleStartPractice}>Start Practice</Button>
        </CardContent>
      </Card>

      {practiceData && (
        <Card>
          <CardHeader>
            <CardTitle>Reading Material</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{practiceData.readingMaterial}</p>
            <p>
              <strong>Question:</strong> {practiceData.question}
            </p>
            <div className="grid gap-2">
              <Label>Select Answer</Label>
              <RadioGroup onValueChange={(value) => setSelectedAnswerIndex(parseInt(value))} defaultValue={selectedAnswerIndex !== null ? selectedAnswerIndex.toString() : undefined}>
                {practiceData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
                    <Label htmlFor={`answer-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button onClick={handleSubmitAnswer}>Submit Answer</Button>
            <Button variant="secondary" onClick={handleNextQuestion}>
              Next Question
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReadingPracticePage;
