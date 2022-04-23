import { getFormattedOutput, getOutput } from "../helpers"

describe("Methods", () => {
  it("should organize methods", () => {
    const d = [__dirname, "simple"]
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it("should organize methods with ts accessibility", () => {
    const d = [__dirname, "accessibility", "ts-accessibility"]
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
