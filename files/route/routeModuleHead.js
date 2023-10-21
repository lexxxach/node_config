import TableModule from './routeModuleTable.js'
import TableResult from './routeModuleTable.js'


export default class HeadConstructor {
    constructor(route) {
        this.elem = this.#render(route)
    }

    #createParamObj(elem) {

        function createDate(dateVisit) {

            let date = dateVisit ? new Date(dateVisit):new Date
            let result = `${date.getFullYear()}_${("0" + (date.getMonth() + 1)).slice(-2)}_${("0" + (date.getDate())).slice(-2)}`
            return result
        }

        let res = {}
        let elDateVisit = elem.querySelector("[name = 'dateVisit']")
        res.ид = Date.now()
        console.log('createDate(elDateVisit.value)')
        console.log(createDate(elDateVisit.value))
        res.дата = createDate(elDateVisit.value)
        res.город = elem.querySelector("[name = 'routeCity']").value        
        res.наименование = elem.querySelector("[name = 'taskName']").value
        res.статус = ''
        res.статусОтложен = ''

        console.log(res)

        return res

    }

    #render(route) {

        let elem = document.createElement('div')

       /*  let objBtnTask = function (route) {
           
           let objBtn = {}
           
            let res = ''
            let returnRoute
            

            if (route == '/task') {
                res = 'Отложенные задачи'
                returnRoute = '/taskPast'
        
            } else if (route == '/taskPast') {
                res = 'Текущие задачи'
                returnRoute = '/task'
            }

            objBtn.name = res,
            objBtn.route = returnRoute

            return objBtn
        } */

        elem.innerHTML = `

<div>
    <label for="dateVisit">Дата:</label>
        <input type="date" name="dateVisit">    
<label for="routeCiry">Город:</label>
    <input type="text" placeholder="Ввести город" name="routeCity">
    <label for="taskName">Визит:</label>
    <input type="text" placeholder="Ввести визит" name="taskName">
    <input type="button" name="btnTaskAdd" value="Добавить маршрут">
    
</div>
`

/* elem.innerHTML = `

<div>
    <label for="taskName">Визит:</label>
    <input type="text" placeholder="Ввести визит" name="taskName">
    <input type="button" name="btnTaskAdd" value="Добавить маршрут">
    <input type="button" name="btnTaskPast" value=${objBtnTask(route).name}>
</div>
` */
       /*  let elBtnPastTAsk = elem.querySelector("[name = 'btnTaskPast']")
        elBtnPastTAsk.addEventListener('click', () => window.location.href = `http://46.48.126.66:25355${objBtnTask(route).route}`)
 */

        //Обработка нажатия кнопки

        let createParamObjF = this.#createParamObj

        let elTaskBtn = elem.querySelector("[name = 'btnTaskAdd']")
        let elemTask = elem.querySelector("[name = 'taskName']")
        let elemRoute = elem.querySelector("[name = 'routeCity']")
        elTaskBtn.addEventListener('click', clickBtnTask)
        elemTask.addEventListener('keydown', clickBtnTask)

        function clickBtnTask(event) {

            let paramObj = createParamObjF(elem)
           

            console.log(event.type)
            

            if (event.type == 'keydown' && event.keyCode != '13') return

            elemTask.value = ""
            elemRoute.value = ""

            let promAdd = fetch(`${route}Add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                }

            )

            promAdd.then(
                res => taskRead()
                    .then(res => removeBtnListener(res))
            )

        }

        //Промис
        function taskRead() {
            return new Promise((resolve, reject) => {
                let currentTable = elem.querySelector('table')
                if (currentTable) currentTable.remove()
                //чтение файла задач
                let readArrObj = []
                let prom = fetch(`${route}Read`)
                    .then(resp => resp.json())
                    .then(resp => {
                        console.log('resp')
                        readArrObj = resp.map((item) => {
                            return JSON.parse(item)
                        })

                        import('./routeModuleTable.js')
                            .then((TableModule) => {
                                let arrCollumns = Object.keys(readArrObj[0])
                                let elemTable = new TableModule.default('currentTask', arrCollumns, readArrObj).elem
                                // console.log(readArrObj)
                                elem.append(elemTable)

                                //добавление кнопки удаления задачи
                                let rowTable = elem.querySelectorAll('tr')
                                for (const iterator of rowTable) {

                                    let elBtnTd = document.createElement('td')
                                    elBtnTd.setAttribute('style', 'width: 15px')
                                    /* elBtnTd.textContent = 'Удалить' */
                                    elBtnTd.innerHTML = `
                                <input type="button" value="Х">
                                `
                                    iterator.append(elBtnTd)



                                    // iterator.append(elBtnTd)


                                }

                                let resolveTable = elemTable.querySelector('table')
                                resolve(resolveTable)

                            })

                    })

            })

        }

        function removeBtnListener(currentTable) {

            let elRowCollection = currentTable.querySelectorAll('tr')

            for (const iterator of elRowCollection) {

                let elBtn = iterator.querySelector('input')
                if (elBtn) {
                    elBtn.addEventListener('click', () => {
                        let elIdTd = iterator.querySelector('td')
                        if (elIdTd) {
                            let objId = { ид: elIdTd.textContent }

                            console.log(`${route}Remove`)
                            console.log(objId)

                            fetch(`${route}Remove`,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json;charset=utf-8'
                                    },
                                    body: JSON.stringify(objId)
                                }
                            ).then(res => iterator.remove())

                        }

                    })
                }

            }

        }

        taskRead().then(res => removeBtnListener(res))

        return elem

    }

}