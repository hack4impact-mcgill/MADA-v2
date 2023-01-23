import React from 'react'

const Contact = () => {
  return (
    <div>
        <div className='Contact'>
            <h4>Contact</h4>
            <input type="number" placeholder='Number'/>
            <button>+</button>
        </div>
        <div className='buttons'>
            <button>Cancel</button>
            <button>Save Changes</button>
        </div>
    </div>
  )
}

export default Contact