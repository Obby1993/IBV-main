"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {}

export default function Page({}: Props) {
  const [name, setName] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [location, setLocation] = useState({ street: '', city: '', state: '', zip: '' });
  const [description, setDescription] = useState('');
  const [numberPlaceMen, setNumberPlaceMen] = useState(0);
  const [numberPlaceWomen, setNumberPlaceWomen] = useState(0);
  const [autre, setAutre] = useState('');
  const [players, setPlayers] = useState('');
  const [imageUrl, setImg] = useState('');
  const [price, setPrice] = useState(0);
  const router = useRouter()

  const handleLocationChange = (field: keyof typeof location, value: string) => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      [field]: value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setImg(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };


  const addEvent = async () => {
    try {
      const response = await fetch('/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          dateStart,
          dateEnd,
          location,
          description,
          numberPlaceMen,
          numberPlaceWomen,
          autre,
          imageUrl,
          price,
          players: players ? JSON.parse(players) : [],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newEvent = await response.json();
      console.log('New event created:', newEvent);
      router.push(`/events`);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div>
      <h2 className='titre'>Nouvel Evénement</h2>
      <div className='flex flex-col items-center'>
        <label htmlFor="text" className="block textBlue">Nom de l'événement:</label>
        <input type="text" placeholder="Name" className="input input-bordered input-info w-full max-w-xs mb-4 text-left" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="text" className="block textBlue">Date du début:</label>
        <input type="date" placeholder="Start Date" className="input input-bordered input-info w-full max-w-xs mb-4" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />

        <label htmlFor="text" className="block textBlue">Date de fin:</label>
        <input type="date" placeholder="End Date" className="input input-bordered input-info w-full max-w-xs mb-4" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />

        <label htmlFor="text" className="block textBlue">Lieu:</label>
        <input type="text" placeholder="Street" className="input input-bordered input-info w-full max-w-xs m-4" value={location.street} onChange={(e) => handleLocationChange('street', e.target.value)} />
        <input type="text" placeholder="City" className="input input-bordered input-info w-full max-w-xs m-4" value={location.city} onChange={(e) => handleLocationChange('city', e.target.value)} />
        <input type="text" placeholder="State" className="input input-bordered input-info w-full max-w-xs m-4" value={location.state} onChange={(e) => handleLocationChange('state', e.target.value)} />
        <input type="text" placeholder="Zip" className="input input-bordered input-info w-full max-w-xs m-4" value={location.zip} onChange={(e) => handleLocationChange('zip', e.target.value)} />

        <label htmlFor="text" className="block textBlue">Description:</label>
        <textarea className="textarea textarea-info mb-4" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="number" className="block textBlue">Nombre de joueurs masculins:</label>
        <input type="number" placeholder="Number of Places for Men" className="input input-bordered input-info w-full max-w-xs mb-4" value={numberPlaceMen} onChange={(e) => setNumberPlaceMen(parseInt(e.target.value))} />
        <label htmlFor="number" className="block textBlue">Nombre de joueurs féminins:</label>
        <input type="number" placeholder="Number of Places for Women" className="input input-bordered input-info w-full max-w-xs mb-4" value={numberPlaceWomen} onChange={(e) => setNumberPlaceWomen(parseInt(e.target.value))} />

        <label htmlFor="text" className="block textBlue">Prix/joueur:</label>
        <input type="number" placeholder="Prix" className="input input-bordered input-info w-full max-w-xs mb-4" value={price} onChange={(e) => setPrice(parseInt(e.target.value))}/>

        <textarea placeholder="Autre" className="textarea textarea-info" value={autre} onChange={(e) => setAutre(e.target.value)} />
        <textarea placeholder="Players (JSON format)" value={players} onChange={(e) => setPlayers(e.target.value)} />

        <label htmlFor="file" className="block textBlue">Importer une image:</label>
        <input type="file" accept="image/*" className="file-input w-full max-w-xs" onChange={handleImageChange} />
        {imageUrl && <img src={imageUrl} alt="Event" className="w-32 h-32 mt-2" />} {/* Afficher l'aperçu de l'image si elle est disponible */}

        <button className="btn btn-outline btn-warning font-emoji mr-6" onClick={addEvent}>Ajouter événement</button>
      </div>
    </div>
  );
}
