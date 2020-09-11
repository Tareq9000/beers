import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Container, AppBar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import Spinner from 'react-spinner-material';

import BeersList from './BeersList.jsx'
import Beer from './Beer.jsx';
import styles from '../styles/App.module.css';

export const App = (props) => {
  const  { spinning, beerCount } = props

  let beers = []
  for(let i = 0; i < beerCount; i++) {
    beers.push(
      <Route path={"/beer"+(i+1)}>
        <Beer id={i+1} />
      </Route>
    )
  }

  return (
    <Router>
      <div>
        <div id={styles.app_bar}>
          <AppBar position="static">
            <Typography variant="h3" noWrap className={styles.app_bar_title}>
              Beers
            </Typography>
          </AppBar>
        </div>
        <Container>

          

          <Switch>
            {beers}
            <Route path="/">
              <BeersList />
            </Route>
          </Switch>

          <div className={styles.spinner_box}>
            <Spinner
              size={40}
              spinnerColor={'black'}
              spinnerWidth={5}
              visible={spinning}
            />
          </div>
        </Container>

      </div>
    </Router>
  )
}
App.propTypes = {
  spinning: PropTypes.bool,
  beerCount: PropTypes.number,
}

const mapStateToProps = ( state ) => {
  const { spinning, beerCount } = state.beerReducer

  return { spinning, beerCount }
}
export default connect(mapStateToProps)(App)
