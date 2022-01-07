import { UserVm, addActions, deleteActions, userVm$ } from './user';
import "./style.css";
// import { inc$, dec$, vm$, initialState, CounterState } from "./counter";
//import {  vm$, incrSubj, decrSubj, stepSubj, CounterVm} from "./counter1";


// counter html elements ///////////////////////////////////////////////
// const incEl = document.getElementById("inc");
// incEl!.addEventListener("click", (ev) =>  incrSubj.next( 1 ))
  
// const decEl = document.getElementById("dec");
// decEl!.addEventListener("click", (ev) =>  decrSubj.next( 1 ))

// const stepEl = document.getElementById("step");
// //@ts-ignore
// stepEl!.addEventListener("input", (ev) =>  stepSubj.next( parseInt(ev.target.value, 10) ))


// const counterEl = document.getElementById("counter-text");

// function renderCountState(vm: CounterVm)  {
//   console.log("render state", vm.counter);
//   counterEl!.innerText = vm.counter.toString();
// }

// counter html elements ///////////////////////////////////////////////

// user html elements ///////////////////////////////////////////////
// add
const addEl = document.getElementById("add");
addEl!.addEventListener("click", (ev) =>  addActions.next( { id:10, name:"User 10"} ))

// delete  
const deleteEl = document.getElementById("delete");
deleteEl!.addEventListener("click", (ev) =>  deleteActions.next(  { id:10, name:"User 10"} ))


// user html elements ///////////////////////////////////////////////

let listHtml = ""; 
// render list
const usersEl = document.getElementById("users");
function renderUsers(vm: UserVm)  {
  console.log("render users", vm.users);
  listHtml = "";
  usersEl!.innerHTML ="";
  vm.users.forEach((user) => {
    listHtml += `<div>${user.name}</div>` 
  })
  console.log("user list:",listHtml);
  usersEl!.innerHTML = listHtml;
}

//userVm$.subscribe( vm => console.log("users: " + vm.users));
userVm$.subscribe( renderUsers);
