import { getFormattedOutput, getOutput } from '../helpers'

describe('Integration', () => {
  it('should organize a complex class with default settings', () => {
    const d = [__dirname, 'default-settings']
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it('should organize a complex class with groups', () => {
    const d = [__dirname, 'groups']
    expect(
      getFormattedOutput(d, {
        classGroupOrder: ['gettersAndSetters', 'everythingElse'],
      })
    ).toEqual(getOutput(d))
  })

  it('should organize a complex class with custom section order', () => {
    const d = [__dirname, 'custom-section-order']
    expect(
      getFormattedOutput(d, {
        classGroupOrder: ['gettersAndSetters', 'everythingElse'],
        classSectionOrder: [
          'constructor',
          'methods',
          'properties',
          'staticMethods',
          'staticProperties',
        ],
      })
    ).toEqual(getOutput(d))
  })

  it('should organize a complex class with custom accessibility order', () => {
    const d = [__dirname, 'custom-accessibility-order']
    expect(
      getFormattedOutput(d, {
        classAccessibilityOrder: ['protected', 'private', 'public'],
      })
    ).toEqual(getOutput(d))
  })

  it('should organize a complex class with each group in alphabetical', () => {
    const d = [__dirname, 'alphabetical']
    expect(
      getFormattedOutput(d, {
        classGroupOrder: ['gettersAndSetters', 'everythingElse'],
        classGroupSortOrder: 'alphabetical',
      })
    ).toEqual(getOutput(d))
  })
})
