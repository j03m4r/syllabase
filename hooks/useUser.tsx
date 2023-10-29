import { Profile } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    profile: Profile | null;
    isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any;
};

export const MyUserContextProvier = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);

    const getProfile = () => supabase.from('profiles').select('*').eq('id', user?.id).single();

    useEffect(() => {
        if (user && !isLoadingData && !profile) {
            setIsLoadingData(true);

            Promise.allSettled([getProfile()]).then(
                (results) => {
                    const userDetailsPromise = results[0];

                    if (userDetailsPromise.status === "fulfilled") {
                        setProfile(userDetailsPromise.value.data as Profile);
                    }

                    setIsLoadingData(false);
                }
            );
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setProfile(null);
        }
    }, [user, isLoadingUser]);

    const value = {
        accessToken,
        user,
        profile,
        isLoading: isLoadingUser || isLoadingData,
    };

    return <UserContext.Provider value={value} {...props} />
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used wihtin a MyUserContextProvider');
    }

    return context;
};