export const addReportFetch = async (report) => {
    await fetch("/reports", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(report)
    });
}