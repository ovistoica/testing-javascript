import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-02-dependency-injection'

/* Dependency inject for environments that don't support module mocking like storybook */
test('loads greeting on click', async () => {
  const mockLoadGreeting = jest.fn()
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
  const {getByLabelText, getByText} = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />,
  )
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
