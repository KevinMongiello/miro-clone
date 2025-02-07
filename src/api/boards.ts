export const fetchBoards = async () => {
  try {
    const res = await fetch('/api/user/boards');
    const json = await res.json();
    return json;
  } catch (err) {
    console.log('Unable to fetch boards');
  }
};

export const createNewBoard = async () => {
  try {
    const res = await fetch('/api/user/board', {
      method: 'POST',
    });
    const board = await res.json();
    return board;
  } catch (err) {
    console.log('Unable to create board.');
  }
};
