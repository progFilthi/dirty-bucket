import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface ChildrenProps {
  children: React.ReactNode;
}

const Sidebarlinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    label: "Upload",
    href: "/dashboard/upload",
    icon: ArrowUpTrayIcon,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: ChartBarIcon,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Cog6ToothIcon,
  },
];

export default function layout({ children }: ChildrenProps) {
  return (
    <div className="flex gap-8">
      <aside className="w-64 h-screen border-t border-r rounded-lg p-4 fixed left-0 top-4 mt-24">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <ul>
          <li className="flex flex-col gap-2 mt-4 space-y-2">
            {Sidebarlinks.map((links) => {
              const Icon = links.icon;
              return (
                <Link
                  href={links.href}
                  key={links.href}
                  className="flex items-center py-4 w-full border gap-2 border-yellow-500"
                >
                  <Icon className="h-5" />
                  <span>{links.label}</span>
                </Link>
              );
            })}
          </li>
        </ul>
      </aside>
      <main className="mt-32">{children}</main>
    </div>
  );
}
