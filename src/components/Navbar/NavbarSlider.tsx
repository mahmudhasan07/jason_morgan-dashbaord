'use client';
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation"; // Import the hook
import { IoClose } from "react-icons/io5"; // Close icon
import { FiMenu } from "react-icons/fi"; // Menu icon
import users from '@/assests/user.png'
import creators from '@/assests/event-creator.png'
import event from '@/assests/event.png'
import payment from "@/assests/user.png"
import dashboard from "@/assests/dashboard.png"
import logout from '@/assests/logout.png'
import subscription from "@/assests/subscribe.png"
import logo from "@/assests/logo.png"
import complain from '@/assests/complaint.png'
import approve from '@/assests/approved.png'
import { FaRegUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/Redux/ReduxFunction";
import Cookies from "js-cookie";
import { AppDispatch, RootState } from "@/Redux/store";
// import { RootState } from "@reduxjs/toolkit/query";
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navigation = [
  { label: "Dashboard", route: "/", iconPath: dashboard },
  { label: "Users", route: "/users", iconPath: users },
  { label: "Event Creator", route: "/event-creator", iconPath: creators },
  { label: "Running Event", route: "/running-event", iconPath: event },
  { label: "Approve Event", route: "/approve-event", iconPath: approve },
  { label: "Complains", route: "/complains", iconPath: complain },
  { label: "Transaction", route: "/transaction", iconPath: payment },
  { label: "Subscription", route: "/subscription", iconPath: subscription },
];

const NavbarSlider = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const path = usePathname();
  const dispatch = useDispatch<AppDispatch>()

  const { name } = useSelector((state: RootState) => state.Auth);

  const renderNavItem = (item: { label: string, route: string, iconPath: StaticImageData }) => {
    const isActive = path === item.route;


    return (
      <li key={item.route}>
        <Link
          href={item.route}
          className={`relative flex items-center h-11 pr-6 py-[10px] pl-[24px] text-lg transition-all my-3 duration-300 ${isActive
            ? "poppins-semibold text-white border-l-4 border-primary  bg-gradient-to-r from-[#83008A]/80 to-[#B80069]/60"
            : "text-black border-l-4 border-transparent hover:border-primary hover:bg-gradient-to-r hover:from-[#83008A]/80 hover:to-[#B80069]/60 hover:text-black"
            }`}
        >
          <Image src={item.iconPath} alt={item.label} width={20} height={20} className="ml-2" />
          {isOpen && <span className="ml-3 text-[18px] tracking-wide truncate">{item.label}</span>}
        </Link>
      </li>
    );
  };


  const route = useRouter()

  const handleLogOut = () => {
    dispatch(logOut())
    Cookies.remove("accessToken")
    route.push("/login")

  }

  return (
    <div className="relative flex">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute z-50 top-4 left-4 text-black p-2 rounded-md bg-white shadow-md"
      >
        {isOpen ? <IoClose size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar Content */}
      <div
        className={`h-screen bg-white duration-300 flex flex-col  font-inter ${isOpen ? 'w-[320px]' : 'w-[80px]'
          }`}
      >
        {/* Logo */}
        {isOpen && (
          <Link href="/" className="flex justify-center mb-6 pt-[20px] pb-[15px]">
            <Image width={120} height={120} className="max-w-32" src={logo} alt="logo_image" />
          </Link>
        )}

        <div className={`flex flex-col justify-between  h-screen pb-11 ${isOpen ? "pt-0" : 'pt-14'}`}>
          {/* Navigation */}
          <div className="space-y-3">
            <ul className="pt-2 pb-4 space-y-1 text-sm">{navigation.map(renderNavItem)}</ul>
          </div>

          {/* Logout Button */}
          <div>
            <div className="flex px-8 space-x-2  text-lg">
              <FaRegUser className="text-2xl text-primary" />
              <p className="font-semibold text-primary lg:block hidden">Hello, {name}</p>
            </div>
            <button
              onClick={handleLogOut}
              className={`relative flex items-center h-11 pr-6 py-[10px] pl-[24px] text-lg transition-all duration-300 poppins-semibold hover:bg-gradient-to-r hover:from-[#83008A]/80 hover:to-[#B80069]/60 to-white text-black border-l-4 ${isOpen ? '' : 'justify-center'
                }`}
            >
              <Image src={logout} alt="logout" width={20} height={20} className="ml-2" />
              {isOpen && <span className="ml-3 text-[18px] tracking-wide truncate ">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSlider;
