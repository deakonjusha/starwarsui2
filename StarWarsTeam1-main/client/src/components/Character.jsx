import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Character = (props) => {
  const [character, setCharacter] = useState([]);
  const [films, setFilms] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchCharacterById = async () => {
      const response = await fetch(
        `http://localhost:3000/api/characters/${props.character_id}`
      );
      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();
      //   axios.get(`http://localhost:5000/api/characters/${props.character_id}`);
      setCharacter(json_response);
    };

    fetchCharacterById();

    const fetchPlanetsByCharacterId = async () => {
      const reponse = await fetch(
        `http://localhost:3000/api/characters/${props.character_id}/planets`
      );

      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();
      axios.get("http://localhost:5000/api/characters");
      setPlanets(json_response);
    };
    const fetchFilmsByCharacterId = async () => {
      const reponse = await fetch(
        `http://localhost:3000/api/characters/${props.character_id}/films`
      );

      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();
      axios.get("http://localhost:5000/api/characters");
      setFilms(json_response);
    };

    fetchPlanetsByCharacterId();
    fetchFilmsByCharacterId();
  }, []);

  console.log(props);
  return (
    <div>
      <h1 id="name">{character.name}</h1>
      <section id="generalInfo">
        <p>Height: {character.height} cm</p>
        <p>Mass: {character.mass} kg</p>
        <p>Born: {character.birth_year}</p>
      </section>
      <section id="planets">
        <h2>Homeworld</h2>
        <p>{character.homeworld}</p>
      </section>
      <section id="films">
        <h2>Films appeared in</h2>
        <ul>
          {films.map((film) => (
            <li>
              <Link key={film} to={`/films/${film}`}>
                <div>{film}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Character;
