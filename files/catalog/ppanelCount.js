const readCatalog = require('./readCatalog')

function createArrRow(data) {

    if (!data.признакНаборнойПанели) {

        //Массив с именами методов
        let arrName = ['ppanelModule']

        //массив объектов из файла
        //let arrObj = arrName.map(item => 111)
        let arrObj = arrName.map(item => {
            //  console.log(JSON.parse(readCatalog.readCatalog(`${item}.txt`)))
            return JSON.parse(readCatalog.readCatalog(`${item}.txt`))
        }
        )

        let arrArt

        //Массив объектов набора
        if (!data.подборПоКатегории) {

            //Массив артикулов по фильтру

            //формирование массива артикулов по категории
            let arrCat
            switch (data.категория) {
                case '5E':
                    arrCat = arrObj[0].артикул.filter(item => item.includes('5') && !item.includes('6'))
                    //           console.log(arrCat)
                    break
                case '6':
                    arrCat = arrObj[0].артикул.filter(item => {
                        if (item.includes('6') && !item.includes('A')) {
                            return true

                        } else {
                            return false
                        }

                    })
                    //console.log(arrCat)
                    break
                case '6A':
                    arrCat = arrObj[0].артикул.filter(item => item.includes('6A'))
                    //console.log(arrCat)
                    break
            }

            //формирование массива артикулов по типу
            let arrType = arrCat.filter(item => item.includes(data.конструкция))

            //  console.log(arrType)
            arrArt = arrType.map(item => new ResObj(arrObj[0], data, item))
        } else {

            let arrCat
            switch (data.категория) {
                case '5E':
                    arrCat = arrObj[0].артикул.filter(item => item.includes('5') && !item.includes('6'))
                    //          console.log(arrCat)
                    break
                case '6':
                    arrCat = arrObj[0].артикул.filter(item => {
                        if (item.includes('6') && !item.includes('A')) {
                            return true

                        } else {
                            return false
                        }

                    })
                    //console.log(arrCat)
                    break
                case '6A':
                    arrCat = arrObj[0].артикул.filter(item => item.includes('6A'))
                    //console.log(arrCat)
                    break
            }

            arrArt = arrCat.map(item => new ResObj(arrObj[0], data, item))

        }

        console.log(12345)
        console.log(arrArt)

        return arrArt
    } else {
        //Массив с именами методов
        let arrName = ['ppanelVar', 'keyStone']

        //массив объектов из файла
        let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))

        console.log(arrObj)

        let arrArt = arrName.map(item => new ResObj(arrObj[arrName.indexOf(item)], data, item))

        return arrArt



    }


}

exports.createArrRow = createArrRow

function ResObj(obj, data, type) {

    if (!data.признакНаборнойПанели) {

        if (!data.подборПоКатегории) {
            //     console.log(type)

            this.артикул = obj.артикул.find(item => item == type)
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.Количество
            let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'
            this.адрес = `${началоАдреса}${this.артикул}/`
        } else {
            this.артикул = obj.артикул.find(item => item == type)
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.Количество
            let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'
            this.адрес = `${началоАдреса}${this.артикул}/`

        }

    } else {

        console.log(obj)
        switch (type) {
            case 'ppanelVar':

                //Массив панелей по высоте
                let arrPPHeight = obj.артикул.filter(item => item.includes(data.высота))
                //Выбор по плотности
                let artPPanel = arrPPHeight.find(item => item.includes(data.плотность) && !item.includes('A'))

                this.артикул = artPPanel
                this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
                this.количество = data.Количество
                                
                this.адрес = `${'https://www.dkc.ru/ru/catalog/1389/'}${this.артикул}/`
                break
            case 'keyStone':

                let arrKSCat
                if (data.категория == 6) {
                    //Массив модулей по категории
                    arrKSCat = obj.артикул.filter(item => item.includes(data.категория) && !item.includes('A'))
                } else {
                    //Массив модулей по категории
                    arrKSCat = obj.артикул.filter(item => item.includes(data.категория))
                }

                let arrArtKSKonstr = arrKSCat.find(item => item.includes(data.конструкция))

                this.артикул = arrArtKSKonstr
                this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
                this.количество = data.плотность * data.Количество
                //  console.log(this)

                let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

                this.адрес = `${началоАдреса}${this.артикул}/`

                break


        }



    }

    console.log(this)

}