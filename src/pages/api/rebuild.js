// src/pages/api/rebuild.js
let running = false;

export async function GET({ request }) {
  if (running) {
    return new Response('Já em execução');
  }

  running = true;

  try {
    await fetch('https://api.vercel.com/v1/integrations/deploy/prj_ejZOlSeX0pLkQpqnR42Gk0wfBorY/evXK6jZUqF', {
      method: 'POST'
    });
  } finally {
    running = false;
  }

  return new Response('OK');
}