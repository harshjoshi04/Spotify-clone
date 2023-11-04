import { create } from "zustand";

interface UploadModelProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUploadModel = create<UploadModelProps>()((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: true })),
  onClose: () => set((state) => ({ isOpen: false })),
}));

export default useUploadModel;
