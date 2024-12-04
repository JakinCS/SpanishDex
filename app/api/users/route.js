import { MongoClient } from "mongodb";


export async function GET(req, res) {

    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();

        const database = client.db('sample_mflix');

        const collection = database.collection('users');
        const userData = await collection.find().toArray();

        // res.json(userData);
        return Response.json(userData);

    } catch (error) {
        console.log(error);
        // res.json({message: 'Error! Problem when getting users'})
        return Response.json({message: 'Error! Problem when getting users'})
    } finally {
        await client.close()
    }

    res.json()
}