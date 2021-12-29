import { of, map, merge, Observable, scan, Subject, tap } from "rxjs";

export interface CounterState {
  count: number;
}
export const initialState: CounterState = {
  count: 0,
};

export const inc$ = new Subject<CounterState>();
inc$.pipe(
  //tap((v) => console.log("inc$", v)),
  map((prevState) => (state: CounterState) => ({
    ...state,
    count: state.count + prevState.count,
  }))
);

export const dec$ = new Subject<CounterState>();
dec$.pipe(
  //tap((v) => console.log("dec$", v)),
  map((prevState) => (state: CounterState) => ({
    ...state,
    count: state.count - prevState.count,
  }))
);

function counterReducer(prevState: CounterState, newState: CounterState) {

  return  {count: prevState.count + newState.count}
    
}

export const vm$: Observable<CounterState> = merge(
  of(initialState),
  inc$,
  dec$
).pipe(
    //tap(v => console.log("vm$:", v)),
    scan(counterReducer, initialState)
    
);
