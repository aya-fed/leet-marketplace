// Coded by Aya Saito

import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { RiCloseLine } from "react-icons/ri";
import Button from "./ui/Button";

const defaultClassNamesArr = [
  "relative",
  "w-[90vw]",
  "py-[62px]",
  "px-10",
  "md:p-10",
  "border",
  "rounded-[10px]",
  "border-neutral",
  "bg-background-3",
  "max-w-[500px]",
  "max-h-[95vh]",
  "overflow-y-scroll",
  "scrollbar-thin",
  "scrollbar-track-background-2",
  "scrollbar-thumb-background-4",
];
const defaultClasses = defaultClassNamesArr.map(className => className).join(" ");

const Modal = ({ isModalOpen, setIsModalOpen, onClose, title, className, ...props }) => {
  const modalRef = useRef(null); //modal reference

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Stop background scroll
    return () => {
      document.body.style.overflow = "unset"; // Enable background scroll
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) open();
    else close();
  }, [isModalOpen]);

  const open = () => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      {
        opacity: 1,
      }
    );
  };

  function close() {
    gsap.to(modalRef.current, {
      opacity: 0,
    });
    setTimeout(() => {
      onClose && onClose();
      setIsModalOpen(false);
    }, 500);
  }

  const bgHeight = window.innerHeight < document.body.clientHeight ? docu.body.clientHeight : window.innerHeight;
  return (
    <AnimatePresence>
      <div
        ref={modalRef}
        className={`z-[300] bg-black bg-opacity-70 w-[100vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed flex justify-center items-center`}
        style={{ height: bgHeight, opacity: 0 }}
      >
        <div className="flex items-center">
          <div className={twMerge(`${defaultClasses} ${className ?? ""}`)}>
            <h3 className="mb-6">{title}</h3>
            <div className="absolute right-0 top-0 p-1 text-neutral cursor-pointer " onClick={close}>
              <RiCloseLine size={40} />
            </div>
            {props.children ?? (
              <div className="flex gap-[14px]">
                <Button cancel className="w-1/2" onClick={close} />
                <Button className="w-1/2" onClick={close}>
                  OK
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
