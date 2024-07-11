"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UpdateEventPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [rawPlayerInput, setRawPlayerInput] = useState("");
  const [jsonError, setJsonError] = useState("");

  const [event, setEvent] = useState({
    name: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    location: {
      city: '',
      street: '',
     zip:'',
    state:''},
    numberPlaceMen: '',
    numberPlaceWomen: '',
    autre: '',
    players: [] as any[],
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error('Failed to fetch event');
        const data = await res.json();
        setEvent({...data,
          dateStart: new Date(data.dateStart).toISOString().slice(0, 16),
          dateEnd: new Date(data.dateEnd).toISOString().slice(0, 16),
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvent();
  }, [id]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
      setEvent(prevEvent => ({ ...prevEvent, [name]: value }));
    }


  const handlePlayersChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    const newRawInput = e.target.value;
    setRawPlayerInput(newRawInput);
    try {
      // Tente de convertir le texte en objet JSON
      const parsedInput = JSON.parse(newRawInput);
      setEvent(prev => ({ ...prev, players: parsedInput }));
      setJsonError(""); // Réinitialise les erreurs s'il n'y a pas de problème
    } catch (err) {
      setJsonError("Invalid JSON input"); // Informe l'utilisateur de l'erreur de syntaxe JSON
    }
  };


  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      location: {
        ...prevEvent.location,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...event,
          dateStart: new Date(event.dateStart).toISOString(),
          dateEnd: new Date(event.dateEnd).toISOString(),
        }),
      });

      if (!res.ok) throw new Error('Failed to update event');

      const updatedEvent = await res.json();
      console.log('Updated event:', updatedEvent);

      // Rediriger vers la page de l'événement après la mise à jour
      router.push(`/events/${id}`);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
    <h2 className='titre'>Modifier Evénement: ' {id} '</h2>
    <form onSubmit={handleSubmit} className=' flex flex-col items-center'>
        <label htmlFor="text" className="block textBlue "> Nom de l'événement:</label>
        <input type="text" name="name"placeholder="Name" onChange={handleChange} className="input input-bordered input-info w-full max-w-xs mb-4 text-left" value={event.name} />

        <label htmlFor="text" className="block textBlue "> Date du début:</label>
        <input type="date" name="dateStart" placeholder="Start Date" className="input input-bordered input-info w-full max-w-xs mb-4" value={event.dateStart} onChange={handleChange} />

        <label htmlFor="text" className="block textBlue "> Date de fin:</label>
        <input type="date" name="dateEnd" placeholder="End Date" className="input input-bordered input-info w-full max-w-xs mb-4" value={event.dateEnd} onChange={handleChange} />

        <input type="text" name="street" placeholder="Street" className="input input-bordered input-info w-full max-w-xs m-4" value={event.location.street} onChange={handleLocationChange} />
        <input type="text" name="city" placeholder="City" className="input input-bordered input-info w-full max-w-xs m-4" value={event.location.city} onChange={handleLocationChange} />
        <input type="text" name="state" placeholder="State" className="input input-bordered input-info w-full max-w-xs m-4" value={event.location.state} onChange={handleLocationChange} />
        <input type="text" name="zip" placeholder="Zip" className="input input-bordered input-info w-full max-w-xs m-4" value={event.location.zip} onChange={handleLocationChange} />

        <textarea name="description" className="textarea textarea-info mb-4" placeholder="Description"  value={event.description} onChange={handleChange} />

        <label htmlFor="number" className="block textBlue "> Nombre de joueur masculin:</label>
        <input type="number" name="numberPlaceMen" placeholder="Number of Places for Men" className="input input-bordered input-info w-full max-w-xs mb-4" value={event.numberPlaceMen} onChange={handleChange} />
        <label htmlFor="number"  className="block textBlue "> Nombre de joueur féminin:</label>
        <input type="number" name="numberPlaceWomen" placeholder="Number of Places for Women" className="input input-bordered input-info w-full max-w-xs mb-4" value={event.numberPlaceWomen} onChange={handleChange} />

        <textarea name="autre"placeholder="Autre" className="textarea textarea-info mb-4" value={event.autre} onChange={handleChange} />

        <label htmlFor="players" className="block textBlue">Joueurs (format JSON):</label>
        <textarea id="players" name="players" placeholder="Players (JSON format)" className="textarea textarea-info mb-4" value={rawPlayerInput} onChange={handlePlayersChange} ></textarea>
        {jsonError && <div style={{ color: 'red' }}>{jsonError}</div>}

      <button className="btn btn-outline btn-warning font-emoji mb-6" type="submit">Update Event</button>
    </form>
    </div>
  );
};

export default UpdateEventPage;
