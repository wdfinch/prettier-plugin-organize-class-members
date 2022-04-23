import { getFormattedOutput, getOutput } from '../../helpers'

describe('Non Class Code', () => {
  it('should not be organized sample one', () => {
    const d = [__dirname, 'sample-one']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it('should not be organized sample two', () => {
    const d = [__dirname, 'sample-two']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it('should not be organized sample three', () => {
    const d = [__dirname, 'sample-three']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
