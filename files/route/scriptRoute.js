import HeadConstructor from './routeModuleHead.js'
//import TableResult from './tableModule.js'

let elemBody = document.querySelector("[name='head']")

let route = window.location.pathname

let elem = new HeadConstructor(route).elem
elemBody.append(elem)




/* let elemTable = new TableResult(route).elem
elemBody.append(elemTable)
 */