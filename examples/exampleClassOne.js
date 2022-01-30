export class Car {
  getName() {
    return this.name
  }

  deserialize() {
    return this.name
  }

  #serialize() {
    return this.name
  }

  render() {
    return this.name
  }

  static staticMethod2() {
    return 'static method has been called.';
  }

  static staticMethod1() {
    return 'static method has been called.';
  }

  setName() {
    return this.name
  }

  constructor(name, year) {
    this.name = name
    this.year = year
  }
}
