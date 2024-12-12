import './App.css';
import Movies from './components/Movies.tsx';
import MoviesHeader from "./components/MoviesHeader.tsx";
function App() {
  return (
    <>
      <MoviesHeader />
      <Movies />
    </>
  );
}

export default App;
