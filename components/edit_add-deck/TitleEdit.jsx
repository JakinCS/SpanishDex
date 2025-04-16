'use client'

import { useRef, useState } from 'react'
import IconButton from '../IconButton'
import Form from 'react-bootstrap/Form'
import EditIcon from '@/public/icons/edit.svg'

const TitleEdit = ({ setState, titleValue, initialTitle, ...props }) => {
  // References the title input
  const titleInputRef = useRef(null)

  // Updates the main pages state with the new title value.
  const updateTitle = (e) => setState((prev) => ({...prev, title: e.target.value}))

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

  return (
    <div {...props} className={'d-flex align-items-center' + (props.className ? ` ${props.className}` : '')}>
      <h1 className={'fs-2' + (showEditTitle ? ' d-none' : '')}>{titleValue}</h1>
      <Form.Control 
        ref={titleInputRef}
        name='title' 
        type="text" 
        placeholder="title" 
        value={titleValue}
        onChange={updateTitle}
        onBlur={() => setShowEditTitle(false)}
        style={{maxWidth: '20rem'}}
        className={'fs-3 lh-1' + (showEditTitle ? '' : ' d-none')}
      />
      <IconButton className={'ms-2' + (showEditTitle ? ' d-none' : '')} variant='light' iconSrc={EditIcon} altTag='Edit icon' size={'sm'} onClick={handleShowEditTitle}/>
    </div>
  )
}

export default TitleEdit