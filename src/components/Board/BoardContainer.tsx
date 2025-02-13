import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router"
import { fetchBoard, saveBoard } from "../../api/boards";
import Board from "./Board";
import KeyboardListener from "./KeyboardListener/KeyboardListener";

export const BoardContainer = () => {
  const [board, setBoard] = useState(null);
  const params = useParams();
  const id = params.id;

  
  const onSaveBoard = useCallback(async (board: Board, id: string) => {
    try {
      await saveBoard(board, id);
    } catch (err) {
      console.log('unable to save board...')
    }
  }, []);

  const boardComponent = useMemo(() => (
    <KeyboardListener>
      {/*
        // @ts-ignore */}
      <Board saveBoard={onSaveBoard} config={board} />
    </KeyboardListener>
  ), [board])

  useEffect(() => {
    // fetch the board
    (async () => {
      const board = await fetchBoard(id);
      if (board) {
        setBoard(board);
      }
    })()
  }, []);

  return (
    board ?
    boardComponent :
      "Loading..."
  )
}