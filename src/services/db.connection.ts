import { MongoClient } from 'mongodb';

export async function dbConnection(dbName: string) {
  const client = new MongoClient(process.env.MONGODB_URI?.toString() ?? '');
  await client.connect();
  const db = client.db(dbName);
  return { db, client };
}
