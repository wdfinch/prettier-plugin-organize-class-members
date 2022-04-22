import { getFormattedOutput, getOutput } from "../../helpers"

describe("Constructor", () => {
  it("should organize constructor", () => {
    expect(getFormattedOutput(__dirname, "simple")).toEqual(
      getOutput(__dirname, "simple")
    )
  })

  it("should organize constructor with a custom order", () => {
    expect(getFormattedOutput(__dirname, "simple")).toEqual(
      getOutput(__dirname, "simple")
    )
  })
})
