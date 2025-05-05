"use client";

import BaseForm from "@/components/form/base-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { UpdateUserSchema, userUpdateRenderedFields } from "@/lib/schema/user";
import { User } from "@/type/users";
import { toast } from "sonner";
import { updateUser } from "@/lib/actions/actions";
interface ProfileProps {
  user: User;
}

const Profile = ({ user }: ProfileProps) => {
  const initialValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    id: user?.id?.toString() || "",
  };

  return (
    <TabsContent value="profile">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <BaseForm
            initialState={{ success: false, errors: {} }}
            action={updateUser}
            schema={UpdateUserSchema}
            fields={userUpdateRenderedFields}
            defaultValues={initialValues}
            submitText="Save Changes"
            loadingText="Saving..."
            onSuccess={() => {
              toast.success("Profile updated successfully!");
            }}
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Profile;
