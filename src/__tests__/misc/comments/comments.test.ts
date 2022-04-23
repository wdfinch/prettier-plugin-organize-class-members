import { getFormattedOutput, getOutput } from "../../helpers"

describe("Constructor", () => {
  it("should organize constructor", () => {
    const d = [__dirname]
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
