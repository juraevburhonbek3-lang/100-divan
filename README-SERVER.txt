100 ДИВАНОФЪ — сервер заказов

1. Установить Node.js 18+.
2. В папке сайта выполнить: npm install
3. Скопировать .env.example в .env и заполнить параметры WhatsApp после создания WhatsApp Business Platform.
4. Запуск: npm start
5. Сайт: http://localhost:3000
6. При отправке формы POST /api/orders сохраняет заказ в orders.json.
7. Отзывы отправляются через POST /api/reviews и сохраняются в .data/reviews.json со статусом pending. GET /api/reviews отдаёт только отзывы со статусом approved.

ВАЖНО: WHATSAPP_TOKEN и другие секреты нельзя помещать во фронтенд.
Модерация отзывов: после запуска сервера откройте .data/reviews.json (он создаётся автоматически; исходный пример — reviews.example.json), проверьте отзыв и замените его status с "pending" на "approved". Удаляйте неподходящие записи или оставляйте им status "rejected". Файл находится вне публичного доступа; не добавляйте endpoint для одобрения.
Следующий этап — подключить WhatsApp Cloud API или провайдера WhatsApp и функцию отправки уведомления из /api/orders.
