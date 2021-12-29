import "./style.css";
// import { inc$, dec$, vm$, initialState, CounterState } from "./counter";
import {  vm$, incrSubj, decrSubj, stepSubj, ICounterVm} from "./counter1";



const incEl = document.getElementById("inc");
incEl!.addEventListener("click", (ev) =>  incrSubj.next( 1 ))
  
const decEl = document.getElementById("dec");
decEl!.addEventListener("click", (ev) =>  decrSubj.next( 1 ))

const stepEl = document.getElementById("step");
//@ts-ignore
stepEl!.addEventListener("input", (ev) =>  stepSubj.next( parseInt(ev.target.value, 10) ))


const counterEl = document.getElementById("counter-text");

function renderCountState(vm: ICounterVm)  {
  console.log("render state", vm.counter);
  counterEl!.innerText = vm.counter.toString();
}

vm$.subscribe( renderCountState);
