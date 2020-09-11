import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText,  Button } from '@material-ui/core/';
import PropTypes from 'prop-types';

import { createBeer, goPreviousPage, goNextPage } from '../reducers/beerReducer.js';
import styles from '../styles/BeersList.module.css';

export const BeersList = ({ beerCount, beerList, createBeer, per_page, current_page, goNextPage, goPreviousPage }) => {

    let beers = []

    for(let i = 0; i < beerCount; i++) {
        beers.unshift(
            <ListItem key={i+1} button>
                <Link to={'beer'+(i+1)} className={styles.beer_list_item}>
                    <ListItemText className={styles.beer_list_item} primary={beerList[i].name} secondary={beerList[i].contributed_by + ' ' + beerList[i].first_brewed} />
                </Link>
            </ListItem>
        )
    }

    let maxPage = Math.ceil(beers.length / per_page)
    maxPage === 0 ? maxPage = 1 : maxPage = maxPage + 0

    const shouldShowBeers = beers.slice(per_page*(current_page-1), per_page*current_page)

    return(
        <div>
            <Button id={styles.createBeer_button} variant='contained' color='primary' onClick={createBeer}>
                create a beer
            </Button>
            <div id={styles.list_box}>
                <List component='nav' aria-label='main mailbox folders'>
                    {shouldShowBeers}
                </List>
            </div>
            {
                current_page === 1 ?
                <Button id={styles.goPreviousPage_button} variant='contained' color='primary' disabled>
                    {'<'}
                </Button> : 
                <Button id={styles.goPreviousPage_button} variant='contained' color='primary' onClick={goPreviousPage}>
                    {'<'}
                </Button>
            }
            <div id={styles.page_information}>
                {current_page+' of '+ maxPage}
            </div>
            {
                beers[0] ? (Math.ceil(beers[0].key / per_page)) <= current_page ?
                <Button id={styles.goNextPage_button} variant='contained' color='primary' disabled>
                    {'>'} 
                </Button> :
                <Button id={styles.goNextPage_button} variant='contained' color='primary' onClick={goNextPage}>
                    {'>'}
                </Button> :
                <Button id={styles.goNextPage_button} variant='contained' color='primary' disabled>
                    {'>'} 
                </Button>
            }

        </div>
    )
}
BeersList.propTypes = {
    beerCount: PropTypes.number,
    beerList: PropTypes.arrayOf(PropTypes.object),
    per_page: PropTypes.number,
    current_page: PropTypes.number,
    createBeer: PropTypes.func,
    goPreviousPage: PropTypes.func,
    goNextPage: PropTypes.func,
}

const mapStateToProps = ( state ) => {
    const { beerCount, beerList, per_page, current_page } = state.beerReducer
  
    return { beerCount, beerList, per_page, current_page }
}
const mapDispatchToProps = ( dispatch ) => {

    return {
        createBeer: () => (
            dispatch(createBeer())
        ),
        goPreviousPage: () => (
            dispatch(goPreviousPage())
        ),
        goNextPage: () => (
            dispatch(goNextPage())
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeersList)