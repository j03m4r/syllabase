import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadAvatar = (avatar: string) => {
    const supabaseClient = useSupabaseClient();

    if (!avatar) {
        return '';
    }

    if (avatar.indexOf('avatar')!==0) return avatar;

    const { data: imageData } = supabaseClient.storage.from('images').getPublicUrl(avatar);

    return imageData.publicUrl;
};

export default useLoadAvatar;