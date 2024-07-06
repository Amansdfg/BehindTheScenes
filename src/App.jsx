import { useState } from "react";

import Counter from "./components/Counter/Counter";
import Header from "./components/Header";
import { log } from "./log.js";
import ConfigureCounter from "./components/ConfigureCounter.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);
  function handleSetChosen(newValue){
    setChosenCount(newValue);
  }
  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetChosen}/>
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
