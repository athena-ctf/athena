import { Sidebar } from "@/components/admin";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-cols-6">
      <Sidebar />
      <div className="col-span-5">{children}</div>
    </div>
  );
}
