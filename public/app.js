
let MENU = [];
let cart = JSON.parse(localStorage.getItem('vkusa_cart') || '{}');
let currentUser = null;
let demoMode = true;

const $ = (id) => document.getElementById(id);
const money = (n) => new Intl.NumberFormat('ru-RU').format(Number(n)||0) + ' ₽';
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const svgEsc = (s) => String(s).replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));

function dishArt(category,name,desc,price){
  const t=(name+' '+desc).toLowerCase();
  let drawing='';

  const bg = category==='Пицца' ? ['#6f2818','#f27a35'] :
             category==='Холодные роллы' ? ['#173f38','#5db29e'] :
             category==='Запечённые роллы' ? ['#5d241c','#e26a36'] :
             category==='Темпура' ? ['#704315','#e4a242'] :
             category==='Вок' ? ['#453023','#c46d3f'] :
             category==='Напитки' ? ['#30241e','#9a684b'] :
             ['#4a241e','#d8733d'];

  function pizza(){
    const tops=[];
    const add=(cx,cy,r,fill)=>tops.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`);
    if(/пепперони|колбас|сервелат|охотнич/.test(t)){add(524,173,19,'#a8271d');add(590,225,18,'#a8271d');add(485,250,17,'#a8271d');add(555,298,18,'#a8271d');}
    if(/гриб/.test(t)){tops.push('<g fill="#e8d3b5" stroke="#8b6b51" stroke-width="4"><path d="M493 195c0-20 38-20 38 0h-38z"/><rect x="508" y="194" width="8" height="20" rx="3"/><path d="M571 262c0-18 34-18 34 0h-34z"/><rect x="584" y="261" width="8" height="19" rx="3"/></g>');}
    if(/ананас/.test(t)){tops.push('<g fill="#f4ce3b"><rect x="482" y="220" width="30" height="24" rx="7"/><rect x="556" y="176" width="30" height="24" rx="7"/><rect x="570" y="285" width="30" height="24" rx="7"/></g>');}
    if(/помид/.test(t)){add(505,285,14,'#e84c35');add(603,185,14,'#e84c35');}
    if(/маслин/.test(t)){tops.push('<g fill="#1f241e"><circle cx="471" cy="178" r="9"/><circle cx="603" cy="264" r="9"/></g>');}
    if(/перец|халапеньо|чили/.test(t)){tops.push('<g fill="none" stroke="#409144" stroke-width="9" stroke-linecap="round"><path d="M475 235q20-28 42 0"/><path d="M565 211q22-26 42 0"/></g>');}
    if(/куриц/.test(t)){tops.push('<g fill="#d49a61"><rect x="500" y="183" width="30" height="19" rx="8" transform="rotate(-18 515 193)"/><rect x="563" y="252" width="33" height="20" rx="8" transform="rotate(21 580 262)"/></g>');}
    if(/говядин|мясн/.test(t)){tops.push('<g fill="#7e3f2e"><rect x="474" y="264" width="35" height="22" rx="8"/><rect x="579" y="202" width="38" height="23" rx="8"/></g>');}
    if(/лосос|морепродукт|краб|мид/.test(t)){tops.push('<g fill="#f08d72"><rect x="490" y="190" width="42" height="17" rx="8" transform="rotate(12 511 198)"/><rect x="564" y="265" width="42" height="17" rx="8" transform="rotate(-18 585 273)"/></g>');}
    if(/груша/.test(t)){tops.push('<g fill="#e9d46d"><path d="M510 188c-20 28-7 50 11 50s31-22 11-50c-6-9-16-9-22 0z"/><path d="M572 249c-20 28-7 50 11 50s31-22 11-50c-6-9-16-9-22 0z"/></g>');}
    if(/цезарь|базилик|зелень/.test(t)){tops.push('<g fill="#4a9b51"><ellipse cx="548" cy="196" rx="12" ry="7" transform="rotate(-32 548 196)"/><ellipse cx="603" cy="300" rx="13" ry="7" transform="rotate(24 603 300)"/></g>');}
    return `<g filter="url(#sh)"><ellipse cx="545" cy="240" rx="145" ry="145" fill="#c97936"/><ellipse cx="545" cy="240" rx="128" ry="128" fill="#f6d89a"/><ellipse cx="545" cy="240" rx="112" ry="112" fill="#e75935"/><ellipse cx="545" cy="240" rx="102" ry="102" fill="#f4d86f" opacity=".95"/>${tops.join('')}</g>`;
  }

  function sushi(kind){
    const fill=/лосос/.test(t)?'#f18a70':/угор/.test(t)?'#7f4d35':/краб/.test(t)?'#f4a098':/кревет/.test(t)?'#ef9b74':/мид/.test(t)?'#77615b':/куриц/.test(t)?'#d09b65':'#efb284';
    const pieces=[];
    for(let i=0;i<5;i++){
      const x=442+(i%3)*78, y=170+Math.floor(i/3)*95+(i%2)*8;
      const fried = kind==='tempura';
      pieces.push(`<g transform="translate(${x} ${y}) rotate(${i%2?6:-5})">
        <ellipse cx="0" cy="0" rx="38" ry="29" fill="${fried?'#d59a43':'#162a25'}"/>
        <ellipse cx="0" cy="-2" rx="30" ry="22" fill="${fried?'#f2cf75':'#f7f1dc'}"/>
        <ellipse cx="0" cy="-3" rx="16" ry="11" fill="${fill}"/>
        ${/огур/.test(t)?'<rect x="-5" y="-11" width="9" height="18" rx="3" fill="#6dab61"/>':''}
        ${kind==='baked'?'<path d="M-27-18q27-18 54 0" fill="none" stroke="#f4c37a" stroke-width="10" stroke-linecap="round"/>':''}
      </g>`);
    }
    return `<g filter="url(#sh)">${pieces.join('')}</g>`;
  }

  function wok(){
    const rice=/рис/.test(t);
    const protein=/говядин/.test(t)?'#7a3d2d':/морепродукт/.test(t)?'#ed8d70':/куриц/.test(t)?'#cf975d':'#c6854d';
    return `<g filter="url(#sh)">
      <path d="M405 203h280q-19 128-140 128T405 203z" fill="#1c2423"/>
      <ellipse cx="545" cy="202" rx="140" ry="38" fill="#f6e7bd"/>
      ${rice?'<g fill="#fff0cf"><circle cx="480" cy="196" r="18"/><circle cx="520" cy="205" r="22"/><circle cx="562" cy="190" r="19"/><circle cx="603" cy="205" r="21"/></g>':'<g fill="none" stroke="#e4bd6b" stroke-width="10" stroke-linecap="round"><path d="M444 177q95 75 194 8"/><path d="M458 210q86-57 169-11"/><path d="M476 166q51 93 126 25"/></g>'}
      <g fill="${protein}"><rect x="467" y="184" width="35" height="21" rx="8" transform="rotate(-18 485 195)"/><rect x="575" y="182" width="39" height="22" rx="8" transform="rotate(16 594 193)"/></g>
      <g fill="#69a953"><rect x="526" y="164" width="16" height="34" rx="6" transform="rotate(25 534 181)"/><rect x="625" y="196" width="15" height="31" rx="6" transform="rotate(-30 632 211)"/></g>
      <g fill="#ef693e"><circle cx="548" cy="220" r="12"/><circle cx="448" cy="206" r="11"/></g>
      <path d="M420 216h250" stroke="#ffffff" stroke-opacity=".13" stroke-width="5"/>
    </g>`;
  }

  function hot(){
    if(/хачапури/.test(t)) return `<g filter="url(#sh)"><path d="M430 270q115 80 230 0l-38-117q-76-55-154 0z" fill="#d88b3d"/><path d="M462 251q82 49 166 0l-26-79q-55-35-112 0z" fill="#f4df9b"/><ellipse cx="547" cy="215" rx="38" ry="31" fill="#fff6dc"/><circle cx="547" cy="215" r="18" fill="#f5b42c"/></g>`;
    if(/стромболи/.test(t)) return `<g filter="url(#sh)"><path d="M425 270q116 53 238 0l-31-105q-88-50-176 0z" fill="#d98b43"/><path d="M459 251q87 34 172 0" fill="none" stroke="#f4d38d" stroke-width="20" stroke-linecap="round"/><g fill="#a92d22"><circle cx="501" cy="214" r="14"/><circle cx="582" cy="222" r="14"/></g></g>`;
    if(/курица гриль/.test(t)) return `<g filter="url(#sh)"><ellipse cx="545" cy="244" rx="125" ry="62" fill="#eee3d8"/><path d="M468 241q36-93 88-35 54-58 91 32-22 62-87 67-73 4-92-64z" fill="#b76834"/><path d="M492 233q59 29 119 3" fill="none" stroke="#7d3e26" stroke-width="9"/></g>`;
    if(/фри/.test(t)) return `<g filter="url(#sh)"><path d="M475 195h140l-24 126H499z" fill="#d53628"/><g stroke="#f1c142" stroke-width="16" stroke-linecap="round"><path d="M493 215l-8-73"/><path d="M518 205l5-82"/><path d="M548 205l-2-91"/><path d="M578 208l10-79"/><path d="M603 215l18-67"/></g></g>`;
    if(/наггет/.test(t)) return `<g filter="url(#sh)"><ellipse cx="545" cy="252" rx="128" ry="62" fill="#eee4db"/><g fill="#d99a44" stroke="#b6742d" stroke-width="5"><ellipse cx="476" cy="235" rx="42" ry="28"/><ellipse cx="546" cy="221" rx="44" ry="29"/><ellipse cx="610" cy="250" rx="42" ry="28"/><ellipse cx="523" cy="272" rx="40" ry="26"/></g></g>`;
    return `<text x="545" y="275" text-anchor="middle" font-size="150">🍽️</text>`;
  }

  function drink(){
    const tea=/чай/.test(t);
    const capp=/капуч/.test(t);
    const black=/чёрн|американо/.test(t);
    return `<g filter="url(#sh)">
      <path d="M470 166h135l-18 155q-5 28-50 28h-12q-45 0-50-28z" fill="#f3eee9"/>
      <path d="M490 185h95l-11 118q-4 20-39 20h-8q-35 0-39-20z" fill="${tea?'#9d5f2e':black?'#40251b':'#9b5a34'}"/>
      ${capp?'<ellipse cx="538" cy="184" rx="48" ry="16" fill="#f5e8d2"/><path d="M505 184q33-22 66 0" fill="none" stroke="#cfa77b" stroke-width="5"/>':''}
      <path d="M604 216q61-4 54 52-5 37-58 22" fill="none" stroke="#f3eee9" stroke-width="17" stroke-linecap="round"/>
      <g fill="none" stroke="#fff" stroke-opacity=".38" stroke-width="7" stroke-linecap="round"><path d="M506 139q-20-26 4-49"/><path d="M544 139q-20-30 5-54"/><path d="M579 142q-14-25 7-44"/></g>
    </g>`;
  }

  if(category==='Пицца') drawing=pizza();
  else if(category==='Холодные роллы') drawing=sushi('cold');
  else if(category==='Запечённые роллы') drawing=sushi('baked');
  else if(category==='Темпура') drawing=sushi('tempura');
  else if(category==='Вок') drawing=wok();
  else if(category==='Напитки') drawing=drink();
  else drawing=hot();

  const title=svgEsc(name);
  const subtitle=svgEsc(category);
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="760" height="520" viewBox="0 0 760 520">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/>
      </linearGradient>
      <radialGradient id="g" cx="74%" cy="27%" r="55%"><stop offset="0" stop-color="#fff" stop-opacity=".31"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <filter id="sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000" flood-opacity=".25"/></filter>
    </defs>
    <rect width="760" height="520" fill="url(#bg)"/>
    <circle cx="590" cy="130" r="245" fill="url(#g)"/>
    <path d="M0 400C190 322 410 510 760 354V520H0Z" fill="#000" fill-opacity=".12"/>
    <text x="34" y="48" fill="#fff" fill-opacity=".68" font-size="14" font-weight="800" letter-spacing="2" font-family="Arial,sans-serif">${subtitle.toUpperCase()}</text>
    <text x="34" y="100" fill="#fff" font-size="28" font-weight="900" font-family="Arial,sans-serif">${title}</text>
    ${drawing}
    <rect x="34" y="427" width="128" height="43" rx="21.5" fill="#fff" fill-opacity=".94"/>
    <text x="98" y="455" text-anchor="middle" fill="#1a1715" font-size="18" font-weight="900" font-family="Arial,sans-serif">${price} ₽</text>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
}


function saveCart(){ localStorage.setItem('vkusa_cart', JSON.stringify(cart)); updateBadge(); }
function updateBadge(){
  const count = Object.values(cart).reduce((s,x)=>s+x.qty,0);
  $('badge').textContent = count; $('badge').hidden = count === 0; $('topCount').textContent = count;
}

function showView(name){
  ['menuView','cartView','profileView','successView'].forEach(id => $(id).classList.remove('active'));
  $(name+'View').classList.add('active');
  $('menuTab').classList.toggle('active', name==='menu');
  $('profileTab').classList.toggle('active', name==='profile');
  $('cartTab').classList.toggle('active', name==='cart');
  document.querySelector('.bottom-nav').style.display = name==='success' ? 'none' : 'grid';
  if(name==='cart') renderCart();
  if(name==='profile') renderProfile();
  window.scrollTo(0,0);
}

function productImage(section,item){ return item.image_url || dishArt(section.category,item.name,item.description||'',item.price); }

function addToCart(item){
  const id=item.id;
  if(!cart[id]) cart[id]={id,name:item.name,price:Number(item.price),qty:0,note:''};
  cart[id].name=item.name; cart[id].price=Number(item.price); cart[id].qty++;
  saveCart();
}

function renderHits(){
  const root=$('hitsGrid'); if(!root) return; root.innerHTML='';
  const all=MENU.flatMap(s=>s.items.map(i=>({...i,category:s.category})));
  const picks=all.filter(x=>x.active!==false).slice(0,4);
  const tags=['ХИТ','ТОП','ВЫБОР','WOK'];
  picks.forEach((item,i)=>{
    const card=document.createElement('article');card.className='hit-card';
    card.innerHTML=`<div class="hit-art"><img src="${productImage({category:item.category},item)}" alt="${esc(item.name)}"><span>${tags[i]}</span></div><div class="hit-copy"><div><h3>${esc(item.name)}</h3><p>${esc(item.description||item.category)}</p></div><div class="hit-foot"><strong>${money(item.price)}</strong><button type="button">+</button></div></div>`;
    card.querySelector('button').onclick=()=>addToCart(item);
    root.appendChild(card);
  });
}

function renderMenu(){
  $('categoryStrip').innerHTML=''; $('menuRoot').innerHTML='';
  MENU.forEach((section,ci)=>{
    const chip=document.createElement('button'); chip.className='cat-chip'; chip.type='button'; chip.textContent=section.category;
    chip.onclick=()=>{document.querySelectorAll('.cat-chip').forEach(x=>x.classList.remove('active'));chip.classList.add('active');document.getElementById('cat-'+ci).scrollIntoView({behavior:'smooth'});};
    if(ci===0) chip.classList.add('active'); $('categoryStrip').appendChild(chip);
    const sec=document.createElement('section');sec.className='menu-section';sec.id='cat-'+ci;
    sec.innerHTML=`<h2>${esc(section.category)}</h2><div class="food-grid"></div>`;
    const grid=sec.querySelector('.food-grid');
    section.items.filter(x=>x.active!==false).forEach(item=>{
      const card=document.createElement('article');card.className='food-card';
      card.innerHTML=`<div class="food-photo"><img src="${productImage(section,item)}" alt="${esc(item.name)}" loading="lazy"></div><div class="food-body"><div class="food-copy"><span class="food-cat">${esc(section.category)}</span><h3>${esc(item.name)}</h3><p>${esc(item.description||'Блюдо из меню «Пиццерия Вкуса»')}</p></div><div class="food-buy"><strong>${money(item.price)}</strong><button type="button" class="add-btn">Добавить</button></div></div>`;
      const btn=card.querySelector('.add-btn');
      btn.onclick=()=>{addToCart(item);btn.textContent='Добавлено ✓';btn.classList.add('success');setTimeout(()=>{btn.textContent='Добавить';btn.classList.remove('success')},650);};
      grid.appendChild(card);
    });
    $('menuRoot').appendChild(sec);
  });
}

async function loadMenu(){
  const r=await fetch('/api/menu'); const j=await r.json();
  if(!r.ok) throw new Error(j.error||'Не удалось загрузить меню');
  MENU=j.menu||[]; renderMenu(); renderHits();
}

function saveCart(){localStorage.setItem('vkusa_cart',JSON.stringify(cart));updateBadge();}
function updateBadge(){
  const c=Object.values(cart).reduce((s,x)=>s+x.qty,0);
  $('badge').textContent=c;$('badge').hidden=c===0;$('topCount').textContent=c;
}
function total(){return Object.values(cart).reduce((s,x)=>s+Number(x.price)*x.qty,0);}

function renderCart(){
  const entries=Object.entries(cart);$('emptyCart').hidden=entries.length>0;$('cartContent').hidden=entries.length===0;$('cartItems').innerHTML='';
  entries.forEach(([id,x])=>{
    const row=document.createElement('article');row.className='cart-item';
    row.innerHTML=`<div class="cart-row"><strong>${esc(x.name)}</strong><div class="qty"><button type="button" class="minus">−</button><b>${x.qty}</b><button type="button" class="plus">+</button></div><span class="line-price">${money(x.price*x.qty)}</span></div><input class="note" value="${esc(x.note)}" placeholder="Нюансы: без лука, добавить мясо, без соуса...">`;
    row.querySelector('.minus').onclick=()=>{cart[id].qty--;if(cart[id].qty<=0)delete cart[id];saveCart();renderCart();};
    row.querySelector('.plus').onclick=()=>{cart[id].qty++;saveCart();renderCart();};
    row.querySelector('.note').oninput=e=>{cart[id].note=e.target.value;saveCart();};
    $('cartItems').appendChild(row);
  });
  $('subtotal').textContent=money(total());$('total').textContent=money(total());
  if(currentUser){
    if(!$('name').value)$('name').value=currentUser.name||'';
    $('phone').value=currentUser.phone||'';
    if(!$('address').value)$('address').value=currentUser.address||'';
  }
}

async function loadConfig(){
  try{const r=await fetch('/api/config');const j=await r.json();demoMode=!!j.demoMode;$('paymentInfo').textContent=demoMode?'Демо-оплата: заказ подтверждается сразу.':'Платёжный модуль включён.';}
  catch{$('paymentInfo').textContent='Не удалось получить настройки сервера.';}
}

function setAuthMessage(text,ok=false){const el=$('authMessage');el.textContent=text;el.classList.toggle('ok',ok);}
async function loadMe(){try{const r=await fetch('/api/me');const j=await r.json();currentUser=r.ok?j.user:null;}catch{currentUser=null}updateAuthUI();}
function updateAuthUI(){
  const logged=!!currentUser;$('authGate').hidden=logged;$('profileContent').hidden=!logged;
  if(logged){
    $('profileGreeting').textContent=currentUser.name?`Здравствуйте, ${currentUser.name}`:'Ваш профиль';
    $('profileName').value=currentUser.name||'';$('profilePhone').value=currentUser.phone||'';$('profileAddress').value=currentUser.address||'';
    $('profilePhoneBadge').textContent=currentUser.phone||'';
  }
}
async function sendCode(){
  const phone=$('authPhone').value.trim();if(!phone)return setAuthMessage('Введите номер телефона.');
  $('sendCodeBtn').disabled=true;setAuthMessage('Отправляем код…');
  try{const r=await fetch('/api/auth/send-code',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone})});const j=await r.json();if(!r.ok)throw new Error(j.error||'Ошибка');$('phoneStep').hidden=true;$('codeStep').hidden=false;setAuthMessage(j.message||'Код отправлен.',true);}
  catch(e){setAuthMessage(e.message)}finally{$('sendCodeBtn').disabled=false}
}
async function verifyCode(){
  const phone=$('authPhone').value.trim(),code=$('authCode').value.trim();if(!code)return setAuthMessage('Введите код.');
  $('verifyCodeBtn').disabled=true;setAuthMessage('Проверяем…');
  try{const r=await fetch('/api/auth/verify-code',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,code})});const j=await r.json();if(!r.ok)throw new Error(j.error||'Неверный код');currentUser=j.user;updateAuthUI();await renderHistory();setAuthMessage('');}
  catch(e){setAuthMessage(e.message)}finally{$('verifyCodeBtn').disabled=false}
}
async function logout(){await fetch('/api/auth/logout',{method:'POST'});currentUser=null;updateAuthUI();$('codeStep').hidden=true;$('phoneStep').hidden=false;$('authCode').value='';}
async function saveProfile(){
  if(!currentUser)return;
  const body={name:$('profileName').value.trim(),address:$('profileAddress').value.trim()};
  const r=await fetch('/api/me',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const j=await r.json();
  if(!r.ok)return alert(j.error||'Не удалось сохранить');currentUser=j.user;updateAuthUI();$('profileSaved').hidden=false;setTimeout(()=>$('profileSaved').hidden=true,1600);
}
async function renderProfile(){updateAuthUI();if(currentUser)await renderHistory();}
function statusLabel(s){return {new:'Принят',cooking:'Готовится',courier:'В пути',delivered:'Доставлен',cancelled:'Отменён',paid:'Оплачен'}[s]||s;}
async function renderHistory(){
  if(!currentUser)return;
  const r=await fetch('/api/my-orders');const j=await r.json();if(!r.ok)return;
  const orders=j.orders||[];$('historyCount').textContent=orders.length;$('historyEmpty').hidden=orders.length>0;$('orderHistory').innerHTML='';
  orders.forEach(o=>{
    const card=document.createElement('article');card.className='history-item';
    const dateText=new Date(o.created_at).toLocaleString('ru-RU',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
    card.innerHTML=`<div class="history-top"><div><span class="history-status">${esc(statusLabel(o.status))}</span><h3>Заказ #${esc(String(o.number||o.id).slice(-6))}</h3><p>${dateText}</p></div><strong>${money(o.total)}</strong></div><div class="history-items">${(o.items||[]).map(x=>`<span>${esc(x.name)} × ${x.qty}</span>`).join('')}</div><button class="repeat-btn" type="button">Повторить заказ</button>`;
    card.querySelector('.repeat-btn').onclick=()=>{(o.items||[]).forEach(x=>{if(!cart[x.id])cart[x.id]={id:x.id,name:x.name,price:x.price,qty:0,note:x.note||''};cart[x.id].qty+=x.qty;});saveCart();showView('cart')};
    $('orderHistory').appendChild(card);
  });
}

async function checkout(){
  if(!currentUser){alert('Сначала войдите по номеру телефона.');showView('profile');return;}
  const name=$('name').value.trim(),address=$('address').value.trim();if(!name||!address){alert('Заполните имя и адрес.');return;}
  const items=Object.values(cart).map(x=>({id:x.id,qty:x.qty,note:x.note}));if(!items.length){alert('Корзина пустая.');return;}
  $('checkoutBtn').disabled=true;$('checkoutBtn').textContent='Создаём заказ…';
  try{const r=await fetch('/api/create-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items,customer:{name,address,comment:$('orderNote').value.trim()}})});const j=await r.json();if(!r.ok)throw new Error(j.error||'Ошибка');if(j.redirectUrl){location.href=j.redirectUrl;return;}throw new Error('Сервер не вернул ссылку');}
  catch(e){alert('Не получилось оформить: '+e.message);$('checkoutBtn').disabled=false;$('checkoutBtn').textContent='Оплатить и оформить';}
}
async function loadSuccess(orderId){
  showView('success');
  try{const r=await fetch('/api/order/'+encodeURIComponent(orderId));const o=await r.json();if(!r.ok)throw new Error(o.error||'Заказ не найден');$('successTitle').textContent='Заказ принят';$('successSub').textContent=`Статус: ${statusLabel(o.status)}`;$('receipt').innerHTML=`<div class="receipt-box">${o.items.map(x=>`<div class="receipt-line"><div><strong>${esc(x.name)} × ${x.qty}</strong>${x.note?`<div class="receipt-note">↳ ${esc(x.note)}</div>`:''}</div><b>${money(x.price*x.qty)}</b></div>`).join('')}<div class="receipt-total"><span>Итого</span><span>${money(o.total)}</span></div></div>`;cart={};saveCart();}
  catch(e){$('successTitle').textContent='Не удалось проверить заказ';$('successSub').textContent=e.message;}
}

$('menuTab').onclick=()=>showView('menu');$('profileTab').onclick=()=>showView('profile');$('cartTab').onclick=()=>showView('cart');
$('topCartBtn').onclick=()=>showView('cart');$('topProfileBtn').onclick=()=>showView('profile');$('brandBtn').onclick=()=>showView('menu');
$('heroMenuBtn').onclick=()=>document.querySelector('.menu-heading').scrollIntoView({behavior:'smooth'});$('heroProfileBtn').onclick=()=>showView('profile');
$('goMenuBtn').onclick=()=>showView('menu');$('backMenuBtn').onclick=()=>showView('menu');$('saveProfileBtn').onclick=saveProfile;
$('sendCodeBtn').onclick=sendCode;$('verifyCodeBtn').onclick=verifyCode;$('changePhoneBtn').onclick=()=>{$('codeStep').hidden=true;$('phoneStep').hidden=false;setAuthMessage('')};$('logoutBtn').onclick=logout;
$('clearBtn').onclick=()=>{if(Object.keys(cart).length&&confirm('Очистить корзину?')){cart={};saveCart();renderCart();}};$('checkoutBtn').onclick=checkout;

(async function init(){updateBadge();await Promise.all([loadConfig(),loadMe()]);try{await loadMenu()}catch(e){console.error(e);$('menuRoot').innerHTML='<p>Не удалось загрузить меню.</p>'}const qs=new URLSearchParams(location.search);if(qs.get('payment_return')==='1'&&qs.get('order_id'))loadSuccess(qs.get('order_id'));})();
