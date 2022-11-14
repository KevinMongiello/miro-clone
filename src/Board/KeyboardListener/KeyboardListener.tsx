import React, { ReactElement, useEffect } from 'react';

/**
 * Helpers
 */
interface KeyboardListenerProps {
	children: ReactElement
}

type Void = () => void;

interface Sub {
	onkeydown: Void;
	onkeyup: Void;
}

interface SubMap {
	[k: string]: Sub
}

export type SubscribeKeys = (keys: string[], engage: Void, disengage: Void) => () => void

const join = (keys: string[]) => keys.join('+');

/**
 * Main
 */
const KeyboardListener = ({ children }: KeyboardListenerProps) => {
	const activeKey = React.useRef<string>('');
	const subs = React.useRef<SubMap>({});
	
	const unsubscribe = (key: string) => {
		delete subs.current[key];
	}

	const subscribeKeys: SubscribeKeys = (keys, engage, disengage) => {
		const key = join(keys);
		subs.current[key] = {
			onkeydown: engage,
			onkeyup: disengage
		}
		return () => unsubscribe(key);
	}

	const keydownListener = (e: any) => {
		if (!activeKey.current) {
			activeKey.current = e.code;
			subs.current[e.code]?.onkeydown();
		}
	}

	const keyupListener = (e: any) => {
		subs.current[e.code]?.onkeyup();
		activeKey.current = '';
	}

	useEffect(() => {
		window.addEventListener('keydown', keydownListener);
		window.addEventListener('keyup', keyupListener);
	}, [])

	return React.cloneElement(children, { subscribeKeys });
}

export default KeyboardListener;