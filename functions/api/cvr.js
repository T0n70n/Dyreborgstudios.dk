// Looks up a Danish company in the public CVR register via cvrapi.dk.
// GET /api/cvr?q=<CVR number or company name>
export async function onRequestGet({ request }) {
  const q = (new URL(request.url).searchParams.get('q') || '').trim();
  if (q.length < 2 || q.length > 80) return json({ error: 'bad_query' }, 400);

  const digits = q.replace(/\D/g, '');
  const param = /^\d{8}$/.test(digits) ? 'vat=' + digits : 'search=' + encodeURIComponent(q);
  const res = await fetch('https://cvrapi.dk/api?' + param + '&country=dk', {
    headers: { 'User-Agent': 'Dyreborg Studios - dyreborgstudios@gmail.com' },
    cf: { cacheTtl: 86400, cacheEverything: true },
  });
  if (res.status === 404) return json({});
  if (!res.ok) return json({ error: 'lookup_failed' }, 502);

  const d = await res.json();
  if (d.error) return json({});
  return json({
    name: d.name,
    cvr: String(d.vat || ''),
    address: d.address || '',
    zip: d.zipcode || '',
    city: d.city || '',
    phone: d.phone || '',
    email: d.email || '',
    industry: d.industrydesc || '',
  });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
