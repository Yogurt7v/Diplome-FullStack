export const deleteReportFetch = async (id) => {
    await fetch(`/reports/${id}`, {
        method: "DELETE",
    });
}