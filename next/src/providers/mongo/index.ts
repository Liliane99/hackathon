import { MongoClient } from "mongodb";
import { envs } from "../../envs";

const client = new MongoClient(envs.ME_CONFIG_MONGODB_URL);

const database = client.db(envs.MONGO_DB_NAME);

await client.connect();

export const mongo = {
  client,
  database,
};
