import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get("http://localhost:5000/api/characters");
      setCharacters(response.data);
    };
    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>Star Wars Universe Lookup</h1>{" "}
      <div>
        {characters.map((character) => (
          <Link key={character._id} to={`/characters/${character._id}`}>
            {" "}
            <div>{character.name}</div>
          </Link>
        ))}
      </div>{" "}
    </div>
  );
};
export default CharacterList;
