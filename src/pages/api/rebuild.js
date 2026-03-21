// src/pages/api/rebuild.js
let running = false;

export async function GET({ request }) {
  if (running) {
    return new Response('Já em execução');
  }

  running = true;

  try {
    await fetch('https://api.vercel.com/v1/integrations/deploy/prj_ejZOlSeX0pLkQpqnR42Gk0wfBorY/PN4kweqWzC', {
      method: 'POST'
    });
  } finally {
    running = false;
  }

  return new Response('OK');
}


// let lastRun = 0;

// export async function GET({ request }) {
//   const url = new URL(request.url);
//   const secret = url.searchParams.get('secret');

//   if (secret !== process.env.REBUILD_SECRET) {
//     return new Response('Unauthorized', { status: 401 });
//   }

//   const now = Date.now();

//   // bloqueia execuções em menos de 5 min
//   if (now - lastRun < 1000 * 60 * 5) {
//     console.log('⏳ Ignorado (muito recente)');
//     return new Response('Too soon');
//   }

//   lastRun = now;

//   console.log('🚀 Disparando deploy');

//   await fetch(process.env.DEPLOY_HOOK_URL, {
//     method: 'POST'
//   });

//   return new Response('OK');
// }