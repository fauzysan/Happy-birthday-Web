import http from 'node:http';
import { readFile } from 'node:fs/promises';
const routes={'/':'index.html','/index.html':'index.html','/style.css':'style.css','/app.js':'app.js','/favicon.svg':'favicon.svg'};
const types={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8',svg:'image/svg+xml'};
const port=Number(process.env.PORT||3000);
http.createServer(async(req,res)=>{try{const file=routes[new URL(req.url,'http://localhost').pathname];if(!file){res.writeHead(404);res.end('Not found');return;}const data=await readFile(new URL(file,import.meta.url));res.writeHead(200,{'Content-Type':types[file.split('.').pop()]});res.end(data);}catch{res.writeHead(500);res.end('Unable to load page');}}).listen(port,'0.0.0.0',()=>console.log(`Local preview: http://localhost:${port}`));
