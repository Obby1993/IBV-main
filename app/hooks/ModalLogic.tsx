import { useState } from 'react';

export function useModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSuccess = () => {
    setSuccess(true);
    openModal();
  };

  const handleCancel = () => {
    setSuccess(false);
    openModal();
  };

  return {
    modalIsOpen,
    success,
    openModal,
    closeModal,
    handleSuccess,
    handleCancel,
  };
}
