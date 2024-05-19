export const fecthBusket = async () => {

    const busket = await fetch(`/buskets`)
    .then((loadedBusket) => loadedBusket.json())
    .then((loadedBusk) => loadedBusk);

  
    return {
      error: null,
      res: busket
    }
  }