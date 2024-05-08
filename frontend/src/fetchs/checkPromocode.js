export const checkPromocodeFetch = async (promocode) => {
    const promo = await fetch(`/promocodes/${promocode}`)
    .then((loadedOrders) => loadedOrders.json())
    .then((loadedOrder) => loadedOrder)

    if (promo) {
        return promo.discount
    }
    else {
        return null
    }
}