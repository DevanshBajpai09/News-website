import React from 'react'
import spinner from './spinner.gif'

const Spinner = () => {

  return (
    <div className='text-center'>
      <img className="my-3  bg-light text-dark" height={60} width={80} src={spinner} alt="spinner" />

    </div>
  )
}

export default Spinner
