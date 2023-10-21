
const readCatalog = require('./readCatalog')

function createArrRow(data) {

    //Массив с именами методов
    let arrName = ['powerCable']

    //массив объектов из файла
    let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))

    let fileObj = arrObj[0]
    
    //Массив артикулов по фильтру
    let arrArtTemp = arrArtCreate(fileObj, data)
   
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
   
    this.артикул = obj.артикул.find(item => item==type)
    this.наименование = obj.наименование[obj.артикул.indexOf(this.артикул)]
    this.количество = data.Количество * 1
   
    let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

    this.адрес = `${началоАдреса}${this.артикул}/`

    //console.log(this)
    
}



function arrArtCreate(obj, data) {
    let res = []

    //R5CORD_S3_05

    let a1 = 'R5CORD', 
        a2 = data.тип, 
        a3 = data.длина, 
        aRes

    
let aResTemp = `${a1}${a2}${a3}` 

aRes = aResTemp
    
res = obj.артикул.filter(item=>item.includes(aRes))
  
    return res
}
