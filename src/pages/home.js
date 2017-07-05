import React from 'react'
import Header from '../containers/header'
import {
  Button,
  List,
  ImageListItem,
  SimpleListItem
} from 'jrs-react-components'
import { map } from 'ramda'
import { connect } from 'react-redux'
import LinkButton from '../components/link-button'

const Home = function(props) {
  const li = function(music) {
    return (
      <ImageListItem
        id={music.id}
        title={music.name}
        image={music.poster}
        link={<LinkButton to={`/show/${music.id}`}>Details</LinkButton>}
      />
    )
  }

  return (
    <div>
      <Header />
      <main>
        <div className="mw6 center mt2 tc">
          <List>
            <SimpleListItem
              title="Add New Favorite"
              link={<LinkButton to="/new">Add</LinkButton>}
            />
            {map(li, props.favorites)}
          </List>
        </div>
      </main>
    </div>
  )
}

const connector = connect(mapStateToProps)

function mapStateToProps(state) {
  return {
    favorites: state.favorites
  }
}

export default connector(Home)

function openDocs(e) {
  if (/localhost/.test(window.location.href)) {
    window.location = 'http://localhost:5000'
  } else {
    window.location =
      'https://github.com/jrs-innovation-center/jrscode-react-starter#jrs-react-starter-kit'
  }
}
