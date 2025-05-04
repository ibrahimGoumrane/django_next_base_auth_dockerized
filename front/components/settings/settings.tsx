import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, User } from "lucide-react";
import Appearance from "./appearance";
import DangerZone from "./DangerZone";
import Profile from "./profile";
import { getLoggedInUser } from "@/network/auth";
import { User as UserType } from "@/type/users";

export async function Settings() {
  const user = (await getLoggedInUser()) as UserType;

  return (
    <div className="container py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-2xl">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        <Profile user={user} />
        <Appearance />
        <DangerZone />
      </Tabs>
    </div>
  );
}
