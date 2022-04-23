import { getFormattedOutput, getOutput } from '../helpers'

describe('Properties', () => {
  it('should organize properties', () => {
    const d = [__dirname, 'simple']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it('should organize properties by conventional accessibility', () => {
    const d = [__dirname, 'accessibility', 'conventional-accessibility']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it('should organize properties by js private properties', () => {
    const d = [__dirname, 'accessibility', 'js-private-properties']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it('should organize properties by ts accessibility', () => {
    const d = [__dirname, 'accessibility', 'ts-accessibility']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it('should organize static properties', () => {
    const d = [__dirname, 'static']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
