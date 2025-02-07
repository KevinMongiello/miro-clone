interface NewBoardCardProps {
  onNewBoard: () => void;
}

export const NewBoardCard = ({ onNewBoard }: NewBoardCardProps) => {
  return (
    <div onClick={onNewBoard} className='card new-card'>
      <span>New board</span>
    </div>
  );
}