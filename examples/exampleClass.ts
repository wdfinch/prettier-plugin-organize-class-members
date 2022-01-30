export class Car {
  getName() {
    return this.name
  }

  static staticProperty = "someValue"

  deserialize() {
    return this.name
  }

  #serialize2() {
    return this.name
  }

  public1: string
  private name: string
  private year: string
  public2: string
  protected protected2: string
  protected protected1: string

  #serialize1() {
    return this.name
  }

  render() {
    return this.name
  }

  static staticMethod2() {
    return "static method has been called."
  }

  static staticMethod1() {
    return "static method has been called."
  }

  setName() {
    return this.name
  }

  constructor() {
    this.name = ""
    this.year = ""
    this.protected1 = ""
    this.protected2 = ""
    this.public1 = ""
    this.public2 = ""
  }
}
