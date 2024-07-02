import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Film = () => {
  const [film, setFilm] = useState({
    id: 0,
    producer: "",
    title: "",
    episode_id: "",
    director: "",
    release_date: "",
    opening_crawl: "",
  });
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);

  let params = useParams();
  let filmId = params.filmid;

  useEffect(() => {
    const fetchFilmById = async () => {
      const response = await fetch(`http://localhost:3000/api/films/${filmId}`);
      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();
      setFilm(json_response[0]);
    };

    fetchFilmById();
  }, []);

  useEffect(() => {
    try {
      const fetchCharacterByFlimId = async () => {
        const response = await fetch(
          `http://localhost:3000/api/films/${filmId}/characters`
        );

        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setCharacters(json_response);
      };

      fetchCharacterByFlimId();
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }, [film]);

  useEffect(() => {
    try {
      const fetchPlanetsByFlimId = async () => {
        const response = await fetch(
          `http://localhost:3000/api/films/${filmId}/planets`
        );

        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setPlanets(json_response);
      };

      fetchPlanetsByFlimId();
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  }, [film]);

  return (
    <div>
      <h1 id="title">{film?.title}</h1>
      <section id="generalInfo">
        <p>ID: {film?.id}</p>
        <p>Producer: {film?.producer}</p>
        <p>Episode: {film?.episode_id}</p>
        <p>Director: {film?.director}</p>
        <p>Release Date: {film?.release_date}</p>
      </section>
      <section id="openingCrawl">
        <h2>Opening Crawl</h2>
        <p>{film?.opening_crawl}</p>
      </section>

      <section id="characters">
        <h2>Characters</h2>
        {characters?.map((character) => (
          <div key={character.character_id}>
            <Link to={`/characters/${character.character_id}`}>
              {character.data[0].name}
            </Link>
          </div>
        ))}
      </section>

      <section id="planets">
        <h2>Planets</h2>
        {planets?.map((planet) => (
          <div key={planet.planet_id}>
            <Link to={`/planets/${planet.planet_id}`}>
              {planet.data[0].name}
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Film;
