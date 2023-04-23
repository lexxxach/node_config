
const readCatalog = require('./readCatalog')

function createArrRow(data) {

    //Массив с именами методов
    let arrName = ['opticPanel', 'opticPanelInterface', 'opticAdapter', 'opticPig', 'opticSplice', 'opticKdzs']

    //массив объектов из файла
    let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))

    //Массив объектов набора
    let arrArt = arrName.map(item => new ResObj(arrObj[arrName.indexOf(item)], data, item))

    console.log(Object.keys(data))

    arrArt.forEach(item => console.log(JSON.stringify(item)))

    return arrArt //new ResObj(opticPanel, data, 'opticPanel', mult)

}

exports.createArrRow = createArrRow

function ResObj(obj, data, type) {

    let mult = data.высота == '2U' ? 2 : 1

    switch (type) {
        case 'opticPanel':
            this.артикул = obj.артикул.find(item => item.includes(data.высота))
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            if (!data.КоличествоВолокон) {
                this.количество = data.Количество * 1
            } else {
                if (data.адаптер == 'QLC') {
                    this.количество = Math.ceil(data.КоличествоВолокон / 96 / mult)
                } else if (data.адаптер == 'DLC' || data.адаптер == 'DSC') {
                    this.количество = Math.ceil(data.КоличествоВолокон / 48 / mult)
                } else {
                    this.количество = Math.ceil(data.КоличествоВолокон / 24 / mult)
                }
            }


            break
        case 'opticPanelInterface':
            console.log(data.адаптер)
            let filterAdapter = data.адаптер == 'DSC' ? 'QLC' : data.адаптер
            this.артикул = obj.артикул.find(item => item.includes(filterAdapter))
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            if (!data.КоличествоВолокон) {

                this.количество = data.Количество * mult

            } else {


                if (data.адаптер == 'QLC') {
                    this.количество = Math.ceil(data.КоличествоВолокон / 96 / mult) * mult
                } else if (data.адаптер == 'DLC' || data.адаптер == 'DSC') {
                    this.количество = Math.ceil(data.КоличествоВолокон / 48 / mult) * mult
                } else {
                    this.количество = Math.ceil(data.КоличествоВолокон / 24 / mult) * mult
                }
            }


            break
        case 'opticSplice':

            let artSplice = data.адаптер == 'QLC' ? 'RNSPLICEXS' : 'RNSPLICE'
            let multSplice = 0
            if (data.адаптер == 'QLC') {
                multSplice = 4
            } else if (data.адаптер == 'DLC') {
                multSplice = 2
            } else {
                multSplice = 1
            }


            this.артикул = obj.артикул.find(item => item.includes(artSplice))
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]


            this.количество = data.КоличествоВолокон ? Math.ceil(data.КоличествоВолокон / 24) : data.Количество * mult * multSplice

            break
        case 'opticKdzs':

            let artKdzs = 'RNKDZS'
            let multKdzs = 0

            if (data.адаптер == 'QLC') {
                multKdzs = 96
            } else if (data.адаптер == 'DLC') {
                multKdzs = 48
            } else {
                multKdzs = 24
            }

            this.артикул = obj.артикул.find(item => item.includes(artKdzs))
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.КоличествоВолокон ? data.КоличествоВолокон : data.Количество * mult * multKdzs

            break
        case 'opticAdapter':
            this.артикул = artAdapterType(obj, data)
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]

            if (!data.КоличествоВолокон) {
                this.количество = data.Количество * 24 * mult
            }
            else {
                if (data.адаптер == 'QLC') {
                    this.количество = Math.ceil(data.КоличествоВолокон / 4)
                } else if (data.адаптер == 'DLC' || data.адаптер == 'DSC') {
                    this.количество = Math.ceil(data.КоличествоВолокон / 2)
                }
                else {
                    this.количество = Math.ceil(data.КоличествоВолокон)
                }
            }

            break
        case 'opticPig':

            if (data.адаптер == 'QLC') {
                multPig = 96
            } else if (data.адаптер == 'DLC') {
                multPig = 48
            } else {
                multPig = 24
            }
            this.артикул = artPigType(obj, data)
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.КоличествоВолокон ? data.КоличествоВолокон : data.Количество * multPig * mult
            break

    }

    let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

    this.адрес = `${началоАдреса}${this.артикул}/`

}

// поиск артикула адаптеров
function artAdapterType(obj, data) {

    let arr = []
    let art
    switch (data.кабель) {
        case 'OM2':
            console.log(data)
            arr = obj.артикул.filter(item => item.includes('50'))
            break
        case 'OM3':
            arr = obj.артикул.filter(item => item.includes('53'))
            break
        case 'OM4':
            arr = obj.артикул.filter(item => item.includes('54'))
            break
        default:
            arr = obj.артикул.filter(item => !item.includes('50') && !item.includes('53') && !item.includes('54'))
            break
    }

    let arrAdapter = arr.filter(item => item.includes(data.адаптер))

    if (data.кабель == 'OS2') {
        if (data.полировка == 'A') {
            art = arrAdapter.find(item => data.полировка == 'A' && !item.includes('U'))
        } else {
            art = arrAdapter.find(item => item.includes('U'))
        }

    } else {
        if (data.полировка == 'U') {
            art = arrAdapter[0]
        }

    }

    return art

}

//Поиск артикула пигтейлов
function artPigType(obj, data) {

    let arr = []
    let art
    switch (data.кабель) {
        case 'OM2':
            arr = obj.артикул.filter(item => item.includes('50'))
            break
        case 'OM3':
            arr = obj.артикул.filter(item => item.includes('53'))
            break
        case 'OM4':
            arr = obj.артикул.filter(item => item.includes('54'))
            break
        default:
            arr = obj.артикул.filter(item => !item.includes('50') && !item.includes('53') && !item.includes('54'))
            break
    }

    //console.log(arr)

    let adapterType

    if (data.адаптер == 'QLC' || data.адаптер == 'DLC') {
        adapterType = 'LC'
    } else if (data.адаптер == 'DSC') {
        adapterType = 'SC'
    } else {
        adapterType = data.адаптер
    }

    let arrAdapter = arr.filter(item => item.includes(adapterType) && !item.includes('TF'))   //исключаем flexibe boot шнуры

    if (data.полировка == 'A') {
        art = arrAdapter.find(item => !item.includes('U'))
    }
    else {
        art = arrAdapter.find(item => item.includes('U'))
    }

    return art

}
