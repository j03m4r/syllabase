import { create } from "zustand";

interface UpdateProfileModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useUpdateProfileModal = create<UpdateProfileModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useUpdateProfileModal;