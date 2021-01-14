const { response } = require("express");
const { ObjectID } = require("mongodb");
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
    },

    // Delete Ramadan Speeches
    deleteRamadanSpeeches: (speech_id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.RAMADAN_COLLECTION).removeOne({ _id: ObjectID(speech_id) }).then((speeches) => {
                resolve(speeches);
            });
        });
    },

    // Get Ramadan Details and Print on the front end
    getRamadanSpeechDeatils: (speech_id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.RAMADAN_COLLECTION).findOne({ _id: ObjectID(speech_id) }).then((speeches) => {
                resolve(speeches);
            });
        });
    },

    // Update Ramadan Speech Details
    updateRamadanSpeech: (speech_id, speech_details) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.RAMADAN_COLLECTION).updateOne(
                { _id: ObjectID(speech_id) },
                {
                    $set: {
                        name: speech_details.name,
                        sub_heading: speech_details.sub_heading,
                        link: speech_details.link
                    }
                }
            ).then((response) => {
                resolve();
            });
        });
    }
}