export class Singleton {
  static instance: null | Singleton = null;
  static get() {
    return this.instance;
  }

  constructor() {
    if (Singleton.instance) {
      throw Error(Singleton.name + ' is a singleton class, and initializiation is only allowed once at startup');
    }
    Singleton.instance = this;
  }
}