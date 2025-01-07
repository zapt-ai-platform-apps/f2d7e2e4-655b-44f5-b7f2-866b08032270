import * as Sentry from "@sentry/node";
import { initializeZapt } from '@zapt/zapt-js';

// Initialize Zapt
const { createEvent } = initializeZapt(process.env.VITE_PUBLIC_APP_ID);

// Initialize Sentry
Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const result = await createEvent('chatgpt_request', {
      prompt,
      response_type: 'text',
    });

    res.status(200).json({ data: result });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}