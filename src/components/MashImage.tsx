//import { useState } from "react";
//import MashGame from "../NotUsing/MashGame";
//import mashImg from "./../assets/mash.webp";

const MashImage = () => {
  /*commenting out until I want MAsh game to be functional again */
  //const [showGame, setShowGame] = useState(false);

  /*
  const handleClick = () => {
    setShowGame(true);
  };
  */
  return (
    <div>
      <img
        className="mash"
        src="mash.webp"
        alt="MASH"
        style={{ width: "200px" }}
      />
      {/*{showGame && <MashGame onClose={() => setShowGame(false)} />}*/}
    </div>
  );
};

export default MashImage;
