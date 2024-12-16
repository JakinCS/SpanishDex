import { MongoClient } from "mongodb";


export async function GET(req) {

    console.log("MONGODB_URI:", process.env.MONGODB_URI);

    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();

        const database = client.db('sample_mflix');

        const collection = database.collection('users');
        const userData = await collection.find().toArray();

        await client.close()
        return Response.json(userData);

    } catch (error) {
        console.log(error);

        await client.close()
        return Response.json({message: 'Error! Problem when getting users. ' + error})
    }
}