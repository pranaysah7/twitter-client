import TwitterLayout from "@/Components/layout/TwitterLayout";
import { useCurrentUser } from "@/hooks/user";
import { GetServerSideProps, NextPage } from "next";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import FeedCard from "@/Components/FeedCards";
import { Tweet, User } from "@/gql/graphql";
import { useRouter } from "next/router";
import { graphQLClient } from "@/clients/api";
import { getUserById } from "@/graphql/query/user";
import { useCallback, useMemo } from "react";
import { followUserMutation, unFollowUserMutation } from "@/graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";
interface ServerProps{
    userInfo?:User
}
const UserProfilePage:NextPage<ServerProps>=(props)=>{
    const {user:currentUser}=useCurrentUser();
    const router=useRouter();
    const queryClient=useQueryClient();
    console.log(props)
    const amIFollowing=useMemo(()=>{
        if(!props.userInfo)return false;
        return (currentUser?.following?.findIndex(el=>el?.id=== props?.userInfo?.id) ?? -1)>=0;
    },[currentUser?.following,props.userInfo])
    const handleFollowUser = useCallback(async () => {
        if(!props.userInfo?.id)return;
        await graphQLClient.request(followUserMutation,{to:props.userInfo?.id})
        await queryClient.invalidateQueries(["current-user"]);
    },[props.userInfo?.id,queryClient])
    const handleUnFollowUser = useCallback(async () => {
        if(!props.userInfo?.id)return;
        await graphQLClient.request(unFollowUserMutation,{to:props.userInfo?.id})
        await queryClient.invalidateQueries(["current-user"]);
    },[props.userInfo?.id,queryClient])
    return (
        
        <div>
           
            <TwitterLayout>
                <div>
                    <nav className="flex items-center gap-3 py-3 px-3">
                        <BsArrowLeftShort className="text-4xl"/>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {props.userInfo?.firstName}{props.userInfo?.lastName} 
                            </h1>
                            <h1 className="text-md font-bold text-slate-500">
                                {props.userInfo?.tweets?.length} Tweets
                            </h1>
                        </div>
                    </nav>
                    <div className="p-4 border-b border-slate-800">

                   {props.userInfo?.profileImageURL && <div>
                        <Image className="rounded-full" src={props.userInfo?.profileImageURL} alt="User Image" width={100} height={100}/>
                    </div>}
                    <h1 className="text-2xl font-bold">
                    {props.userInfo?.firstName} {props.userInfo?.lastName} 
                            </h1>
                   <div className="flex justify-between items-center">
                   <div className="flex gap-4 mt-2 text-sm text-gray-400">
                        <span>{props.userInfo?.followers?.length} Followers</span>
                        <span>{props.userInfo?.following?.length} Following</span>
                    </div>
                    <div>

                    {
                        currentUser?.id !== props.userInfo?.id &&(
                            <>
                            {
                                amIFollowing?(
                               <button onClick={handleUnFollowUser}  className="bg-white text-black px-3 py-1 rounded-full text-md">Unfollow</button>
                                ):
                              <button onClick={handleFollowUser} className="bg-white text-black px-3 py-1 rounded-full text-md">Follow</button>
                            }
                            </>
                        )
                    }
                    </div>

                    
                   </div>
                   
                    </div>
                    <div>
                        {
                            props.userInfo?.tweets?.map(tweet=><FeedCard data={tweet as Tweet} key={tweet?.id}/>)
                        }
                    </div>
                </div>
            </TwitterLayout>
        </div>
    )
}
export const getServerSideProps:GetServerSideProps<ServerProps>=async(context)=>{
    const id=context.query.id as string | undefined;
    console.log(id);
    if(!id) return {notFound:true , props:{user:null}}
    const userInfo=await graphQLClient.request(getUserById,{id});
    if(!userInfo?.getUserById)return {notFound:true}
    return {
        props:{
            userInfo:userInfo.getUserById as User,
        },
    };
}
export default UserProfilePage;