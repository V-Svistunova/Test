import './App.css';
import Loader from './components/loader/Loader';
import PlayerInfo from './components/playerInfo/PlayerInfo';
import Spinner from './components/spinner/Spinner';
import TournamentItem from './components/tournamentItem/TournamentItem';

function App() {
  return (
    <div className="App">
      <header className="header">Poker</header>
      <div className='wrapper'>
        <main className='main'>
          <Spinner/>
          <PlayerInfo/>
          <Loader/>
          <div className='Tournament'>
            <TournamentItem/>
            <TournamentItem/>
            <TournamentItem/>
          </div>
        </main>
      </div>
      <footer className='footer'></footer>
    </div>
  );
}

export default App;
