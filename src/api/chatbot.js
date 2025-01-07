import { createEvent } from '../supabaseClient';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    const { prompt, response_type } = req.body;

    if (!prompt || !response_type) {
        res.status(400).json({ error: 'Missing required fields: prompt and response_type' });
        return;
    }

    console.log('Received chatbot request:', { prompt, response_type });

    try {
        const aiResponse = await createEvent('chatgpt_request', {
            prompt,
            response_type
        });
        console.log('AI response:', aiResponse);
        res.status(200).json({ response: aiResponse });
    } catch (error) {
        console.error('Error processing chatbot request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}