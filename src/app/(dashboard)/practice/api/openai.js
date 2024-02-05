// pages/api/openai.js

import axios from 'axios';

export default async function handler(req, res) {
  const { data } = await axios.post(
    'https://api.openai.com/v1/your-endpoint',
    {
      // Your OpenAI API request payload
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  // Process the OpenAI API response
  res.status(200).json(data);
}
