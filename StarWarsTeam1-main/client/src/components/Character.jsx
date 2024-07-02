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
  const [planets, setPlanets] = useState({ name: "" });

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
    };

    fetchCharacterById();
  }, []);

  useEffect(() => {
    const fetchPlanetsByCharacterId = async () => {
      const response = await fetch(
        `http://localhost:3000/api/planets/${character.homeworld}`
      );

      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();
      setPlanets(json_response[0]);
    };

    fetchPlanetsByCharacterId();
  }, [character]);

  useEffect(() => {
    const fetchFilmsByCharacterId = async () => {
      const response = await fetch(
        `http://localhost:3000/api/characters/${charId}/films`
      );
      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();
      setFilms(json_response);

      console.log("films", json_response);
    };

    fetchFilmsByCharacterId();
  }, [character]);

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
        <p>
          <a href={`/planets/${planets?.id}`}>{planets?.name}</a>
        </p>
      </section>
      <section id="films">
        <h2>Films appeared in</h2>
        <ul>
          {films?.map((film) => (
            <li key={film.id}>
              <a href={`/films/${film.film_id}`}>{film.film_id}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Character;
