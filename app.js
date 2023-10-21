const { json } = require('express')
const express = require('express')
const fs = require('fs')
const { url } = require('inspector')
const requestIP = require('request-ip')
const readCatalog = require('./files/catalog/readCatalog')
const opticCount = require('./files/catalog/opticCount')
const pcordCount = require('./files/catalog/pcordCount')
const ppanelCount = require('./files/catalog/ppanelCount')
const cableOpticCount = require('./files/catalog/cableOpticCount')
const cabinetCount = require('./files/catalog/cabinetCount')
const cabinetAccesoriesCount = require('./files/catalog/cabinetAccesoriesCount')
const powerCount = require('./files/catalog/powerCount')
const writeIp = require('./files/catalog/stat')
const otherCount = require('./files/catalog/otherCount')
const recount = require('./files/catalog/recount')
const powerPDUCount = require('./files/catalog/powerPDUCount')

const telegBot = require('./files/otherSourse/telegBot')

telegBot.telegBot()

const app = express()

app.use(express.json())

//Проекты
app.get('/proj', (req, resp) => {

    fs.readFile('indexProj.html', 'utf-8', function (err, data) {
        resp.send(data)
    })


})


//График
let arrGraphPath = [
    '/graph'
]

app.get(arrGraphPath, (req, resp) => {

    fs.readFile('graph.html', 'utf-8', function (err, data) {

        /*   let headContent = data.replace('{head}', ``)
              .replace('{scriptHead}', '<script type="module" src="./files/tasks/scriptTask.js"></script>') */
        //.replace('{content}', '<h1>Кабель</h1>')
        /* headContent.replace('{content}', '<h1>Кабель</h1>') */
        resp.send(data)
    })


})

let arrModuleJsFileGraph = [
    '/files/graph/graph.js'
]

app.get(arrModuleJsFileGraph, (req, resp) => {

    console.log(req.url)
    // console.log(`${__dirname}/files/grapf${req.url}`)
    resp.sendFile(__dirname + req.url)
})

//Маршруты
let arrRoutePath = [
    '/route'
]

app.get(arrRoutePath, (req, resp) => {

    fs.readFile('indexRoute.html', 'utf-8', function (err, data) {

        let headContent = data.replace('{head}', ``)
            .replace('{scriptHead}', '<script type="module" src="./files/route/scriptRoute.js"></script>')
        //.replace('{content}', '<h1>Кабель</h1>')
        /* headContent.replace('{content}', '<h1>Кабель</h1>') */
        resp.send(headContent)
    })


})


//Загрузка скриптов
let arrModuleJsFileRoute = [
    '/files/route/scriptRoute.js',
    '/files/route/routeModuleHead.js',
    '/files/route/routeModuleTable.js',
    '/files/route/route.txt'


]

app.get(arrModuleJsFileRoute, (req, resp) => {

    console.log(req.url)
    resp.sendFile(__dirname + req.url)
})

let arrRouteRouteRead = [
    '/routeRead'
]
app.get(arrRouteRouteRead, (req, resp) => {

    let taskFileName = (route) => {
        if (route.toLowerCase() == '/routeread') return 'route.txt'

    }

    let res = readCatalog.readRoute(taskFileName(req.path))
    console.log(res)
    resp.send(res)
})


let arrRouteRouteAdd = [
    '/routeAdd'
]

app.post(arrRouteRouteAdd, function (req, resp) {
    console.log(req.path)
    // console.log(JSON.parse(readCatalog.readCatalog('cable.txt')))

    // let arrObj = opticCount.createArrRow(req.body)
    //console.log(arrObj)

    let taskFileName = (routeAdd) => {
        console.log(routeAdd + '-------')
        if (routeAdd.toLowerCase() == '/routeadd') { return 'route.txt' }
        else return typeof routeAdd
        //if (route == '/taskPastAdd') return 'tasksPast.txt'
    }

    //console.log(taskFileName(req.path))

    let res = readCatalog.readRoute(taskFileName(req.path))

    //console.log(req.body)

    if (res.length == 0) {
        fs.writeFileSync(`./files/route/${taskFileName(req.path)}`, JSON.stringify(req.body))
    } else if (!res[0]) {

        fs.writeFileSync(`./files/route/${taskFileName(req.path)}`, JSON.stringify(req.body))

    } else {
        fs.appendFileSync(`./files/route/${taskFileName(req.path)}`, '\n' + JSON.stringify(req.body))

    }

    let answer = { статус: 'ок' }

    resp.json(answer)

})


/* app.post(arrRouteTaskAdd, function (req, resp) {
    console.log(req.path)
    // console.log(JSON.parse(readCatalog.readCatalog('cable.txt')))

    // let arrObj = opticCount.createArrRow(req.body)
    //console.log(arrObj)

    let taskFileName = (route) => {
        if (route == '/taskAdd') return 'tasks.txt'
        if (route == '/taskPastAdd') return 'tasksPast.txt'
    }

    let res = readCatalog.readTask(taskFileName(req.path))

    if (res.length == 0) {
        fs.writeFileSync(`./files/tasks/${taskFileName(req.path)}`, JSON.stringify(req.body))
    } else if (!res[0]) {

        fs.writeFileSync(`./files/tasks/${taskFileName(req.path)}`, JSON.stringify(req.body))

    } else {
        fs.appendFileSync(`./files/tasks/${taskFileName(req.path)}`, '\n' + JSON.stringify(req.body))

    }

    let answer = { статус: 'ок' }

    resp.json(answer)

}) */

let arrRouteRouteRemove = [
    '/routeRemove'
]

app.post(arrRouteRouteRemove, (req, resp) => {


    let reqObj = req.body
    /* let reqObj = req.body
    console.log(req.body) */

    let taskFileName = (route) => {
        if (route == '/routeRemove') return 'route.txt'
        //if (route == '/taskPastRemove') return 'tasksPast.txt'
    }

    if (reqObj) {

        let res = readCatalog.readRoute(taskFileName(req.path))

        console.log('-----------')
        console.log(res)

        //обработка одной строки
        if (res.length == 1) {
            console.log(res.length)
            let taskObj = JSON.parse(res[0])
            taskObj.ид == reqObj.ид ? fs.writeFileSync(`./files/route/${taskFileName(req.path)}`, '') : true
        } else {

            fs.writeFileSync(`./files/route/${taskFileName(req.path)}`, '')

            let count = 0

            res.forEach((item, index) => {

                let itemObj = JSON.parse(item)

                if ('' + itemObj.ид != reqObj.ид) {
                    if (!count) {
                        fs.writeFileSync(`./files/route/${taskFileName(req.path)}`, item)
                        count++

                    } else {
                        console.log('' + itemObj.ид)
                        console.log(item)
                        fs.appendFileSync(`./files/route/${taskFileName(req.path)}`, '\n' + item)

                    }

                }

            });

        }

    }

    let answer = { статус: 'ок' }

    resp.json(answer)

})



//Задачи

let arrTaskPath = [
    '/task',
    '/taskPast'
]

app.get(arrTaskPath, (req, resp) => {

    fs.readFile('indexTask.html', 'utf-8', function (err, data) {

        let headContent = data.replace('{head}', ``)
            .replace('{scriptHead}', '<script type="module" src="./files/tasks/scriptTask.js"></script>')
        //.replace('{content}', '<h1>Кабель</h1>')
        /* headContent.replace('{content}', '<h1>Кабель</h1>') */
        resp.send(headContent)
    })


})

let arrRouteTaskRead = [
    '/taskRead',
    '/taskPastRead'
]
app.get(arrRouteTaskRead, (req, resp) => {

    let taskFileName = (route) => {
        if (route == '/taskRead') return 'tasks.txt'
        if (route == '/taskPastRead') return 'tasksPast.txt'
    }

    let res = readCatalog.readTask(taskFileName(req.path))
    //console.log(res)
    resp.send(res)
})

let arrModuleJsFileTask = [
    '/files/tasks/scriptTask.js',
    '/files/tasks/taskModuleHead.js',
    '/files/tasks/taskModuleTable.js',
    '/files/tasks/tasks.txt',
    '/files/tasks/tasksPast.txt'

]

app.get(arrModuleJsFileTask, (req, resp) => {

    console.log(req.url)
    resp.sendFile(__dirname + req.url)
})

let arrRouteTaskAdd = [
    '/taskAdd',
    '/taskPastAdd'
]

app.post(arrRouteTaskAdd, function (req, resp) {
    console.log(req.path)
    // console.log(JSON.parse(readCatalog.readCatalog('cable.txt')))

    // let arrObj = opticCount.createArrRow(req.body)
    //console.log(arrObj)

    let taskFileName = (route) => {
        if (route == '/taskAdd') return 'tasks.txt'
        if (route == '/taskPastAdd') return 'tasksPast.txt'
    }

    let res = readCatalog.readTask(taskFileName(req.path))

    if (res.length == 0) {
        fs.writeFileSync(`./files/tasks/${taskFileName(req.path)}`, JSON.stringify(req.body))
    } else if (!res[0]) {

        fs.writeFileSync(`./files/tasks/${taskFileName(req.path)}`, JSON.stringify(req.body))

    } else {
        fs.appendFileSync(`./files/tasks/${taskFileName(req.path)}`, '\n' + JSON.stringify(req.body))

    }

    let answer = { статус: 'ок' }

    resp.json(answer)

})

let arrRouteTaskRemove = [
    '/taskRemove',
    '/taskPastRemove'
]

app.post(arrRouteTaskRemove, (req, resp) => {

    let reqObj = req.body
    console.log(req.body)

    let taskFileName = (route) => {
        if (route == '/taskRemove') return 'tasks.txt'
        if (route == '/taskPastRemove') return 'tasksPast.txt'
    }

    if (reqObj) {

        let res = readCatalog.readTask(taskFileName(req.path))

        //обработка одной строки
        if (res.length == 1) {
            console.log(res.length)
            let taskObj = JSON.parse(res[0])
            taskObj.ид == reqObj.ид ? fs.writeFileSync(`./files/tasks/${taskFileName(req.path)}`, '') : true
        } else {

            fs.writeFileSync(`./files/tasks/${taskFileName(req.path)}`, '')

            let count = 0

            res.forEach((item, index) => {

                let itemObj = JSON.parse(item)

                if ('' + itemObj.ид != reqObj.ид) {
                    if (!count) {
                        fs.writeFileSync(`./files/tasks/${taskFileName(req.path)}`, item)
                        count++

                    } else {
                        console.log('' + itemObj.ид)
                        console.log(item)
                        fs.appendFileSync(`./files/tasks/${taskFileName(req.path)}`, '\n' + item)

                    }

                }

            });

        }

    }

    let answer = { статус: 'ок' }

    resp.json(answer)

})




app.get('/', (req, resp) => {

    fs.readFile('index.html', 'utf-8', function (err, data) {
        resp.send(data)
    })


})

/* app.get('/files/catalog/cableModule.js', (req, resp) => {
    resp.sendFile(__dirname + req.url)

})

//загрузка модулей шапки
app.get('/files/catalog/script.js', (req, resp) => {

    resp.sendFile(__dirname + req.url)


})

app.get('/files/catalog/tableModule.js', (req, resp) => {

    resp.sendFile(__dirname + req.url)


}) */

let arrModuleJsFiles = [
    '/files/catalog/cableModule.js',
    '/files/catalog/script.js',
    '/files/catalog/tableModule.js',
    '/files/catalog/opticCount.js',
    '/files/catalog/table.css',
    '/files/catalog/toast.css',
    '/files/catalog/main.css',
    '/files/catalog/decorationCss.js',
    '/files/catalog/exportToExcel.js',
    '/files/catalog/table2Excel.js',
    '/files/catalog/tableToExcel2.js',
    '/files/catalog/pcordCount.js',
    '/files/catalog/cabinetCount.js',
    '/files/catalog/otherCount.js',
    '/files/catalog/cabinetAccesoriesCount.js',
    '/files/catalog/cableOpticCount.js',
    '/files/catalog/moduleCopy.js',
    '/files/catalog/img/copyContent.png',
    '/files/catalog/tableModuleCopy.js',
    '/files/catalog/moduleToast.js',
    '/files/catalog/params.js',
    '/files/catalog/powerCount.js',
    '/files/catalog/powerPDUCount.js',
    '/files/catalog/moduleRecount.js',
    '/files/catalog/recount.js',
    '/files/catalog/elemHtml/elemPowerPdu.js',
    '/files/catalog/catalogFiles/universalModule/tableJob.js'

]

app.get(arrModuleJsFiles, (req, resp) => {

    console.log(req.url)
    resp.sendFile(__dirname + req.url)
})


app.get(routeHead(), (req, resp) => {

    //запись IP
    //Включить
     try {
         writeIp.writeIp('./files/catalog/stat/', 'statistic.txt', requestIP.getClientIp(req), req.path)
     } catch (error) {
         
     }



    fs.readFile('index.html', 'utf-8', function (err, data) {

        let nameHead

        switch (req.url) {
            case '/cable':
                nameHead = 'Параметры выбора кабеля'
                break
            case '/optic':
                nameHead = 'Параметры выбора оптических компонентов'

                break
            case '/cableOptic':
                nameHead = 'Параметры выбора Оптического кабеля'
                break
            case '/pcord':
                nameHead = 'Параметры выбора патч-кордов (Медь)'

                break
            case '/pcordOptic':
                nameHead = 'Параметры выбора патч-кордов (Оптика)'

                break
            case '/ppanel':
                nameHead = 'Параметры выбора патч-панелей'

                break
            case '/cabinet':
                nameHead = 'Параметры выбора напольных шкафов'

                break
            case '/power':
                nameHead = 'Управление питанием'

                break
            case '/other':
                nameHead = 'Прочие компненты СКС'

                break
            case '/recount':
                nameHead = 'Пересчет'

                break
        }



        let headContent = data.replace('{head}', `<h1>${nameHead}</h1>`)
            .replace('{scriptHead}', '<script type="module" src="./files/catalog/script.js"></script>')
        headContent.replace('{content}', '<h1>Кабель</h1>')




        resp.send(headContent)
    })





})

app.post('/cableTable', function (req, resp) {
    // console.log(JSON.stringify(req.body))
    // console.log(JSON.parse(readCatalog.readCatalog('cable.txt')))

    let res = JSON.parse(readCatalog.readCatalog('cable.txt'))

    let r = resultObj(req.url, req.body)

    // console.log(r)

    resp.json(r)

})

app.post('/opticTable', function (req, resp) {
    let arrObj = opticCount.createArrRow(req.body)
    //console.log(req.body)

    resp.json(arrObj)
})

app.post('/opticTableWall', function (req, resp) {


    let arrObj = opticCount.createArrRow(req.body, req.path)
    //console.log(arrObj)

    resp.json(arrObj)
})

app.post('/opticTableComplect', function (req, resp) {

    console.log(req.path)

    let arrObj = opticCount.createArrRow(req.body, req.path)
    //  console.log(arrObj)

    resp.json(arrObj)
})

app.post('/powerCable', function (req, resp) {

    // console.log(req.path)
    // console.log(req.body)

    let arrObj = powerCount.createArrRow(req.body, req.path)
    //  console.log(arrObj)

    resp.json(arrObj)
})

app.post('/powerPDU', function (req, resp) {

     console.log(req.path)
    // console.log(req.body)

    let arrObj = powerPDUCount.createArrRow(req.body, req.path)
    //  console.log(arrObj)

    resp.json(arrObj)
})

app.post(['/otherDinModule', '/otherWallModule', '/otherConnModule', '/otherClampModule'], function (req, resp) {

    console.log(req.path)
    console.log(req.body)

    let arrObj = otherCount.createArrRow(req.body, req.path)
    //  console.log(arrObj)

    resp.json(arrObj)
})

app.post(['/recountModule'], function (req, resp) {

    console.log(req.path)
    console.log(req.body)

    let arrObj = recount.createArrRow(req.body, req.path)
    //  console.log(arrObj)

    resp.json(arrObj)
})













app.post('/pcordTable', function (req, resp) {
    //  alert.log(req.body)

    let arrObj = pcordCount.createArrRow(req.body)
    // console.log(arrObj)

    resp.json(arrObj)
})



app.post('/ppanelTable', function (req, resp) {
    // console.log(req.body)

    let arrObj = ppanelCount.createArrRow(req.body)
    //console.log(arrObj)

    resp.json(arrObj)
})

app.post('/pcordOpticTable', function (req, resp) {
    //  alert.log(req.body)

    // console.log(req.body)

    let arrObj = pcordCount.createArrRow(req.body)
    // console.log(arrObj)

    resp.json(arrObj)
})



app.post(['/cabinet', '/cabinetWall'], function (req, resp) {
    //  alert.log(req.body)

    console.log(req.body)
    console.log(req.path)

    let arrObj = cabinetCount.createArrRow(req.path, req.body)
    // console.log(arrObj)

    resp.json(arrObj)
})

let arrCabinet = [
    '/cabinetGrounding',
    '/cabinetBracing',
    '/cabinetUnification',
    '/cabinetPlinth',
    '/cabinetStubs',
    '/cabinetFan',
    '/cabinetBracket',
    '/cabinetBracketVar',
    '/cabinetBracketVarMini',
    '/cabinetOrganiserGorisont',
    '/cabinetOrganiserVertical',
    '/cabinetOrganiserRing',
    '/cabinetDinModule',
    '/cabinetLight',
    '/cabinetshelf1U',
    '/cabinetshelf2U'


]

app.post(arrCabinet, function (req, resp) {
    //  alert.log(req.body)
    //   console.log('------Тело запроса -------------')
    console.log(req.body)

    //console.log(req.body)

    let arrObj = cabinetAccesoriesCount.createArrRow(req.path, req.body)
    // console.log(arrObj)

    resp.json(arrObj)
})

app.post('/cableOpticTable', function (req, resp) {
    //  alert.log(req.body)

    console.log(req.body)

    let arrObj = cableOpticCount.createArrRow(req.body)
    // console.log(arrObj)

    resp.json(arrObj)
})








function routeHead() {
    let appPath = []
    appPath.push('/cable')
    appPath.push('/cableOptic')
    appPath.push('/optic')
    appPath.push('/pcord')
    appPath.push('/pcordOptic')
    appPath.push('/ppanel')
    appPath.push('/cabinet')
    appPath.push('/power')
    appPath.push('/other')
    appPath.push('/recount')
    return appPath
}

/* Возвращает объект с даными для fetch
route - маршрут запроса
dataObj - объект с данными из файла
 */
function resultObj(route, dataObj) {

    res = {}

    if (route == '/cableTable') {
        let objCatalogCable = JSON.parse(readCatalog.readCatalog('cable.txt'))

        /*Описание формирование артикула Кабеля
        //RN 5E UU А01 GY
        //1_RN - группа продуктов СКС
        //2_5E - Категория кабеля
        //3_UU - Конструкция кабеля
        //4_'' - Производитель
        //5_A01 - Внутренний код исполнения
        //6_GY - Цвет оболочки кабеля  */
        let art, name, r1, r2, r3, r4, r5
        r1 = 'RN'
        r2 = dataObj.Категория.toUpperCase()
        r3 = dataObj.Конструкция.toUpperCase()
        r4_1 = dataObj.Производство == 'Россия' ? 'K' : 'A'
        r5 = dataObj.Оболочка.toUpperCase()
        r4 = (r4_1 == 'A' && (r5 == 'PV' || r5 == 'PE')) ? '' : r4_1

        let arrArt = objCatalogCable.Артикул
        let arrName = objCatalogCable.Наименование

        // console.log(`Проверка_________${r1}${r2}${r3}${r4}${r5}`)

        art = arrArt.find(item => item.includes(`${r1}${r2}${r3}${r4}${r5}`))
        name = arrName[arrArt.indexOf(art)]

        res.артикул = art
        res.наименование = name
        res.количество = dataObj.Количество
        res.началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'
        res.адрес = `${res.началоАдреса}${art}/`

        /*  console.log('____________')
         console.log(res)
  */
        return res

    }

    return res

}


/* app.get('/cabinet', (req, resp) => {

    fs.readFile('index.html', 'utf-8', function (err, data) {


        console.log(readCatalog.readCatalog('cable.txt'))


        let dataContent = data.replace('{content}', '<h1>Кабинет</h1>')



        resp.send(dataContent)
    })


}) */


app.listen(5000, () => console.log('Сервер запущен'))