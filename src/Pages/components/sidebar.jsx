import { Link, useLocation } from "react-router-dom";
//import { HomeIcon, UserIcon, BriefcaseIcon } from "@heroicons/react/outline";
import { HomeIcon, UserIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

const sidebarLinks = [
  { name: "Home", href: "/homepage", icon: HomeIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
  { name: "Projects", href: "/projects", icon: BriefcaseIcon },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-gray-800 text-white w-64 h-screen fixed">
      <div className="px-6 py-4">
        <img src="/logo.svg" alt="Logo" className="h-12 w-auto" />
      </div>
      <nav className="mt-6">
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? "bg-gray-900"
                    : "hover:bg-gray-700"
                }`}
              >
                <link.icon className="h-5 w-5 mr-3" />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
