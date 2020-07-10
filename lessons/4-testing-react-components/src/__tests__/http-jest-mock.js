import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-01-mocking'
import {loadGreeting as mockLoadGreeting} from '../api'

jest.mock('../api')

test('loads greeting on click', async () => {
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
  const {getByLabelText, getByText} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)

  nameInput.value = 'Mary'
  fireEvent.click(loadButton)

  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)

  /* Wait for the mock api to finish and check if the div has been set to the new value */
  await wait(() => {
    const greeting = getByLabelText(/greeting/i)
    expect(greeting).toHaveTextContent(testGreeting)
  })
})
