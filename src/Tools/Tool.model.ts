import Board from "../Board/Board";
import { Position } from "../common/types";

export type PerformStart = (board: Board, p_0: Position) => void;
export type PerformMove = (board: Board, p_0: Position, p_1: Position) => void;
export type PerformEnd = (board: Board, p_0: Position, p_1: Position) => void;