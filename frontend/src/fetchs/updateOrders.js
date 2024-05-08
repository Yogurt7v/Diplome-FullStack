import { setBusketOrdersParams } from "../fetchs/setBusketOrdersParams";

export const updateBusketOrdersFetch = async ( objParams) => {

    const id = objParams.id;
    const paidParam = JSON.parse(objParams.paid);
    const deliveryParam = JSON.parse(objParams.delivery)
  
    setBusketOrdersParams(id, paidParam, deliveryParam);
  
  
    return {
      error: null,
      res: true,
    };
  };