"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { speakingPractice, SpeakingPracticeOutput } from "@/ai/flows/speaking-practice";
import { useToast } from "@/hooks/use-toast";

const SpeakingPracticePage = () => {
  const [englishSentence, setEnglishSentence] = useState("");
  const [userRecordingUrl, setUserRecordingUrl] = useState(""); // Placeholder for audio URL
  const [practiceData, setPracticeData] = useState<SpeakingPracticeOutput | null>(null);
  const { toast } = useToast();

  const handleStartPractice = async () => {
    if (!englishSentence) {
      toast({
        title: "Error",
        description: "Please enter an English sentence.",
      });
      return;
    }
    if (!userRecordingUrl) {
      toast({
        title: "Error",
        description: "Please provide audio recording.",
      });
      return;
    }

    const result = await speakingPractice({ englishSentence, userRecordingUrl });
    setPracticeData(result);
  };

  const handleNextQuestion = () => {
    setPracticeData(null);
    setEnglishSentence("");
    setUserRecordingUrl("");
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Speaking Practice</CardTitle>
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
            <Label htmlFor="userRecordingUrl">Audio Recording URL</Label>
            <Input
              id="userRecordingUrl"
              value={userRecordingUrl}
              onChange={(e) => setUserRecordingUrl(e.target.value)}
              placeholder="Enter audio recording URL"
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

export default SpeakingPracticePage;
