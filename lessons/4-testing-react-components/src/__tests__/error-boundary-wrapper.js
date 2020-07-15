import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import {ErrorBoundary} from '../error-boundary'
import {reportError as mockReportError} from '../api'

jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

/* Prevent react from outputting caught error with console.error */
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
})

function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('BOOM')
  } else {
    return null
  }
}

test('calls reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})
  const {
    rerender,
    getByText,
    getByRole,
    queryByRole,
    queryByText,
  } = render(<Bomb />, {wrapper: ErrorBoundary})

  rerender(<Bomb shouldThrow={true} />)

  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}

  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)

  /* We ensure console.error was only called once by the jsDOM and once by the React DOM 
     to ensure that we don't miss any important console.error messages */
  expect(console.error).toHaveBeenCalledTimes(2)

  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was a problem."`,
  )

  /* Reset the number of times the functions were called but leaves the implementation intact */
  console.error.mockClear()
  mockReportError.mockClear()

  rerender(<Bomb />)

  fireEvent.click(getByText(/try again/i))

  expect(mockReportError).not.toHaveBeenCalled()
  expect(mockReportError).not.toHaveBeenCalled()
  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(queryByText(/try again/i)).not.toBeInTheDocument()
})
