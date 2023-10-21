//Модуль читает файл с каталожными данными
//-fileName - имя файла без пути
function readCatalog(fileName){
    
    fs = require('fs')
    let answer = fs.readFileSync(`./files/catalog/catalogFiles/${fileName}`,'utf8')
    return answer

}

function readTask(fileName){
    
    fs = require('fs')
    let answer = fs.readFileSync(`./files/tasks/${fileName}`,'utf8')
    let answerArr = answer.split('\n')
    return answerArr

}

function readRoute(fileName){
    
    fs = require('fs')
    console.log(`./files/route/${fileName}`)
    let answer = fs.readFileSync(`./files/route/${fileName.toLowerCase()}`,'utf8')
    let answerArr = answer.split('\n')
    return answerArr

}


exports.readCatalog = readCatalog
exports.readTask = readTask
exports.readRoute = readRoute