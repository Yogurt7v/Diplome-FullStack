export const getAllImagesFetch = async () => {
    const response = await fetch("/upload/allImages", {
        method: "POST",
    });
    const data = await response.json();
    return data;
}