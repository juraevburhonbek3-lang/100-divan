const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const ORDERS_FILE = path.join(__dirname, 'orders.json');
app.use(express.json({limit:'20kb'}));
app.use(express.static(__dirname));
function saveOrder(order){let a=[]; try{a=JSON.parse(fs.readFileSync(ORDERS_FILE,'utf8'));}catch{} a.push(order); fs.writeFileSync(ORDERS_FILE, JSON.stringify(a,null,2));}
app.post('/api/orders',(req,res)=>{const {name,phone,model,size,color,comment}=req.body||{}; if(!name||!phone){return res.status(400).json({ok:false,error:'Имя и телефон обязательны'});} const order={id:Date.now().toString(),createdAt:new Date().toISOString(),name,phone,model:model||'',size:size||'',color:color||'',comment:comment||'',status:'new'}; saveOrder(order); res.json({ok:true,orderId:order.id});});
app.get('/api/health',(req,res)=>res.json({ok:true,whatsappConfigured:!!process.env.WHATSAPP_TOKEN}));
app.listen(PORT,()=>console.log(`100 ДИВАНОФЪ server: http://localhost:${PORT}`));
