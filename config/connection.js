const MongoClient = require("mongodb").MongoClient;
const state = { db: null };

module.exports.connect = function(done){
    const database_url = "mongodb://localhost:27017";
    const database_name = 'Farooq-Naeemi';

    MongoClient.connect(database_url, { useUnifiedTopology: true }, (err, data) => {
        if (err) return done(err);
        state.db = data.db(database_name);
        done();
    });
}
module.exports.get = function () {
    return state.db;
};