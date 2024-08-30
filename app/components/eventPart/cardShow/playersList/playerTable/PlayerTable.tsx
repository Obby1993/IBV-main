import React from 'react';
import PlayerComponent from './player/Player'; // Assurez-vous que le chemin est correct
import { Player as PlayerType } from '@/app/types';
import { useSession } from 'next-auth/react';
type Props = {
  players: PlayerType[];
  genre: string[];
  onSelect: (id: string) => void;
  selectedPlayers: string[];
};

const PlayerTable: React.FC<Props> = ({ players, genre, onSelect, selectedPlayers }) => {
  const { data: session } = useSession();
  console.log("session table",session);
  
  const filteredPlayers = players.filter(player => genre.includes(player.genre));

  return (
    <div className="overflow-x-auto mb-20">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Niveau</th>
            <th>Payé</th>
            {session ? (
              <th>Supprimer</th> ): null}
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player, index) => (
            <PlayerComponent
              key={player.id}
              player={player}
              onSelect={onSelect}
              selected={selectedPlayers.includes(player.id)}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;
