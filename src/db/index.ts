import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const connectionString = process.env.DATABASE_URL;

export const hasDatabase = Boolean(connectionString);

export const client = connectionString
  ? postgres(connectionString, { prepare: false, max: 5 })
  : null;

export const db = client ? drizzle(client, { schema }) : null;
