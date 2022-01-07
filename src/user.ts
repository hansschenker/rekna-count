import { Observable, Subject, scan, of, map,from, merge, tap, ObservableInput, interval, take } from "rxjs";


function combine(...sources: ObservableInput<any>[]): Observable<any> {
    return merge(
        ...(sources.map((source, index) => from(source).pipe(map((value) => ({ value, index }))))) as any).pipe(
            //tap( v => console.log("sources:",v)),
            //@ts-ignore
            scan( (currentValues, {value, index }) => { currentValues[index] = value; return currentValues;}, new Array(sources.length))
        );
        } 
     
    //  combine(
    //   interval(1000).pipe(
    //       map((v) => `A:${v}`),
    //       take(3)
    //       ),
    //   interval(3000).pipe(
    //       map((v)  => `B:${v}` ),
    //       take(3)
    //       )
    //  ).subscribe((data) => ( console.log(JSON.stringify(data, null, 2))
    //  ))

const userList: User[] = [
    {id:1, name: "user 1"},
    {id:2, name: "user 2"},
    {id:3, name: "user 3"},
    {id:4, name: "user 4"},
    {id:5, name: "user 5"},
];
export interface User {
    id:number;
    name:string;
}
export interface UserVm {
  users: User[];
}

export const initialVm: UserVm = { users: userList };
// normally it could be done with a single subject, but for demonstration
// purposes, I'll use 2 subjects
export const loadActions = new Subject<void>();
export const addActions = new Subject<User>();
export const deleteActions = new Subject<User>();

//export let vm$: Observable<ICounterVm> = of(initialVm);

// the subjects are mapped to an anonymous function that
// - accepts as parameter the previous state of the viewmodel (vm:ICounterVm)
// - and that returns the mutated viewmodel
// they are the viewmodel mutation functions

const loadChanges = loadActions.pipe(
    tap(_ => console.log(userList)),
    map( _ => (vm:UserVm) => ({...vm, users: userList})) 
  )

const addChanges = addActions.pipe(
  tap((user) => console.log("add:", user)),
  map((user) => (vm: UserVm) => ({ ...vm, users: [...vm.users, {id: user.id, name: user.name}] }))
);

const deleteChannges = deleteActions.pipe(
 tap((user) => console.log("delete:", user)),
  map((user) => (vm: UserVm) => ({ ...vm, users: vm.users.filter( u => user.id !== u.id )}))
);

// const step$ = stepSubj.pipe(
//  tap((v) => console.log("step:", v)),
// //   map((delta) => (vm: ICounterVm) => ({ ...vm, step: delta }))
//   map((step) => (vm: UserVm) => ({ ...vm, step }))
// );

export const userVm$ = merge(loadChanges,addChanges, deleteChannges).pipe(
    // tap((vm) =>  console.log("vm:", vm)),
    scan( (prevVm:UserVm, mutationFn:(vm:UserVm) => UserVm) => mutationFn(prevVm), initialVm)
)
//userVm$.subscribe(vm => console.log("userVm:", vm));