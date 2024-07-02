import React, { useState, useEffect } from "react";
import { useParams, BrowserRouter as Router, Link } from "react-router-dom";

const Planet = () => {
  const [planet, setPlanet] = useState({
    id: 0,
    climate: "",
    surface_water: "",
    name: "",
    diameter: "",
    rotation_period: "",
    terrain: "",
    gravity: "",
    orbital_period: "",
    population: "",
  });

  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  let params = useParams();
  let planetId = params.planetid;

  useEffect(() => {
    const fetchPlanetById = async () => {
      const response = await fetch(
        `http://localhost:3000/api/planets/${planetId}`
      );
      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();
      setPlanet(json_response[0]);
    };
    fetchPlanetById();
  }, []);

  useEffect(() => {
    const fetchFilmsByPlanetId = async () => {
      const response = await fetch(
        `http://localhost:3000/api/planets/${planetId}/films`
      );

      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();
      setFilms(json_response);
    };
    fetchFilmsByPlanetId();
  }, [planetId]);

  useEffect(() => {
    const fetchCharactersByPlanetId = async () => {
      const response = await fetch(
        `http://localhost:3000/api/planets/${planetId}/characters`
      );

      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();
      setCharacters(json_response);
    };
    fetchCharactersByPlanetId();
  }, [planetId]);

  return (
    <div>
      <h1 id="name">{planet?.name}</h1>
      <section id="generalInfo">
        <p> ID: {planet?.id}</p>
        <p> Climate: {planet?.climate}</p>
        <p> Surface water: {planet?.surface_water}%</p>
        <p> Diameter: {planet?.diameter}km</p>
        <p> Rotation Period: {planet?.rotation_period}</p>
        <p> Terrain: {planet?.terrain}</p>
        <p> Gravity: {planet?.gravity}</p>
        <p> Orbital Period: {planet?.orbital_period}</p>
        <p> Population: {planet?.population}</p>
      </section>
      <section id="films">
        <h2> Films featuring this planet </h2>
        {films?.map((film) => (
          <div key={film.film_id}>
            <Link to={`/films/${film.film_id}`}>{film.data[0].title}</Link>
          </div>
        ))}
      </section>
      <section id="characters">
        <h2>Characters from this planet</h2>
        {characters?.map((character) => (
          <div key={character.id}>
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Planet;
