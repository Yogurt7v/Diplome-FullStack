export const deleteImageFetch = async (id) => {
    fetch(`/upload/${id}`, {
        method: "DELETE",
    })
}