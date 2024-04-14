import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

const FeedCard: React.FC = () => {
  return (
    <div className="border border-l-0 border-r-0 border-b-0 border-gray-900 p-3 hover:bg-slate-900 hover:cursor-pointer transition-all hover:font-light max-w-[500px] rounded-lg">
      <div className="grid grid-cols-12">
        <div className="col-span-1 rounded-full">
          <Image
            src="https://th.bing.com/th/id/OIP.P2InJfTr799BCoqoebZCegHaHa?w=206&h=206&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Profile"
            height={50}
            width={50}
            className="rounded-full object-cover"
          />
        </div>
        <div className="col-span-11 pl-4 hover:font-light">
          <h1 className="font-semibold">Pranay Sah</h1>
          <p>
            Texas, constituent state of the United States of America. It became
            the 28th state of the union in 1845. Texas occupies the
            south-central segment of the country and is the largest state in
            area except for Alaska. The state extends nearly 1,000 miles (1,600
            km) from north to south and about the same distance from east to
            west.
          </p>
          <div className="flex justify-between mt-2 text-xl items-center">
            <div className="hover:bg-slate-800 rounded-full h-auto w-auto transition-all p-2">
              <BiMessageRounded />
            </div>
            <div className="hover:bg-slate-800 rounded-full h-auto w-auto transition-all p-2">
              <FaRetweet />
            </div>
            <div className="hover:bg-slate-800 rounded-full h-auto w-auto transition-all p-2">
              <AiOutlineHeart />
            </div>
            <div className="hover:bg-slate-800 rounded-full h-auto w-auto transition-all p-2">
              <BiUpload />
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
