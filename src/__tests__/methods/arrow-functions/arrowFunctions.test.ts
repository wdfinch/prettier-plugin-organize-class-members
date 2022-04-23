import { getFormattedOutput, getOutput } from "../../helpers"

describe("arrowFunctions", () => {
  it("should organize with arrow functions", () => {
    const d = [__dirname]
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })
})
