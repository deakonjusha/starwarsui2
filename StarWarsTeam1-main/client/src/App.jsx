import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Character from "./components/Character";
import Characters from "./components/Characters";
import CharacterList from "./components/CharacterList";
import Planet from "./components/Planet";
import Film from "./components/Film";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/characters");

        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setCharacters(json_response);
      } catch (error) {
        console.error("Error fetching socks:", error);
      }
    };
    fetchCharacters();
  }, []);

  return (
    <div>
      <Router>
        <h1> Star Wars Universe Lookup </h1>
        <Routes>
          <Route exact path="/" element={<Characters data={characters} />} />

          <Route
            path={`/characters/:characterid`}
            // key={character.id}
            action={({ params }) => {}}
            element={<Character />}
          />
          <Route path="/planets/:planetid" element={<Planet/>}/>
          <Route path="/films/:filmid" element={<Film/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
