const { connect, set } = require('mongoose');

const DB_URI = `mongodb+srv://josevelez01:shogunei@cluster0.a7jbxgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const dbInit = async () => {
    set("strictQuery", false);
    await connect(`${DB_URI}`);
    console.log("Init DB");
};

module.exports = {
    dbInit
}