export const getPromocodeFetch = async () => {
    const promo = await fetch("/promocodes/")
    .then((loadedOrders) => loadedOrders.json())
    .then((loadedOrder) => 
      loadedOrder)
    return promo
  }