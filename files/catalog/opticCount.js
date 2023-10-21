
const readCatalog = require('./readCatalog')

function createArrRow(data, path = undefined) {
    if (path) {

        console.log('......................genm')
        console.log(path)
        if (path == '/opticTableWall') {
            //Массив с именами методов
            let arrName = ['opticPanel', 'opticPanelInterface', 'opticPig', 'opticSplice', 'opticKdzs']

            //массив объектов из файла
            let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))

            //Массив объектов набора
            let arrArt = arrName.map(item => new ResObj(arrObj[arrName.indexOf(item)], data, item, path))

            console.log(Object.keys(data))

            arrArt.forEach(item => console.log(JSON.stringify(item)))

            return arrArt //new ResObj(opticPanel, data, 'opticPanel', mult)

        } else if (path == '/opticTableComplect') {

            //Массив с именами методов
            let arrName = ['opticPanelComplect']

            //массив объектов из файла
            let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))

            let arrArt = arrName.map(item => new ResObj(arrObj[arrName.indexOf(item)], data, item, path))

            console.log(arrArt)
            arrArt.forEach(item => console.log(JSON.stringify(item)))

            return arrArt

        }



    } else {
        //Массив с именами методов
        let arrName = ['opticPanel', 'opticPanelInterface', 'opticAdapter', 'opticPig', 'opticSplice', 'opticKdzs']
        let arrOrgName = ['opticOrganiser']

        //массив объектов из файла
        let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))

        //Массив объектов набора
        let arrArt = arrName.map(item => new ResObj(arrObj[arrName.indexOf(item)], data, item))

        if (data.органайзер == 'true') {
            arrObj = arrOrgName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))
            let arrOrgtArt = arrOrgName.map(item => new ResObj(arrObj[arrOrgName.indexOf(item)], data, item))
            
            arrArt = arrArt.concat(arrOrgtArt)
            console.log(arrArt)
        }

        console.log(Object.keys(data))

        arrArt.forEach(item => console.log(JSON.stringify(item)))

        return arrArt //new ResObj(opticPanel, data, 'opticPanel', mult)

    }


}

exports.createArrRow = createArrRow

function ResObj(obj, data, type, path) {

    if (path == '/opticTableWall') {

        console.log(data)


        let mult = data.высота == '2U' ? 2 : 1

        switch (type) {
            case 'opticPanel':
                let findKey = data.кроссТип == 24 ? "BEBL" : "BE2BL"
                this.артикул = obj.артикул.find(item => item.includes(findKey))
                this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
                if ((data.количествоВолокон / data.кроссТип) <= 1) {
                    this.количество = data.Количество
                    console.log("===================")
                    console.log(this.количество)
                } else {
                    this.количество = data.Количество * Math.ceil(data.количествоВолокон / data.кроссТип)
                }



                /*  if (!data.КоличествоВолокон) {
                     this.количество = data.Количество * 1
                 } else {
                     if (data.адаптер == 'QLC') {
                         this.количество = Math.ceil(data.КоличествоВолокон / 96 / mult)
                     } else if (data.адаптер == 'DLC' || data.адаптер == 'DSC') {
                         this.количество = Math.ceil(data.КоличествоВолокон / 48 / mult)
                     } else {
                         this.количество = Math.ceil(data.КоличествоВолокон / 24 / mult)
                     }
                 } */


                break
            case 'opticPanelInterface':
                console.log(data.адаптер)

                //RNAP_6_L_HU_S
                let a1, a2, a3, a4, a5
                a1 = 'RNAP'

                a3 = 'L'


                a2 = '12'
                a4 = '1U'

                if (data.кабель == 'OS2') {
                    a5 = 'S'
                } else if (data.кабель == 'OM5') {
                    a5 = 'V'
                } else if (data.кабель == 'OM4') {
                    a5 = '4'
                }
                let filterAdapter = a1 + a2 + a3 + a4 + a5
                console.log("-------------k;k;k;k;-----------")
                console.log(filterAdapter)
                this.артикул = obj.артикул.find(item => item.includes(filterAdapter))
                this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
                if ((data.количествоВолокон / 24) <= 1) {
                    this.количество = data.Количество
                    console.log("===================")
                    console.log(this.количество)
                } else {
                    this.количество = data.Количество * Math.ceil(data.количествоВолокон / 24)
                }
                /*  if (!data.КоличествоВолокон) {
     
                     this.количество = data.Количество * mult
     
                 } else {
     
     
                     if (data.адаптер == 'QLC') {
                         this.количество = Math.ceil(data.КоличествоВолокон / 96 / mult) * mult
                     } else if (data.адаптер == 'DLC' || data.адаптер == 'DSC') {
                         this.количество = Math.ceil(data.КоличествоВолокон / 48 / mult) * mult
                     } else {
                         this.количество = Math.ceil(data.КоличествоВолокон / 24 / mult) * mult
                     }
                 } */


                break
            case 'opticSplice':

                let artSplice = 'RNSPLICE'
                this.артикул = obj.артикул.find(item => item.includes(artSplice))
                this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
                this.количество = Math.ceil(data.количествоВолокон / 24) * data.Количество

                break
            case 'opticKdzs':

                let artKdzs = 'RNKDZS'
                let multKdzs = 0



                this.артикул = obj.артикул.find(item => item.includes(artKdzs))
                this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
                this.количество = data.количествоВолокон * data.Количество

                break

            case 'opticPig':

                if (data.адаптер == 'QLC') {
                    multPig = 96
                } else if (data.адаптер == 'DLC') {
                    multPig = 48
                } else {
                    multPig = 24
                }
                //RNPT9LCA15 
                let arrFind
                if (data.кабель == 'OS2') {
                    arrFind = `RNPT9LC${data.полировка}15`
                    arr = arrFind
                } else if (data.кабель == 'OM5') {
                    arrFind = 'V'
                } else if (data.кабель == 'OM4') {
                    //arrFind = `RNPT54LC${data.полировка}15`
                    arrFind = `RNPT54LC${data.полировка}15`
                    arr = obj.артикул.filter(item => item.includes(arrFind))[0]
                    console.log('obj.артикул')
                    console.log(arr)
                }
                //arr = obj.артикул.filter(item => item.includes('50'))
                this.артикул = arr
                this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
                this.количество = data.количествоВолокон * data.Количество
                break

            
        }

        let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

        this.адрес = `${началоАдреса}${this.артикул}/`




    } else if (path == '/opticTableComplect') {

        //RNFP_50_DLC_U_12

        let a1 = 'RNFP', a2, a3, a4 = 'U', a5

        console.log(data)

        //a2
        switch (data.кабель) {
            case 'OS2':
                a2 = '9'
                break
            case 'OM2':
                a2 = '50'
                break
            case 'OM3':
                a2 = '53'
                break
            case 'OM4':
                a2 = '54'
                break
        }

        //a3
        a3 = data.адаптер

        a5 = data.количеcтвоПортов

        this.артикул = obj.артикул.find(item => item.includes(a1 + a2 + a3 + a4 + a5))
        this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
        this.количество = data.Количество

        let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

        this.адрес = `${началоАдреса}${this.артикул}/`


    }


    else {
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


        if(data.органайзер == 'true'){
            if (type == 'opticOrganiser') {
                this.артикул = 'RNMTPFRORG1U'
                this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
                this.количество = data.Количество
            }   
        }

       

        let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

        this.адрес = `${началоАдреса}${this.артикул}/`


    }


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
