import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

var ai = null;

export async function getToken(): Promise<boolean> {
    try {
        dotenv.config({ path: 'server/keys.env' });
        ai = new GoogleGenAI({ apiKey: process.env.GEMINI_TOKEN });
        await ai.files.list({ config: { pageSize: 10 } });;
        return true;

    } catch (e: any) {
        return false
    }
}