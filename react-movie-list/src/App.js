import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Movies } from './components/Movies';
import { MovieForm } from './components/MovieForm';
import { Container } from 'semantic-ui-react';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    fetch('/movies').then(
      response => response.json().then(
        data => {
          setMovies(data.movies)          
        }
      )
    )
  }, []);
  console.log(movies);

  return (
    <div className="App">
      <Container style={{marginTop:40}}>
        <MovieForm onNewMovie={movies => setMovies(currentMovies=>[...currentMovies, movies])}/>
        <Movies movies={movies} />
      </Container>
    </div>
  );
}

export default App;
