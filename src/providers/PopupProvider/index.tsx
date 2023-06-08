import React from "react";

import { usePopup } from "hooks/usePopup";
import Popup from "components/Popup";

interface IPopupPros {
  children: React.ReactNode;
}

export const PopupProvider: React.FC<IPopupPros> = ({ children }) => {
  const { popupOptions, isOpenPopup } = usePopup();

  return (
    <>
      {isOpenPopup && <Popup {...popupOptions!} />}
      {children}
    </>
  );
};
