import React from 'react';
import Link from 'next/link';

type BtnsProps = {
  eventId: string;
  isLoading: boolean;
  error: string;
  successMessage: string;
  onDelete: () => void;
};

const Btns: React.FC<BtnsProps> = ({ eventId, isLoading, error, successMessage, onDelete }) => {
  return (
    <div className="flex justify-evenly ">
      {isLoading && <p>Suppression en cours...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <button
        onClick={onDelete}
        className="btn btn-outline btn-warning font-emoji m-10 text-xl"
        disabled={isLoading}
      >
        Supprimer l'événement
      </button>
      <Link href={`/events/update/${eventId}`} className="btn btn-outline btn-warning font-emoji m-10 text-xl">
        Modifier l'événement
      </Link>
    </div>
  );
};

export default Btns;
