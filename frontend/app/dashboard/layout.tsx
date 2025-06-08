import Link from "next/link";

interface ChildrenProps {
  children: React.ReactNode;
}

export default function layout({ children }: ChildrenProps) {
  return (
    <div className="flex gap-8">
      <aside className="w-64 h-screen border-t border-r rounded-lg p-4 fixed left-0 top-4 mt-24">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <ul>
          <li className="flex flex-col gap-2 mt-4 space-y-2">
            <Link href={"/dashboard"}>Dashboard</Link>
            <Link href={"/dashboard/upload"}>Upload</Link>
            <Link href={"/dashboard/analytics"}>Analytics</Link>
          </li>
        </ul>
      </aside>
      <main className="mt-24">{children}</main>
    </div>
  );
}
