import Image from "next/image";
import { useCallback, useState } from "react";

import { useCurrentUser } from "@/hooks/user";

import { BiImage } from "react-icons/bi";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import FeedCard from "@/Components/FeedCards";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/Components/layout/TwitterLayout";
import { graphQLClient } from "@/clients/api";
import { getAllTweetsQuery, getSignedUrlTweetQuery } from "@/graphql/query/tweet";
import { GetServerSideProps } from "next";
import axios from "axios";
import toast from "react-hot-toast";

interface HomeProps{
  tweets?:Tweet[];
}

export default function Home(props:HomeProps) {
  const { user } = useCurrentUser();
  const { tweets = props.tweets as Tweet[] } = useGetAllTweets();
  const { mutate } = useCreateTweet();
  const [content, setContent] = useState<string>("");
  const [imageUrl,setImageUrl] = useState<string>("");


  const handleInputChangeFile= useCallback((input:HTMLInputElement)=>{
    return async (event:Event)=>{
      event.preventDefault();
      console.log(input.files)
      const file:File | null | undefined =input.files?.item(0);
      if(!file)return;
      const {getSignedUrlForTweet} = await graphQLClient.request(getSignedUrlTweetQuery,{
        imageName:file.name,
        imageType: file.type
      })
      if(getSignedUrlForTweet){
        toast.loading('Uploading..',{id:'2'})
        await axios.put(getSignedUrlForTweet,file,{
          headers:{
          'Content-Type':file.type
          }
        })
        toast.success('Completed',{id:'2'})
        const url = new URL(getSignedUrlForTweet);
        const myFilePath = `${url.origin}${url.pathname}`
        setImageUrl(myFilePath);
      }
    }
  },[])

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*')
    input.click();
    const handlerFn = handleInputChangeFile(input);
    input.addEventListener("change",handlerFn)
  }, [handleInputChangeFile])
  const handleCreatetweet = useCallback(() => {
    mutate({
      content,
      imageUrl,
    })
    setContent("");
    setImageUrl("");
  }, [content, mutate,imageUrl])

  return (
    <div className="flex h-screen w-screen">
      <TwitterLayout >
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
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-transparent text-xl px-3 border-b border-slate-400"
                placeholder="What's happening?"
              >

              </textarea>
              {imageUrl && <Image src={imageUrl} alt="Image" width={300} height={300}/>}
              <div className="mt-2 flex justify-between">
                <BiImage className="text-xl" onClick={handleSelectImage} />
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
            tweets?.map(tweet => <FeedCard key={tweet?.id} data={tweet as Tweet} />)
          }
        </div>
      </TwitterLayout>
    </div>
  );
}
export const getServerSideProps:GetServerSideProps<HomeProps>=async ()=>{
  const allTweets=await graphQLClient.request(getAllTweetsQuery);
  return {
    props:{
      tweets:allTweets.getAllTweets as Tweet[],
    }
  }
};