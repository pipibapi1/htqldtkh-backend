import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING;
mongoose.Promise = global.Promise;
if(connectionString){
    mongoose.connect(connectionString)
    .then(
        () => {
                console.log("Database is connected !!!");
            },
        )
    .catch(
        (err) => {
                console.log("Can not connect to the database " + err);
            });
}else{
    console.log("There is a problem with connection string !!!");
}