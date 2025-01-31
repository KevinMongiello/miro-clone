import cn from 'classnames';
import { Tool } from '../Tools';

interface ToolsProps {
  tools: Tool[];
  current: Tool;
  setTool: (t: Tool) => void
}

export default function Tools({ tools, current, setTool }: ToolsProps) {
  return (
    <div className='tools ui'>
        {tools.map(tool => {
          const selected = tool.name === current.name;
          const classNames = cn('button', { selected });
          return (
            <div className={classNames} key={tool.name} onClick={() => setTool(tool)}>
              {tool.label}
            </div>
          )
        })}
      </div>
  )
}