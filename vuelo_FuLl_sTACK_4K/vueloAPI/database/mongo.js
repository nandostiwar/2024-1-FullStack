const { connect, set } = require('mongoose');

const DB_URI = `mongodb+srv://miguelangelduque2000:ugWyJqNl6ZlDqqlQ@cluster0.6ilpwi6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const dbInit = async () => {
    set("strictQuery", false);
    await connect(`${DB_URI}`);
    console.log("Init DB");
};

module.exports = {
    dbInit
}