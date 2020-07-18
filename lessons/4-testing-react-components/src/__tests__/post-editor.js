import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {Redirect as MockRedirect} from 'react-router'
import {Editor} from '../post-editor'
import {savePost as mockSavedPost} from '../api'

jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

test('renders a form with title, content, tags and a submit button', async () => {
  const fakePost = {
    title: 'Test Title',
    content: 'Test Content',
    tags: ['tag1', 'tag2'],
  }
  const fakeUser = {id: 'user-1'}

  mockSavedPost.mockResolvedValueOnce()
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags

  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavedPost).toHaveBeenCalledTimes(1)
  expect(mockSavedPost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })

  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})
