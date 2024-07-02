import React, { useState, useEffect } from "react";
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
    try {
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
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }, []);

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  }, [character]);

  useEffect(() => {
    try {
      const fetchFilmsByCharacterId = async () => {
        const response = await fetch(
          `http://localhost:3000/api/characters/${charId}/films`
        );
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setFilms(json_response);
        console.log(json_response);
      };

      fetchFilmsByCharacterId();
    } catch (error) {
      console.error("Error fetching films:", error);
    }
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
        {films?.map((film) => (
          <div key={film.film_id}>
            <a href={`/films/${film.film_id}`}>{film.data[0].title}</a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Character;
