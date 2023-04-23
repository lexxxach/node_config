const { json } = require('express')
const readCatalog = require('./readCatalog')

function createArrRow(data) {

    if (!data.патчКордОптика) { //Массив с именами методов

        //Формирование набора
        //Массив строк
        let fileName = 'cabinetDetails'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))
        // console.log(obj)

        let arrNameDet = [
            'ножки',
            'панельКрыши',
            'щеточныйВвод',
            'дверьПередняя',
            'дверьЗадняя',
            'панельБоковая',
            'стойки',
            'крышаОcнование',
            'креплениеПрофиля',
            'профиль']

        let arrArt = arrNameDet.map(item => new ResObj(obj, data, item))

        //  arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))


        /* let arrName = ['pcord']

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
        //console.log(Object.keys(data))
        //arrArt.forEach(item => console.log(JSON.stringify(item)))
        return arrArt //new ResObj(opticPanel, data, 'opticPanel', mult)
    } else {
        //console.log(data)

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

         // console.log(arrArtObj)

            return arrArtObj
        }
 */
        return arrArt

    }
}

exports.createArrRow = createArrRow

function ResObj(obj, data, type) {

    switch (type) {
        case 'ножки':
            this.артикул = obj.артикул.find(item => item == 'R5A45')
            this.наименование = obj.наименование[obj.артикул.indexOf('R5A45')]
            this.количество = data.Количество * 1
            break
        case 'панельКрыши':
            let coverPanelObj = coverPanel(obj, data)
            this.артикул = coverPanelObj.артикул
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.Количество * coverPanelObj.множитель
            break
        case 'щеточныйВвод':
            let cabinetInputObj = cabinetInput(obj, data)
            this.артикул = cabinetInputObj.артикул
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.Количество * cabinetInputObj.множитель
            break
        case 'дверьПередняя':
            let cabinetdoorFrontObj = cabinetDoor(obj, data, data.дверьПередняя, data.дверьПередняяТип)
            this.артикул = cabinetdoorFrontObj.артикул
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.Количество * cabinetdoorFrontObj.множитель
            break
        case 'дверьЗадняя':
            let cabinetdoorBackObj = cabinetDoor(obj, data, data.дверьЗадняя, data.дверьЗадняяТип)
            this.артикул = cabinetdoorBackObj.артикул
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.Количество * cabinetdoorBackObj.множитель
            break
        case 'панельБоковая':
            let cabinetSidePanelObj = cabinetSidePanel(obj, data)
            this.артикул = cabinetSidePanelObj.артикул
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.Количество * cabinetSidePanelObj.множитель
            break
        case 'стойки':
            let cabinetColumsObj = cabinetColums(obj, data)
            this.артикул = cabinetColumsObj.артикул
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.Количество * cabinetColumsObj.множитель
            break
        case 'крышаОcнование':
            let cabinetBaseObj = cabinetBase(obj, data)
            this.артикул = cabinetBaseObj.артикул
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.Количество * cabinetBaseObj.множитель
            break
        case 'креплениеПрофиля':
            let cabinetBracingObj = cabinetBracing(obj, data)
            this.артикул = cabinetBracingObj.артикул
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.Количество * cabinetBracingObj.множитель
            break
            case 'профиль':
            let cabinetProfileObj = cabinetProfile(obj, data)
            this.артикул = cabinetProfileObj.артикул
            this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
            this.количество = data.Количество * cabinetProfileObj.множитель
            break

    }
    let началоАдреса = 'https://www.dkc.ru/ru/catalog/740/'
    this.адрес = `${началоАдреса}${this.артикул}/`

    // console.log(this)
}

function ObjArt() {
    this.артикуl = ''
    this.множитель = 1
}

//Панель крыши
function coverPanel(obj, data) {

    let res = new ObjArt()

    //R5FCIT_600_B
    let n1, n2, n3
    n1 = 'R5FCIT'
    n2 = data.ширина == '6' ? '600' : '800'
    n3 = data.цвет == '9005' ? 'B' : ''
    let art = obj.артикул.find(item => item == `${n1}${n2}${n3}`)
    res.артикул = art
    if (data.глубина == '6') {
        res.множитель = 1
    } else if (data.глубина == '8') {
        res.множитель = 2
    } else if (data.глубина == '10') {
        res.множитель = 3
    } else if (data.глубина == '12') {
        res.множитель = 4
    }

    return res

}

//Щеточный ввод
function cabinetInput(obj, data) {

    let res = new ObjArt()

    let n1, n2, n3
    n1 = 'R5FSIT'
    n2 = data.ширина == '6' ? '600' : '800'
    n3 = data.цвет == '9005' ? 'B' : ''

    let art = obj.артикул.find(item => item == `${n1}${n2}${n3}`)
    res.артикул = art

    res.множитель = 1

    return res

}

//Двери
function cabinetDoor(obj, data, doorMaterial, doorType) {

    let res = new ObjArt()

    //R5ITCP_TED_20_8_0_B

    let n1, n2, n3, n4, n5, n6
    n1 = 'R5ITCP'
    switch (doorMaterial) {
        case 'GS':
            n2 = 'TED'
            break
        case 'PF':
            n2 = 'MM'
            break
        case 'MT':
            n2 = 'E'
            break


    }


    switch (data.высота) {
        case '24':
            n3 = 12
            break
        case '28':
            n3 = 14
            break
        case '32':
            n3 = 16
            break
        case '38':
            n3 = 18
            break
        case '42':
            n3 = 20
            break
        case '47':
            n3 = 22
            break
    }
    n4 = data.ширина == '6' ? '6' : '8'
    n5 = doorType == '1' ? '0' : '1'    //одностворчатая дверь 0, двустворчатая дверь 1
    n6 = data.цвет == '9005' ? 'B' : ''

    let art = obj.артикул.find(item => item == `${n1}${n2}${n3}${n4}${n5}${n6}`)
    res.артикул = art

    res.множитель = 1

    // console.log(`${n1}${n2}${n3}${n4}${n5}${n6}`)

    return res

}

//Панель боковая
function cabinetSidePanel(obj, data) {

    let res = new ObjArt()

    //R5ITCPL_K_18_100_B


    let n1, n2, n3, n4, n5
    n1 = 'R5ITCPL'
    switch (data.панельБоковаяТип) {
        case '1':
            n2 = 'K'
            break
        case '2':
            n2 = 'D'
            break
    }

    switch (data.высота) {
        case '24':
            n3 = 12
            break
        case '28':
            n3 = 14
            break
        case '32':
            n3 = 16
            break
        case '38':
            n3 = 18
            break
        case '42':
            n3 = 20
            break
        case '47':
            n3 = 22
            break
    }

    switch (data.глубина) {
        case '6':
            n4 = 60
            break
        case '8':
            n4 = 80
            break
        case '10':
            n4 = 100
            break
        case '12':
            n4 = 120
            break

    }

    n5 = data.цвет == '9005' ? 'B' : ''

    // console.log(`${n1}${n2}${n3}${n4}${n5}`)

    let art = obj.артикул.find(item => item == `${n1}${n2}${n3}${n4}${n5}`)
    res.артикул = art

    res.множитель = 1

    return res

}

//Стойки
function cabinetColums(obj, data) {

    let res = new ObjArt()

    //R5KMN_20_B

    let n1, n2, n3
    n1 = 'R5KMN'

    switch (data.высота) {
        case '24':
            n2 = 12
            break
        case '28':
            n2 = 14
            break
        case '32':
            n2 = 16
            break
        case '38':
            n2 = 18
            break
        case '42':
            n2 = 20
            break
        case '47':
            n2 = 22
            break
    }


    n3 = data.цвет == '9005' ? 'B' : ''

    let art = obj.артикул.find(item => item == `${n1}${n2}${n3}`)
    res.артикул = art

    res.множитель = 1

    return res

}

//Крыша и основание
function cabinetBase(obj, data) {

    let res = new ObjArt()

    //R5KTB_8_10_FIT_B


    let n1, n2, n3, n4, n5
    n1 = 'R5KTB'

    n2 = data.ширина == '6' ? '6' : '8'

    if (data.глубина == '6') {
        n3 = 6
    } else if (data.глубина == '8') {
        n3 = 8
    } else if (data.глубина == '10') {
        n3 = 10
    } else if (data.глубина == '12') {
        n3 = 12
    }


    n4 = 'FIT'

    n5 = (data.цвет == '9005') ? 'B' : ''

    let art = obj.артикул.find(item => item == `${n1}${n2}${n3}${n4}${n5}`)
    res.артикул = art

    res.множитель = 1

    // console.log(`${n1}${n2}${n3}${n4}${n5}`)

    return res

}

//Крепление профиля
function cabinetBracing(obj, data) {

    let res = new ObjArt()



    if (data.ширина == '6') {

        //R5PDL_800

        let n1, n2
        n1 = 'R5PDL'

        if (data.глубина == '6') {
            n2 = 600
        } else if (data.глубина == '8') {
            n2 = 800
        } else if (data.глубина == '10') {
            n2 = 1000
        } else if (data.глубина == '12') {
            n2 = 1200
        }


        let art = obj.артикул.find(item => item == `${n1}${n2}`)
        res.артикул = art

        res.множитель = 1

        // console.log(`${n1}${n2}`)



    } else {
        res.артикул = 'R5MCRE01IT'
        res.множитель = 2
    }




    return res

}

//Профиль
function cabinetProfile(obj, data) {

    let res = new ObjArt()

     //R5VUG_42_L

     let n1, n2, n3
     n1 = 'R5VUG'
    

    switch (data.высота) {
        case '24':
            n2 = 24
            break
        case '28':
            n2 = 28
            break
        case '32':
            n2 = 32
            break
        case '38':
            n2 = 38
            break
        case '42':
            n2 = 42
            break
        case '47':
            n2 = 47
            break
    }

    n3 = 'L'

    let art = obj.артикул.find(item => item == `${n1}${n2}${n3}`)
    res.артикул = art

    n3 = 'L'

    res.множитель = 2
    
   


    return res

}