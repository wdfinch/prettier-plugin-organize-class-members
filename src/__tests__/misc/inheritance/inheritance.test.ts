import { getFormattedOutput, getOutput } from '../../helpers'

describe('Inheritance', () => {
  it('should organize with inheritance', () => {
    const d = [__dirname]
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
