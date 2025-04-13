import { Modal } from "@/components/modal-provider";

export type CallbackConfig = {
  data?: any;
  error?: any;
  navigate: (path: string) => void;
  openModal: (config: Modal) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
};
