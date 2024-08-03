import React from 'react'
import  {Player} from "../../../../types";
type Props = {
  players : Player[]
}


const filtrePlayers = (players:Player[], genres: string[] ): Player[] => {
  // Compte le nombre de joueurs du genre spécifié
  const playersArray = Object.values(players);
  const playersSelect = playersArray.filter(player => genres.includes(player.genre));
  const playersSelectSort = playersSelect.sort((a, b) => (b.paiement === true ? 1 : 0) - (a.paiement === true ? 1 : 0));
  return playersSelectSort
}
export default function page({players}: Props) {
  const female = ["Femme","Female", "Féminin","femme","female", "féminin"]
  const male = ["Male", "Homme", "Masculin", "male", "homme", "masculin"]
  const playersFemale = filtrePlayers(players,  female )
  
  const playersMale = filtrePlayers(players,  male )
  
  return (
    <div className='mt-20'>
      <h2 className='titre mb-10'>Liste des Joueurs:</h2>
     
         <div >
          <h3>Féminin</h3>
          <div className="overflow-x-auto mb-20">
            <table className="table">
            {/* head */}
              <thead >
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Niveau</th>
                  <th>Payé</th>
                </tr>
              </thead>
              <tbody>
                {playersFemale.map((player, index) => (

                  <tr key={player.id} className={` ${player.paiement ? 'bg-green-500' : 'bg-red-100'}`}>
                    <th>{index + 1}</th>
                      <td>{player.name}</td>
                      <td>{player.niveau}</td>
                      <td>{player.paiement === true ? "Validé": "En attente"} </td>
                      {/* <td>{player.dateInscription}</td> Assurez-vous que cette propriété existe */}
                    </tr>
                ))}
              </tbody>
            </table>
        </div>

        <h3>Masculin</h3>
        <div className="overflow-x-auto">
            <table className="table">
            {/* head */}
              <thead >
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Niveau</th>
                  <th>Payé</th>
                </tr>
              </thead>
              <tbody>
                {playersMale.map((player, index) => (

                  <tr key={player.id} className={` ${player.paiement ? 'bg-green-200' : 'bg-red-100'}`}>
                    <th>{index + 1}</th>
                      <td>{player.name}</td>
                      <td>{player.niveau}</td>
                      <td>{player.paiement === true ? "Validé": "En attente"} </td>
                    </tr>
                ))}
              </tbody>
            </table>
        </div>
    </div>
    </div>
  )
}
