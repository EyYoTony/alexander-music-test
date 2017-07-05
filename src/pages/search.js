import React from 'react'
import Header from '../containers/header'
import { Link } from 'react-router-dom'
import { TextField } from 'jrs-react-components'
import BigButton from '../components/big-button'
import { SET_SEARCH_TEXT } from '../constants'
import { connect } from 'react-redux'

const Search = props =>
  <div>
    <Header />
    <main>
      <div className="mw6 center mt2 tl pa2">
        <h2>Enter Title of Song</h2>
        <form>
          <TextField
            value={props.searchText}
            onChange={props.setText}
            optional={false}
          />
          <div className="mt4 center tc">
            <BigButton>Search</BigButton>
          </div>
        </form>
      </div>
    </main>
  </div>

const connector = connect(mapStateToProps, mapActionsToProps)

function mapActionsToProps(dispatch) {
  return {
    setText: e => dispatch({ type: SET_SEARCH_TEXT, payload: e.target.value })
  }
}

function mapStateToProps(state) {
  return {
    searchText: state.search.searchText
  }
}

export default connector(Search)
