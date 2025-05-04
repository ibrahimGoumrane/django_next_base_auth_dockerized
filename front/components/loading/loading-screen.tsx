"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  useEffect(() => {
    const texts = [
      "Initializing...",
      "Loading resources...",
      "Preparing exam data...",
      "Almost ready...",
    ];

    // Simulate progress
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }

          // Update loading text based on progress
          if (prevProgress < 25 && texts[0] !== loadingText) {
            setLoadingText(texts[0]);
          } else if (
            prevProgress >= 25 &&
            prevProgress < 50 &&
            texts[1] !== loadingText
          ) {
            setLoadingText(texts[1]);
          } else if (
            prevProgress >= 50 &&
            prevProgress < 75 &&
            texts[2] !== loadingText
          ) {
            setLoadingText(texts[2]);
          } else if (prevProgress >= 75 && texts[3] !== loadingText) {
            setLoadingText(texts[3]);
          }

          return prevProgress + 1;
        });
      }, 30);

      return () => clearInterval(interval);
    }, 300);

    return () => clearTimeout(timer);
  }, [loadingText]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="w-full max-w-md px-8 flex flex-col items-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="h-16 w-16 text-primary/20 animate-pulse" />
          </div>
          <div className="relative flex items-center justify-center animate-bounce-slow">
            <div className="rounded-full bg-primary/10 p-6">
              <GraduationCap className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent mb-2">
          ExamGrade Pro
        </h1>

        <p className="text-muted-foreground mb-6 text-center min-h-[24px]">
          {loadingText}
        </p>

        <div className="w-full space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Loading...</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-primary/30 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
