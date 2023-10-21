const { json } = require('express')
const readCatalog = require('./readCatalog')

function createArrRow(data, path) {
    console.log(path)

    if (path == '/otherDinModule') {
        let arrName = ['dinSKS', 'keyStone']
        //массив объектов из файла
        let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))
        let arrArt
        arrArt = arrName.map(item => new ResObj(arrObj[arrName.indexOf(item)], data, item))

        return arrArt

    } else if (path == '/otherWallModule') {
        let arrName = ['wallSKSModule', 'keyStone']
        //массив объектов из файла
        let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))
        let arrArt
        arrArt = arrName.map(item => new ResObj(arrObj[arrName.indexOf(item)], data, item))

        return arrArt

    } else if (path == '/otherConnModule') {

        if (data.тип != '6A') {
            let arrName = ['connectors']
            //массив объектов из файла
            let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))
            let arrArt
            arrArt = arrName.map(item => new ResObj(arrObj[arrName.indexOf(item)], data, item))

            return arrArt
        }else{
            let arrName = ['connectors']
            let arr6A = ['connectors6A1','connectors6A2']
            //массив объектов из файла
            let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))
            let arrArt
            arrArt = arr6A.map(item => new ResObj(arrObj[arrName.indexOf(arrName[0])], data, item))

            return arrArt
        }



    }else if (path == '/otherClampModule') {
        let arrName = ['clamp']
        //массив объектов из файла
        let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))
        console.log(arrObj)
        let arrArt
        arrArt = arrName.map(item => new ResObj(arrObj[arrName.indexOf(item)], data, item))

        return arrArt

    }





}

exports.createArrRow = createArrRow

function ResObj(obj, data, type) {
    /* console.log('obj')
    console.log(obj) */

    if (type == 'dinSKS') {
        this.артикул = obj.артикул[0]
        this.наименование = obj.наименование[0]
        this.количество = data.Количество
        let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

        this.адрес = `${началоАдреса}${this.артикул}/`
        console.log(this)

    } else if (type == 'wallSKSModule') {
        this.артикул = `RNW${data.количествоПортов}WH`
        this.наименование = obj.наименование[obj.артикул.findIndex(item => item == this.артикул)]
        this.количество = data.Количество
        let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

        this.адрес = `${началоАдреса}${this.артикул}/`
        console.log(this)


        
    }else if (type == 'clamp') {

        //28_5X_25_BU
        let a1 = '28', a2, a3, a4
        a2 = data.длина
        a3 = data.ширина
        a4 = data.цвет



        this.артикул = obj.артикул.find((item)=>item==`${a1}${a2}${a3}${a4}`)
        this.наименование = obj.наименование[obj.артикул.findIndex(item => item == this.артикул)]
        this.количество = data.Количество
        let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'


        this.адрес = `${началоАдреса}${this.артикул}/`
        //console.log(this)


        
    } else if (type == 'connectors') {

        if (obj.категория != '6А') {
            let экран = data.конструкция == 'U' ? 'U' : 'S'
            this.артикул = obj.артикул.find(item => item == `RN${data.тип}RJ45${экран}`)

        }


        //        this.артикул = `RNW${data.количествоПортов}WH`
        this.наименование = obj.наименование[obj.артикул.findIndex(item => item == this.артикул)]
        this.количество = data.Количество
        let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

        this.адрес = `${началоАдреса}${this.артикул}/`
        console.log(this)
    } else if (type == 'connectors6A1') {

            this.артикул = 'RN6ARJ45FJ'

            console.log(obj)


        //        this.артикул = `RNW${data.количествоПортов}WH`
        this.наименование = obj.наименование[obj.артикул.findIndex(item => item == this.артикул)]
        this.количество = data.Количество
        let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

        this.адрес = `${началоАдреса}${this.артикул}/`
        console.log(this)
    }  else if (type == 'connectors6A2') {

        this.артикул = 'RN6ARJ45FP'

        console.log(obj)


    //        this.артикул = `RNW${data.количествоПортов}WH`
    this.наименование = obj.наименование[obj.артикул.findIndex(item => item == this.артикул)]
    this.количество = data.Количество
    let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

    this.адрес = `${началоАдреса}${this.артикул}/`
    console.log(this)
}else if (type == 'keyStone') {

        let arrKSCat
        if (data.тип == 6) {
            //Массив модулей по категории
            arrKSCat = obj.артикул.filter(item => item.includes(data.тип) && !item.includes('A'))
        } else {
            //Массив модулей по категории
            arrKSCat = obj.артикул.filter(item => item.includes(data.тип))
            console.log(arrKSCat)
        }

        let arrArtKSKonstr = arrKSCat.find(item => item.includes(data.конструкция))

        this.артикул = arrArtKSKonstr
        this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
        this.количество = data.Количество
        //  console.log(this)

        let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

        this.адрес = `${началоАдреса}${this.артикул}/`

    }



}