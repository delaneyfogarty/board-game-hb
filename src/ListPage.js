import { useState, useEffect } from 'react';
import { getGames } from './services/fetch-utils';
import Game from './Game';

export default function ListPage() {
  // you'll need some state to hold onto the array of games
  const [games, setGames] = useState([]);

  // fetch the games on load and inject them into state
  useEffect(() => {
    async function loadGames() {
      const data = await getGames();
      setGames(data);
    }

    loadGames();
  }, []);

  return (
    <div className="list games">
      {games.map((game, i) => (
        <Game key={game.title + i} game={game} />
      ))}
      {/* map through the games in state and render Game components */}
    </div>
  );
}
