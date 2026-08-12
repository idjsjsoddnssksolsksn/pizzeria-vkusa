import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC = path.join(__dirname, 'public');
const DATA_FILE = path.join(__dirname, 'orders.json');

function loadEnvFile() {
  const p = path.join(__dirname, '.env');
  if (!fs.existsSync(p)) return;
  const text = fs.readFileSync(p, 'utf8');
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const i = line.indexOf('=');
    if (i < 0) continue;
    const k = line.slice(0, i).trim();
    const v = line.slice(i + 1).trim();
    if (!(k in process.env)) process.env[k] = v;
  }
}
loadEnvFile();

const PORT = Number(process.env.PORT || 3000);
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const DEMO_MODE = String(process.env.DEMO_MODE || 'true').toLowerCase() === 'true';
const SHOP_ID = process.env.YOOKASSA_SHOP_ID || '';
const SECRET = process.env.YOOKASSA_SECRET_KEY || '';
const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

const MENU = [
  {category:'Пицца',items:[
    ['Маргарита',400,'Тесто, соус из свежих томатов, сыр моцарелла, помидор, базилик'],
    ['Пепперони',450,'Тесто, томатный соус, моцарелла, перец, маслины, пепперони, орегано'],
    ['4 сыра',450,'Сливочный соус, моцарелла, гауда, дор блю, пармезан'],
    ['Курица с грибами',450,'Сливочный соус, куриное филе, шампиньоны, зелень'],
    ['Охотничья',450,'Сливочный и томатный соус, куриное филе, охотничьи колбаски, лук, зелень'],
    ['BBQ с барбекю',450,'Соус BBQ, томатный соус, грибы, лук, говядина'],
    ['Мясная',450,'Томатный соус, колбаски, курица, говядина, лук, помидоры'],
    ['Груша горгонзола',350,'Сливочный соус, груша, горгонзола, орехи, карамель'],
    ['Деревенская',450,'Моцарелла, сливочный соус, ветчина, сервелат, грибы, помидоры, курица'],
    ['С морепродуктами',450,'Лосось, краб, мидии, сливочный соус, пармезан'],
    ['Гавайская',400,'Моцарелла, томатный соус, ананас, ветчина, куриное филе'],
    ['Perfecto острая',450,'Моцарелла, соусы, грибы, говядина, перец, колбаски, курица, спайси'],
    ['С ветчиной и грибами',400,'Моцарелла, томатный соус, ветчина, грибы'],
    ['Ассорти',450,'Сливочный и томатный соус, моцарелла, грибы, лук, курица, колбаски'],
    ['Поло',450,'Томатный и сливочный соус, моцарелла, перец, лук, куриное филе'],
    ['Мексика',450,'Томатный соус, чили, моцарелла, перец, колбаски, халапеньо, кукуруза, курица'],
    ['Куриная',400,'Сливочный соус, куриное филе, помидоры, зелень'],
    ['Цезарь',400,'Сливочный соус, куриное филе, помидоры, листья салата, соус Цезарь']
  ]},
  {category:'Холодные роллы',items:[
    ['Филадельфия',350,'Сыр, огурец, сливочный сыр, лосось'],
    ['Филадельфия карамель',300,'Сыр, огурец, сливочный сыр, лосось, тростниковый сахар'],
    ['Филадельфия с угрем',350,'Сыр, нори, огурец, угорь, унаги, кунжут'],
    ['Калифорния',300,'Сыр, краб, огурец, тобико, нори'],
    ['Калифорния с угрем',350,'Сыр, угорь, огурец, нори, тобико'],
    ['Калифорния с лососем',350,'Сыр, огурец, лосось, тобико, нори']
  ]},
  {category:'Запечённые роллы',items:[
    ['Запечённый лосось',350,'Нори, рис, лосось, соус хот, унаги, кунжут'],
    ['Запечённый угорь',350,'Нори, рис, сыр, угорь, соус хот'],
    ['Запечённый краб',300,'Нори, рис, краб, сыр, соус хот'],
    ['Запечённые мидии',300,'Нори, рис, мидии, сыр, соус хот, моцарелла'],
    ['Запечённый Хот лосось',350,'Нори, рис, сыр, огурец, лосось, краб, соус хот'],
    ['Запечённый Хот угорь',350,'Нори, рис, сыр, огурец, угорь, краб, соус хот'],
    ['Запечённый Хот мидии',350,'Нори, рис, сыр, огурец, мидии, краб, соус хот'],
    ['Запечённая креветка',350,'Нори, рис, сыр, огурец, креветка, унаги, кунжут'],
    ['Запечённая Филадельфия',400,'Сыр, огурец, нори, лосось, яки соус, унаги'],
    ['Запечённая курица',300,'Нори, рис, сыр, огурец, курица, соус']
  ]},
  {category:'Темпура',items:[
    ['Темпура хакайна',350,'Нори, рис, лосось, краб, соус хот, унаги, кунжут, кляр'],
    ['Темпура угорь',350,'Нори, рис, сыр, угорь, соус хот, кляр'],
    ['Темпура краб',300,'Нори, рис, краб, сыр, соус хот, кляр'],
    ['Темпура мидии',300,'Нори, рис, мидии, сыр, соус хот, моцарелла, кляр'],
    ['Темпура креветка',350,'Нори, рис, сыр, огурец, креветка, унаги, кунжут, кляр'],
    ['Темпура Филадельфия',350,'Сыр, огурец, нори, сливочный сыр, лосось, яки, унаги, кляр'],
    ['Темпура курица',300,'Нори, рис, сыр, огурец, курица, соус, кляр']
  ]},
  {category:'Вок',items:[
    ['Соба',250,'Соба, овощи WOK, соус WOK'],['Удон',200,'Удон, овощи WOK, соус WOK'],
    ['С говядиной',300,'Говядина, удон, овощи WOK, соус WOK'],['С морепродуктами',300,'Морепродукты, удон, овощи WOK, соус WOK'],
    ['С курицей',250,'Курица, удон, овощи WOK, соус WOK'],['Рис с курицей',250,'Рис, курица, овощи WOK, соус WOK'],
    ['Рис с морепродуктами',300,'Рис, морепродукты, овощи WOK, соус WOK']
  ]},
  {category:'Новинки',items:[
    ['Хачапури аджарский',300,'Соус, сыр, яйцо'],['Стромболи',200,'Грибы, колбасы, помидоры, сыр, соус, зелень'],['Курица гриль',650,''],['Картошка фри',150,''],['Наггетсы',150,'']
  ]},
  {category:'Напитки',items:[
    ['Чай',150,''],['Чай травяной',150,''],['Кофе американо',100,''],['Капучино',150,''],['Кофе со сливками',30,''],['Кофе чёрный',50,''],['Кофе 3/1',50,'']
  ]}
];

const catalog = new Map();
MENU.forEach((section, ci) => section.items.forEach((x, ii) => catalog.set(`${ci}-${ii}`, {id:`${ci}-${ii}`, name:x[0], price:x[1]})));

async function loadOrders() {
  try { return JSON.parse(await fsp.readFile(DATA_FILE, 'utf8')); }
  catch { return []; }
}
async function saveOrders(orders) { await fsp.writeFile(DATA_FILE, JSON.stringify(orders, null, 2), 'utf8'); }

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {'content-type':'application/json; charset=utf-8','content-length':Buffer.byteLength(body)});
  res.end(body);
}
function sendText(res, status, text) {
  res.writeHead(status, {'content-type':'text/plain; charset=utf-8'}); res.end(text);
}
async function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 1_000_000) req.destroy(); });
    req.on('end', () => { try { resolve(body ? JSON.parse(body) : {}); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}
function basicAuth() { return 'Basic ' + Buffer.from(`${SHOP_ID}:${SECRET}`).toString('base64'); }

async function createYooPayment(order) {
  const idempotence = crypto.randomUUID();
  const response = await fetch('https://api.yookassa.ru/v3/payments', {
    method:'POST',
    headers:{'Authorization':basicAuth(),'Idempotence-Key':idempotence,'Content-Type':'application/json'},
    body:JSON.stringify({
      amount:{value:order.total.toFixed(2),currency:'RUB'},
      capture:true,
      confirmation:{type:'redirect',return_url:`${BASE_URL}/?payment_return=1&order_id=${encodeURIComponent(order.id)}`},
      description:`Заказ ${order.id}`,
      metadata:{order_id:order.id}
    })
  });
  if (!response.ok) throw new Error(`YooKassa ${response.status}: ${await response.text()}`);
  return response.json();
}

async function fetchYooPayment(paymentId) {
  const response = await fetch(`https://api.yookassa.ru/v3/payments/${encodeURIComponent(paymentId)}`, {
    headers:{'Authorization':basicAuth()}
  });
  if (!response.ok) throw new Error(`YooKassa verify ${response.status}: ${await response.text()}`);
  return response.json();
}

function formatAdminMessage(order) {
  const lines = order.items.map(x => `• ${x.name} × ${x.qty} — ${x.price*x.qty} ₽${x.note ? `\n  ↳ ${x.note}` : ''}`).join('\n');
  return `🍕 НОВЫЙ ОПЛАЧЕННЫЙ ЗАКАЗ\n${order.id}\n\n${lines}\n\nИТОГО: ${order.total} ₽\n\n👤 ${order.customer.name}\n📞 ${order.customer.phone}\n📍 ${order.customer.address}\n💬 ${order.customer.comment || '—'}`;
}
async function notifyTelegram(order) {
  if (!TG_TOKEN || !TG_CHAT_ID) { console.log('[Telegram not configured]\n' + formatAdminMessage(order)); return; }
  const response = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({chat_id:TG_CHAT_ID,text:formatAdminMessage(order)})
  });
  if (!response.ok) throw new Error(`Telegram ${response.status}: ${await response.text()}`);
}

async function createOrder(payload) {
  if (!payload || !Array.isArray(payload.items) || payload.items.length === 0) throw new Error('Корзина пустая');
  const name = String(payload.customer?.name || '').trim();
  const phone = String(payload.customer?.phone || '').trim();
  const address = String(payload.customer?.address || '').trim();
  if (!name || !phone || !address) throw new Error('Заполни имя, телефон и адрес');

  const items = payload.items.map(x => {
    const product = catalog.get(String(x.id));
    if (!product) throw new Error('Неизвестный товар');
    const qty = Math.max(1, Math.min(20, Number(x.qty) || 1));
    return {id:product.id,name:product.name,price:product.price,qty,note:String(x.note||'').slice(0,300)};
  });
  const total = items.reduce((s,x)=>s+x.price*x.qty,0);
  return {
    id:'VK-' + Date.now().toString(36).toUpperCase() + '-' + crypto.randomBytes(2).toString('hex').toUpperCase(),
    createdAt:new Date().toISOString(), status:'created', total, items,
    customer:{name,phone,address,comment:String(payload.customer?.comment||'').slice(0,500)},
    paymentId:null, notified:false
  };
}

function mime(file) {
  if (file.endsWith('.html')) return 'text/html; charset=utf-8';
  if (file.endsWith('.css')) return 'text/css; charset=utf-8';
  if (file.endsWith('.js')) return 'text/javascript; charset=utf-8';
  if (file.endsWith('.json')) return 'application/json; charset=utf-8';
  return 'application/octet-stream';
}
async function serveStatic(req,res,urlPath) {
  let rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const full = path.normalize(path.join(PUBLIC, rel));
  if (!full.startsWith(PUBLIC)) return sendText(res,403,'Forbidden');
  try {
    const stat = await fsp.stat(full);
    if (!stat.isFile()) throw new Error('not file');
    const buf = await fsp.readFile(full);
    res.writeHead(200, {'content-type':mime(full),'cache-control':'no-store'}); res.end(buf);
  } catch { sendText(res,404,'Not found'); }
}

const server = http.createServer(async (req,res) => {
  try {
    const url = new URL(req.url, BASE_URL);
    if (req.method === 'GET' && url.pathname === '/api/config') return sendJson(res,200,{demoMode:DEMO_MODE});
    if (req.method === 'POST' && url.pathname === '/api/create-order') {
      const payload = await readJson(req);
      const order = await createOrder(payload);
      const orders = await loadOrders();
      orders.push(order); await saveOrders(orders);

      if (DEMO_MODE) {
        order.status='paid';
        order.paymentId='DEMO-' + crypto.randomUUID();
        if (!order.notified) { await notifyTelegram(order); order.notified=true; }
        const all = await loadOrders(); const i = all.findIndex(x=>x.id===order.id); if(i>=0) all[i]=order; await saveOrders(all);
        return sendJson(res,200,{ok:true,demo:true,orderId:order.id,status:'paid',redirectUrl:`/?payment_return=1&order_id=${encodeURIComponent(order.id)}`});
      }
      if (!SHOP_ID || !SECRET) return sendJson(res,500,{error:'YooKassa keys are not configured'});
      const payment = await createYooPayment(order);
      order.paymentId=payment.id; order.status=payment.status;
      const all = await loadOrders(); const i=all.findIndex(x=>x.id===order.id); if(i>=0) all[i]=order; await saveOrders(all);
      return sendJson(res,200,{ok:true,demo:false,orderId:order.id,status:order.status,redirectUrl:payment.confirmation?.confirmation_url});
    }
    if (req.method === 'POST' && url.pathname === '/api/yookassa-webhook') {
      const event = await readJson(req);
      if (event?.event !== 'payment.succeeded' || !event?.object?.id) return sendJson(res,200,{ok:true,ignored:true});
      if (!SHOP_ID || !SECRET) return sendJson(res,500,{error:'Keys missing'});
      const verified = await fetchYooPayment(event.object.id);
      if (verified.status !== 'succeeded') return sendJson(res,200,{ok:true,ignored:true});
      const orderId = String(verified.metadata?.order_id || '');
      const orders = await loadOrders(); const i = orders.findIndex(x=>x.id===orderId);
      if (i < 0) return sendJson(res,404,{error:'Order not found'});
      const order = orders[i];
      if (Number(verified.amount?.value) !== Number(order.total)) return sendJson(res,400,{error:'Amount mismatch'});
      order.status='paid'; order.paymentId=verified.id;
      if (!order.notified) { await notifyTelegram(order); order.notified=true; }
      orders[i]=order; await saveOrders(orders);
      return sendJson(res,200,{ok:true});
    }
    if (req.method === 'GET' && url.pathname.startsWith('/api/order/')) {
      const id = decodeURIComponent(url.pathname.slice('/api/order/'.length));
      const orders = await loadOrders(); const order=orders.find(x=>x.id===id);
      if(!order) return sendJson(res,404,{error:'Not found'});
      return sendJson(res,200,{id:order.id,status:order.status,total:order.total,items:order.items,customer:order.customer,createdAt:order.createdAt});
    }
    return serveStatic(req,res,url.pathname);
  } catch (e) {
    console.error(e);
    return sendJson(res,500,{error:e.message || 'Server error'});
  }
});
server.listen(PORT,()=>console.log(`Vkusa shop: ${BASE_URL} demo=${DEMO_MODE}`));
