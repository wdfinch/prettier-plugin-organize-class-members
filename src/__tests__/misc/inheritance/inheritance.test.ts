import { getFormattedOutput } from '../../helpers'

describe('Inheritance', () => {
  it('should organize with inheritance', () => {
    const d = [__dirname]
    console.log(getFormattedOutput(d))
    // expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
