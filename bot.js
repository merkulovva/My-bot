const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

const bot = new Telegraf('7227216951:AAGcCZ-46nu_X1okRa3LF-4up7x_larE-Fo');

// Функция для перевода текста
async function translate(text, targetLang) {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${targetLang}`);
    const data = await response.json();
    return data.responseData.translatedText;
}

// Обработчик сообщений
bot.on('text', async (ctx) => {
    const message = ctx.message.text;
    let targetLang = 'ru|en';

    // Определяем язык сообщения
    if (/^[a-zA-Z\s]+$/.test(message)) {
        targetLang = 'en|ru';
    }

    // Переводим текст
    try {
        const translatedText = await translate(message, targetLang);
        ctx.reply(translatedText);
    } catch (error) {
        console.error('Error translating text:', error);
        ctx.reply('Произошла ошибка при переводе текста');
    }
});

// Запуск бота
bot.launch().then(() => {
    console.log('Bot is running...');
});
