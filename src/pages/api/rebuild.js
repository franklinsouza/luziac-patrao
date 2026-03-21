export async function GET({ request }) {
  const url = new URL(request.url);

  const secret = url.searchParams.get('secret');

  if (secret !== process.env.REBUILD_SECRET) {
    console.log('❌ Tentativa inválida');
    return new Response('Unauthorized', { status: 401 });
  }

  console.log('🟢 Rebuild autorizado');

  const res = await fetch(process.env.DEPLOY_HOOK_URL, {
    method: 'POST'
  });

  console.log('🚀 Status deploy:', res.status);

  return new Response('OK');
}