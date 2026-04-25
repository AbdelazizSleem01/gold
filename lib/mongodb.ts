import { MongoClient, type Db } from "mongodb"

/**
 * MongoDB Connection Helper
 * Reuses a single client across hot reloads in dev and serverless invocations.
 */

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set")
}

const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

export async function getDb(): Promise<Db> {
  const c = await clientPromise
  // Default DB name is "gold-prices" but we let the URI override.
  return c.db(process.env.MONGODB_DB || "gold-prices")
}
