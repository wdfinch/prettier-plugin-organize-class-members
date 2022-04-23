import { getFormattedOutput, getOutput } from '../helpers'

describe('Methods', () => {
  it('should organize methods', () => {
    const d = [__dirname, 'simple']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it('should organize methods with ts accessibility', () => {
    const d = [__dirname, 'accessibility', 'ts-accessibility']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it('should organize methods with conventional accessibility', () => {
    const d = [__dirname, 'accessibility', 'conventional-accessibility']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it('should organize methods with js private accessibility', () => {
    const d = [__dirname, 'accessibility', 'js-private-methods']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it('should organize methods with getters and setters', () => {
    const d = [__dirname, 'getters-setters', 'conventional']
    expect(
      getFormattedOutput(d, {
        groupOrder: ['getterThenSetter', 'everythingElse'],
      })
    ).toEqual(getOutput(d))
  })

  it('should organize methods using groupOrder', () => {
    const d = [__dirname, 'getters-setters', 'getters-setters-last']
    expect(
      getFormattedOutput(d, {
        groupOrder: ['everythingElse', 'getterThenSetter'],
      })
    ).toEqual(getOutput(d))
  })

  it('should organize typescript getters and setters', () => {
    const d = [__dirname, 'getters-setters', 'ts-getter-setter']
    expect(
      getFormattedOutput(d, {
        groupOrder: ['getterThenSetter', 'everythingElse'],
      })
    ).toEqual(getOutput(d))
  })

  it('should organize static methods', () => {
    const d = [__dirname, 'static']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
