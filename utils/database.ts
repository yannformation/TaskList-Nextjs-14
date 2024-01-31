import mongoose, { ConnectOptions } from 'mongoose';

let isConnected: Boolean = false

export const connectToDB = async() => {
    mongoose.set('strictQuery', true)

    if(isConnected) {
        console.log('mongoDB est déjà connecté')
        return
    }

    try{
        await mongoose.connect(
            process.env.MONGODB_URI!, {
                dbName: 'tasks',
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }as ConnectOptions
        )

    }catch(error){
        console.log(error)
    }
}