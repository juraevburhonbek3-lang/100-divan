const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const ORDERS_FILE = path.join(__dirname, 'orders.json');
const REVIEWS_FILE = path.join(__dirname, '.data', 'reviews.json');
const REVIEWS_EXAMPLE_FILE = path.join(__dirname, 'reviews.example.json');
const REVIEW_LIMITS = { name: 80, text: 1000 };
const reviewRequests = new Map();
app.use(express.json({limit:'20kb'}));
app.use(express.static(__dirname));
function saveOrder(order){let a=[]; try{a=JSON.parse(fs.readFileSync(ORDERS_FILE,'utf8'));}catch{} a.push(order); fs.writeFileSync(ORDERS_FILE, JSON.stringify(a,null,2));}
app.post('/api/orders',(req,res)=>{const {name,phone,model,size,color,comment}=req.body||{}; if(!name||!phone){return res.status(400).json({ok:false,error:'Имя и телефон обязательны'});} const order={id:Date.now().toString(),createdAt:new Date().toISOString(),name,phone,model:model||'',size:size||'',color:color||'',comment:comment||'',status:'new'}; saveOrder(order); res.json({ok:true,orderId:order.id});});
function readReviews(){for(const file of [REVIEWS_FILE,REVIEWS_EXAMPLE_FILE]){try{const reviews=JSON.parse(fs.readFileSync(file,'utf8'));return Array.isArray(reviews)?reviews:[];}catch(error){if(error.code!=='ENOENT')console.error('Не удалось прочитать отзывы:',error.message);}}return[];}
function saveReview(review){fs.mkdirSync(path.dirname(REVIEWS_FILE),{recursive:true});const temporaryFile=`${REVIEWS_FILE}.tmp`;fs.writeFileSync(temporaryFile,JSON.stringify([...readReviews(),review],null,2));fs.renameSync(temporaryFile,REVIEWS_FILE);}
function cleanText(value){return typeof value==='string'?value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,'').trim():'';}
function reviewRateLimit(ip){const now=Date.now();const recent=reviewRequests.get(ip)||[];const valid=recent.filter(time=>now-time<60*60*1000);if(valid.length>=5){reviewRequests.set(ip,valid);return false;}valid.push(now);reviewRequests.set(ip,valid);return true;}
app.get('/api/reviews',(req,res)=>res.json({ok:true,reviews:readReviews().filter(review=>review.status==='approved').map(({id,createdAt,name,rating,text})=>({id,createdAt,name,rating,text}))}));
app.post('/api/reviews',(req,res)=>{if(!reviewRateLimit(req.ip))return res.status(429).json({ok:false,error:'Слишком много отзывов. Попробуйте позже.'});const name=cleanText(req.body?.name);const text=cleanText(req.body?.text);const rating=Number(req.body?.rating);if(name.length<2||name.length>REVIEW_LIMITS.name)return res.status(400).json({ok:false,error:'Имя должно содержать от 2 до 80 символов.'});if(!Number.isInteger(rating)||rating<1||rating>5)return res.status(400).json({ok:false,error:'Оценка должна быть целым числом от 1 до 5.'});if(text.length<10||text.length>REVIEW_LIMITS.text)return res.status(400).json({ok:false,error:'Текст отзыва должен содержать от 10 до 1000 символов.'});const review={id:`review-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,createdAt:new Date().toISOString(),name,rating,text,status:'pending'};try{saveReview(review);}catch(error){console.error('Не удалось сохранить отзыв:',error.message);return res.status(500).json({ok:false,error:'Не удалось сохранить отзыв. Попробуйте позже.'});}res.status(201).json({ok:true,message:'Спасибо! Отзыв отправлен на модерацию.'});});
app.get('/api/health',(req,res)=>res.json({ok:true,whatsappConfigured:!!process.env.WHATSAPP_TOKEN}));
app.listen(PORT,()=>console.log(`100 ДИВАНОФЪ server: http://localhost:${PORT}`));
