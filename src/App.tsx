import React from 'react';
import Board from './Board/Board';
import KeyboardListener from './KeyboardListener/KeyboardListener';

function App() {
  return (
		<div>
			<KeyboardListener>
				{/* 
					// @ts-ignore */}
				<Board />
			</KeyboardListener>
		</div>
  );
}

export default App;
