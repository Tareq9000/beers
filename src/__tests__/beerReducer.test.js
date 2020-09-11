import { beerReducer  } from '../reducers/beerReducer.js';

const initialState = {
    beerCount: 0,
    beerList: [],
    spinning: false,
    current_page: 1,
    per_page: 5,
}

describe('beerReducer test', () => {

    it('should return the initial state', () => {
        expect(beerReducer(undefined, {})).toEqual(
            initialState
        )
    })

    it('should add a new beer object', () => {
        const action = {
        type: 'CREATE_BEER',
            payload: {
                newBeer: {
                    name: 'beer-name',
                    by: 'someone',
                },
            },
        }
        expect(beerReducer(undefined, action).beerList[0]).toEqual({
            beerID: 1,
            name: 'beer-name',
            by: 'someone',
        })
        expect(beerReducer(undefined, action).beerCount).toEqual(
        1
        )
    })

    it('should change the page', () => {
        const action = {
        type: 'CHANGE_PAGE',
        payload: {
            newPage: 1,
        },
        }
        const state = {
            beerCount: 0,
            beerList: [],
            spinning: false,
            current_page: 1,
            per_page: 5,
        }
        expect(beerReducer(state, action).current_page).toEqual(
        2
        )
    })

    it('should change the spinner', () => {
        const action = {
            type: 'SET_SPINNER',
            payload : {
                spinning: true,
            },
        }
        const action2 = {
            type: 'SET_SPINNER',
            payload : {
                spinning: false,
            },
        }
        const state = {
            beerCount: 0,
            beerList: [],
            spinning: true,
            current_page: 1,
            per_page: 5,
        }
        expect(beerReducer(undefined, action).spinning).toEqual(
            true
        )
        expect(beerReducer(state, action2).spinning).toEqual(
            false
        )
    })

})