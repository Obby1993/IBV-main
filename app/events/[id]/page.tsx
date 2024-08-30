"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Event } from '../../types';
import CardShow from '../../components/eventPart/cardShow/CardShowEvent';
import Btns from '../../components/eventPart/cardShow/btns/Btns';
import Modal from '../../components/modal/Modal';
import { useModal } from '@/app/hooks/ModalLogic';
import { useLoading } from '@/app/hooks/useLoading';
import style from '../indexEvent.module.css';

interface EventPageProps {
  params: {
    id: string;
  };
}

async function fetchEvent(id: string): Promise<Event> {
  const res = await fetch(`/api/events/${id}`);
  if (!res.ok) {
    console.error('Failed to fetch event:', res.statusText);
    throw new Error('Failed to fetch event data');
  }
  return res.json();
}

export default function EventPage({ params }: EventPageProps) {
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [event, setEvent] = useState<Event | null>(null);
  const { modalIsOpen, success, openModal, closeModal, handleSuccess, handleCancel } = useModal();
  const { data: session } = useSession();

  useEffect(() => {
    const loadEvent = async () => {
      startLoading();
      try {
        const eventData = await fetchEvent(params.id);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to fetch event data');
      } finally {
        stopLoading();
      }
    };

    loadEvent();
  }, [params.id]);

  const handleDeleteEvent = async () => {
    startLoading();
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(`/api/events/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccessMessage('Event deleted successfully');
        router.push(`/events`);
      } else {
        setError('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event');
    } finally {
      stopLoading();
    }
  };

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
    <div className={style.contener}>
      <CardShow eventData={event} />
      {session ? (
        <Btns
          eventId={params.id}
          isLoading={isLoading}
          error={error || ''}  // Assurez-vous que error est une chaîne
          successMessage={successMessage || ''}  // Assurez-vous que successMessage est une chaîne
          onDelete={handleDeleteEvent}
        />
      ) : null}
      <Modal isOpen={modalIsOpen} onClose={closeModal} eventData={event} success={success} />
    </div>
  );
}
