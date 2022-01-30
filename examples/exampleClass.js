export class Car {
  getName() {
    return this.name
  }

  static staticProperty = 'someValue'

  deserialize() {
    return this.name
  }

  #serialize2() {
    return this.name
  }

  #serialize1() {
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
