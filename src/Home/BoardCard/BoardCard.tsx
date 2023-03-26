import React from 'react'
import { Link } from 'react-router-dom'
import DropdownComponent  from './Dropdown';

const BoardCard = ({ board }: any) => {
  return (
    <div className="card">
      <DropdownComponent />
      <Link to={`board/${board.id}`}>
        <div className='preview'></div>
        <div className="footer">
          <div className='board-name'>
            <p>{board.name}</p>
          </div>
          <div className='board-author fade-in'>
            <p>{board.user}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BoardCard
