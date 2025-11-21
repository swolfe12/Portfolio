import { useState } from "react";

const categories = [
  { key: "celebrities", label: "Celebrities" },
  { key: "animals", label: "Animals" },
  { key: "cars", label: "Automobiles" },
  { key: "jobs", label: "Jobs" },
];

const MashGame = ({ onClose }) => {
  const [inputs, setInputs] = useState({
    celebrities: ["", "", ""],
    animals: ["", "", ""],
    cars: ["", "", ""],
    jobs: ["", "", ""],
  });

  const [result, setResult] = useState(null);

  const handleChange = (category, index, value) => {
    const updated = [...inputs[category]];
    updated[index] = value;
    setInputs((prev) => ({ ...prev, [category]: updated }));
  };

  const calculateFuture = () => {
    const future = {};
    for (const key in inputs) {
      const options = inputs[key].filter(Boolean);
      future[key] = options[Math.floor(Math.random() * options.length)];
    }
    setResult(future);
  };

  return (
    <div className="mashGame">
      <button onClick={onClose} className="">
        X
      </button>
      <h2 className="">🧠 MASH: Predict Your Future</h2>

      {categories.map(({ key, label }) => (
        <div key={key} className="">
          <h3 className="">{label}</h3>
          <div className="">
            {[0, 1, 2].map((i) => (
              <input
                key={i}
                className=""
                placeholder={`${label} ${i + 1}`}
                value={inputs[key][i]}
                onChange={(e) => handleChange(key, i, e.target.value)}
              />
            ))}
          </div>
        </div>
      ))}

      <button onClick={calculateFuture} className="">
        Tell Me My Future 🔮
      </button>

      {result && (
        <div className="">
          <h3 className="">✨ Your Future ✨</h3>
          <p>
            You’ll marry <b>{result.celebrities}</b>,
          </p>
          <p>
            ride a <b>{result.cars}</b>,
          </p>
          <p>
            own a <b>{result.animals}</b>,
          </p>
          <p>
            and work as a <b>{result.jobs}</b>.
          </p>
        </div>
      )}
    </div>
  );
};

export default MashGame;
