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
interface ServerProps{
    userInfo?:User
}
const UserProfilePage:NextPage<ServerProps>=(props)=>{
    const {user}=useCurrentUser();
    const router=useRouter();
    // console.log(props)
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
                    {props.userInfo?.firstName}{props.userInfo?.lastName} 
                            </h1>
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