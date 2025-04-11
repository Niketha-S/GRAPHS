// src/routes/api/correlation-lag/+server.js
import lagData from './lag_data.json';

export function GET() {
    return new Response(JSON.stringify(lagData), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}