import { SubscribeKeys } from "../KeyboardListener/KeyboardListener";

export interface ControlModel {
  name: string;
  label: string;
  disabled: boolean;
  action: () => void;
}

export interface BoardProps {
  subscribeKeys: SubscribeKeys;
}