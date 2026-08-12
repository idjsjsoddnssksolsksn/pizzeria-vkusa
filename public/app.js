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
    ['Филадельфия',350,'Сыр, огурец, сливочный сыр, лосось'],['Филадельфия карамель',300,'Сыр, огурец, сливочный сыр, лосось, тростниковый сахар'],['Филадельфия с угрем',350,'Сыр, нори, огурец, угорь, унаги, кунжут'],['Калифорния',300,'Сыр, краб, огурец, тобико, нори'],['Калифорния с угрем',350,'Сыр, угорь, огурец, нори, тобико'],['Калифорния с лососем',350,'Сыр, огурец, лосось, тобико, нори']
  ]},
  {category:'Запечённые роллы',items:[
    ['Запечённый лосось',350,'Нори, рис, лосось, соус хот, унаги, кунжут'],['Запечённый угорь',350,'Нори, рис, сыр, угорь, соус хот'],['Запечённый краб',300,'Нори, рис, краб, сыр, соус хот'],['Запечённые мидии',300,'Нори, рис, мидии, сыр, соус хот, моцарелла'],['Запечённый Хот лосось',350,'Нори, рис, сыр, огурец, лосось, краб, соус хот'],['Запечённый Хот угорь',350,'Нори, рис, сыр, огурец, угорь, краб, соус хот'],['Запечённый Хот мидии',350,'Нори, рис, сыр, огурец, мидии, краб, соус хот'],['Запечённая креветка',350,'Нори, рис, сыр, огурец, креветка, унаги, кунжут'],['Запечённая Филадельфия',400,'Сыр, огурец, нори, лосось, яки соус, унаги'],['Запечённая курица',300,'Нори, рис, сыр, огурец, курица, соус']
  ]},
  {category:'Темпура',items:[
    ['Темпура хакайна',350,'Нори, рис, лосось, краб, соус хот, унаги, кунжут, кляр'],['Темпура угорь',350,'Нори, рис, сыр, угорь, соус хот, кляр'],['Темпура краб',300,'Нори, рис, краб, сыр, соус хот, кляр'],['Темпура мидии',300,'Нори, рис, мидии, сыр, соус хот, моцарелла, кляр'],['Темпура креветка',350,'Нори, рис, сыр, огурец, креветка, унаги, кунжут, кляр'],['Темпура Филадельфия',350,'Сыр, огурец, нори, сливочный сыр, лосось, яки, унаги, кляр'],['Темпура курица',300,'Нори, рис, сыр, огурец, курица, соус, кляр']
  ]},
  {category:'Вок',items:[
    ['Соба',250,'Соба, овощи WOK, соус WOK'],['Удон',200,'Удон, овощи WOK, соус WOK'],['С говядиной',300,'Говядина, удон, овощи WOK, соус WOK'],['С морепродуктами',300,'Морепродукты, удон, овощи WOK, соус WOK'],['С курицей',250,'Курица, удон, овощи WOK, соус WOK'],['Рис с курицей',250,'Рис, курица, овощи WOK, соус WOK'],['Рис с морепродуктами',300,'Рис, морепродукты, овощи WOK, соус WOK']
  ]},
  {category:'Новинки',items:[
    ['Хачапури аджарский',300,'Соус, сыр, яйцо'],['Стромболи',200,'Грибы, колбасы, помидоры, сыр, соус, зелень'],['Курица гриль',650,''],['Картошка фри',150,''],['Наггетсы',150,'']
  ]},
  {category:'Напитки',items:[
    ['Чай',150,''],['Чай травяной',150,''],['Кофе американо',100,''],['Капучино',150,''],['Кофе со сливками',30,''],['Кофе чёрный',50,''],['Кофе 3/1',50,'']
  ]}
];

let cart = JSON.parse(localStorage.getItem('vkusa_cart') || '{}');
let demoMode = true;
const $ = (id) => document.getElementById(id);
const money = (n) => new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
const esc = (s) => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

function saveCart(){ localStorage.setItem('vkusa_cart', JSON.stringify(cart)); updateBadge(); }
function updateBadge(){
  const count = Object.values(cart).reduce((s,x)=>s+x.qty,0);
  $('badge').textContent = count; $('badge').hidden = count === 0; $('topCount').textContent = count;
}
function showView(name){
  ['menuView','cartView','successView'].forEach(id => $(id).classList.remove('active'));
  $(name+'View').classList.add('active');
  $('menuTab').classList.toggle('active', name==='menu'); $('cartTab').classList.toggle('active', name==='cart');
  document.querySelector('.bottom-nav').style.display = name==='success' ? 'none' : 'grid';
  if(name==='cart') renderCart(); window.scrollTo(0,0);
}

function iconFor(cat){ if(cat==='Пицца') return '🍕'; if(cat.includes('роллы') || cat==='Темпура') return '🍣'; if(cat==='Вок') return '🍜'; if(cat==='Напитки') return '☕'; return '🍽️'; }
function renderMenu(){
  $('categoryStrip').innerHTML=''; $('menuRoot').innerHTML='';
  MENU.forEach((section,ci)=>{
    const chip=document.createElement('button'); chip.className='cat-chip'; chip.type='button'; chip.textContent=section.category;
    chip.onclick=()=>document.getElementById('cat-'+ci).scrollIntoView({behavior:'smooth'}); $('categoryStrip').appendChild(chip);
    const sec=document.createElement('section'); sec.className='menu-section'; sec.id='cat-'+ci;
    sec.innerHTML=`<h2>${esc(section.category)}</h2><div class="food-grid"></div>`;
    const grid=sec.querySelector('.food-grid');
    section.items.forEach((item,ii)=>{
      const id=`${ci}-${ii}`; const card=document.createElement('article'); card.className='food-card';
      card.innerHTML=`<div class="food-icon">${iconFor(section.category)}</div><div class="food-copy"><h3>${esc(item[0])}</h3><p>${esc(item[2]||'Блюдо из меню «Пиццерия Вкуса»')}</p></div><div class="food-buy"><strong>${money(item[1])}</strong><button type="button" class="add-btn">Добавить</button></div>`;
      const btn=card.querySelector('.add-btn'); btn.onclick=()=>{ if(!cart[id]) cart[id]={id,name:item[0],price:item[1],qty:0,note:''}; cart[id].qty++; saveCart(); btn.textContent='Добавлено ✓'; btn.classList.add('success'); setTimeout(()=>{btn.textContent='Добавить';btn.classList.remove('success')},600); };
      grid.appendChild(card);
    });
    $('menuRoot').appendChild(sec);
  });
}
function total(){ return Object.values(cart).reduce((s,x)=>s+x.price*x.qty,0); }
function renderCart(){
  const entries=Object.entries(cart); $('emptyCart').hidden=entries.length>0; $('cartContent').hidden=entries.length===0; $('cartItems').innerHTML='';
  entries.forEach(([id,x])=>{
    const row=document.createElement('article'); row.className='cart-item';
    row.innerHTML=`<div class="cart-row"><strong>${esc(x.name)}</strong><div class="qty"><button type="button" class="minus">−</button><b>${x.qty}</b><button type="button" class="plus">+</button></div><span class="line-price">${money(x.price*x.qty)}</span></div><input class="note" value="${esc(x.note)}" placeholder="Нюансы: без лука, добавить мясо, без соуса...">`;
    row.querySelector('.minus').onclick=()=>{cart[id].qty--; if(cart[id].qty<=0) delete cart[id]; saveCart(); renderCart();};
    row.querySelector('.plus').onclick=()=>{cart[id].qty++; saveCart(); renderCart();};
    row.querySelector('.note').oninput=(e)=>{cart[id].note=e.target.value; saveCart();}; $('cartItems').appendChild(row);
  });
  $('subtotal').textContent=money(total()); $('total').textContent=money(total());
}
async function loadConfig(){
  try{const r=await fetch('/api/config');const j=await r.json();demoMode=!!j.demoMode;$('paymentInfo').textContent=demoMode?'Демо-режим: деньги не списываются, но весь путь заказа работает.':'Боевой режим ЮKassa: после оплаты подтверждённый заказ уйдёт администратору.';}catch{$('paymentInfo').textContent='Не удалось получить настройки сервера.';}
}
async function checkout(){
  const name=$('name').value.trim(), phone=$('phone').value.trim(), address=$('address').value.trim(); if(!name||!phone||!address){alert('Заполни имя, телефон и адрес.');return;}
  const items=Object.values(cart).map(x=>({id:x.id,qty:x.qty,note:x.note})); if(!items.length){alert('Корзина пустая.');return;}
  $('checkoutBtn').disabled=true; $('checkoutBtn').textContent='Создаём заказ…';
  try{
    const r=await fetch('/api/create-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items,customer:{name,phone,address,comment:$('orderNote').value.trim()}})}); const j=await r.json(); if(!r.ok) throw new Error(j.error||'Ошибка');
    if(j.redirectUrl){ window.location.href=j.redirectUrl; return; }
    throw new Error('Нет ссылки на оплату');
  }catch(e){alert('Не получилось оформить: '+e.message);$('checkoutBtn').disabled=false;$('checkoutBtn').textContent='Оплатить и оформить';}
}
async function loadSuccess(orderId){
  showView('success');
  try{
    const r=await fetch('/api/order/'+encodeURIComponent(orderId)); const o=await r.json(); if(!r.ok) throw new Error(o.error||'Заказ не найден');
    $('successTitle').textContent=o.status==='paid'?'Оплата подтверждена':'Заказ создан'; $('successSub').textContent=o.status==='paid'?'Заказ готов к передаче администратору.':'Платёж ещё обрабатывается.';
    $('receipt').innerHTML=`<div class="receipt-box">${o.items.map(x=>`<div class="receipt-line"><div><strong>${esc(x.name)} × ${x.qty}</strong>${x.note?`<div class="receipt-note">↳ ${esc(x.note)}</div>`:''}</div><b>${money(x.price*x.qty)}</b></div>`).join('')}<div class="receipt-total"><span>Итого</span><span>${money(o.total)}</span></div></div>`;
    if(o.status==='paid'){cart={};saveCart();}
  }catch(e){$('successTitle').textContent='Не удалось проверить заказ';$('successSub').textContent=e.message;}
}

$('menuTab').onclick=()=>showView('menu'); $('cartTab').onclick=()=>showView('cart'); $('topCartBtn').onclick=()=>showView('cart'); $('goMenuBtn').onclick=()=>showView('menu'); $('backMenuBtn').onclick=()=>showView('menu');
$('clearBtn').onclick=()=>{if(Object.keys(cart).length&&confirm('Очистить корзину?')){cart={};saveCart();renderCart();}}; $('checkoutBtn').onclick=checkout;
renderMenu(); updateBadge(); loadConfig();
const qs=new URLSearchParams(location.search); if(qs.get('payment_return')==='1'&&qs.get('order_id')) loadSuccess(qs.get('order_id'));
