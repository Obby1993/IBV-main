import React, { useState, useEffect } from 'react';
import PlayerTable from './playerTable/PlayerTable'; // Assurez-vous que le chemin est correct
import { Player as PlayerType } from '../../../../types';

type Props = {
  initialPlayers: PlayerType[];
};

const PlayerList: React.FC<Props> = ({ initialPlayers }) => {
  const [players, setPlayers] = useState<PlayerType[]>(initialPlayers || []);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]); // État pour gérer les joueurs sélectionnés

  useEffect(() => {
    console.log("player playerList :", initialPlayers);
    setPlayers(initialPlayers || []);
  }, [initialPlayers]);

  const handleSelectPlayer = (playerId: string) => {
    setSelectedPlayers(prevSelected => {
      if (prevSelected.includes(playerId)) {
        return prevSelected.filter(id => id !== playerId);
      } else {
        return [...prevSelected, playerId];
      }
    });
  };

  const clearSelection = () => {
    setSelectedPlayers([]);
  };

  const handleDeleteSelectedPlayers = async () => {
    try {
      const response = await fetch(`/api/players`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedPlayers }),
      });

      if (response.ok) {
        alert('Players deleted successfully');
        // Mise à jour de l'état local après suppression
        setPlayers(prevPlayers => prevPlayers.filter(player => !selectedPlayers.includes(player.id)));
        clearSelection(); // Réinitialisation des sélections après suppression
      } else {
        alert('Failed to delete players');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while deleting the players');
    }
  };

  const femaleGenres = ["Femme", "Female", "Féminin", "femme", "female", "féminin"];
  const maleGenres = ["Male", "Homme", "Masculin", "male", "homme", "masculin"];

  return (
    <div className="mt-20">
      <h2 className="titre mb-10">Liste des Joueurs:</h2>

      <h3>Féminin</h3>
      <PlayerTable players={players} genre={femaleGenres} onSelect={handleSelectPlayer} selectedPlayers={selectedPlayers} />

      <h3>Masculin</h3>
      <PlayerTable players={players} genre={maleGenres} onSelect={handleSelectPlayer} selectedPlayers={selectedPlayers} />

      {selectedPlayers.length > 0 && (
        <button
          onClick={handleDeleteSelectedPlayers}
          className="btn btn-danger mt-5"
        >
          Supprimer les joueurs sélectionnés
        </button>
      )}
    </div>
  );
};

export default PlayerList;
