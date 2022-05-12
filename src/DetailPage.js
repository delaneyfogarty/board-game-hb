import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getGameById, updateGame } from './services/fetch-utils';

export default function DetailPage() {
  const history = useHistory();
  const { id } = useParams();
  const [gameInForm, setGameInForm] = useState({
    title: '',
    genre: '',
    designer: '',
    description: '',
    min_players: 0,
    max_players: 0,
  });

  useEffect(() => {
    async function load() {
      const game = await getGameById(id);
      setGameInForm(game);
    }
    load();
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();

    await updateGame(id, gameInForm);

    history.push('/board-games');
  }
  // on mount, fetch and set in state the correct board game for this id (the id can be found in match.params using the correct react-router hook)

  return (
    <div className="detail">
      <form onSubmit={handleUpdate}>
        Update Your Game
        <label>
          Title
          {/* on change, set the title in state */}
          <input
            required
            name="title"
            value={gameInForm.title}
            onChange={(e) => setGameInForm({ ...gameInForm, title: e.target.value })}
          />
        </label>
        <label>
          Genre
          {/* on change, set the genre in state */}
          <select
            required
            value={gameInForm.genre}
            onChange={(e) => setGameInForm({ ...gameInForm, genre: e.target.value })}
          >
            <option>Tile-laying</option>
            <option>Economic</option>
            <option>War</option>
            <option>Card</option>
            <option>Abstract</option>
            <option>Cooperative</option>
            <option>Solo</option>
          </select>
        </label>
        <label>
          Designer
          {/* on change, set the designer in state */}
          <input
            required
            name="designer"
            value={gameInForm.designer}
            onChange={(e) => setGameInForm({ ...gameInForm, designer: e.target.value })}
          />
        </label>
        <label>
          Min Players
          {/* on change, set the min players in state */}
          <input
            required
            name="min_players"
            value={gameInForm.min_players}
            onChange={(e) => setGameInForm({ ...gameInForm, min_players: e.target.value })}
          />
        </label>
        <label>
          Max Players
          {/* on change, set the max players in state */}
          <input
            required
            name="max_players"
            value={gameInForm.max_players}
            onChange={(e) => setGameInForm({ ...gameInForm, max_players: e.target.value })}
          />
        </label>
        <label>
          Description
          {/* on change, set the description in state */}
          <input
            required
            name="description"
            value={gameInForm.description}
            onChange={(e) => setGameInForm({ ...gameInForm, description: e.target.value })}
          />
        </label>
        <button>Update game</button>
      </form>
    </div>
  );
}
