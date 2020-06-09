import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// import { Movies } from './components/Movies';
// import { MovieForm } from './components/MovieForm';
import { Container } from "semantic-ui-react";
import { Names } from "./components/Names";
import { NameForm } from "./components/NameForm";

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch("/get_random_name").then(function (response) {
      // console.log(response);

      return response.json().then((data) => {
        // console.log("Log");
        console.log(data);
        console.log(data.predicted_name);

        setNames(data.predicted_name);
      });
    });
  }, []);

  // console.log(names);

  return (
    <div className="App">
      <Container style={{ marginTop: 40 }}>
        <NameForm onNewName={(new_names) => setNames(new_names)} />
        
        
        {/* <MovieForm onSearchName={movies => setNames(currenNames=>[...currenNames, names])}/> */}
        <Names names={names} />
      </Container>
    </div>
  );
}

export default App;
