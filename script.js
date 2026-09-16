const WA='79324739729';
const products=[
 {name:'Кровать с мягким изголовьем',type:'Кровать',img:'1.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Бежевый, серый, графит и другие варианты'},
 {name:'Кровать с мягким изголовьем',type:'Кровать',img:'3.jpg',price:'Цена по запросу',size:'Уточняется',colors:'5 вариантов оттенков показаны в каталоге'},
 {name:'Тахта «Адидас»',type:'Тахта',img:'4.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Серый и другие варианты'},
 {name:'Кровать с мягким изголовьем',type:'Кровать',img:'5.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Графит и другие варианты'},
 {name:'Кровать с мягким изголовьем',type:'Кровать',img:'7.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Варианты ткани уточняются'},
 {name:'Тахта «Адидас»',type:'Тахта',img:'8.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Серый и другие варианты'},
 {name:'Диван «Уют»',type:'Диван',img:'9.jpg',price:'Цена по запросу',size:'230 × 100 × 85 см',colors:'Молочный + декоративные подушки'},
 {name:'Диван «Комфорт»',type:'Диван',img:'10.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Тёмные бархатные оттенки'},
 {name:'Диван «Уют»',type:'Диван',img:'11.jpg',price:'Цена по запросу',size:'230 × 100 × 85 см',colors:'Молочный и другие варианты'},
 {name:'Тахта «Комфорт»',type:'Тахта',img:'13.jpg',price:'Цена по запросу',size:'Длина 200 × ширина 85 × высота 75 см; спальное место 200 × 160 см',colors:'Синий, серый, бежевый, коричневый и другие'},
 {name:'Ассортимент 100 ДИВАНОФЪ',type:'Диван',img:'14.jpg',price:'Цена по запросу',size:'Зависит от модели',colors:'Разные варианты'},
 {name:'Тахта «Комфорт»',type:'Тахта',img:'15.jpg',price:'Цена по запросу',size:'Длина 200 × ширина 85 × высота 75 см; спальное место 200 × 160 см',colors:'Синий, серый, бежевый, коричневый и другие'},
 {name:'Диван-кровать',type:'Диван-кровать',img:'16.jpg',price:'Цена по запросу',size:'Длина 200 × ширина 85 × высота 75 см; спальное место 200 × 160 см',colors:'Синий, серый, бежевый, коричневый и другие'},
 {name:'Диван Орлеан прямой',type:'Диван',img:'new1.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Уточняется'},
 {name:'Тахта Адидас',type:'Тахта',img:'new2.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Уточняется'},
 {name:'Тахта',type:'Тахта',img:'new3.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Уточняется'},
 {name:'Омега 2 оттоманка',type:'Диван',img:'new4.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Уточняется'},
 {name:'Кровать лофт',type:'Кровать',img:'new5.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Уточняется'},
 {name:'Еврик прямой',type:'Диван',img:'new6.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Уточняется'},
 {name:'Омега прямой',type:'Диван',img:'new7.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Уточняется'},
 {name:'Тахта заборчик',type:'Тахта',img:'new8.jpg',price:'Цена по запросу',size:'Уточняется',colors:'Уточняется'}
];
const grid=document.querySelector('#products'), select=document.querySelector('#modelSelect');
function render(filter='all'){grid.innerHTML=products.filter(p=>filter==='all'||p.type===filter).map((p,i)=>`<article class="card"><div class="pic"><img src="assets/catalog/${p.img}" alt="${p.name}" loading="lazy"></div><div class="info"><span class="type">${p.type}</span><h3>${p.name}</h3><div class="price">${p.price}</div><div class="spec"><b>Размеры</b><span>${p.size}</span></div><div class="spec"><b>Цвета</b><span>${p.colors}</span></div><button class="more" data-i="${products.indexOf(p)}">Подробнее и заказать →</button></div></article>`).join('');
 grid.querySelectorAll('.more').forEach(b=>b.onclick=()=>openModal(products[b.dataset.i]));}
select.innerHTML=products.map((p,i)=>`<option value="${p.name}">${p.name}</option>`).join('');
render(); document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter)});
const modal=document.querySelector('#modal');function openModal(p){document.querySelector('#modalContent').innerHTML=`<img src="assets/catalog/${p.img}" class="modal-img"><div class="eyebrow redtext">${p.type}</div><h2>${p.name}</h2><p><b>Цена:</b> ${p.price}</p><p><b>Размеры:</b> ${p.size}</p><p><b>Цвета:</b> ${p.colors}</p><button class="btn red full" id="choose">Выбрать эту модель</button>`;modal.classList.add('show');document.querySelector('#choose').onclick=()=>{select.value=p.name;modal.classList.remove('show');document.querySelector('#order').scrollIntoView({behavior:'smooth'});}}document.querySelector('.close').onclick=()=>modal.classList.remove('show');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};
document.querySelector('#orderForm').onsubmit=async e=>{e.preventDefault();const form=e.target,d=new FormData(form),payload=Object.fromEntries(d.entries());const msg=`Здравствуйте! Хочу заказать мебель у 100 ДИВАНОФЪ.%0A%0AИмя: ${encodeURIComponent(payload.name)}%0AТелефон: ${encodeURIComponent(payload.phone)}%0AМодель: ${encodeURIComponent(payload.model)}%0AРазмер: ${encodeURIComponent(payload.size)}%0AЦвет: ${encodeURIComponent(payload.color)}%0AКомментарий: ${encodeURIComponent(payload.comment)}`;try{const r=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!r.ok)throw new Error('server');}catch(err){console.warn('Сервер пока недоступен; открываем WhatsApp вручную.',err);}window.open(`https://wa.me/${WA}?text=${msg}`,'_blank');};
