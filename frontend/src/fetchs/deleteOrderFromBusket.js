export const deleteBusketOrderFetch = async (id) => {
    await fetch(`/buskets/${id}`, {
        method: "DELETE",
    });
}