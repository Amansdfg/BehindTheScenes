import { useState ,memo,useCallback,useMemo} from "react";

import IconButton from "../UI/IconButton";
import MinusIcon from "../UI/Icons/MinusIcon";
import PlusIcon from "../UI/Icons/PlusIcon";
import CounterOutput from "./CounterOutput";
import { log } from "../../log.js";
import CounterHistory from "./CounterSelected.jsx";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter=memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);
  const initialCountIsPrime = useMemo(()=>isPrime(initialCount),[initialCount]);

    const[counterChages,setCounterChanges]=useState([{value:initialCount,id:Math.random()*100}]);
    const currentCounter=counterChages.reduce(
        (prev,counterChange)=>prev+counterChange.value,0
    );
    const decrementButton =useCallback( function handleDecrement() {
    setCounterChanges((prev)=>[{value:-1,id:Math.random()*100},...prev]);
  },[])

  const incrementButton =useCallback(function handleIncrement() {
    setCounterChanges((prev)=>[{value:1,id:Math.random()*100},...prev]);
  },[])

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={decrementButton}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={incrementButton}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChages}/>
    </section>
  );
})
export default Counter
