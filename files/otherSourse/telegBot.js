
const { token } = require('./botToken')
const {commandsTeleg} = require('./botCommands.js')
//Кнопки команды select
const {btnsConfig} = require('./btnsConfig')

function telegBot() {

    const TelegramBot = require('node-telegram-bot-api');
    const bot = new TelegramBot(token, { polling: true });
    const telegUrl = 'https://ya.ru/'

    // Matches "/echo [whatever]"

    // Listen for any kind of message. There are different kinds of
    // messages.

    /* const commandsTeleg = [
        { command: '/start', description: 'Перезапуск бота' },
        { command: '/selection', description: 'подбор' },
        { command: '/helpdkc', description: 'помошь ДКС' }
    ]
 */
    bot.setMyCommands(commandsTeleg)
    
    bot.on('message', async (msg) => {
        const chatId = msg.from.id;
        let textMsg = msg.text;

        if (msg.text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/eb3/785/eb3785af-ebcb-331c-9928-c9fb7f2fc260/1.webp')
            await bot.sendMessage(chatId, 'Привет!!! \n Выберите действие по кнопке Меню!!!')
            return    

        }

        if(msg.text === '/selection'){
            await bot.sendMessage(chatId,'Выбурите группу продукции',{
                reply_markup:{
                    inline_keyboard: btnsConfig(msg.text)
                }
            })
            return
            
        }
        



        if (msg.text.toString().toLocaleLowerCase().indexOf('кабель') >= 0) {

            await bot.sendMessage(chatId, `Отлично, сейчас подберем кабель`, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Оптический',
                            callback_data: 'cableOptic'
                        }, {
                            text: 'Медный',
                            callback_data: 'cableCuprum'
                        }],
                    ]
                }
            })

        }

        if (textMsg.toLocaleLowerCase().includes('представит')) {

            await bot.sendMessage(chatId, 'Выберите регион', {
                reply_markup: {
                    inline_keyboard: arrBtnRPP
                }
            })

        }




        if (textMsg === '/config') {
            await bot.sendMessage(chatId, 'По кнопке ниже открой конфигуратор', {
                reply_markup: {
                    keyboard: [
                        [{ text: 'Конфигуратор СКС', web_app: { url: telegUrl } }]
                    ]
                }
            })

        }
    })


    let arrBtnRPP = [
        [{ text: 'УРФО', callback_data: 'URAL' }],
        [{ text: 'СЗФО', callback_data: 'SZFO' }],
        [{ text: 'ЦЕНТР и МО', callback_data: 'CENTR' }],
        [{ text: 'ЮГ', callback_data: 'UG' }],
        [{ text: 'СИБИРЬ', callback_data: 'SIB' }],
        [{ text: 'ПОВОЛЖЬЕ', callback_data: 'VOLGA' }]
    ]

    let fio = 'FIO'
    let tel = 'tel'
    let email = 'email'

    let elRppCont = `
    <b>${fio}</b>
    <b>${tel}</b>
    <b>${email}</b>
    <b>bold</b>, <strong>bold</strong>
    <i>italic</i>, <em>italic</em>
    <u>underline</u>, <ins>underline</ins>
    <s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>
    <span class="tg-spoiler">spoiler</span>, <tg-spoiler>spoiler</tg-spoiler>
    <b>bold <i>italic bold <s>italic bold strikethrough <span class="tg-spoiler">italic bold strikethrough spoiler</span></s> <u>underline italic bold</u></i> bold</b>
    <a href="http://www.example.com/">inline URL</a>
    <a href="tg://user?id=123456789">inline mention of a user</a>
    <tg-emoji emoji-id="5368324170671202286">👍</tg-emoji>
    <code>inline fixed-width code</code>
    <pre>pre-formatted fixed-width code block</pre>
    <pre><code class="language-python">pre-formatted fixed-width code block written in the Python programming language</code></pre>
   
    `

    class RPPCont {
        static rppContent(region, arrParams) {
            return `
        <strong>Представитель региона ${region}</strong>
        <strong>-------------------</strong>
        <strong>${arrParams.fio}</strong>
        <i>${arrParams.tel}</i>
        <i>${arrParams.email}</i>`
        }
    }

    class RPPInfo {
        constructor(f, t, e) {
            this.fio = f
            this.tel = t
            this.email = e
        }
    }


    let arrBtnCuCat = [
        [{ text: '5e', callback_data: 'CU5E' }],
        [{ text: '6', callback_data: '6' }],
        [{ text: '6a', callback_data: '6A' }]
    ]
    bot.on('callback_query', async (pm) => {
        chatIdHandler = pm.from.id
        chatIdCable = pm.from.id
        console.log(chatIdCable)
        if (pm.data == 'cableCuprum') {
            console.log(pm)
            bot.sendMessage(chatIdCable, 'Какая категория интересует?', {
                reply_markup: {
                    inline_keyboard: arrBtnCuCat
                }
            })
        }

        if (pm.data == 'URAL') {
            bot.sendMessage(chatIdCable, RPPCont.rppContent('Урал', new RPPInfo('Чаплин Алексей Викторович', '+79193901674', 'aleksey.chaplin@dkc.ru')), {
                parse_mode: 'HTML'
            })
        }

        console.log(pm)
       /*  if(pm.data === 'selectCableCu'){ */
            await bot.sendMessage(chatIdHandler,`Выберите параметр для \n ${pm.text}`,{
                reply_markup:{
                    inline_keyboard: btnsConfig(pm.data)
                }
            })
            return
            
       // }



    })

   
}

exports.telegBot = telegBot