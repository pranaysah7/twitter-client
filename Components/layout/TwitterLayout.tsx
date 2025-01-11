import { graphQLClient } from "@/clients/api";

import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { BiHomeCircle, BiHash, BiUser, BiImage } from "react-icons/bi";
import { BsBell, BsEnvelope, BsBookmark, BsTwitterX } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";

import Image from "next/image";
import Link from "next/link";
interface TwitterLayoutProps {
    children: React.ReactNode
}
interface TwitterSideButton {
    title: string;
    icon: React.ReactNode;
    link: string
}


const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
    const { user } = useCurrentUser();
    const sidebarMenuItems: TwitterSideButton[] = useMemo(()=>[
        {
            title: 'Home',
            icon: <BiHomeCircle />,
            link : "/"
        },
        {
            title: 'Explore',
            icon: <BiHash />,
            link : "/"
        },
        {
            title: 'Notifications',
            icon: <BsBell />,
            link : "/"
        },
        {
            title: 'Messages',
            icon: <BsEnvelope />,
            link : "/"
        },
        {
            title: 'Bookmarks',
            icon: <BsBookmark />,
            link : "/"
        },
        {
            title: 'Profile',
            icon: <BiUser />,
            link : `/${user?.id}`
        },
        {
            title: 'More',
            icon: <SlOptions />,
            link : "/"
        }
    ],[]);
    const queryClient = useQueryClient();
    const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
        const googleToken = cred.credential;
        if (!googleToken)
            return toast.error('Google token not found ')
        const { verifyGoogleToken } = await graphQLClient.request(verifyUserGoogleTokenQuery, { token: googleToken });
        toast.success("Verified Success")
        console.log(verifyGoogleToken)
        if (verifyGoogleToken) {
            window.localStorage.setItem("__twitter_token", verifyGoogleToken);

            await queryClient.invalidateQueries(['current-user']);
        }
    }, [queryClient]);

    return (
    <div>
        <div className="grid grid-cols-12  h-screen sm:px-40 ">
            <div className="col-span-1 sm:col-span-3 sm:justify-end pt-1 relative flex pr-4">
              <div>
              <div className="text-2xl hover:bg-slate-900 rounded-full p-4 h-fit w-fit cursor-pointer transition-all">
                    <BsTwitterX />
                </div>
                <div className="mt-8 text-2xl pr-4">
                    <ul>
                        {sidebarMenuItems.map(item => (
                            <li  key={item.title}>
                            <Link href={item.link} className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit cursor-pointer transition-all">

                                <span className="text-2xl">{item.icon}</span>
                                <span className="font-light hidden sm:inline">{item.title}</span>
                            </Link>
                            </li>

                        ))}
                    </ul>
                    <div className="px-3 mt-4">
                        <button className="bg-[#1d9bf0] p-4 font-semibold rounded-full w-full">Post</button>
                    </div>
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
                                className="rounded-full" />
                        }
                        <div className="hidden sm:block">
                            <h3 className="text-1xl">{user.firstName}</h3>
                            <h3 className="text-1xl">{user.lastName}</h3>

                        </div>

                    </div>)}
            </div>
            <div className="col-span-11 sm:col-span-5 h-screen w-screen overflow-auto">
                {props.children}
            </div>
            <div className="col-span-0 sm:col-span-4 h-full w-fit">
                {!user && <div className="border p-5 bg-slate-700 rounded-lg cursor-pointer transition-all">
                    <h1>New to Twitter?</h1>
                    <GoogleLogin onSuccess={handleLoginWithGoogle}></GoogleLogin>
                </div>
                }
            </div>
        </div>
    </div>
    )
}
export default TwitterLayout;