export const getOrderByUserIdFetch = async (userId) => {  

    const orders = await fetch(`/buskets/${userId}`)
    .then((loadedOrders) => loadedOrders.json())
    .then((loadedOrder) => 
      loadedOrder)
      
    return orders
  }