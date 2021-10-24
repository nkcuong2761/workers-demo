import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

const headers = { 'Content-Type': 'text/html' }
const template = require('./post')

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

/**
  * @param {Request} request
  */
async function handleRequest(request) {
  const entries = await PREVIEW_KV.list()
  if (entries === null) {
    return new Response("entries not found", {status: 400})
  }
  let a=[]
  const values = await Promise.all(entries.keys.map(async (key) => {
    let g = await PREVIEW_KV.get(key.name)
    // console.log(g);
    a.push(g)
  }))
  // console.log(values);
  return new Response(template(a), {headers})
}

async function handleEvent(event) {
  try {
    return await getAssetFromKV(event);
  } catch (e) {
    let pathname = new URL(event.request.url).pathname;
    return new Response(`"${pathname}" not found`, {
      status: 404,
      statusText: "not found"
    });
  }
}
