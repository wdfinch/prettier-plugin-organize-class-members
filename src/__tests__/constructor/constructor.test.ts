import {
  getFormattedOutput,
  getOutput,
  getSectionOrderOption,
} from "../helpers"

describe("Constructor", () => {
  it("should organize constructor", () => {
    const d = [__dirname, "simple"]
    expect(getFormattedOutput(d)).toEqual(getOutput(d))
  })

  it("should organize constructor with a custom order", () => {
    const d = [__dirname, "custom-order"]

    expect(
      getFormattedOutput(d, {
        sectionOrder: getSectionOrderOption("constructor"),
      })
    ).toEqual(getOutput(d))
  })
})
