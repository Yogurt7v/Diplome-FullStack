export const getReportsFetch = async () => {
    const response = await fetch("/reports", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    
    return data
}