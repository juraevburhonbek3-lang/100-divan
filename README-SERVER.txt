100 ДИВАНОФЪ — сервер заказов

1. Установить Node.js 18+.
2. В папке сайта выполнить: npm install
3. Скопировать .env.example в .env и заполнить параметры WhatsApp после создания WhatsApp Business Platform.
4. Запуск: npm start
5. Сайт: http://localhost:3000
6. При отправке формы POST /api/orders сохраняет заказ в orders.json.

ВАЖНО: WHATSAPP_TOKEN и другие секреты нельзя помещать во фронтенд.
Следующий этап — подключить WhatsApp Cloud API или провайдера WhatsApp и функцию отправки уведомления из /api/orders.
