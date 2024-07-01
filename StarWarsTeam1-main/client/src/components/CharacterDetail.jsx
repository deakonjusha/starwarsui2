import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/characters/${id}`
      );
      setCharacter(response.data);
    };
    fetchCharacter();
  }, [id]);
  if (!character) return <div>Loading...</div>;
  return (
    <div>
      <h1>{character.name}</h1>
      <p>Height: {character.height}</p> <p>Mass: {character.mass}</p>{" "}
      <p>Homeworld: {character.homeworld}</p>{" "}
      <div>
        <h3>Films appeared in:</h3>{" "}
        {character.films.map((film) => (
          <Link key={film} to={`/films/${film}`}>
            {" "}
            <div>{film}</div>
          </Link>
        ))}
      </div>{" "}
    </div>
  );
};
export default CharacterDetail;
