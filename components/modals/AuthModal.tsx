'use client';

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect, useState } from "react";
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import { FcGoogle } from 'react-icons/fc';
import { FaSpotify } from 'react-icons/fa6'
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

enum PAGE {
    LOGIN = 0,
    SIGNUP = 1
}

const AuthModal = () => {
    const supabase = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();
    
    const [page, setPage] = useState<PAGE>(PAGE.LOGIN);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            password: '',
            signUpUsername: '',
            signUpPassword: '',
            signUpRePassword: ''
        }
    });

    const username = watch('username');
    const password = watch('password');
    const signUpUsername = watch('signUpUsername');
    const signUpPassword = watch('signUpPassword');
    const signUpRePassword = watch('signUpRePassword')

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        }).finally(() => setIsLoading(false));

        if (error) return toast.error('Something went wrong.');
        if (data) return toast.success('Successfully logged in.');
        reset();
    };

    const onLogin = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        }).finally(() => setIsLoading(false));

        if (error) return toast.error('Something went wrong.');
        if (data) return toast.success('Successfully logged in.');
        reset();
    };

    const onSignUp = async () => {
        if (signUpPassword!==signUpRePassword) return toast.error("Passwords don't match");

        setIsLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email: signUpUsername,
            password: signUpPassword
        }).finally(() => setIsLoading(false));

        if (error) return toast.error('Something went wrong.');
        if (data) toast.success('Check email for confirmation');
        setPage(PAGE.LOGIN);
        reset();
    };

    let content = (<div />);
    let pageDescription = "";
    let pageTitle = "";
    if (page===PAGE.LOGIN) {
        pageTitle = "Welcome back";
        pageDescription = "Login to your account";
        content = (
            <div className="flex flex-col w-full h-full gap-y-5">
                <div className="flex flex-col justify-center w-full h-full gap-y-5">
                    {/* EMAIL & PASSWORD LOGIN */}
                    <div className="flex flex-col items-center w-full h-full justify-between gap-y-5">
                        {/* EMAIL INPUT */}
                        <div className="flex flex-col gap-y-1 items-start justify-center w-full">
                            <div className="text-lg">Email address</div>
                            <Input id="username" {...register('username', { required: false })} value={username || ""} 
                            placeholder="Enter an email address" disabled={isLoading} />
                        </div>
                        {/* PASSWORD INPUT */}
                        <div className="flex flex-col gap-y-1 items-start justify-center w-full">
                            <div className="text-lg">Password</div>
                            <Input id="password" type="password" {...register('password', { required: false })} value={password || ""} 
                            placeholder="Enter a password" disabled={isLoading} />
                        </div>
                        {/* SUBMIT BUTTON */}
                        <Button className="w-full text-xl px-8 py-4 border-orange border bg-black hover:bg-white hover:text-black
                        hover:rounded-se-xl hover:rounded-bl-xl text-white duration-300" onClick={handleSubmit(onLogin)}>
                            Login
                        </Button>
                    </div>
                    <hr  />
                    {/* SOCIAL LOGIN */}
                        <div onClick={handleGoogleLogin} className="flex justify-center items-center w-full h-full border border-black hover:bg-black
                        cursor-pointer duration-300 hover:rounded-se-xl hover:rounded-bl-xl py-5 md:py-4">
                            <FcGoogle size={30} />
                        </div>
                </div>
                {/* FOOTER */}
                <div className="flex items-center justify-center">
                    <div onClick={() => setPage(PAGE.SIGNUP)} className="hover:underline cursor-pointer text-grey text-sm w-fit">
                        Don't have an account? Sign up here.
                    </div>
                </div>
            </div>
        );
    } else {
        pageTitle = "Welcome";
        pageDescription = "Sign up for an account"
        content = (
            <div className="flex flex-col w-full h-full gap-y-5">
                <div className="flex flex-col justify-center md:flex-row w-full h-full md:gap-x-10 gap-y-10">
                    {/* EMAIL & PASSWORD LOGIN */}
                    <div className="flex flex-col items-center w-full h-full justify-evenly gap-y-5">
                        {/* EMAIL INPUT */}
                        <div className="flex flex-col gap-y-1 items-start justify-center w-full">
                            <div className="text-lg">Email address</div>
                            <Input id="signUpUsername" {...register('signUpUsername', { required: false })} value={signUpUsername || ""} 
                            placeholder="Enter an email address" disabled={isLoading} />
                        </div>
                        {/* PASSWORD INPUT */}
                        <div className="flex flex-col gap-y-1 items-start justify-center w-full">
                            <div className="text-lg">Password</div>
                            <Input id="signUpPassword" type="password" {...register('signUpPassword', { required: false })} value={signUpPassword || ""} 
                            placeholder="Enter a password" disabled={isLoading} />
                        </div>
                        {/* PASSWORD RE-ENTRY */}
                        <div className="flex flex-col gap-y-1 items-start justify-center w-full">
                            <div className="text-lg">Re-enter password</div>
                            <Input id="signUpRePassword" type="password" {...register('signUpRePassword', { required: false })} value={signUpRePassword || ""} 
                            placeholder="Enter a password" disabled={isLoading} />
                        </div>
                        {/* SUBMIT BUTTON */}
                        <Button disabled={isLoading} className="w-full text-xl px-8 py-4 border-black border bg-black hover:bg-white hover:text-black
                        hover:rounded-se-xl hover:rounded-bl-xl text-white duration-300" onClick={handleSubmit(onSignUp)}>
                            Sign up
                        </Button>
                    </div>
                </div>
                {/* FOOTER */}
                <div className="flex items-center justify-center">
                    <div onClick={() => setPage(PAGE.LOGIN)} className="hover:underline cursor-pointer text-grey text-sm w-fit">
                        Already have an account? Login here.
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <Modal title={pageTitle} description={pageDescription} isOpen={isOpen} onChange={onChange}>
            {/* Main auth container */}
            {content}
        </Modal>
    );
}

export default AuthModal;