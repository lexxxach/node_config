const { json } = require('express')
const readCatalog = require('./readCatalog')

function createArrRow(path, data) {
    // console.log(path)
    if (path == '/cabinetGrounding') {
        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        let arrNameAcc = ['cabinetGrounding']

        let arrGrndArt = ['R5SGB19', 'R5SGC05']

        arrArt = arrGrndArt.map(item => new ResObj(obj, data, 'Grounding', item))
        // console.log(arrArt)
        return arrArt
    } else if (path == '/cabinetBracing') {
        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        //let arrNameAcc = ['cabinetGrounding']

        let arrBrcArt = ['R5CNS50']

        arrArt = arrBrcArt.map(item => new ResObj(obj, data, 'Bracing', item))
        // console.log(arrArt)
        return arrArt
    } else if (path == '/cabinetUnification') {
        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        //let arrNameAcc = ['cabinetGrounding']

        let arrBrcArt = ['R5KE65']

        arrArt = arrBrcArt.map(item => new ResObj(obj, data, 'Unification', item))
        // console.log(arrArt)
        return arrArt
    } else if (path == '/cabinetPlinth') {
        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))



        //let arrNameAcc = ['cabinetGrounding']



        // R5ZEIT_6_6_1
        let a1, a2, a3, a4
        a1 = 'R5ZEIT'
        a2 = data.ширина
        a3 = data.глубина
        a4 = data.глубина == '10' ? '' : '1'
        let arrBrcArt = [a1 + a2 + a3 + a4]

        arrArt = arrBrcArt.map(item => new ResObj(obj, data, 'Plinth', item))
        // console.log(arrArt)
        return arrArt
    } else if (path == '/cabinetStubs') {
        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        // R5PRK_1_B

        let a1, a2, a3
        a1 = 'R5PRK'

        a2 = data.высота

        a3 = data.цвет != '7035' ? 'B' : ''
        let arrStbsArt = [a1 + a2 + a3]
        arrArt = arrStbsArt.map(item => new ResObj(obj, data, 'Stubs', item))

        return arrArt

    } else if (path == '/cabinetFan') {

        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        // R5VSIT_80_09_F_T_B

        let a1, a2, a3, a4, a5, a6
        a1 = 'R5VSIT'

        a2 = `${data.ширина}0`

        a3 = `0${data.количествоВентиляторов}`

        a4 = 'F'

        a5 = (data.термостат == 'true') ? 'T' : ''

        //console.log(data.термостат)

        a6 = data.цвет != '7035' ? 'B' : ''
        let arrStbsArt = [a1 + a2 + a3 + a4 + a5 + a6]
        arrArt = arrStbsArt.map(item => new ResObj(obj, data, 'Fan', item))

        //console.log(arrStbsArt)

        return arrArt

    } else if (path == '/cabinetBracket') {

        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        // R5GFITU_800

        let a1, a2
        a1 = 'R5GFITU'

        a2 = `${data.глубина}00`

        let arrStbsArt = [a1 + a2]
        arrArt = arrStbsArt.map(item => new ResObj(obj, data, 'Bracket', item))

        //console.log(arrStbsArt)

        return arrArt

    }else if (path == '/cabinetBracketVar') {

        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        // R5GRIT_800

        let a1, a2
        a1 = 'R5GRIT'

        a2 = `${data.глубина}00`

        let arrStbsArt = [a1 + a2]
        arrArt = arrStbsArt.map(item => new ResObj(obj, data, 'Bracket', item))

        //console.log(arrStbsArt)

        return arrArt

    } 
    else if (path == '/cabinetBracketVarMini') {

        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        // R5SCRK01_B

        let a1, a2
        a1 = 'R5SCRK01'

        a2 = data.цвет=='7035'?'':'B'

        let arrStbsArt = [a1 + a2]
        arrArt = arrStbsArt.map(item => new ResObj(obj, data, 'Bracket', item))

        //console.log(arrStbsArt)

        return arrArt

    }
    else if (path == '/cabinetOrganiserGorisont') {

        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        // R5CP_(F)_19_4_1_HE_B

        let a1, a2, a3, a4, a5, a6
        a1 = 'R5CP'

        a2 = data.отверстие == 'true' ? 'F' : ''

        a3 = '19'

        a4 = data.глубина

        a5 = data.высота

        a6 = 'HE'

        a7 = data.цвет == '7035' ? '' : 'B'

        let arrStbsArt = [a1 + a2 + a3 + a4 + a5 + a6 + a7]
        arrArt = arrStbsArt.map(item => new ResObj(obj, data, 'OrginiserGorisont', item))

        // console.log(arrStbsArt)

        return arrArt

    } else if (path == '/cabinetOrganiserVertical') {

        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        // R5VRPC_42_60_B

        let a1, a2, a3, a4
        a1 = 'R5VRPC'



        a2 = data.высота

        a3 = `${data.глубина}0`



        a4 = data.цвет == '7035' ? '' : 'B'

        let arrStbsArt = [a1 + a2 + a3 + a4]
        arrArt = arrStbsArt.map(item => new ResObj(obj, data, 'OrganiserVertical', item))

        console.log(arrStbsArt)

        return arrArt

    } else if (path == '/cabinetOrganiserRing') {

        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        // R5ITCP_40_60_B

        let a1, a2, a3, a4
        a1 = 'R5ITCP'



        a2 = `${data.ширина}0`

        a3 = `${data.глубина}0`



        a4 = data.цвет == '7035' ? '' : 'B'

        let arrStbsArt = [a1 + a2 + a3 + a4]
        arrArt = arrStbsArt.map(item => new ResObj(obj, data, 'OrganiserRing', item))

        console.log(arrStbsArt)

        return arrArt

    } else if (path == '/cabinetDinModule') {

        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        // R5CMDIT3HE_B


        let a1, a2
        a1 = 'R5CMDIT3HE'

        a2 = data.цвет == '7035' ? '' : 'B'

        let arrStbsArt = [a1 + a2]
        arrArt = arrStbsArt.map(item => new ResObj(obj, data, 'DinModule', item))

        //console.log(arrStbsArt)

        return arrArt

    }else if (path == '/cabinetLight') {

        let fileName = 'cabinetAccesories'
        let obj = JSON.parse(readCatalog.readCatalog(`${fileName}.txt`))

        // R5LA06
        // R5MAG01N
        // R5MC01

        let arrStbsArt = []

        //Светильник
        let a1, a2
        a1 = 'R5LA0'

        a2 = data.ширина=='6'?'3':'6'

        arrStbsArt.push(a1+a2)
        arrStbsArt.push('R5MAG01N')
        arrStbsArt.push('R5MC01')

        arrArt = arrStbsArt.map(item => new ResObj(obj, data, 'Light', item))

        //console.log(arrStbsArt)

        return arrArt

    }






}

exports.createArrRow = createArrRow

function ResObj(obj, data, type, prop = undefined) {

    switch (type) {
        case 'Grounding':
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break
        case 'Bracing':
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break
        case 'Unification':
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break
        case 'Plinth':
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break
        case 'Stubs':
            // console.log(obj.артикул.find(item => item == prop))
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break
        case 'Fan':
            //  console.log(obj.артикул.find(item => item == prop))
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break
        case 'Bracket':
            //  console.log(obj.артикул.find(item => item == prop))
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break
            case 'BracketVar':
            //  console.log(obj.артикул.find(item => item == prop))
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break
            case 'BracketVarMini':
            //  console.log(obj.артикул.find(item => item == prop))
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break

        case 'OrginiserGorisont':
            //  console.log(obj.артикул.find(item => item == prop))
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break
        case 'OrganiserVertical':
            //  console.log(obj.артикул.find(item => item == prop))
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break
        case 'OrganiserRing':
            //  console.log(obj.артикул.find(item => item == prop))
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break
        case 'DinModule':
            //  console.log(obj.артикул.find(item => item == prop))
            this.артикул = obj.артикул.find(item => item == prop)
            this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
            this.количество = data.Количество * 1
            break
            case 'Light':
                //  console.log(obj.артикул.find(item => item == prop))
                this.артикул = obj.артикул.find(item => item == prop)
                this.наименование = obj.наименование[obj.артикул.indexOf(prop)]
                this.количество = data.Количество * 1
                break


    }
    let началоАдреса = 'https://www.dkc.ru/ru/catalog/740/'
    this.адрес = `${началоАдреса}${this.артикул}/`

    console.log(this)
}

