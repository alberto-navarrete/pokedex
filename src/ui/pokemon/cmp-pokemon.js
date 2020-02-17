import React, { PureComponent } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ga from '../../utils/ga'

class Pokemon extends PureComponent {
  render() {
    const { pokemon } = this.props

    return (
      <div className="pokemon">
        <button
          type="button"
          className="pokemon__sprite"
          onClick={() => {
            ga.event({
              category: 'pokemon',
              action: 'click',
              label: pokemon.id
            })
          }}
          style={{
            backgroundImage: `url(${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.id
            }.png`})`
          }}
        />
        <p className="pokemon__name">{pokemon.name}</p>
        <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''} />
      </div>
    )
  }
}

export default Pokemon
