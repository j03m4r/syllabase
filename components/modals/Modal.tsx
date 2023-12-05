import * as Dialog from '@radix-ui/react-dialog';
import { Transition } from "@headlessui/react";
import { IoMdClose} from 'react-icons/io';
import { Fragment } from 'react';

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
    isOpen, onChange, title, description, children
}) => {
    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal forceMount>
                <Transition.Root show={isOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className='bg-neutral-800/70 fixed inset-0 z-20' />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Content className='translate duration-300 fixed drop-shadow-md border-0 top-[50%] left-[50%] 
                        w-full lg:w-4/6 xl:w-1/2 h-full lg:h-fit translate-x-[-50%] translate-y-[-50%]
                        rounded-xl bg-offWhite p-6 focus:outline-none z-30'>
                            <Dialog.Title className='text-3xl text-center font-bold mb-2 text-red'>
                                {title}
                            </Dialog.Title>
                            <Dialog.Description className='mb-5 text-md leading-normal text-center text-grey' >
                                {description}
                            </Dialog.Description>
                            <div className='flex h-5/6'>
                                {children}
                            </div>
                            <Dialog.Close asChild>
                                <button className='p-1 transition hover:opacity-80 absolute top-4 left-4 focus:outline-none text-red'>
                                    <IoMdClose size={28} />
                                </button>
                            </Dialog.Close>
                        </Dialog.Content>
                    </Transition.Child>
                </Transition.Root>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Modal;