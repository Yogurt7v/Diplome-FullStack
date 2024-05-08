
const Session = require('../models/Sessions');


async function getSession(_id) {  
    const session = await Session.findOne({ hash: _id });
    return session;
}

async function addSession(hash, user) {
    const session = await Session.create({hash, user});
    console.log("createSession");
    return session;
}

async function deleteSession(sessionId) {
    const session = await Session.deleteOne({ _id: sessionId });
    console.log("deleteSession");
    return session;
}


module.exports = { addSession, deleteSession, getSession }


