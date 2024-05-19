import axios from "axios";
export const setBusketOrdersParams = (id, paidParam, deliveryParam) => {
  axios.patch(`/buskets/${id}`, {
    paid: paidParam,
    delivered: deliveryParam,
  })
}