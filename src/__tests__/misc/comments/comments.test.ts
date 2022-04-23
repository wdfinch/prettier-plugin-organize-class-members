import { getFormattedOutput, getOutput } from '../../helpers'

describe('Comments', () => {
  it('should organize with comments', () => {
    const d = [__dirname]
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
