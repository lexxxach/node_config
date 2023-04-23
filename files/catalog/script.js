import HeadConstructor from './cableModule.js'
import TableResult from './tableModule.js'

let elemBody = document.querySelector("[name='head']")

let route = window.location.pathname
//alert(route)


let elem = new HeadConstructor(route).elem
elemBody.append(elem)


let elemTable = new TableResult(route).elem
elemBody.append(elemTable)

