export const getOrdersFetch = async () => {

    const orders = await fetch(`/buskets`)
    .then((loadedOrders) => loadedOrders.json())
    .then((loadedOrder) => 
      loadedOrder)

    return orders
  }