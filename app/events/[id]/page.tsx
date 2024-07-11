"use client"
import { Event } from "../../types";
import CardShow from "../../components/eventPart/cardShow/CardShowEvent";
import { useState, useEffect } from 'react';
import style from "../indexEvent.module.css";
import { useRouter } from 'next/navigation';
import Modal from '../../components/modal/Modal'; // Assurez-vous d'ajuster le chemin selon votre structure de fichiers
import Link from 'next/link';
import { useSession } from "next-auth/react";


interface EventPageProps {
  params: {
    id: string;
  };
}




//Récupération des données de l'événement
async function fetchEvent(id: string): Promise<Event> {
  const res = await fetch(`http://localhost:3000/api/events/${id}`);
  console.log(id);

  if (!res.ok) {
    console.error('Failed to fetch event:', res.statusText);
    throw new Error('Failed to fetch event data');
  }

  const data = await res.json();
  console.log('Event data:', data);
  return data;
}











export default function EventPage({ params }: EventPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [event, setEvent] = useState<Event | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [success, setSuccess] = useState(false)
  const { data: session } = useSession()
  useEffect(() => {
    // Charger l'événement lors du montage du composant
    const loadEvent = async () => {
      setIsLoading(true);
      setError("");
      setSuccessMessage("");

      try {
        const eventData = await fetchEvent(params.id);
        setEvent(eventData); // Mettre à jour l'état avec les données de l'événement
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to fetch event data');
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent(); // Appeler la fonction de chargement de l'événement
  }, [params.id]);




  const handleDeleteEvent = async () => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    const event = await fetchEvent(params.id);
    if (!event) {
      return <div>Loading...</div>;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/events/${event.id}`,
      {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log('Deleted event:', data);
      setSuccessMessage('Event deleted successfully');

      // Redirect to the events page after successful deletion
      router.push('http://localhost:3000/events');
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event');
    } finally {
      setIsLoading(false);
    }

  };

  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('success')) {
        setSuccess(true)
        setModalIsOpen(true);
      }else if (params.get('cancel')){
        setSuccess(false)
        setModalIsOpen(true);
      }
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
    // supprimer le paramètre "success" de l'URL après la fermeture de la modal
    const url = `/events/${params.id}`;
    router.replace(url);
  };


  //faire patienter
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>No event data available</div>;
  }





    return (
  <   div className={style.contener }  >
        <CardShow eventData={event}/>
        {session ?(
          <div className="flex justify-evenly ">
            {isLoading && <p>Suppression en cours...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <button
              onClick={handleDeleteEvent} className="btn btn-outline btn-warning font-emoji m-10 text-xl" disabled={isLoading}> Supprimer l'événement
            </button>
            <Link href={`/events/update/${event.id}`} className="btn btn-outline btn-warning font-emoji m-10 text-xl">Modifier l'événement</Link>
          </div>
        ):null}

        <Modal isOpen={modalIsOpen} onClose={closeModal} eventData={event} success={success} />
      </div>



      )
}
