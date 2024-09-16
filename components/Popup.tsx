import { PropsWithChildren, useRef, useEffect, useState } from "react";
import "@/styles/popup.css";

type Props = {
  open: boolean;
  onClose: () => void;
} & PropsWithChildren;

export const Popup = ({ open, onClose, children }: Props) => {
  const [visible, setVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setVisible(true);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      ref={popupRef}
      className={`w-full max-h-52 rounded-xl bg-blue-950 absolute top-10 overflow-y-auto ${
        open ? "animate-open" : "animate-close"
      }`}
      onAnimationEnd={(e) => {
        switch (e.animationName) {
          case "closeAnimation":
            setVisible(false);
            onClose();
            break;
          case "openAnimation":
            setVisible(true);
            break;
        }
      }}
    >
      {children}
    </div>
  );
};
