import React from 'react'

const MenuItem = ({ title, url, id, favicon } : any) => {
  return (
    <div className="option-div">
      <li className="menu-option"><a>{title}</a></li>
    </div>
  )
}

export default MenuItem
