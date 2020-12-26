
export const initalState = {
    user:null,
    basket: [],
}

const reducer = (state, action)=>{
    switch(action.type){
        case "SET_USER":
            return{
                ...state,
                user:action.user,
            }
        default:
            console.warn('INCORRET ACTION TYPE WAS DISPATCHED RUNNING DEFAULT')
            return state;
    }
}

export default reducer