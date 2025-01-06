import mongoose from "mongoose"

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!) // the not here shows that gurantee coming of variable and not undefined
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("MONGO_DB CONNECTED")
        })

        connection.on('error',(err)=>{
            console.log("Mongo db Connection error"+err)
            process.exit()
        })

    } catch (error) {
        console.log("Somethin went wrong in connecting to db")
        console.log(error)
    }
}