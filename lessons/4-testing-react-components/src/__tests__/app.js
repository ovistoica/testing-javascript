import React from 'react'
import {render} from '@testing-library/react'
import user from '@testing-library/user-event'
import App from '../app'
import {submitForm as mockSubmitForm} from '../api'

jest.mock('../api')

test('can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  const {findByLabelText, findByText} = render(<App />)

  user.click(await findByText(/fill.*form/i))

  const foodForm = await findByLabelText(/food/i)
  user.type(foodForm, testData.food)

  user.click(await findByText(/next/i))
  user.type(await findByLabelText(/drink/i), testData.drink)

  user.click(await findByText(/review/i))

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  user.click(await findByText(/confirm/i, {selector: 'button'}))

  user.click(await findByText(/home/i))

  expect(await findByText(/welcome home/i)).toBeInTheDocument()

  expect(mockSubmitForm).toHaveBeenCalledTimes(1)
  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
})
