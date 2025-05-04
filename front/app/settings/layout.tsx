import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto max-h-[95vh]">
          {children}
        </main>
      </div>
    </div>
  );
}
