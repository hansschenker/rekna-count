import { Observable, Subject, scan, of, map, merge, tap } from "rxjs";

export interface CounterVm {
  counter: number;
  step: number;
}

export const initialVm: CounterVm = { counter: 0, step: 2 };
// normally it could be done with a single subject, but for demonstration
// purposes, I'll use 2 subjects
export const incrSubj = new Subject<number>();
export const decrSubj = new Subject<number>();
export const stepSubj = new Subject<number>();

//export let vm$: Observable<ICounterVm> = of(initialVm);

// the subjects are mapped to an anonymous function that
// - accepts as parameter the previous state of the viewmodel (vm:ICounterVm)
// - and that returns the mutated viewmodel
// they are the viewmodel mutation functions
const incr$ = incrSubj.pipe(
  tap((v) => console.log("incr:", v)),
  map((delta) => (vm: CounterVm) => ({ ...vm, counter: vm.counter + delta * vm.step }))
);
const decr$ = decrSubj.pipe(
 tap((v) => console.log("decr:", v)),
  map((delta) => (vm: CounterVm) => ({ ...vm, counter: vm.counter - delta  * vm.step}))
);
const step$ = stepSubj.pipe(
 tap((v) => console.log("step:", v)),
//   map((delta) => (vm: ICounterVm) => ({ ...vm, step: delta }))
  map((step) => (vm: CounterVm) => ({ ...vm, step }))
);



export const vm$ = merge( incr$, decr$, step$).pipe(
    // tap((vm) =>  console.log("vm:", vm)),
    scan( (prevVm:CounterVm, mutationFn:(vm:CounterVm) => CounterVm) => mutationFn(prevVm), initialVm)
)