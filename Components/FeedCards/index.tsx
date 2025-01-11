import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps{
  data:Tweet
}
const FeedCard: React.FC<FeedCardProps> = (props) => {
  const {data}=props
  return (
    <div className="border border-l-0 border-r-0 border-b-0 border-gray-900 p-3 hover:bg-slate-900 hover:cursor-pointer transition-all hover:font-light max-w-[500px] rounded-lg">
      <div className="grid grid-cols-12">
        <div className="col-span-1 rounded-full">
          {data.author?.profileImageURL &&
          <Image
            src={data.author?.profileImageURL}
            alt="Profile"
            height={50}
            width={50}
            className="rounded-full object-cover"
          />}
        </div>
        <div className="col-span-11 pl-4 hover:font-light">
          <Link href={`/${data.author?.id}`}>
          <h1 className="font-semibold">{data.author?.firstName} {data.author?.lastName}</h1>

          </Link>
          <p>
            {data.content}
            {data.imageUrl && <Image src={data.imageUrl} alt="image" width={400} height={400} />}
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
