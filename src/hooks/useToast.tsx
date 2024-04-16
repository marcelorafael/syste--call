import { toast } from "react-toastify";

export default function useToast() {

    const notifySuccess = (message: string) => {
        toast.success(message)
    }
    const notifyError = (message: string) => {
        toast.error(message)
    }
    const notifyCommom = () => toast('Seja bem-vindo ao sistema!')

    return {
        notifySuccess,
        notifyError,
        notifyCommom,
    }
}