import { SubscribeKeys } from './KeyboardListener/KeyboardListener';
import { BoardObject } from './Objects/Object';
import { BoardObjectConfig } from './Objects/Object.model';

export interface ControlModel {
  name: string;
  label: string;
  disabled: boolean;
  action: () => void;
}

interface BoardConfigModel {
  _id: string;
  userId: string;
  title: string;
  objects: BoardObjectConfig[]
}

export interface BoardProps {
  subscribeKeys: SubscribeKeys;
  config: BoardConfigModel;
  saveBoard: ({ objects }: { objects: BoardObject[]}, id: string) => void;
}
