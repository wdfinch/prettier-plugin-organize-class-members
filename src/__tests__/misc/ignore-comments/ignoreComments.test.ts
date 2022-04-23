import { getFormattedOutput, getOutput } from '../../helpers'

describe('Ignore Comments', () => {
  it('should not organize classes that contain ignore comments format-one', () => {
    const d = [__dirname, 'format-one']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it('should not organize classes that contain ignore comments format-two', () => {
    const d = [__dirname, 'format-two']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
