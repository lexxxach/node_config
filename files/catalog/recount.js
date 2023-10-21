const { json } = require('express')
const readCatalog = require('./readCatalog')

function createArrRow(data, path) {
    console.log(path)

    let m = {
        ['asdasd-asdasd']:152
    }

    console.log(JSON.stringify(m))

    if (path == '/recountModule') {
        let arrName = ['recount']
        //массив объектов из файла
        let arrObj = arrName.map(item => JSON.parse(readCatalog.readCatalog(`${item}.txt`)))
      //  console.log(data.values())
        let dataValues = data
       // dataValues = Object.values(data)
       // console.log(indexOf(dataValues))
        let arrArt = dataValues.map((item) => new ResObj(arrObj[0], item))
        return arrArt
    }
}

exports.createArrRow = createArrRow

function ResObj(obj, item) {
       
        if (item in obj){
            this.начальныйартикул = item
            this.артикул = obj[item][0]
            this.количество = '1'
            this.наименование = obj[item][1]
        }
        else{
            this.начальныйартикул = item
            this.артикул = 0
            this.количество = '1'
        }

    console.log(this)

}