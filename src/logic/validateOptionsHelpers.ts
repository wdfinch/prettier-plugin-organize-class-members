import { defaultOrder } from "./constants"
import { Order, PluginOptions } from "./types"

const isOrderValid = (order: Order) => {
  const getErrorMessage = (message: string) =>
    `${message} are required in order option`

  if (!order.includes("staticProperties")) {
    throw new Error(getErrorMessage("staticProperties"))
  }

  if (!order.includes("staticMethods")) {
    throw new Error(getErrorMessage("staticMethods"))
  }

  if (!order.includes("constructor")) {
    throw new Error(getErrorMessage("constructor"))
  }

  if (!order.includes("methods")) {
    throw new Error(getErrorMessage("methods"))
  }

  if (!order.includes("properties")) {
    throw new Error(getErrorMessage("properties"))
  }

  if (order.length !== defaultOrder.length) {
    throw new Error(
      "The order option cannot contain invalid or duplicate values"
    )
  }
}

export const areOptionsValid = (options: PluginOptions) => {
  isOrderValid(options.order)
}
