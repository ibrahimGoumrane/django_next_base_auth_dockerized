"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteUser as deleteUserApi } from "@/network/users";
import { redirect, useRouter } from "next/navigation";
import { getLoggedInUser, logout } from "@/network/auth";
import { User } from "@/type/users";
const DangerZone = () => {
  // const user = await getLoggedInUser();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  async function deleteUser() {
    if (!user) redirect("/auth/login");
    try {
      await logout();
      await deleteUserApi(user?.id);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getLoggedInUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);
  return (
    <Card className="mt-8 border-destructive/20">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>
          Irreversible actions that affect your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Delete Account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => setDeleteConfirm(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>

          {deleteConfirm && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription className="space-y-4">
                <p>
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={deleteUser}>
                    Confirm Delete
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DangerZone;
