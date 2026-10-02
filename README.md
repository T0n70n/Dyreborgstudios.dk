# Dyreborg Studios: hjemmeside

Klar til Cloudflare Pages. Bygget 2. oktober 2026.

## Indhold
- `index.html`: hele siden (billeder og skabeloner er indbygget).
- `favicon.svg`: ikonet i browserfanen.
- `functions/api/cvr.js`: CVR-søgning med forslag, mens man skriver. Bruger Erhvervsstyrelsens gratis CVR-adgang, når `CVR_USER` og `CVR_PASS` er sat i Cloudflare. Ellers prøver den cvrapi.dk.
- `functions/api/lead.js`: sender hver henvendelse til din mail via Web3Forms.

## Sådan kommer den online (anbefalet: via GitHub)
1. Opret et tomt repository på GitHub, fx `dyreborg-studios`, og forbind GitHub til Claude på https://claude.ai/connect-github. Så kan Claude lægge filerne op og opdatere siden senere.
2. I Cloudflare: Workers & Pages > Create > Pages > Connect to Git > vælg repositoriet. Build command: ingen. Output directory: `/`.
3. Hent en gratis nøgle på https://web3forms.com med dyreborgstudios@gmail.com.
4. I Cloudflare-projektet: Settings > Variables and Secrets > tilføj `WEB3FORMS_KEY` med nøglen. Deploy igen.
5. Custom domains > tilføj dit domæne, fx dyreborgstudios.dk.

## Hurtig løsning uden GitHub
Workers & Pages > Create > Pages > Upload assets > træk mappen ind. Siden virker, men CVR-søgning og formularer kræver Functions, som ikke kommer med ved træk-og-slip. Folk kan stadig skrive deres oplysninger selv og ringe til dig.

## Godt at vide
- Adgang til CVR-data søges gratis hos Erhvervsstyrelsen på cvrselvbetjening@erst.dk. Søgninger caches i et døgn.
- Anmeldelser er ikke med, før du har rigtige anmeldelser.
