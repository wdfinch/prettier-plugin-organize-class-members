import { getFormattedOutput, getOutput } from '../../helpers'

describe('Multiple Classes', () => {
  it('should organize with multiple classes in the same file', () => {
    const d = [__dirname]
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
