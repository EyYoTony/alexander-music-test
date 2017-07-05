import React from 'react'
import MusicCard from '../components/music-card'
import Header from '../containers/header'
import BigButton from '../components/big-button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { find } from 'ramda'
import { SET_FAVORITE, CLEAR_FAVORITE } from '../constants'

class Show extends React.Component {
  componentDidMount() {
    const props = this.props
    const showID = props.match.params.id
    const foundMusic = find(
      music => String(music.id) === showID,
      props.favorites
    )
    props.dispatch({ type: SET_FAVORITE, payload: foundMusic })
  }

  render() {
    const fav = this.props.favorite
    return (
      <div>
        <Header />
        <main>
          <div className="mw6 center mt2 tc">
            <MusicCard image={fav.poster} title={fav.name} />
          </div>
          <div className="mw6 tc center">
            <a
              className="link ba br2 w4 pa2 center db mb3"
              href={fav.href}
              target="_blank"
            >
              Play Album
            </a>
            <Link to="/">
              <BigButton>Return</BigButton>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  componentWillUnmount() {
    this.props.dispatch({ type: CLEAR_FAVORITE })
  }
}

const connector = connect(mapStateToProps)

function mapStateToProps(state) {
  return {
    favorite: state.favorite,
    favorites: state.favorites
  }
}

export default connector(Show)
