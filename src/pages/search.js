import React from 'react'
import Header from '../containers/header'
import { Link } from 'react-router-dom'
import { TextField, List, ImageListItem, Button } from 'jrs-react-components'
import BigButton from '../components/big-button'
import { SET_SEARCH_TEXT, SET_SEARCH_RESULTS, SET_FAVORITE } from '../constants'
import { map } from 'ramda'
import { connect } from 'react-redux'

const Search = function(props) {
  const li = function(album) {
    return (
      <ImageListItem
        id={album.id}
        title={album.name}
        image={album.poster}
        link={
          <Button onClick={props.selectAlbum(props.history, album)}>
            Select
          </Button>
        }
      />
    )
  }
  return (
    <div>
      <Header />
      <main>
        <div className="mw6 center mt2 tl pa2">
          <h2>Enter Title of Album</h2>
          <form onSubmit={props.submitSearch}>
            <TextField
              value={props.searchText}
              onChange={props.setText}
              optional={false}
            />
            <div className="mt4 center tc">
              <BigButton>Search</BigButton>
            </div>
          </form>
          <List>
            {map(li, props.searchResults)}
          </List>
        </div>
      </main>
    </div>
  )
}
const connector = connect(mapStateToProps, mapActionsToProps)

const fetchResults = (dispatch, getState) => {
  const searchText = getState().search.text
  const url = process.env.REACT_APP_MUSIC
  const token = process.env.REACT_APP_MUSIC_TOKEN
  fetch(`${url}?q=${searchText}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(searchResults => {
      console.log(searchResults)
      if (searchResults.Response === 'False') {
        alert('No music found')
        return
      }
      dispatch({ type: SET_SEARCH_RESULTS, payload: searchResults })
    })
}

const handleSelect = (history, album) => (dispatch, getState) => {
  dispatch({ type: SET_FAVORITE, payload: album })
  history.push('/new')
}

function mapActionsToProps(dispatch) {
  return {
    setText: e => dispatch({ type: SET_SEARCH_TEXT, payload: e.target.value }),
    submitSearch: e => {
      e.preventDefault()
      dispatch(fetchResults)
    },
    selectAlbum: (history, album) => e => {
      e.preventDefault()
      dispatch(handleSelect(history, album))
    }
  }
}

function mapStateToProps(state) {
  return {
    searchText: state.search.text,
    searchResults: state.search.results
  }
}

export default connector(Search)
