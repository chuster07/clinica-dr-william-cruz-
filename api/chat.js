/**
 * Vercel Serverless Function — /api/chat
 * Lee OPENROUTER_API_KEY en runtime (server-side), nunca expuesta al cliente.
 */
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const API_KEY = process.env.OPENROUTER_API_KEY;
    if (!API_KEY) {
        return res.status(500).json({ error: 'API key no configurada en el servidor' });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'messages requerido' });
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://clinica-dr-william-cruz.vercel.app',
                'X-Title': 'Clínica Dr. William Cruz'
            },
            body: JSON.stringify({
                model: process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free',
                messages,
                max_tokens: 300,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const err = await response.text();
            return res.status(response.status).json({ error: err });
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '';
        return res.status(200).json({ content });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
