import Image from "next/image";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter, BsTwitterX } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import FeedCards from "@/Components/FeedCards";
import { SlOptions } from "react-icons/sl";


interface TwitterSideButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSideButton[] = [
  {
    title: 'Home',
    icon: <BiHomeCircle />
  },
  {
    title: 'Explore',
    icon: <BiHash />
  },
  {
    title: 'Notifications',
    icon: <BsBell />
  },
  {
    title: 'Messages',
    icon: <BsEnvelope />
  },
  {
    title: 'Bookmarks',
    icon: <BsBookmark />
  },
  {
    title: 'Profile',
    icon: <BiUser />
  },
  {
    title: 'More',
    icon: <SlOptions />
  }
];

export default function Home() {
  return (
    <div className="flex h-screen w-screen">
      <div className="grid grid-cols-12  h-screen px-40 ">
        <div className="col-span-3 justify-start pt-2">
          <div className="text-2xl hover:bg-slate-900 rounded-full p-4 h-fit w-fit cursor-pointer transition-all">
            <BsTwitterX />
          </div>
          <div className="mt-8 text-2xl pr-4">
            <ul>
              {sidebarMenuItems.map(item => (
                <li className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit cursor-pointer" key={item.title}>
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-light hover:font-normal">{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="px-3 mt-4">
              <button className="bg-[#1d9bf0] p-4 font-semibold rounded-full w-full">Post</button>
            </div>
          </div>
        </div>
        <div className="col-span-5 h-screen w-screen overflow-auto">
          <div className="h-screen w-screen">
            <FeedCards />
            <FeedCards />
            <FeedCards />
            <FeedCards />
            <FeedCards />
            <FeedCards />
            <FeedCards />
            <FeedCards />
          </div>
        </div>
        <div className="col-span-4 h-full">herer</div>
      </div>
    </div>
  );
}