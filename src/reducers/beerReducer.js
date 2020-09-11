import { fetchAPI } from '../fetchAPI';

const initialState = {
    beerCount: 0,
    beerList: [],
    spinning: false,
    current_page: 1,
    per_page: 5,
}
export const beerReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CREATE_BEER':
            return {
                ...state,
                beerList: [
                    ...state.beerList,
                    {
                        ...action.payload.newBeer,
                        beerID: state.beerCount+1,
                    },
                ],
                beerCount: state.beerCount + 1,
            }
        case 'SET_SPINNER':
            return {
                ...state,
                spinning: action.payload.spinning,
            }
        case 'CHANGE_PAGE':
            return {
                ...state,
                current_page: state.current_page + action.payload.newPage,
            }
        default:
            return initialState
    }
        
}
export default beerReducer

export const setSpinner = ( spinning ) => {
    return ( dispatch ) => {
      
        dispatch({
            type : 'SET_SPINNER',
            payload : {
            spinning: spinning,
            },
        })
    }
}

export const createBeer = () => {
    return ( dispatch ) => {
        setSpinner(true)
        fetchAPI('https://api.punkapi.com/v2/beers/random').then(fetchData => {

            dispatch({
                type: 'CREATE_BEER',
                payload: {
                    newBeer: fetchData[0][0],
                },
            })
        setSpinner(false)
        })
    }
}

export const goPreviousPage = () => {
    return ( dispatch ) => {
      
        dispatch({
            type : 'CHANGE_PAGE',
            payload : {
                newPage: -1,
            },
        })
    }
}

export const goNextPage = () => {
    return ( dispatch ) => {
      
        dispatch({
            type : 'CHANGE_PAGE',
            payload : {
                newPage: 1,
            },
        })
    }
}