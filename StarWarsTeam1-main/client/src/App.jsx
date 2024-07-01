import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Character from "./components/Character";
import Characters from "./components/Characters";
import CharacterList from "./components/CharacterList";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch("http://localhost:3000/api/characters");
      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();
      setCharacters(json_response);
    };
    fetchCharacters();
  }, []);

  return (
    <div>
      <h1> Star Wars Universe Lookup </h1>
      {console.log("TEST")}
      <Characters data={characters} />
      {/* <CharacterList /> */}
      <Router>
        {/* <Switch> */}
        {/* <Route exact path="/" component={Characters} /> */}

        {characters.map((character) => (
          <Route
            path={`/characters/${character.id}`}
            element={<Character data={character} />}
          />
        ))}
        {/* </Switch> */}
      </Router>
      <div></div>
    </div>
  );
}

export default App;
