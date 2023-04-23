
const readCatalog = require('./readCatalog')

function createArrRow(data) {

    //Массив с именами методов
    let arrName = ['pcord']

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

   switch (type) {
        case 'pcord':
            let art
            let ind1 = 'RN'
            let ind2 = data.категория
            let ind3 = data.конструкция
            let ind4 = '45'
            let ind5 = data.длина
            let ind6 = data.цвет      
            art = `${ind1}${ind2}${ind3}${ind4}${ind5}${ind6}`
        
        this.артикул = obj.артикул.find(item => item.includes(data.высота))
        this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
        
            this.количество = data.Количество
            break

    }

    let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'



    this.адрес = `${началоАдреса}${this.артикул}/`

 console.log(this)

}