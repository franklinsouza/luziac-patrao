// src/pages/api/rebuild.js

export async function GET() {
  await fetch('https://api.vercel.com/v1/integrations/deploy/prj_ejZOlSeX0pLkQpqnR42Gk0wfBorY/evXK6jZUqF', {
    method: 'POST'
  });

  return new Response('Rebuild triggered');
}