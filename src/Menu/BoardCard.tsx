import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'

const BoardCard = ({ board }: any) => {
  const [menuId, setMenuId] = useState(0)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="card">
      <div className="menu">
          <i className="fa-solid fa-ellipsis" onClick={()=> [menuId == board.id  ? setMenuId(0) : setMenuId(board.id), !showMenu ? setShowMenu(true) : setShowMenu(false)]}> </i>
          {showMenu && menuId == board.id &&
            <div>
              <Dropdown/>
            </div>
          }
      </div>
      <div className="text-div">
        <Link className="link" to={`board/${board.id}`}>{board.name}</Link>
        <p className="name">{board.user}</p>
      </div>
    </div>
  )
}

export default BoardCard
