const { json } = require('express')
const readCatalog = require('./readCatalog')

function createArrRow(data) {

    if (!data.патчКордОптика) { //Массив с именами методов
        let arrName = ['pcord']

        //массив объектов из файла
        let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))

        let arrArt

        //Массив объектов набора
        if (!data.подборПоКатегории) {
            arrArt = arrName.map(item => new ResObj(arrObj[arrName.indexOf(item)], data, item))
        } else {

            let arrTempCat
            switch (data.категория) {
                case '5E':
                    arrTempCat = arrObj[0].артикул.filter(item => item.includes(data.категория))
                    break
                case '6':
                    arrTempCat = arrObj[0].артикул.filter(item => (!item.includes('5E')) && (!item.includes('6A')))
                    break
                case '6A':
                    arrTempCat = arrObj[0].артикул.filter(item => item.includes(data.категория))
                    break
            }
            arrArt = arrTempCat.map(item => new ResObj(arrObj[0], data, item))
        }
       // console.log(Object.keys(data))
       // arrArt.forEach(item => console.log(JSON.stringify(item)))
        return arrArt //new ResObj(opticPanel, data, 'opticPanel', mult)
    } else {
      //  console.log(data)

        let arrName = ['pcordOptic']
        let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))

        if (!data.подборПоКабелю) {

            let arrArt = arrName.map((item, index) => new ResObj(arrObj[index], data, item))
           
            let arrArtObj = []

            arrArt.forEach((item, index) => {
                item.артикул.forEach((itm, ind) => {
                    let resObj = {}
                    resObj.артикул = itm
                    resObj.наименование = item.наименование[ind]
                    resObj.количество = item.количество[ind]
                    let началоАдреса = 'https://www.dkc.ru/ru/catalog/976/'
                    resObj.адрес = `${началоАдреса}${resObj.артикул}/`
                    arrArtObj.push(resObj)
                })
            })

         //   console.log(arrArtObj)

            return arrArtObj
        }

        return { артикул: 0, Наименование: 0 }

    }
}

exports.createArrRow = createArrRow

function ResObj(obj, data, type) {
    /* console.log('obj')
    console.log(obj) */

    if (type != 'pcordOptic') {
        if (!data.подборПоКатегории) {


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
                    this.артикул = obj.артикул.find(item => item.includes(art))
                    this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
                    this.количество = data.Количество
                    break
            }
            let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'
            this.адрес = `${началоАдреса}${this.артикул}/`
        } else {





            this.артикул = obj.артикул.find(item => item.includes(type))
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.Количество

            let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'
            this.адрес = `${началоАдреса}${this.артикул}/`







        }
    } else {
        if (!data.подборПоКабелю) {

           // console.log(obj)
            //Массив выбора по кабелю
            let arrCablrType = []
            switch (data.кабель) {
                case '9':
                    arrCablrType = obj.артикул.filter(item => item.includes('9'))
                    break
                case '54':
                    arrCablrType = obj.артикул.filter(item => item.includes('54'))
                    break
                case '53':
                    arrCablrType = obj.артикул.filter(item => item.includes('53'))
                    break
                case '50':
                    arrCablrType = obj.артикул.filter(item => item.includes('50'))
                    break
            }
            /*  console.log('arr')
             console.log(arrCablrType) */
            //Массив выбора по адаптеру
            let arrAdpType = []
            switch (data.конструкция) {
                case 'LULU':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`) || item.includes(`LL${data.длина}`))
                    break
                case 'LALA':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`))
                    break
                case 'CUCU':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`) || item.includes(`CC${data.длина}`))
                    break
                case 'CACA':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`))
                    break
                case 'FUFU':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`) || item.includes(`FF${data.длина}`))
                    break
                case 'SUSU':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`) || item.includes(`SS${data.длина}`))
                    break
                case 'CULU':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`) || item.includes(`CL${data.длина}`))
                    break
                case 'CALA':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`))
                    break
                case 'CALU':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`))
                    break
                case 'CULA':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`))
                    break
                case 'FULU':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`) || item.includes(`FL${data.длина}`))
                    break
                case 'SULU':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`) || item.includes(`SL${data.длина}`))
                    break
                case 'CUFU':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`) || item.includes(`CF${data.длина}`))
                    break
                case 'SUFU':
                    arrAdpType = arrCablrType.filter(item => item.includes(`${data.конструкция}${data.длина}`) || item.includes(`SF${data.длина}`))
                    break

            }
            let arrLenght = []
            switch (data.длина) {
                case '1':
                    arrLenght = arrAdpType.filter(item => !item.includes('10') && !item.includes('15'))
                    break

                case '2':
                    arrLenght = arrAdpType.filter(item => !item.includes('20'))
                    break
                case '3':
                    arrLenght = arrAdpType.filter(item => !item.includes('30'))
                    break
                case '5':
                    arrLenght = arrAdpType.filter(item => !item.includes('50'))
                    break
                default:
                    arrLenght = arrAdpType.slice()

                    break
            }
          //  console.log('arr111')
          //  console.log(arrLenght)

            this.артикул = arrLenght
            this.наименование = arrLenght.map((item, index) => obj.наименование[obj.артикул.indexOf(item)])
            this.количество = arrLenght.map((item, index) => data.Количество)
            /* let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'
            this.адресАртикул = `${началоАдреса}${this.артикул}/` */


        }
    }

    // console.log(this)



}