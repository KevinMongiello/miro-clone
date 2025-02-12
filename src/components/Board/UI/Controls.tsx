import { ControlModel } from '../Board.model';

interface ControlsProps {
  controls: ControlModel[];
}

export default function Controls({ controls }: ControlsProps) {
  return (
    <div className="controls ui">
      {controls.map((control) => (
        <div className="button" key={control.name} onClick={control.action}>
          {control.label}
        </div>
      ))}
    </div>
  );
}
