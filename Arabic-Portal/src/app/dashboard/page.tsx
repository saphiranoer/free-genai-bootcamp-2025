"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>Track your progress across all activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Writing Practice</span>
              <span>75%</span>
            </div>
            <Progress value={75} />
            <div className="flex items-center justify-between">
              <span>Speaking Practice</span>
              <span>30%</span>
            </div>
            <Progress value={30} />
            <div className="flex items-center justify-between">
              <span>Listening Practice</span>
              <span>50%</span>
            </div>
            <Progress value={50} />
            <div className="flex items-center justify-between">
              <span>Reading Practice</span>
              <span>90%</span>
            </div>
            <Progress value={90} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Activities</CardTitle>
          <CardDescription>Choose an activity to start learning.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button onClick={() => router.push("/writing-practice")}>Writing Practice</Button>
          <Button onClick={() => router.push("/speaking-practice")}>Speaking Practice</Button>
          <Button onClick={() => router.push("/listening-practice")}>Listening Practice</Button>
          <Button onClick={() => router.push("/reading-practice")}>Reading Practice</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
