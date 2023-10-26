import { create } from "zustand";

interface SyllabusUploadModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useSyllabusUploadModal = create<SyllabusUploadModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSyllabusUploadModal;