import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
      const fetchCharacters = async () => {
        const response = await fetch ("http://localhost:3000/api/characters")
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
      <div>
      {characters.map(character => (
        <link key ={character._id} to ={'/character/${character._id}'}>
          <div>
            <div>{character.name}</div>
            </div> 
            </link>
                  )
                )
            }
      </div>
    </div>
  );
};


export default App;
