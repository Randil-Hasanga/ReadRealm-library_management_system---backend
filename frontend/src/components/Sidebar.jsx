import { ChevronFirst, MoreVertical, Home, User, Settings, FileText } from "lucide-react";
import { Link } from "react-router-dom"; // Assuming React Router is used for navigation.

const menuItems = [
  { label: "Dashboard", icon: Home, path: "/" },
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Settings", icon: Settings, path: "/settings" },
  { label: "Reports", icon: FileText, path: "/reports" },
];

const Sidebar = () => {
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col justify-between border-r bg-white shadow-sm">
        {/* Header Section */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <img src="https://img.logoipsum.com/243.svg" alt="logo" className="w-32" />
          <button className="p-1.5 bg-gray-50 hover:bg-gray-200 rounded-lg">
            <ChevronFirst />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-grow p-4">
          <ul className="space-y-2">
            {menuItems.map(({ label, icon: Icon, path }, index) => (
              <li
                key={index}
                className="flex items-center p-2 hover:bg-chocolate-50 rounded-lg cursor-pointer"
              >
                <Link to={path} className="flex items-center w-full">
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Section */}
        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?name=Randil+Hasanga"
            alt="User Avatar"
            className="rounded-2xl w-10 h-10"
          />
          <div className="flex justify-between items-center w-52 ml-3">
            <div className="leading-4">
              <h4 className="font-semibold">Randil Hasanga</h4>
              <span className="text-xs text-gray-600">randilhasanga@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

