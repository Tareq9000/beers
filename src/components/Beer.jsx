import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Paper, Grid, Typography } from '@material-ui/core/';
import PropTypes from 'prop-types';

import styles from '../styles/Beer.module.css';

export const Beer = ({ name, description, tips, by, firstBrewed, image, volume, foodPairing, ingredients, method }) => {

    return(
        <div>

            <Grid container spacing={3} id={styles.main_grid}>
                <Grid item xs={12}>
                    <Paper className={styles.paper_box}>
                        <Typography variant="h4" noWrap id={styles.title}>
                            {name}
                        </Typography>
                        <div id={styles.under_title}>
                        <br />by {by} first brewed {firstBrewed}
                        </div>
                    </Paper>
                </Grid>
                
                <Grid item xs={8}>
                    <Paper className={styles.paper_box}>
                        <div className={styles.info_element_box}>
                            <Typography variant="h6" noWrap>
                                description
                            </Typography>
                            {description}
                        </div>
                        <div className={styles.info_element_box}>
                            <Typography variant="h6" noWrap>
                                tips
                            </Typography>
                            {tips}
                        </div>
                        <div className={styles.info_element_box}>
                            <Typography variant="h6" noWrap>
                                ingredients
                            </Typography>
                            for {volume}: <br />
                            <Grid container spacing={0} id={styles.main_grid}>
                                <Grid item xs={4}>
                                    {
                                        ingredients.malt.map(ingreds => (
                                            <div>
                                                <div className={styles.ingredients_name}>
                                                    {ingreds.name}
                                                </div>
                                                <div className={styles.ingredients_amount}>
                                                    {ingreds.amount.value} {ingreds.amount.unit}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Grid>
                                <Grid item xs={4}>
                                    {
                                        ingredients.hops.map(ingreds => (
                                            <div>
                                                <div className={styles.ingredients_name}>
                                                    {ingreds.name} {ingreds.attribute ? ingreds.attribute : null}
                                                </div>
                                                <div className={styles.ingredients_amount}>
                                                    {ingreds.amount.value} {ingreds.amount.unit}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        </div>
                        <div className={styles.info_element_box}>
                            <Typography variant="h6" noWrap>
                                method
                            </Typography>
                            <div>
                                <div className={styles.method_twist}>
                                    {method.twist}
                                </div>
                                <div className={styles.method_fermentation}>
                                    fermentation: {method.fermentation.temp.value} {method.fermentation.temp.unit}
                                </div>
                                <div className={styles.method_mash_temp}>
                                    mash temperature: {method.mash_temp[0].temp.value} {method.mash_temp[0].temp.unit}
                                </div>
                            </div>
                        </div>
                        <div className={styles.info_element_box}>
                            <Typography variant="h6" noWrap>
                                food pairing
                            </Typography>
                            <div>
                                {
                                    foodPairing.map(obj => <div>{'- '+obj}</div>)
                                }
                            </div>
                        </div>
                    </Paper>
                </Grid>
                { image ? <Grid item xs={4}>
                    <Paper className={`${styles.imagePaper} ${styles.paper_box}`}>
                        <img className={styles.image} alt='' src={image}></img>
                    </Paper>
                </Grid> : null}
                
                <Grid item xs={5}>
                    <Link to='' className={styles.go_back_button}>    
                        <Button variant="contained" color="primary" className={styles.go_back_button}>
                            go back
                        </Button>
                    </Link>
                </Grid>
                
            </Grid>

            
        </div>
    )
}
Beer.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    tips: PropTypes.string,
    by: PropTypes.string,
    firstBrewed: PropTypes.string,
    image: PropTypes.string,
    volume: PropTypes.shape({
        unit: PropTypes.string,
        value: PropTypes.number,
    }),
    foodPairing: PropTypes.array,
    ingredients: PropTypes.shape({
        hops: PropTypes.array,
        malt: PropTypes.array,
    }),
    method: PropTypes.shape({
        mash_temp: PropTypes.array,
        twist: PropTypes.string,
        fermentation: PropTypes.shape({
            unit: PropTypes.string,
            value: PropTypes.number,
        })
    }),
}

const mapStateToProps = ( state, ownProps ) => {
    const { beerList } = state.beerReducer
    const beer = beerList.filter(beer => beer.beerID === ownProps.id )[0]
    console.log(beer)
    return beer ? {
        name: beer.name,
        description: beer.description,
        tips: beer.brewers_tips,
        by: beer.contributed_by,
        firstBrewed: beer.first_brewed,
        image: beer.image_url,  
        volume: beer.volume.value + ' ' + beer.volume.unit,
        foodPairing: beer.food_pairing,
        ingredients: beer.ingredients,
        method: beer.method,
    }: null
}

export default connect(mapStateToProps)(Beer)