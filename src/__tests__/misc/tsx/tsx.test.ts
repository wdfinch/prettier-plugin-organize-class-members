import { getFormattedOutput, getOutput } from '../../helpers'

describe('TSX', () => {
  it('should organize with tsx', () => {
    const d = [__dirname]
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
