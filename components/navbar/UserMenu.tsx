'use client'

import Avatar from '../general/Avatar';
import { useCallback, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import useLoadAvatar from '@/hooks/useLoadAvatar';
import MenuItem from './MenuItem';
import useUpdateProfileModal from '@/hooks/useUpdateProfileModal';
import useUserModal from '@/hooks/useUserModal';

export const revalidate = 0;

const UserMenu = ({}) => {
    const { user, profile } = useUser();
    const avatar_url = useLoadAvatar(profile?.avatar_url || '');

    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    
    const updateProfileModal = useUpdateProfileModal();
    const userModal = useUserModal();

    const toggleOpen = useCallback(() => {
        if (userModal.isOpen) {
            userModal.onClose();
        } else {
            userModal.onOpen();
        }
    }, [userModal.isOpen]);

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        toggleOpen();
        router.refresh();
    
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Successfully logged out')
        }
    };

    return (
        <div className="relative text-forestGreen">
            {user ? (
                <div onClick={toggleOpen} className='px-4 py-2 rounded-full shadow-sm hover:shadow-lg cursor-pointer transition duration-300'>
                    <Avatar src={avatar_url} />
                </div>
            ) : null}
            {userModal.isOpen && (
                <div className='absolute w-[60vw] md:w-[30vw] lg:w-[26vw] xl:w-[19vw] bg-white border border-black
                overflow-hidden right-0 top-12 text-sm'>
                    <div className='select-none flex flex-col cursor-pointer'>
                        <>
                        <div className="lg:hidden">
                            <MenuItem onClick={() => { toggleOpen(), router.push('/dashboard') }} label='Dashboard'/>
                        </div>
                        <MenuItem onClick={() => { toggleOpen(), router.push(`/profile/${profile?.username}`) }} label='Profile'/>
                        <MenuItem onClick={() => { toggleOpen(), updateProfileModal.onOpen() }} label='Update Profile'/>
                        <hr />
                        <MenuItem onClick={handleLogout} label='Logout'/>
                        </>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;