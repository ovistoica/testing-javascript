import React, {useState} from 'react'
import {savePost} from './api'
import {Redirect} from 'react-router'

function Editor({user}) {
  const [isSaving, setIsSaving] = useState(false)
  const [redirect, setRedirect] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: user.id,
    }
    savePost(newPost).then(() => setRedirect(true))
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" name="title" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" name="content" />

      <label htmlFor="tags-input">Tags</label>
      <textarea id="tags-input" name="tags" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  )
}

export {Editor}
