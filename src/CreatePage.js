import { useState } from 'react';
import { createGame } from './services/fetch-utils';
import { useHistory } from 'react-router-dom';

export default function CreatePage() {
  // you'll need the history hook from react-router-dom to do your redirecting in the handleSubmit
  const history = useHistory();

  // here's the state you'll need:
  const [gameInForm, setGameInForm] = useState({
    title: '',
    genre: '',
    designer: '',
    description: '',
    min_players: 0,
    max_players: 0,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    // create a game
    await createGame(gameInForm);
    history.push('/board-games');

    // use history.push to send the user to the list page
  }

  return (
    <div className="create">
      {/* on submit, call your handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <h2>Add board game</h2>
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
        <button>Create game</button>
      </form>
    </div>
  );
}
