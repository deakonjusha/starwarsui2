import axios from "axios";

const Characters = (props) => {
  return (
    <div>
      {props.data.map((char) => (
        <div key={char.id}>
          <a href={`/characters/${char.id}`}>{char.name}</a>
        </div>
      ))}
    </div>
  );
};

export default Characters;
