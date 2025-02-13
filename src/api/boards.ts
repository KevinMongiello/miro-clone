import Board from "../components/Board/Board";
import { post } from "./util";

export const fetchBoards = async () => {
  try {
    const res = await fetch('/api/user/boards');
    const json = await res.json();
    return json;
  } catch (err) {
    console.log('Unable to fetch boards');
  }
};

export const fetchBoard = async (id?: string) => {
  try {
    if (!id) {
      throw Error('Unable to fetch a board without its id.');
    }
    const res = await fetch(`/api/user/board/${id}`);
    return await res.json();
  } catch (err) {
    console.log(`Unable to fetch board with id: ${id}.`);
  }
}

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

export const saveBoard = async (board: Board, id: string) => {
  try {
    const boardProperties = {
      objects: board.objects,
    }
    const res = await fetch(`/api/user/board/${id}`, {
      method: 'POST',
      ...post(boardProperties)
    });
    const json = await res.json();
  } catch (err) {
    console.log(err);
  }
}


export const deleteBoard = async (id: string) => {
  try {
    const res = await fetch(`/api/user/board/${id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    console.log('json: ', json);
  } catch (err) {
    console.log(err);
  }
}

