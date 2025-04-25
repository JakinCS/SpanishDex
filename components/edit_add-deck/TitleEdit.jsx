'use client'

import { useEffect, useRef, useState } from 'react'
import IconButton from '../IconButton'
import Form from 'react-bootstrap/Form'
import EditIcon from '@/public/icons/edit.svg'

const TitleEdit = ({ setState, titleValue, ...props }) => {
  // References the title input
  const titleInputRef = useRef(null)

  // Updates the main pages state with the new title value.
  const updateTitle = (e) => setState((prev) => ({...prev, title: e.target.value}))

  // Holds the value of the title before the input element is blurred.
  const titleBeforeChanges = useRef(titleValue)

  // Show/Hide the title edit input field
  const [showEditTitle, setShowEditTitle] = useState(false);
  const handleShowEditTitle = () => {
    setShowEditTitle(true); 

    // Focus on the title input field after showing it.
    // Wait a little bit because doesn't work otherwise.
    setTimeout(() => {
      titleInputRef.current.focus()
    }, 25);    
  }
  // This function hides the edit input field and 
  // updates the title value and/or the titleBeforeChanges value
  const handleHideEditTitle = () => {
    setShowEditTitle(false);

    if (titleValue.trim().length === 0) {
      setState((prev) => ({...prev, title: titleBeforeChanges.current}))
    } else {
      setState((prev) => ({...prev, title: titleValue.trim()}))
      titleBeforeChanges.current = titleValue.trim();
    }
  }

  // On pressing "enter", blur the input element
  useEffect(() => {
    const checkKeyPressed = (e) => {
      if (e.key === 'Enter') {
        titleInputRef.current.blur();
      }
    }

    document.getElementById("editTitleInput").addEventListener('keydown', checkKeyPressed)

    return () => {
      if (document.getElementById("editTitleInput")) {
        document.getElementById("editTitleInput").removeEventListener('keydown', checkKeyPressed)
      }
    }
  }, [])

  return (
    <div {...props} className={'d-flex align-items-center' + (props.className ? ` ${props.className}` : '')}>
      <h1 className={'fs-2' + (showEditTitle ? ' d-none' : '')}>{titleValue}</h1>
      <Form.Control 
        id='editTitleInput'
        ref={titleInputRef}
        name='title' 
        type="text" 
        placeholder="title" 
        value={titleValue}
        onChange={updateTitle}
        onBlur={handleHideEditTitle}
        style={{maxWidth: '20rem'}}
        className={'fs-3 lh-1' + (showEditTitle ? '' : ' d-none')}
      />
      <IconButton className={'ms-2' + (showEditTitle ? ' d-none' : '')} variant='light' iconSrc={EditIcon} altTag='Edit icon' size={'sm'} onClick={handleShowEditTitle}/>
    </div>
  )
}

export default TitleEdit