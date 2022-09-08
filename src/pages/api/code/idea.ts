import { NextApiRequest,NextApiResponse } from "next";
import { config } from 'dotenv'
config();
const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


const openai = new OpenAIApi(
    new Configuration({
        apiKey: OPENAI_API_KEY,
    })
);
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { prompt } = req.body
const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Brainstorm some ideas about ${prompt} - `,
    temperature: 0.6,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
});
res.status(200).json(response.data.choices[0].text);
    
}