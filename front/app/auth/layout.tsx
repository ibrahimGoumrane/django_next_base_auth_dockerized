import { User } from "@/type/users";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement<{ user: User }>;
}>) {
  return (
    <div className="flex min-h-screen  mx-auto ">
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
