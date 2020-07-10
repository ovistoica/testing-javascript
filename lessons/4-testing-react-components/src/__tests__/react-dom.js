import React from 'react'
import ReactDOM from 'react-dom'
import {FavoriteNumber} from '../favorite-number'
test('renders a number input with an input "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
})
