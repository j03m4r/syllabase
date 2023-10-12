'use client';

import { MyUserContextProvier } from "@/hooks/useUser";

interface UserProviderProps {
    children: React.ReactNode;
};

const UserProvider: React.FC<UserProviderProps> = ({
    children
}) => {
    return (
        <MyUserContextProvier>
            {children}
        </MyUserContextProvier>
    )
};

export default UserProvider;