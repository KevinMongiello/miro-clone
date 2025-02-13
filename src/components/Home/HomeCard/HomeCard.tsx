import { Link } from 'react-router';
import DropdownComponent from './Dropdown';

const HomeCard = (props: any) => {
  const { board } = props;
  const handleDelete = () => {
    props.handleDelete(board._id);
  };
  return (
    <div className="card">
      <DropdownComponent handleDelete={handleDelete} />
      <Link to={`board/${board._id}`}>
        <div className="preview"></div>
        <div className="footer">
          <div className="board-name">
            <p>{board.title}</p>
          </div>
          <div className="board-author fade-in">
            <p>{board.user || 'Unknown Author'}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeCard;
