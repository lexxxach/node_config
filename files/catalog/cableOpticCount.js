
const readCatalog = require('./readCatalog')

function createArrRow(data) {

    //Массив с именами методов
    let arrName = ['cableOptic']

    //массив объектов из файла
    let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))

    let fileObj = arrObj[0]

    //Массив артикулов по фильтру
    let arrArtTemp = arrArtCreate(fileObj, data)

   //console.log(fileObj)

    //Объект из файла
    let arrArt = arrArtTemp.map(item => new ResObj(fileObj, data, item))

    // console.log(Object.keys(data))

    //arrArt.forEach(item => console.log(JSON.stringify(item)))
    //let arrArt = []

   // console.log(arrArt)

    return arrArt //new ResObj(opticPanel, data, 'opticPanel', mult)

}

exports.createArrRow = createArrRow

function ResObj(obj, data, type) {

    //console.log(obj)

    this.артикул = obj.Артикул.find(item => item==type)
    this.наименование = obj.Наименование[obj.Артикул.indexOf(this.артикул)]
    this.количество = data.Количество * 1
   
    let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

    this.адрес = `${началоАдреса}${this.артикул}/`

    //console.log(this)
    
}



function arrArtCreate(obj, data) {
    let res = []

    //RNDT(9)_C(12)_YL_03

    let a1, a2, aRes

    switch (data.типКабеля) {
        case 'OS2':
            a1='9'
            break
        case 'OM4':
            a1='4'
            break
        case 'OM3':
            a1='3'
            break
        case 'OM2':
            a1='2'
            break
    }

    a2 = data.количествоВолокон
let aResTemp = `RNDT${a1}` 

aRes = `RNDT${a1}C${a2}`
    


    if(data.количествоВолокон=='2'){
        res = obj.Артикул.filter(item=>item.includes(aRes)&&!item.includes('24'))    
    }else if(data.количествоВолокон=='4'){
        res = obj.Артикул.filter(item=>item.includes(aRes)&&!item.includes('48'))
    }else if(data.количествоВолокон=='6'){
        res = obj.Артикул.filter(item=>{
            /* if(item.includes('03') && a1=='9'){
                return (item.includes('8')&&
                (!item.includes('18'))&&
                (!item.includes('48'))&&
                (item.includes(aResTemp)))
            }else{
                return item.includes(aRes)
            } */
            return item.includes(aRes)
       })}else if(data.количествоВолокон=='8'){
        res = obj.Артикул.filter(item=>{
            /* if(item.includes('03') && a1=='9'){
                return (item.includes('6')&&
                (!item.includes('16'))&&
                (!item.includes('36'))&&
                (item.includes(aResTemp)))
            }else{
                return item.includes(aRes)
            } */
            return item.includes(aRes)
       })}
    else{
        res = obj.Артикул.filter(item=>item.includes(aRes))
    }

    return res
}
