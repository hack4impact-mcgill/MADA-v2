import React from 'react'

const Account = () => {
  return (
    <div className='Account'>
        <div className='Email'>
            <h4>Email</h4>
            <input type="text" placeholder='Email' />
        </div>
        <div className='Username'>
            <h4>Username</h4>
            <input type="text" placeholder='Username'/>
        </div>
    </div>

  )
}

export default Account