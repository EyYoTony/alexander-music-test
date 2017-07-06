import React from 'react'
import Header from '../containers/header'
import MusicCard from '../components/music-card'
import BigButton from '../components/big-button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const EditRank = function(props) {
  const fav = props.favorite
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
            <BigButton>Confirm</BigButton>
          </Link>
        </div>
      </main>
    </div>
  )
}

const connector = connect(mapStateToProps)

function mapStateToProps(state) {
  return {
    favorite: state.favorite
  }
}

export default connector(EditRank)
