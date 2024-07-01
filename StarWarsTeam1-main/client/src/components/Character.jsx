import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useParams,
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";

const Character = (props) => {
  const [character, setCharacter] = useState({
    id: 0,
    name: "",
    gender: "",
    skin_color: "",
    hair_color: "",
    height: "",
    eye_color: "",
    mass: "",
    homeworld: 0,
    birth_year: "",
  });
  const [films, setFilms] = useState([]);
  const [planets, setPlanets] = useState([]);

  let params = useParams();
  let charId = params.characterid;

  useEffect(() => {
    const fetchCharacterById = async () => {
      const response = await fetch(
        `http://localhost:3000/api/characters/${charId}`
      );
      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();
      setCharacter(json_response[0]);
      console.log(json_response[0]);
    };

    fetchCharacterById();
  }, []);

  //   const fetchPlanetsByCharacterId = async () => {
  //     const response = await fetch(
  //       `http://localhost:3000/api/characters/${charId}/planets`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Data could not be fetched!");
  //     }
  //     const json_response = await response.json();
  //     //   axios.get("http://localhost:5000/api/characters");
  //     setPlanets(json_response);
  //   };
  //   const fetchFilmsByCharacterId = async () => {
  //     const response = await fetch(
  //       `http://localhost:3000/api/characters/${charId}/films`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Data could not be fetched!");
  //     }
  //     const json_response = await response.json();
  //     //   axios.get("http://localhost:5000/api/characters");
  //     setFilms(json_response);
  //   };

  //   fetchPlanetsByCharacterId();
  //   fetchFilmsByCharacterId();
  //   return <>Test</>;
  return (
    <div>
      <h1 id="name">{character?.name}</h1>
      <section id="generalInfo">
        <p>Height: {character?.height} cm</p>
        <p>Mass: {character?.mass} kg</p>
        <p>Born: {character?.birth_year}</p>
      </section>
      <section id="planets">
        <h2>Homeworld</h2>
        <p>{character?.homeworld}</p>
      </section>
      <section id="films">
        <h2>Films appeared in</h2>
        <ul>
          {films.map((film) => (
            <li key={film.id}>
              <Link to={`/films/${film.id}`}>
                <div>{film.id}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Character;
