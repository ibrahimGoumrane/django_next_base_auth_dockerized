"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Appearance = () => {
  const { theme, setTheme } = useTheme();

  return (
    <TabsContent value="appearance">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Theme</h3>
            <div className="grid grid-cols-3 gap-4">
              <div
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-accent ${
                  theme === "light"
                    ? "border-primary bg-accent"
                    : "border-border"
                }`}
                onClick={() => setTheme("light")}
              >
                <Sun className="h-6 w-6" />
                <span>Light</span>
              </div>
              <div
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-accent ${
                  theme === "dark"
                    ? "border-primary bg-accent"
                    : "border-border"
                }`}
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-6 w-6" />
                <span>Dark</span>
              </div>
              <div
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-accent ${
                  theme === "system"
                    ? "border-primary bg-accent"
                    : "border-border"
                }`}
                onClick={() => setTheme("system")}
              >
                <Laptop className="h-6 w-6" />
                <span>System</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Appearance;
