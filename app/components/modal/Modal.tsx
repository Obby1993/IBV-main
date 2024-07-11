// components/ModalComponent.tsx
import React from 'react';
import Modal from 'react-modal';
import  {Event} from "../../types";
import  StyledLink from "../StyledLink";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: Event | null;
  success: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, eventData, success}) => {
  if (!eventData) {
    return null; // Retourner null ou un message de chargement si eventData est null
  }

  return (
    <Modal className="" isOpen={isOpen} onRequestClose={onClose}>
      <div className='text-center'>
        <img className='m-auto' src="/images/logo_ibv.png" alt="logo"/>
        {success ? (
          <>
            <h1 className='titre'>Paiement réussi !</h1>
            <p>Votre paiement a été traité avec succès.</p>
            <br></br>
            <h2 className='titreCard'>Vous êtes bien inscrit à {eventData.name}.</h2>
            <p>Nous vous attendrons le {new Date(eventData.dateStart).toLocaleDateString()} à {eventData.location?.city}.</p>
          </>
        ) : (
          <>
            <h1  className='titre'>Paiement annulé !</h1>
            <p>Votre paiement a été annulé.</p>
            <p className='titreCard'>Vous n'êtes pas inscrit à l'événement.</p>
          </>
        )}
        <br></br>
        <p>A bientôt !</p>
        <button className='btn btn-outline btn-warning font-emoji mr-6 mt-10' onClick={onClose}>Fermer</button>
      </div>
    </Modal>
  );
};

export default ModalComponent;
