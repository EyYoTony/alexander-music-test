import React from 'react'
import Header from '../containers/header'
import { Link } from 'react-router-dom'
import { TextField, Button } from 'jrs-react-components'
import BigButton from '../components/big-button'
import { connect } from 'react-redux'
import {
  SET_FAVORITE_NAME,
  SET_FAVORITE_BAND,
  SET_FAVORITE_POSTER,
  SET_FAVORITE_RANK,
  ADD_FAVORITE_TO_FAVORITES,
  CLEAR_FAVORITE
} from '../constants'

class Form extends React.Component {
  render() {
    const props = this.props
    return (
      <div>
        <Header />
        <main>
          <div className="mw6 pv2 ph3 center mt2">
            <div className="cf">
              <div className="fr">
                <Link to="/search">
                  <Button>Search</Button>
                </Link>
              </div>
            </div>
            <h2>Add New Favorite</h2>
            <form onSubmit={props.submitFavorite(props.history)}>
              <TextField
                value={props.favorite.name}
                onChange={props.setName}
                label="Name"
                optional={false}
                help="Enter Album Name"
              />
              <TextField
                value={props.favorite.band}
                onChange={props.setBand}
                label="Band"
                optional={false}
                help="Enter Band Name"
              />
              <TextField
                value={props.favorite.poster}
                onChange={props.setPoster}
                label="Poster"
                optional={false}
                help="Enter Album Poster Link"
              />
              <TextField
                value={props.favorite.rank}
                onChange={props.setRank}
                label="Rank"
                optional={false}
                help="Enter Rank"
                width={20}
              />
              <div className="mt4 center tc">
                <BigButton>Create Favorite</BigButton>
              </div>
            </form>
          </div>
        </main>
      </div>
    )
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

const handleSubmit = history => (dispatch, getState) => {
  const fav = getState().favorite
  fetch(process.env.REACT_APP_API + '/favorites', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(fav)
  })
    .then(res => res.json())
    .then(favorite => {
      dispatch({ type: ADD_FAVORITE_TO_FAVORITES, payload: favorite })
    })
  dispatch({ type: CLEAR_FAVORITE })
  history.push('/')
}

function mapActionsToProps(dispatch) {
  return {
    setName: e =>
      dispatch({ type: SET_FAVORITE_NAME, payload: e.target.value }),
    setBand: e =>
      dispatch({ type: SET_FAVORITE_BAND, payload: e.target.value }),
    setPoster: e =>
      dispatch({ type: SET_FAVORITE_POSTER, payload: e.target.value }),
    setRank: e =>
      dispatch({ type: SET_FAVORITE_RANK, payload: e.target.value }),
    submitFavorite: history => e => {
      e.preventDefault()
      dispatch(handleSubmit(history))
    }
  }
}

function mapStateToProps(state) {
  return { favorite: state.favorite }
}

export default connector(Form)
