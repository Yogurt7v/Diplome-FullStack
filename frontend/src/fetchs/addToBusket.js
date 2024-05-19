import axios from "axios";

const addProductToBusket = (dataBusket) =>{

  axios.post("/buskets", {
    ...dataBusket,
  })
  }
  
  export const addProductToBusketOperationFetch = async ( items, discount) => {
    const [item] = items;
  
    let dataBusket = {
      userId: item.userId,
      delivered: false,
      paid: false,
      items: items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: (item.price - (item.price * discount) / 100).toFixed(2),
      }),
      ),
    };
    
    addProductToBusket(dataBusket);
  
  
    return {
      error: null,
      res: { ...dataBusket },
    };
  };
  