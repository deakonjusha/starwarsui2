import { Link } from "react-router-dom";

const Characters = (props) => {
  return (
    <div>
      {props.data.map((char) => (
        <div key={char.id}>
          <Link to={`/characters/${char.id}`}>{char.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Characters;
