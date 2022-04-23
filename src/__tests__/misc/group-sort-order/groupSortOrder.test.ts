import { getFormattedOutput, getOutput } from '../../helpers'

describe('Group Sort Order', () => {
  it('should sort groups alphabetically', () => {
    const d = [__dirname, 'alphabetical']
    expect(
      getFormattedOutput(d, { classGroupSortOrder: 'alphabetical' })
    ).toEqual(getOutput(d))
  })
})
