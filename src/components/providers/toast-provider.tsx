import { Fragment, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type ToastProviderProps = {
  children: ReactNode;
};

const ToastProvider = ({ children }: ToastProviderProps) => (
  <Fragment>
    <Toaster />
    {children}
  </Fragment>
);

export default ToastProvider;
