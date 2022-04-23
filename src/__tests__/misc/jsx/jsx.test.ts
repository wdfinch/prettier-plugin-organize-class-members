import { getFormattedOutput, getOutput } from '../../helpers'

describe('JSX', () => {
  it('should organize with jsx', () => {
    const d = [__dirname]
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
