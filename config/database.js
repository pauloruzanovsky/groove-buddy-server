import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });
import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();
export const db = client.db('spotify-playlists');