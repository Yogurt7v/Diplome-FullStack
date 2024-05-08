const Report = require("../models/Report");

async function addReport(userId, text) {
    const report = new Report({
        userId: userId,
        text: text
    })
    await report.save();
}

async function getReports() {
    const reports = await Report.find();
    return reports;
}

async function deleteReport(id) {
    const report = await Report.findByIdAndDelete(id);
    console.log("deleteReport");
    return report;
}

module.exports = { getReports, addReport, deleteReport }