import React, { useState, useEffect } from "react";
import {
  useParams,
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import axios from "axios";

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
        <ul>
          {films?.map((film) => (
            <li key={film.id}>
              <a href={"/films/${film.film_id}"}>{film.film_id}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Planet;
