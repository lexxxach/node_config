export default class TableModule {
    constructor(tableNameTag, arrCollumns, objParams) {
        this.elem = this.#render(tableNameTag, arrCollumns, objParams)
    }

    #render(tableNameTag, arrCollumns, objParams) {
        //Заготовка таблицы
        let elem = document.createElement('div')
        elem.append(this.#createTableTags(tableNameTag))

        //Заполнение колонок
        this.#createCollums(arrCollumns, elem.querySelector('table'))
        this.#createArr(objParams,elem.querySelector('table'))
           
        return elem

    }


    #createTableTags(tableNameTag) {
        let elemTable = document.createElement('table')
        elemTable.setAttribute('name',tableNameTag)
        let elemTabltTHead = document.createElement('thead')
        let elemTabltTBody = document.createElement('tbody')
        elemTable.append(elemTabltTHead)
        elemTable.append(elemTabltTBody)

        return elemTable

    }

    #createCollums(arrCollums, elemTable){
        
        let elemTHead = elemTable.querySelector('thead')
        
        arrCollums.forEach((item)=>{
            let elCollumn = document.createElement('th')
            elCollumn.textContent = item
            elemTHead.append(elCollumn)

        })
    }

    #createArr(objParams,elemTable){

        let elemBody = elemTable.querySelector('tbody')

        objParams.forEach(item=>{
            let row = document.createElement('tr')
            elemBody.append(row)
            
            //массив значений ключей
            let arrKeys = Object.keys(item)
            arrKeys.forEach(itemAdd=>{
                let elTd = document.createElement('td')
                elTd.textContent = item[itemAdd]
                row.append(elTd)
            })

        })



    }


}