import Image from "next/image";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter, BsTwitterX } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import FeedCards from "@/Components/FeedCards";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { BiImage } from "react-icons/bi";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import FeedCard from "@/Components/FeedCards";
import { Tweet } from "@/gql/graphql";

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
  const {user}=useCurrentUser();
  const {tweets=[]}=useGetAllTweets();
  const {mutate}=useCreateTweet();
  const [content,setContent]=useState<string>("");
  // console.log(user);
  const queryClient=useQueryClient();
  const handleLoginWithGoogle=useCallback(async(cred:CredentialResponse)=>{
    const googleToken = cred.credential;
    if(!googleToken)
      return toast.error('Google token not found ')
    const {verifyGoogleToken}=await graphQLClient.request(verifyUserGoogleTokenQuery,{token:googleToken});
    toast.success("Verified Success")
    console.log(verifyGoogleToken)
    if(verifyGoogleToken){
      window.localStorage.setItem("__twitter_token",verifyGoogleToken);

    await queryClient.invalidateQueries(['current-user']);
    }
  },[queryClient]);
  const handleSelectImage=useCallback(()=>{
    const input = document.createElement('input');
    input.setAttribute('type','file');
    input.setAttribute('accept','image/*')
    input.click();

  },[])
  const handleCreatetweet=useCallback(()=>{
   mutate({
    content
   })
   setContent("");
  },[content,mutate])
  
  return (
    <div className="flex h-screen w-screen">
      <div className="grid grid-cols-12  h-screen px-40 ">
        <div className="col-span-3 justify-start pt-2 relative">
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
          {user && (
            <div className="mt-5 absolute bottom-5 flex gap-2 items-center bg-slate-800 p-3 rounded-full px-3 py-3">
              {
                user && user.profileImageURL &&
                <Image src={user?.profileImageURL}
                 alt="user-image" 
                 height={50} 
                 width={50}
                 className="rounded-full"/>
              }
              <div>
              <h3 className="text-1xl">{user.firstName}</h3>
              <h3 className="text-1xl">{user.lastName}</h3>

              </div>

            </div>)}
        </div>
        <div className="col-span-5 h-screen w-screen overflow-auto">
            <div className="border border-l-0 border-r-0 border-b-0 border-gray-600 p-3 hover:bg-slate-900 hover:cursor-pointer transition-all hover:font-light max-w-[500px] rounded-lg">
                <div className="grid grid-cols-12">
                <div className="col-span-1 rounded-full">
          {user?.profileImageURL && <Image
            src={user.profileImageURL}
            alt="Profile"
            height={50}
            width={50}
            className="rounded-full object-cover"
          />}
        </div>
        <div className="col-span-11">
              <textarea name="Tweet" id="" rows={5} 
              value={content}
              onChange={(e)=>setContent(e.target.value)}
              className="w-full bg-transparent text-xl px-3 border-b border-slate-400"
              placeholder="What's happening?"
              >

              </textarea>
              <div className="mt-2 flex justify-between">
              <BiImage className="text-xl" onClick={handleSelectImage}/>
              <button className="bg-[#1d9bf0] px-4 py-1 font-semibold rounded-full"
              onClick={handleCreatetweet}
              >     
               Post
                </button>
              </div>
        </div>
                </div>
            </div>
          <div className="h-screen w-screen">
            {
              tweets?.map(tweet=><FeedCard key={tweet?.id} data={tweet as Tweet}/>)
            }
          </div>
        </div>
        <div className="col-span-4 h-full w-fit">
          {!user &&<div className="border p-5 bg-slate-700 rounded-lg cursor-pointer transition-all">
            <h1>New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle}></GoogleLogin>
          </div>
        } 
        </div>
      </div>
    </div>
  );
}