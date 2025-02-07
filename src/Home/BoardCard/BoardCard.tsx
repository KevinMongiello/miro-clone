import { Link } from 'react-router'
import DropdownComponent  from './Dropdown';

const BoardCard = ({ board }: any) => {
  return (
    <div className="card">
      <DropdownComponent />
      <Link to={`board/${board._id}`}>
        <div className='preview'></div>
        <div className="footer">
          <div className='board-name'>
            <p>{board.title}</p>
          </div>
          <div className='board-author fade-in'>
            <p>{board.user || 'Unknown Author'}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BoardCard
