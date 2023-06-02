import React from "react";
import { useModal } from "hooks/useModal";
import { ModalCreateEvent, ModalDayInfo, ModalEditEvent } from "components/Modal";

interface IModalPros {
  children: React.ReactNode
}

export const ModalProvider: React.FC<IModalPros> = ({ children }) => {
  const {
    isOpenModalCreateEvent,
    isOpenModalEditEvent,
    isOpenModalDayInfoEvents,
    selectedDate,
    modalEditEventOptions,
    modalCreateEventOptions
  } = useModal();

  return (
    <>
      {isOpenModalCreateEvent && (
        <ModalCreateEvent {...modalCreateEventOptions!} />
      )}
      {isOpenModalEditEvent && (
        <ModalEditEvent {...modalEditEventOptions!} />
      )}
      {isOpenModalDayInfoEvents && (
        <ModalDayInfo selectedDate={selectedDate!} />
      )}
      {children}
    </>
  );
};
