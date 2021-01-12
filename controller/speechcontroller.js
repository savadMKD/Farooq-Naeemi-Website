const collection = require("../config/collection"); // Collection Names
var db = require("../config/connection"); // Database Connection

module.exports = {
    // Adding Ramadan Speeches To The Server 
    add_ramadan_speech: (speech) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.RAMADAN_COLLECTION).insertOne(speech).then((data) => {
                resolve(data.ops[0]._id);
            });
        });
    },

    // Getting All Ramadan Speeches
    getAllRamadanSpeeches: () => {
        return new Promise( async (resolve, reject) => {
            let ramadan_speeches = await db.get().collection(collection.RAMADAN_COLLECTION).find().toArray();
            resolve(ramadan_speeches);
        });
    }
}