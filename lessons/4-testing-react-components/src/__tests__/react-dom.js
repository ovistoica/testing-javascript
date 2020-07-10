import React from 'react'
import {FavoriteNumber} from '../favorite-number'
import {render} from '@testing-library/react'

test('renders a number input with an input "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
