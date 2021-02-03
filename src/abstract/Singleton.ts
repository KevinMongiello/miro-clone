export class Singleton {
	static instance = null;
	static get() {
		return this.instance;
	}

	constructor() {
		// @ts-ignore
		if (this.constructor.instance) {
			throw Error(this.constructor.name + ' is a singleton class, and initializiation is only allowed once at startup');
		}
		// @ts-ignore
		this.constructor.instance = this;
	}
}