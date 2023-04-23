import CopyContent from './moduleCopy.js'

export default class TableResult {
    constructor(path, resp, addArrow = false, props) {
        this.elem = this.#render(path, resp, addArrow, props)
    }

    #renderHead(path) {
        let elemTable = document.createElement('table')
        let elemRow = document.createElement('tr')
        let elemTBody = document.createElement('tbody')
        elemTable.append(elemTBody)
        elemTBody.append(elemRow)
        let arrCol = ['Артикул', 'Количество', 'Наименование', 'Адрес']
        arrCol.forEach(element => {
            let elemCol = document.createElement('th')
            elemCol.textContent = element
            elemRow.append(elemCol)
        })

        if (path == '/opticTable') {
            elemTable.dataset.nameDldFile = 'Перечень оптические компоненты'
        }
        else if (path == '/pcordTable') {

            elemTable.dataset.nameDldFile = 'Перечень патч-корды (Медь)'
        } else if (path == '/ppanelTable') {

            elemTable.dataset.nameDldFile = 'Перечень патч-панель модульная'
        } else if (path == '/ppanelTableVar') {

            elemTable.dataset.nameDldFile = 'Перечень патч-панель наборная'
        } else if (path == '/pcordOpticTable') {

            elemTable.dataset.nameDldFile = 'Перечень патч-корды (Оптика)'
        } else if (path.includes('/cabinetTable')) {

            elemTable.dataset.nameDldFile = 'Напольные шкафы'
        } else {

            elemTable.dataset.nameDldFile = 'Перечень кабель'
        }


        return elemTable

    }

    //Отрисовка строки
    #renderRow(resp, elemTableHead, elemsTableHead) {

        let elemRow = document.createElement('tr')
        /* elemRow.addEventListener('click',()=>alert(111)) */

        /* let arrCol = ['Артикул', 'Количество', 'Наименование', 'Адрес']
 
        let arrTableName = elemTableHead.querySelectorAll('TD') */

        for (let entry of elemsTableHead) {
            //alert(entry.textContent)
            let elemColArt = document.createElement('td')
            /* elemColArt.addEventListener('mouseover',()=>alert(111)) */
            //  alert(entry)
            if (!resp[entry.textContent.toLowerCase()]) {
                elemColArt.textContent = 'Артикул не найден'
            }
            else {

                if (entry.textContent.toLowerCase() == 'адрес') {
                    //alert(entry.textContent)
                    let elemAdres = document.createElement('a')
                    elemAdres.href = resp[entry.textContent.toLowerCase()]
                    elemAdres.target = '_blank'
                    elemAdres.textContent = resp[entry.textContent.toLowerCase()]
                    elemColArt.append(elemAdres)

                } else {
                    elemColArt.textContent = resp[entry.textContent.toLowerCase()]
                
                    //let elemCopy = new CopyContent()
                    //elemColArt.append(elemCopy.elem)
                  //  elemCopy.elem.addEventListener('click',()=> alert(111))

                    

                  /*   elemColArt.addEventListener('mouseover', function () {
                                            console.log(elemColArt)
                    }) */

                  /*   console.log(elemColArt) */

                    

                   /*  elemColArt.addEventListener('mouseout', function () {
                        let elemCopy = new CopyContent()
                        elemColArt.append(elemCopy.elem)

                    }) */

                    /* let elExample = document.createElement('span')
                    elExample.textContent = 'example'
                    elemColArt.append(elExample) */
                    //console.log(resp[entry.textContent.toLowerCase()])

                }

            }

            elemRow.append(elemColArt)


        }

        /*    let elemHrefRow = elemRow.querySelector('a') */
        //alert(elemHrefRow)

        /*   elemRow.addEventListener('click',()=>window.location = elemHrefRow.href)
          console.log(elemRow) */

        return elemRow
    }

    #render(path, resp, addArrow, props) {

        console.log(props)
        if (!resp) return ''
        let elem, elemTableHead, elemsTableHead

        if (!addArrow) {
            elem = document.createElement('div')
            elemTableHead = this.#renderHead(path)
            console.log(elemTableHead)
            elem.append(elemTableHead)
            elemsTableHead = elemTableHead.querySelectorAll('TH')
        } else {
            console.log('зашли сюда')
            elem = document.querySelector('table')
            elemTableHead = elem.rows[0]
            console.log(elemTableHead)
            elemsTableHead = elemTableHead.querySelectorAll('TH')
            console.log(elem)
        }


        if (path == '/opticTable') {
            //res - массив из объектов набора

            resp.forEach(item => elemTableHead.append(this.#renderRow(item, elemTableHead, elemsTableHead)))
        } else if (path == '/pcordTable') {

            resp.forEach(item => elemTableHead.append(this.#renderRow(item, elemTableHead, elemsTableHead)))

            //Рассвечивание ячеек
            let elemPCordTable = elem.querySelectorAll('TD')
            //console.log(elemPCordTable)
            for (const iteratorelemARt of elemPCordTable) {

                if (iteratorelemARt.textContent.length < 20) {
                    //  console.log(iteratorelemARt.textContent.length)

                    let colorEl

                    if (iteratorelemARt.textContent.includes('WH')) {
                        iteratorelemARt.setAttribute('style', 'background: white')


                    } else if (iteratorelemARt.textContent.includes('BL')) {
                        iteratorelemARt.setAttribute('style', 'background: rgb(31, 65, 156)')
                    } else if (iteratorelemARt.textContent.includes('BK')) {
                        iteratorelemARt.setAttribute('style', 'background: black; color: white')


                    } else if (iteratorelemARt.textContent.includes('AQ')) {
                        iteratorelemARt.setAttribute('style', 'background: rgb(43, 183, 248)')

                    } else if (iteratorelemARt.textContent.includes('RD')) {
                        iteratorelemARt.setAttribute('style', 'background: rgb(218, 47, 47)')


                    } else if (iteratorelemARt.textContent.includes('GN')) {
                        iteratorelemARt.setAttribute('style', 'background: rgb(146, 255, 131)')


                    } else if (iteratorelemARt.textContent.includes('YL')) {
                        iteratorelemARt.setAttribute('style', 'background: yellow')


                    } else if (iteratorelemARt.textContent.includes('OR')) {
                        iteratorelemARt.setAttribute('style', 'background: orange')


                    }
                }

            }

        } else if (path == '/ppanelTable') {
            //  console.log(resp)

            resp.forEach(item => elemTableHead.append(this.#renderRow(item, elemTableHead, elemsTableHead)))
        }
        else if (path == '/ppanelTableVar') {
            //  console.log(resp)

            resp.forEach(item => elemTableHead.append(this.#renderRow(item, elemTableHead, elemsTableHead)))
        }
        else if (path == '/pcordOpticTable') {
            //  console.log(resp)

            resp.forEach(item => elemTableHead.append(this.#renderRow(item, elemTableHead, elemsTableHead)))
        }
        else if (path == '/cabinetTable') {
            //  console.log(resp)

            elemTableHead = elem.querySelector('tbody')

            //console.log(resp)

            if (!addArrow) {
                resp.forEach(item => elemTableHead.append(this.#renderRow(item, elemTableHead, elemsTableHead)))
            } else {
                let elemArr = []
                resp.forEach(item => {
                    let elemRowAdd = this.#renderRow(item, elemTableHead, elemsTableHead)
                    let addClassName = ''
                    /*   console.log('this.props')
                      console.log(this.props) */
                    if (props) addClassName = props
                    elemRowAdd.classList.add(`accesories${addClassName}`)
                    elemArr.push(elemRowAdd)
                })
                //console.log(elemArr)
                if (addArrow) return elemArr

            }


        } else if (path == '/cableOpticTable') {

            resp.forEach(item => elemTableHead.append(this.#renderRow(item, elemTableHead, elemsTableHead)))

        }



        else {

            elemTableHead.append(this.#renderRow(resp, elemTableHead, elemsTableHead))

            console.log(elemTableHead)
  

        }





        return elem

    }

}

