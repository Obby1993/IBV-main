import React from 'react';
import { Player } from '@/app/types';
import { useSession } from 'next-auth/react';


type Props = {
  player: Player;
  onSelect: (id: string) => void;
  selected: boolean;
  index: number;
};

const PlayerComponent: React.FC<Props> = ({ player, onSelect, selected, index }) => {
  const { data: session } = useSession();
  console.log("session:", session);
  
  return (
    <tr className={`${player.paiement ? 'bg-green-200' : 'bg-red-100'}`}>
      <th>{index + 1}</th>
      <td>{player.name}</td>
      <td>{player.niveau}</td>
      <td>{player.paiement ? 'Validé' : 'En attente'}</td>
      {session ? (<td>
        <input 
          type="checkbox" 
          checked={selected} 
          onChange={() => onSelect(player.id)} 
        />
      </td>): null}
    </tr>
  );
};

export default PlayerComponent;
