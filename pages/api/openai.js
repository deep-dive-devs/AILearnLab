// pages/api/openai.js
import openai from '../../utils/openai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const  userInput  = req.body.message;

      const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: userInput }],
        model: 'gpt-3.5-turbo',
      });
      console.log(response.choices[0].message.content, "this is the respnose")
      res.status(200).json({ response: response.choices[0].message.content});
    } catch (error) {
      console.error('Error generating OpenAI response:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}