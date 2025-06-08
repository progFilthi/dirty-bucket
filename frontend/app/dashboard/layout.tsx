import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
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
            <Link href={"/dashboard"}>
              <div className="flex items-center gap-2">
                <HomeIcon className="h-4" />
                <p>Dashboard</p>
              </div>
            </Link>

            <Link href={"/dashboard/upload"}>
              <div className="flex items-center gap-2">
                <ArrowUpTrayIcon className="h-4" />
                <p>Upload</p>
              </div>
            </Link>

            <Link href={"/dashboard/analytics"}>
              <div className="flex items-center gap-2">
                <ChartBarIcon className="h-4" />
                <p>Analytics</p>
              </div>
            </Link>
          </li>
        </ul>
      </aside>
      <main className="mt-32">{children}</main>
    </div>
  );
}
