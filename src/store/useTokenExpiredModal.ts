import { create } from "zustand";

type tokenExpiredState = {
  tokenModalState: boolean;
  changeTokenModlaState: () => void;
};
const useTokenExpiredModal = create<tokenExpiredState>((set) => ({
  tokenModalState: false,
  changeTokenModlaState: () => {
    set((state) => ({ tokenModalState: !state }));
  },
}));

export default useTokenExpiredModal;
