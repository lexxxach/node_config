
const readCatalog = require('./readCatalog')

function createArrRow(data) {

    //Массив с именами методов
    let arrName = ['powerPDU']

    //массив объектов из файла
    let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))

    let fileObj = arrObj[0]
    
    //Массив артикулов по фильтру
    let arrArtTemp = arrArtCreate(fileObj, data)
   
    console.log(arrArtTemp)

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
   
    this.артикул = obj.Артикул.find(item => item==type)
    console.log(type)
    console.log(this)
    this.наименование = obj.Наименование[obj.Артикул.indexOf(this.артикул)]
    this.количество = data.Количество * 1
   
    let началоАдреса = 'https://www.dkc.ru/ru/catalog/1389/'

    this.адрес = `${началоАдреса}${this.артикул}/`

    console.log(this)
    
}



function arrArtCreate(obj, data) {
    let res = []

    //R5_19_SH_8OP_SH_C14

    

    let a1
    let a2
    
    console.log(data.тип)
    console.log(data.тип=="19"&&data.выход=="C19")
    if(data.тип=="19"&&data.выход=="C19"){
        a1="R519C14"
        res = obj.Артикул.filter(item=>item.includes(a1))
console.log(data)
    }else if(data.тип=="V"&&data.выход=="C19"){
        a1="R5V"
        a2 = "CDC19"
        res = obj.Артикул.filter(item=>item.includes(a1)).filter(item=>item.includes(a2))
    }else{
        a1 = `R5${data.тип}${data.выход}` 
        res = obj.Артикул.filter(item=>item.includes(a1))
    }
    
    
    
    return res
}
