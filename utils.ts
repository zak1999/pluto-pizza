import toast, { Toaster } from "react-hot-toast";

export const notify = (msg: string, pos: boolean = true) => {
  if (pos) return toast.success(msg);
  else return toast(msg);
};
