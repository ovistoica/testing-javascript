import React from 'react'
import {render} from '@testing-library/react'
import {axe} from 'jest-axe'

function Form() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input id="email" placeholder="email" />
    </form>
  )
}

test('the form is accessible', async () => {
  const {container} = render(<Form />)
  const res = await axe(container)
  expect(res).toHaveNoViolations()
})
