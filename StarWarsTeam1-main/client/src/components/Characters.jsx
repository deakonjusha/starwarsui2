import axios from "axios";

const Characters = (props) => {
  //   console.log(props);
  return (
    <div>
      {props.data.map((char) => (
        <div>Char: {char.name}</div>
      ))}
    </div>
  );
};

export default Characters;
