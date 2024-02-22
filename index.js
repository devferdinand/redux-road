// starting point of game
const initialWagonState = {
    supplies: 100,
    distance: 0,
    days: 0
};

// reducer function to manage the state of game
const reducer = (state=initialWagonState, action) => {
    switch(action.type){
        case 'gather':
            return {
                ...state,
                supplies: state.supplies + 15,
                days: state.days + 1
            };
        case 'travel':
            if( (state.supplies - (action.payload * 20)) < 0){
                return {
                    ...state
                }
            }
            else{
                return {
                    ...state,
                    days: state.days + action.payload,
                    supplies: state.supplies - (action.payload * 20),
                    distance: state.distance + (action.payload * 10)
                };
            }
        case 'tippedWagon':
            return {
                ...state,
                supplies: state.supplies - 30,
                days: state.days + 1
            };
        default: {
            return state;
        }
    }
};

// test our game
let wagon = reducer(undefined, {});
console.log(wagon); // expected output: {supplies: 100, distance: 0, days: 0}
// first day - travel
const action1 = {
    type: 'travel',
    payload: 1
}
wagon = reducer(wagon, action1);
console.log(wagon); // expected output: {supplies: 80, distance: 10, days: 1}
// second day - gather
const action2 = {
    type: 'gather'
}
wagon = reducer(wagon, action2);
console.log(wagon); // expected output: {supplies: 95, distance: 10, days: 2}
// third day - tipped wagon
const action3 = {
    type: 'tippedWagon'
}
wagon = reducer(wagon, action3);
console.log(wagon); // expected output: {supplies: 65, distance: 10, days: 3}
// fourth day - travel for 3 days
const action4 = {
    type: 'travel',
    payload: 3
}
wagon = reducer(wagon, action4);
console.log(wagon); // expected output: {supplies: 5, distance: 40, days: 6}
// testing - player cannot travel if supplies are negative
const action5 = {
    type: 'travel',
    payload: 1
}
wagon = reducer(wagon, action5);
console.log(wagon); // expected output: same as previous