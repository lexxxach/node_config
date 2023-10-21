import TableResult from './tableModule.js'
import exportToExcel from './exportToExcel.js'
import { elemDoc as elemRecount } from './moduleRecount.js'
import { elemPowerPduModule } from './elemHtml/elemPowerPdu.js'
import { removeTableCommand } from './catalogFiles/universalModule/tableJob.js'
//import Table2Excel from './table2excel.js'

export default class HeadConstructor {
    constructor(type) {
        this.elem = this.#render(type)
    }

    #render(type) {

        let result = ''

        if (type == '/cable') {

            result = this.#renderCableHead(type)

        }
        else if (type == '/optic') {


            result = this.#renderOpticHead(type)
        }

        else if (type == '/pcord') {
            result = this.#renderPatchCordHead(type)
        }
        else if (type == '/pcordOptic') {
            result = this.#renderPatchCordHeadOptic(type)
        }
        else if (type == '/ppanel') {
            result = this.#renderPatchPanelHead(type)
        }
        else if (type == '/cabinet') {
            result = this.#renderCabinetHead(type)
        }
        else if (type == '/cableOptic') {
            result = this.#renderCableOpticHead(type)
        }
        else if (type == '/power') {
            result = this.#renderPowerHead(type)
        }

        else if (type == '/other') {
            result = this.#renderOtherHead(type)
        }

        else if (type == '/recount') {


            result = this.#renderRecountHead(type)
        }




        return result

    }

    //Рендинг шапки выбора кабеля
    #renderCableHead(type) {
        let elem = document.createElement('div')
        elem.innerHTML =
            `
    <div data-name='Перечень кабель'>
    
    <select name="кабельПроизводство">
        <option value="Россия" selected>Россия</option>
        <option value="Иностранный">Иностранный</option>
    </select>

    <select name="кабельКатегория">
        <option value="5e" selected>5e</option>
        <option value="6">6</option>
        <option value="6A">6A</option>
        <option value="7">7</option>
        <option value="7A">7A</option>
    </select>

    <select name="кабельКонструкция">
        <option value="UU" selected>U/UTP</option>
        <option value="FU">F/UTP</option>
        <option value="UF">U/FTP</option>
        <option value="FF">F/FTP</option>
        <option value="SF">S/FTP</option>
    </select>

    <select name="кабельОболочка">
        <option value="01"select>HF</option>
        <option value="02">LS</option>
        <option value="03">LSLtx</option>
        <option value="PE">PE</option>
        <option value="PV">ПВХ</option>
        <option value="04">FRHF</option>
    </select>
    <div>
    Количество, м <input type="number" name = "quantity" value="305">
    </div>
    <div>
    <input type="button" name="btnSelect" value="Подбор">
    </div>
</div>
    `
        //Обработчик кнопки выбора
        let elemBtn = elem.querySelector("[name = 'btnSelect']")
        elemBtn.addEventListener('click', () => {
            let paramObj = this.#createParamObj(type, elem)

            let promise = fetch('/cableTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(paramObj)
            })
                .then(resp => resp.json())
                .then(resp => {

                    import('./tableModuleCopy.js').then((TableResult1) => {

                        let elemBody = document.querySelector("[name='content']")
                        let elemTable = new TableResult1.default('/cableTable', resp).elem

                        let currentElemTAble = document.querySelector('table')
                        if (currentElemTAble) currentElemTAble.remove()

                        elemBody.append(elemTable)
                        /* innerHTML = elemTable.innerHTML */
                        //elemBody.innerHTML = elemTable.outerHTML
                        elemBody.textContent.replace('{content}', '')

                        let elTd = elemTable.querySelector('td')
                        elTd.style.width = '15%'

                        elemBody.append(elemTable)

                        this.#manageHideBtnDld(elemBody)

                        console.log(elem.outerHTML)

                        let el = elem.querySelectorAll('td')

                    })

                    //alert(resp.артикул + '_' + resp.наименование)
                })


        })

        return elem

    }

    //Рендинг пересчета
    #renderRecountHead(type) {
        let elemRecountContent = elemRecount()




        return elemRecountContent


    }

    #renderOtherHead(type) {
        let elem = document.createElement('div')

        // let elemPowerCable = document.createElement('div')
        //let elemPowerPdu = document.createElement('div')

        let elemDinModule = `
        <label for="категория">Категория:</label>

            <select name="категория">
                <option value="5E" selected>5E</option>
                <option value="6">6</option>
                <option value="6A">6A</option>
            </select>

            <label for="конструкция">Конструкция:</label>
            
            <select name="конструкция">
                <option value="U" selected>Неэкранирванная</option>
                <option value="F">Экранированная</option>
                               
            </select>

        
            <span></span>
            <div>
                <input type="button" id="btn" name="btnDinModule" value="Подбор">
            </div>
            <div>
                Количество, шт <input type="number" name="quantity" value="1">
            </div>
        
        `
        let elemConnectors = `
        <label for="категория">Категория:</label>

            <select name="категория">
                <option value="5" selected>5E</option>
                <option value="6">6</option>
                <option value="6A">6A</option>
            </select>

            <label for="конструкция">Конструкция:</label>
            
            <select name="конструкция">
                <option value="U" selected>Неэкранирванная</option>
                <option value="F">Экранированная</option>
                               
            </select>

        
            <span></span>
            <div>
                <input type="button" id="btn" name="btnConnModule" value="Подбор">
            </div>
            <div>
                Количество, шт <input type="number" name="quantity" value="1">
            </div>
        
        `

        let elemWallModule = `
        <label for="категория">Категория:</label>

            <select name="категория">
                <option value="5E" selected>5E</option>
                <option value="6">6</option>
                <option value="6A">6A</option>
            </select>

            <label for="конструкция">Конструкция:</label>
            
            <select name="конструкция">
                <option value="U" selected>Неэкранирванная</option>
                <option value="F">Экранированная</option>
                               
            </select>

            <label for="количествоПортов">Количество портов:</label>
            
            <select name="количествоПортов">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                               
            </select>

        
            <span></span>
            <div>
                <input type="button" id="btn" name="btnWallModule" value="Подбор">
            </div>
            <div>
                Количество, шт <input type="number" name="quantity" value="1">
            </div>
        
        `

        let elemClamp = `
        <label for="типХомута">Тип хомута:</label>



            <select name="типХомута">
                <option value="Лента" selected>Лента (5 метров, 22 метра)</option>
                <option value="Хомут">Хомут</option>
            </select>
        

       <div name = "clampContProp"></div>

        
            <span></span>
            <div>
                <input type="button" id="btn" name="btnClampModule" value="Подбор">
            </div>
            <div>
                Количество, шт <input type="number" name="quantity" value="1">
            </div>
        
        `


        let elemPowerCable = `
        
        <label for="розеткаТип">Тип розетки:</label>

            <select name="розеткаТип">
                <option value="S3" selected>C13 / schuko___in/out</option>
                <option value="S9">C19 / schuko___in/out</option>
                <option value="34">C13 / C14___in/out</option>
                <option value="90">C19 / C20___in/out</option>
            </select>

            <label for="длина">Длина кабеля:</label>
            
            <select name="длина">
                <option value="05" selected>0,5 метров</option>
                <option value="10">1 метр</option>
                <option value="18">1,8 метра</option>
                <option value="20">2 метра</option>
                <option value="30">3 метра</option>
                <option value="50">5 метров</option>
                
            </select>

        
            <span></span>
            <div>
                <input type="button" id="btn" name="btnPowerCable" value="Подбор">
            </div>
            <div>
                Количество, шт <input type="number" name="quantity" value="1">
            </div>
         
        `
        let elemPowerPdu = elemPowerPduModule()

        elem.innerHTML = `
        <div data-name='Перечень силовые компноненты' style="display: table">

    <div style="display: table-row;">
        <div name=powerMenuDiv style="display: table-cell; width: 10%;">
            <ul class='powerMenu'>
            <li class="menuActive" name = 'dinModule'> <a href="#">Розетка на DIN рейку</a></li>
            <li name = 'wallModule'> <a href="#">Настенные розетки</a></li>
            <li name = 'elemConnectors'> <a href="#">Коннекторы (полевая заделка)</a></li>
            <li name = 'clamp'> <a href="#">Тканевые мнoгoразoвые хoмуты</a></li>
                <li name = 'powerCable' hidden> <a href="#">Кабели питания</a></li>
                <li name = 'powerPdu' hidden> <a href="#">PDU (блоки распределения питания)</a></li>
            </ul>
        </div>



        
        <div style="display: table-cell" name = "otherContent">
            ${elemDinModule}
        </div>
         

        </div>
    </div>
        
        `
        let elMenuPower = elem.querySelector("[name = 'powerMenuDiv']")

        let elsLiPower = elMenuPower.querySelectorAll('li')

        for (const iterator of elsLiPower) {

            iterator.addEventListener('click', function () {
                for (const elIterator of elsLiPower) {
                    elIterator.classList.remove('menuActive')
                }
                this.classList.add('menuActive')
            })


        }

        let elOtherContent = elem.querySelector("[name = 'otherContent']")

        console.log(elOtherContent)

        let elPowerCable = elem.querySelector("[name = 'powerCable']")
        let elpowerPdu = elem.querySelector("[name = 'powerPdu']")
        let elWallModule = elem.querySelector("[name = 'wallModule']")
        let elDinModule = elem.querySelector("[name = 'dinModule']")
        let elConnectors = elem.querySelector("[name = 'elemConnectors']")
        let elClamp = elem.querySelector("[name = 'clamp']")

        function removeTable() {
            if (document.querySelector('table')) document.querySelector('table').remove()
        }

        elClamp.addEventListener('click', () => {
            removeTable()
            handlerClamp()
        })


        elConnectors.addEventListener('click', () => {
            removeTable()
            handlerConnectorModule()
        })


        elWallModule.addEventListener('click', () => {
            removeTable()
            handlerWallModule()
        })

        elDinModule.addEventListener('click', () => {
            removeTable()
            handlerElemDinModule()
        })

        elPowerCable.addEventListener('click', () => {
            removeTable()
            handlerPowerCable()
        })

        elpowerPdu.addEventListener('click', () => {
            removeTable()
            handlerPowerPdu()
        })

        //Обработка кнопки отбора
        let handlerButtonClick = this.#createParamObj
        let handleButtonDld = this.#manageHideBtnDld


        function handlerPowerCable() {

            //  console.log(elemPowerCable)
            elPowerContent.innerHTML = elemPowerCable

            let elemBtn = elem.querySelector("[name = 'btnPowerCable']")

            elemBtn.addEventListener('click', () => {


                let paramObj = handlerButtonClick(type + 'Cable', elem)
                //  console.log(paramObj)

                let promise = fetch('/powerCable', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        import('./tableModuleCopy.js').then((TableResult1) => {

                            let elemBody = document.querySelector("[name='content']")



                            // console.log(JSON.stringify(resp))

                            let elemTable = new TableResult1.default('/opticTable', resp).elem

                            let currentElemTAble = document.querySelector('table')
                            if (currentElemTAble) currentElemTAble.remove()

                            elemBody.textContent.replace('{content}', '')

                            let elTd = elemTable.querySelector('td')
                            elTd.style.width = '15%'

                            elemBody.append(elemTable)

                            // elemBody.innerHTML = elemTable.outerHTML

                            handleButtonDld(elemBody)


                        })



                        // exportToExcel('','Оптика')

                        /* let table2excel = new Table2Excel();
                        table2excel.export(document.querySelectorAll("table"));
             */
                        //alert(resp.артикул + '_' + resp.наименование)
                    })






            })




        }

        class ClampPropCont {

            //Возвращает контент для настроек фильтра
            static contentTypeCamp(typeClampCont) {

                if (typeClampCont == 'Лента') {
                    return `
                        <label for="длина">Длина, мм:</label>
                        <select name="длина">
                            <option value="5X">5000</option>
                            <option value="23X">22800</option>
                        </select>
            
                        <label for="ширина">Ширина ленты, мм:</label>
                        
                        <select name="ширина">
                            <option value="09" selected>9</option>
                            <option value="10">9,5</option>
                            <option value="16">16</option>
                            <option value="20">19</option>
                            <option value="25">25</option>
                                           
                        </select>
            
                        <label for="цвет">Цвет:</label>
                        
                        <select name="цвет">
                            <option value="BL" selected>Черный</option>
                            <option value="GN">Зеленый</option>
                            <option value="RD">Красный</option>
                            <option value="YL">Желтый</option>
                            <option value="BU">Синий</option>
                                           
                        </select>
                        
                        
                        
                        `

                } else if (typeClampCont == 'Хомут') {

                    return `
                        <label for="длина">Длина, мм:</label>
                        <select name="длина">
                            <option value="13" selected>130</option>
                            <option value="18">180</option>
                            <option value="20">200</option>
                            <option value="30">300</option>
                            <option value="31">310</option>
                           
                        </select>
            
                        <label for="ширина">Ширина ленты, мм:</label>
                        
                        <select name="ширина">
                           
                            <option value="13">12,5</option>
                           
                            <option value="17">17</option>
                          
                                           
                        </select>
            
                        <label for="цвет">Цвет:</label>
                        
                        <select name="цвет">
                            <option value="BL" selected>Черный</option>
                            <option value="GN">Зеленый</option>
                            <option value="RD">Красный</option>
                            <option value="YL">Желтый</option>
                            <option value="BU">Синий</option>
                                           
                        </select>`


                }


            }

            static contPropVis(elElem) {

                let elLe = elElem.querySelector("[name = 'длина']")
                let elWe = elElem.querySelector("[name = 'ширина']")
                let elCo = elElem.querySelector("[name = 'цвет']")

                if (elLe.value == '5X') {
                    propVis(['09', '16', '25'], elWe.querySelectorAll('option'))
                    propVis([], elCo.querySelectorAll('option'), 'BL')
                } else if (elLe.value == '23X') {
                    propVis(['10', '20'], elWe.querySelectorAll('option'))
                    propVis(['BL'], elCo.querySelectorAll('option'))
                } else if (elLe.value == '31') {
                    propVis(['17'], elWe.querySelectorAll('option'))
                    propVis([], elCo.querySelectorAll('option'))
                } else if (elLe.value == '13' || elLe.value == '18' || elLe.value == '20' || elLe.value == '30') {

                    console.log(121211212)
                    propVis(['13'], elWe.querySelectorAll('option'))
                    propVis([], elCo.querySelectorAll('option'))
                }

                function propVis(arrVisValue, elemSelect) {

                    elemSelect.forEach((item) => {

                        item.removeAttribute('selected')
                        let bollIn = arrVisValue.includes(item.value)
                        item.setAttribute('disabled', !bollIn)
                        if (bollIn || arrVisValue.length == 0) item.removeAttribute('disabled')

                    })

                    if (!arrVisValue.length) {

                        console.log(elemSelect[0])
                        elemSelect[0].parentElement.value = elemSelect[0].value
                    } else {
                        elemSelect[0].parentElement.value = arrVisValue[0]
                    }


                }



            }

        }

        /*  function contentTypeCamp(typeClampCont){
             if( typeClampCont == 'Лента'){
                 return `
                 <label for="длина">Длина, мм:</label>
                 <select name="длина">
                     <option value="5X">5000</option>
                     <option value="23X">22800</option>
                 </select>
     
                 <label for="ширина">Ширина ленты, мм:</label>
                 
                 <select name="ширина">
                     <option value="09" selected>9</option>
                     <option value="10">9,5</option>
                     <option value="16">16</option>
                     <option value="20">19</option>
                     <option value="25">25</option>
                                    
                 </select>
     
                 <label for="цвет">Цвет:</label>
                 
                 <select name="цвет">
                     <option value="BL" selected>Черный</option>
                     <option value="GN">Зеленый</option>
                     <option value="RD">Красный</option>
                     <option value="YL">Желтый</option>
                     <option value="BU">Синий</option>
                                    
                 </select>
                 
                 
                 
                 `
 
             } else if (typeClampCont == 'Хомут'){
 
                 return `
                 <label for="длина">Длина, мм:</label>
                 <select name="длина">
                     <option value="13" selected>130</option>
                     <option value="18">180</option>
                     <option value="20">200</option>
                     <option value="30">300</option>
                     <option value="31">310</option>
                    
                 </select>
     
                 <label for="ширина">Ширина ленты, мм:</label>
                 
                 <select name="ширина">
                    
                     <option value="13">12,5</option>
                    
                     <option value="17">17</option>
                   
                                    
                 </select>
     
                 <label for="цвет">Цвет:</label>
                 
                 <select name="цвет">
                     <option value="BL" selected>Черный</option>
                     <option value="GN">Зеленый</option>
                     <option value="RD">Красный</option>
                     <option value="YL">Желтый</option>
                     <option value="BU">Синий</option>
                                    
                 </select>`
 
 
             }
 
         } */



        function handlerClamp() {

            elOtherContent.innerHTML = elemClamp

            let elTypeClamp = elOtherContent.querySelector("[name = 'типХомута']")
            let elClampContProm = elem.querySelector("[name = 'clampContProp']")

            /* function clampProVis(elClamp){
                let elLength = elClamp.querySelector("[name = 'длина']")
                let elWeigth = elClamp.querySelector("[name = 'ширина']")
                let elColor = elClamp.querySelector("[name = 'цвет']")

                elLength.addEventListener('click',()=>{

                })




            } */

            //let clContType = new ClampPropCont

            elClampContProm.innerHTML = ClampPropCont.contentTypeCamp(elTypeClamp.value)
            ClampPropCont.contPropVis(elem.querySelector("[name = 'clampContProp']"))

            elTypeClamp.addEventListener('click', () => {
                elClampContProm.innerHTML = ClampPropCont.contentTypeCamp(elTypeClamp.value)
                let elLengthClamp = elClampContProm.querySelector("[name = 'длина']")
                elLengthClamp.addEventListener('change', () => {
                    console.log(11111111111111111111)
                    ClampPropCont.contPropVis(elem.querySelector("[name = 'clampContProp']"))
                })

            })

            let elLengthClamp = elClampContProm.querySelector("[name = 'длина']")
            elLengthClamp.addEventListener('change', () => {
                console.log(11111111111111111111)
                ClampPropCont.contPropVis(elem.querySelector("[name = 'clampContProp']"))
            })

            let elBtnClampModule = elem.querySelector("[name = 'btnClampModule']")

            elBtnClampModule.addEventListener('click', () => {

                let paramObj = handlerButtonClick(type + 'ClampModule', elem)
                console.log(paramObj)
                console.log(type + 'ClampModule')

                let promise = fetch('/otherClampModule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        import('./tableModuleCopy.js').then((TableResult1) => {

                            let elemBody = document.querySelector("[name='content']")



                            // console.log(JSON.stringify(resp))

                            let elemTable = new TableResult1.default('/opticTable', resp).elem

                            let currentElemTAble = document.querySelector('table')
                            if (currentElemTAble) currentElemTAble.remove()

                            elemBody.textContent.replace('{content}', '')

                            let elTd = elemTable.querySelector('td')
                            elTd.style.width = '15%'

                            elemBody.append(elemTable)


                            handleButtonDld(elemBody)


                        })

                    })




            })


        }

        function handlerConnectorModule() {
            elOtherContent.innerHTML = elemConnectors

            let elBtnConnModule = elem.querySelector("[name = 'btnConnModule']")

            elBtnConnModule.addEventListener('click', () => {

                let paramObj = handlerButtonClick(type + 'ConnModule', elem)

                console.log(type + 'ConnModule')

                let promise = fetch('/otherConnModule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        import('./tableModuleCopy.js').then((TableResult1) => {

                            let elemBody = document.querySelector("[name='content']")



                            // console.log(JSON.stringify(resp))

                            let elemTable = new TableResult1.default('/opticTable', resp).elem

                            let currentElemTAble = document.querySelector('table')
                            if (currentElemTAble) currentElemTAble.remove()

                            elemBody.textContent.replace('{content}', '')

                            let elTd = elemTable.querySelector('td')
                            elTd.style.width = '15%'

                            elemBody.append(elemTable)


                            handleButtonDld(elemBody)


                        })

                    })




            })


        }


        function handlerWallModule() {

            elOtherContent.innerHTML = elemWallModule

            let elBtnWallModule = elem.querySelector("[name = 'btnWallModule']")

            elBtnWallModule.addEventListener('click', () => {

                let paramObj = handlerButtonClick(type + 'WallModule', elem)

                console.log(type + 'WallModule')

                let promise = fetch('/otherWallModule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        import('./tableModuleCopy.js').then((TableResult1) => {

                            let elemBody = document.querySelector("[name='content']")



                            // console.log(JSON.stringify(resp))

                            let elemTable = new TableResult1.default('/opticTable', resp).elem

                            let currentElemTAble = document.querySelector('table')
                            if (currentElemTAble) currentElemTAble.remove()

                            elemBody.textContent.replace('{content}', '')

                            let elTd = elemTable.querySelector('td')
                            elTd.style.width = '15%'

                            elemBody.append(elemTable)


                            handleButtonDld(elemBody)


                        })

                    })




            })




        }

        function handlerElemDinModule() {

            elOtherContent.innerHTML = elemDinModule

            let elBtnDinModule = elem.querySelector("[name = 'btnDinModule']")

            elBtnDinModule.addEventListener('click', () => {

                let paramObj = handlerButtonClick(type + 'DinModule', elem)

                console.log(type + 'DinModule')

                let promise = fetch('/otherDinModule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        import('./tableModuleCopy.js').then((TableResult1) => {

                            let elemBody = document.querySelector("[name='content']")



                            // console.log(JSON.stringify(resp))

                            let elemTable = new TableResult1.default('/opticTable', resp).elem

                            let currentElemTAble = document.querySelector('table')
                            if (currentElemTAble) currentElemTAble.remove()

                            elemBody.textContent.replace('{content}', '')

                            let elTd = elemTable.querySelector('td')
                            elTd.style.width = '15%'

                            elemBody.append(elemTable)


                            handleButtonDld(elemBody)


                        })

                    })




            })




        }

        handlerElemDinModule()

        function handlerPowerPdu() {
            elPowerContent.innerHTML = elemPowerPdu
        }


        return elem
    }

    #renderPowerHead(type) {
        let elem = document.createElement('div')

        // let elemPowerCable = document.createElement('div')
        //let elemPowerPdu = document.createElement('div')

        let elemPowerCable = `
        
        <label for="розеткаТип">Тип розетки:</label>

            <select name="розеткаТип">
                <option value="S3" selected>C13 / schuko___in/out</option>
                <option value="S9">C19 / schuko___in/out</option>
                <option value="34">C13 / C14___in/out</option>
                <option value="90">C19 / C20___in/out</option>
            </select>

            <label for="длина">Длина кабеля:</label>
            
            <select name="длина">
                <option value="05" selected>0,5 метров</option>
                <option value="10">1 метр</option>
                <option value="18">1,8 метра</option>
                <option value="20">2 метра</option>
                <option value="30">3 метра</option>
                <option value="50">5 метров</option>
                
            </select>

        
            <span></span>
            <div>
                <input type="button" id="btn" name="btnPowerCable" value="Подбор">
            </div>
            <div>
                Количество, шт <input type="number" name="quantity" value="1">
            </div>
         
        `
        let elemPowerPdu = elemPowerPduModule()

        elem.innerHTML = `
        <div data-name='Перечень силовые компноненты' style="display: table">

    <div style="display: table-row;">
        <div name=powerMenuDiv style="display: table-cell; width: 10%;">
            <ul class='powerMenu'>
                <li class="menuActive" name = 'powerCable'> <a href="#">Кабели питания</a></li>
                <li name = 'powerPdu'> <a href="#">PDU (блоки распределения питания)</a></li>
            </ul>
        </div>



        
        <div style="display: table-cell" name = "powerContent">
            ${elemPowerCable}
        </div>
         

        </div>
    </div>
        
        `

        let elMenuPower = elem.querySelector("[name = 'powerMenuDiv']")

        let elsLiPower = elMenuPower.querySelectorAll('li')

        for (const iterator of elsLiPower) {

            iterator.addEventListener('click', function () {
                for (const elIterator of elsLiPower) {
                    elIterator.classList.remove('menuActive')
                }
                this.classList.add('menuActive')
            })


        }

        let elPowerContent = elem.querySelector("[name = 'powerContent']")
        console.log(elPowerContent)

        let elPowerCable = elem.querySelector("[name = 'powerCable']")
        let elpowerPdu = elem.querySelector("[name = 'powerPdu']")

        function removeTable() {
            if (document.querySelector('table')) document.querySelector('table').remove()
        }


        elPowerCable.addEventListener('click', () => {
            //removeTable()
            removeTableCommand()
            handlerPowerCable()
        })

        elpowerPdu.addEventListener('click', () => {
            //removeTable()
            removeTableCommand()
            handlerPowerPdu()
        })

        //Обработка кнопки отбора
        let handlerButtonClick = this.#createParamObj
        let handleButtonDld = this.#manageHideBtnDld


        function handlerPowerCable() {

            //  console.log(elemPowerCable)
            elPowerContent.innerHTML = elemPowerCable

            let elemBtn = elem.querySelector("[name = 'btnPowerCable']")

            elemBtn.addEventListener('click', () => {


                let paramObj = handlerButtonClick(type + 'Cable', elem)
                //  console.log(paramObj)

                let promise = fetch('/powerCable', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        import('./tableModuleCopy.js').then((TableResult1) => {

                            let elemBody = document.querySelector("[name='content']")



                            // console.log(JSON.stringify(resp))

                            let elemTable = new TableResult1.default('/opticTable', resp).elem

                            let currentElemTAble = document.querySelector('table')
                            if (currentElemTAble) currentElemTAble.remove()

                            elemBody.textContent.replace('{content}', '')

                            let elTd = elemTable.querySelector('td')
                            elTd.style.width = '15%'

                            elemBody.append(elemTable)

                            // elemBody.innerHTML = elemTable.outerHTML

                            handleButtonDld(elemBody)


                        })



                        // exportToExcel('','Оптика')

                        /* let table2excel = new Table2Excel();
                        table2excel.export(document.querySelectorAll("table"));
             */
                        //alert(resp.артикул + '_' + resp.наименование)
                    })






            })




        }

        handlerPowerCable()

        function handlerPowerPdu() {
            elPowerContent.innerHTML = elemPowerPdu

           // console.log(111111111111111111111)

            let elemBtn = elem.querySelector("[name = 'btnPowerPDU']")

            elemBtn.addEventListener('click', () => {


                let paramObj = handlerButtonClick(type + 'PDU', elem)
                  console.log(paramObj)

                let promise = fetch('/powerPDU', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        import('./tableModuleCopy.js').then((TableResult1) => {

                            let elemBody = document.querySelector("[name='content']")



                            // console.log(JSON.stringify(resp))

                            let elemTable = new TableResult1.default('/opticTable', resp).elem

                            let currentElemTAble = document.querySelector('table')
                            if (currentElemTAble) currentElemTAble.remove()

                            elemBody.textContent.replace('{content}', '')

                            let elTd = elemTable.querySelector('td')
                            elTd.style.width = '15%'

                            elemBody.append(elemTable)

                            // elemBody.innerHTML = elemTable.outerHTML

                            handleButtonDld(elemBody)


                        })



                        // exportToExcel('','Оптика')

                        /* let table2excel = new Table2Excel();
                        table2excel.export(document.querySelectorAll("table"));
             */
                        //alert(resp.артикул + '_' + resp.наименование)
                    })






            })











        }


        return elem
    }

    #renderCableOpticHead(type) {

        //console.log(12333)
        let elem = document.createElement('div')
        elem.innerHTML =
            `
            <div data-name='Перечень кабель'>
    
            <label>Тип кабеля:
            <select name="кабельТип">
                <option value="OS2" selected>OS2</option>
                <option value="OM2">    OM2</option>
                <option value="OM3">OM3</option>
                <option value="OM4">OM4</option>
            </select>
            </label>
        
            <label>Количество волокон:
            <select name="количествоВолокон">
                <option value="2" selected>2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="18">18</option>
                <option value="24">24</option>
                <option value="32">32</option>
                <option value="36">36</option>
                <option value="48">48</option>
            </select>
        </label>
        
            
            <div>
            Количество, м <input type="number" name = "quantity" value="2000">
            </div>
            <div>
            <input type="button" name="btnSelect" value="Подбор">
            </div>
        </div>
    `
        //Обработчик кнопки выбора
        let elemBtn = elem.querySelector("[name = 'btnSelect']")
        elemBtn.addEventListener('click', () => {
            let paramObj = this.#createParamObj(type, elem)

            let promise = fetch('/cableOpticTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(paramObj)
            })
                .then(resp => resp.json())
                .then(resp => {

                    import('./tableModuleCopy.js').then((TableResult1) => {
                        let elemBody = document.querySelector("[name='content']")

                        console.log(resp)

                        let elemTable = new TableResult1.default('/cableOpticTable', resp).elem

                        let currentElemTAble = document.querySelector('table')
                        if (currentElemTAble) currentElemTAble.remove()

                        elemBody.textContent.replace('{content}', '')

                        let elTd = elemTable.querySelector('td')
                        elTd.style.width = '15%'

                        elemBody.append(elemTable)
                        /* innerHTML = elemTable.innerHTML */
                        //elemBody.innerHTML = elemTable.outerHTML

                        this.#manageHideBtnDld(elemBody)

                        //alert(resp.артикул + '_' + resp.наименование)



                    })


                })


        })




        return elem

    }

    //Создание объекта с параметрами для обработки кнопки выбора и отправки fetch
    //Параметры в зависимости от маршрута
    #createParamObj(param, elem) {


        let resultObj = {}
        if (param == '/cable') {
            resultObj.Производство = elem.querySelector("[name='кабельПроизводство']").value
            resultObj.Категория = elem.querySelector("[name='кабельКатегория']").value
            resultObj.Конструкция = elem.querySelector("[name='кабельКонструкция']").value
            resultObj.Оболочка = elem.querySelector("[name='кабельОболочка']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value

        } else if (param == '/optic') {
            resultObj.высота = elem.querySelector("[name='высотаТип']").value
            resultObj.кабель = elem.querySelector("[name='кабельТип']").value
            resultObj.полировка = elem.querySelector("[name='полировкаТип']").value
            resultObj.адаптер = elem.querySelector("[name='адаптерТип']").value

            let elChBxOrg = elem.querySelector("[name = 'chBoxOptOrg']")
            resultObj.органайзер = elChBxOrg.checked ? 'true' : 'false'




            resultObj.Количество = elem.querySelector("[name='quantity']").value

            let elemFiberChBx = elem.querySelector("[name = chBoxFiberNumber]")
            let elemFiber = elem.querySelector("[name = 'fiberNumber']")
            resultObj.КоличествоВолокон =
                elemFiberChBx.checked ? elemFiber.value : null

        } else if (param == '/opticWall') {
            resultObj.кабель = elem.querySelector("[name='кабельТип']").value
            resultObj.кроссТип = elem.querySelector("[name='кроссТип']").value
            resultObj.количествоВолокон = elem.querySelector("[name='fiberCountWallCross']").value
            resultObj.полировка = elem.querySelector("[name='полировкаТип']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value


        } else if (param == '/opticComplect') {

            resultObj.кабель = elem.querySelector("[name='кабельТип']").value

            resultObj.адаптер = elem.querySelector("[name='адаптерТип']").value
            resultObj.количеcтвоПортов = elem.querySelector("[name='количеcтвоПортовКомплект']").value
            console.log(resultObj.количеcтвоПортов)
            console.log('resultObj.количеcтвоПортов')
            //  resultObj.количеcтвоПортов = elem.querySelector("[name='количеcтвоПортов']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value




        } else if (param == '/pcord') {
            resultObj.категория = elem.querySelector("[name='пкКатегория']").value
            resultObj.конструкция = elem.querySelector("[name='пкКонструкция']").value
            resultObj.длина = elem.querySelector("[name='пкДлина']").value
            resultObj.цвет = elem.querySelector("[name='пкЦвет']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/pcordCat') {
            resultObj.категория = elem.querySelector("[name='пкКатегория']").value
            resultObj.конструкция = elem.querySelector("[name='пкКонструкция']").value
            resultObj.длина = elem.querySelector("[name='пкДлина']").value
            resultObj.цвет = elem.querySelector("[name='пкЦвет']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
            resultObj.подборПоКатегории = true

        }
        else if (param == '/cableOptic') {
            resultObj.типКабеля = elem.querySelector("[name='кабельТип']").value
            resultObj.количествоВолокон = elem.querySelector("[name='количествоВолокон']").value

            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/ppanelModule') {
            resultObj.категория = elem.querySelector("[name='ппКатегорияМодульная']").value
            resultObj.конструкция = elem.querySelector("[name='ппКонструкцияМодульная']").value
            //resultObj.тип = elem.querySelector("[name='ппТипМодульная']").value
            resultObj.Количество = elem.querySelector("[name='quantityModule']").value


        }
        else if (param == '/ppanelModuleCat') {
            resultObj.категория = elem.querySelector("[name='ппКатегорияМодульная']").value
            resultObj.конструкция = elem.querySelector("[name='ппКонструкцияМодульная']").value
            //resultObj.тип = elem.querySelector("[name='ппТипМодульная']").value
            resultObj.Количество = elem.querySelector("[name='quantityModule']").value
            resultObj.подборПоКатегории = true

        }
        else if (param == '/ppanelVar') {
            resultObj.категория = elem.querySelector("[name='ппКатегорияНаборная']").value
            resultObj.конструкция = elem.querySelector("[name='ппКонструкцияНаборная']").value
            resultObj.высота = elem.querySelector("[name='ппВысотаПанелиНаборная']").value
            resultObj.плотность = elem.querySelector("[name='ппПлотностьПанелиНаборная']").value
            resultObj.признакНаборнойПанели = true
            resultObj.Количество = elem.querySelector("[name='quantityVar']").value

        }
        else if (param == '/pcordOptic') {
            resultObj.кабель = elem.querySelector("[name='кабельТип']").value
            resultObj.конструкция = elem.querySelector("[name='адаптерКонструкция']").value
            resultObj.длина = elem.querySelector("[name='пкДлина']").value
            resultObj.патчКордОптика = true
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        }
        else if (param == '/cabinet') {
            resultObj.высота = elem.querySelector("[name='высота']").value
            resultObj.ширина = elem.querySelector("[name='ширина']").value
            resultObj.глубина = elem.querySelector("[name='глубина']").value
            resultObj.цвет = elem.querySelector("[name='цвет']").value
            resultObj.панельБоковаяТип = elem.querySelector("[name='панельБоковаяТип']").value
            resultObj.дверьПередняя = elem.querySelector("[name='дверьПередняя']").value
            resultObj.дверьПередняяТип = elem.querySelector("[name='дверьПередняяТип']").value
            resultObj.дверьЗадняя = elem.querySelector("[name='дверьЗадняя']").value
            resultObj.дверьЗадняяТип = elem.querySelector("[name='дверьЗадняяТип']").value
            // resultObj.патчКордОптика = true
            resultObj.Количество = elem.querySelector("[name='quantity']").value

        } else if (param == '/cabinetWall') {
            resultObj.высота = elem.querySelector("[name='высота']").value
            resultObj.ширина = elem.querySelector("[name='ширина']").value
            resultObj.глубина = elem.querySelector("[name='глубина']").value
            resultObj.цвет = elem.querySelector("[name='цвет']").value
            resultObj.дверьПередняя = elem.querySelector("[name='дверьПередняя']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (
            param == '/cabinetGrounding' ||
            param == '/cabinetBracing' ||
            param == '/cabinetUnification'
        ) {
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/cabinetPlinth') {
            resultObj.ширина = elem.querySelector("[name='ширина']").value
            resultObj.глубина = elem.querySelector("[name='глубина']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/cabinetStubs') {
            resultObj.высота = elem.querySelector("[name='stubsHeightOtion']").value
            resultObj.цвет = elem.querySelector("[name='цвет']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/cabinetFan') {
            resultObj.ширина = elem.querySelector("[name='ширина']").value
            resultObj.цвет = elem.querySelector("[name='цвет']").value
            resultObj.количествоВентиляторов = elem.querySelector("[name='fanQuantity']").value
            resultObj.термостат = elem.querySelector("[name='fanTerm']").value


            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/cabinetBracket') {
            resultObj.глубина = elem.querySelector("[name='глубина']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/cabinetBracketVar') {
            resultObj.глубина = elem.querySelector("[name='глубина']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/cabinetBracketVarMini') {
            resultObj.цвет = elem.querySelector("[name='цвет']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        }

        else if (param == '/cabinetOrganiserGorisont') {
            resultObj.высота = elem.querySelector("[name='organiserGHeight']").value
            resultObj.цвет = elem.querySelector("[name='цвет']").value
            resultObj.глубина = elem.querySelector("[name='organiserGDepth']").value
            resultObj.отверстие = elem.querySelector("[name='organiserGHole']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/cabinetOrganiserVertical') {
            resultObj.высота = elem.querySelector("[name='высота']").value
            resultObj.глубина = elem.querySelector("[name='organiserVDepth']").value
            resultObj.цвет = elem.querySelector("[name='цвет']").value


            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/cabinetOrganiserRing') {
            resultObj.ширина = elem.querySelector("[name='organiserRingWidth']").value
            resultObj.глубина = elem.querySelector("[name='organiserRingDepth']").value
            resultObj.цвет = elem.querySelector("[name='цвет']").value


            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/cabinetDinModule') {
            resultObj.цвет = elem.querySelector("[name='цвет']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/cabinetLight') {
            resultObj.ширина = elem.querySelector("[name='ширина']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/cabinetshelf1U') {
            resultObj.тип = elem.querySelector("[name='shelfSmallType']").value
            resultObj.глубина = elem.querySelector("[name='shelfSmallDepth']").value
            resultObj.цвет = elem.querySelector("[name='цвет']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/cabinetshelf2U') {
            resultObj.тип = elem.querySelector("[name='shelfBigType']").value
            resultObj.цвет = elem.querySelector("[name='цвет']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/powerCable') {
            resultObj.тип = elem.querySelector("[name='розеткаТип']").value
            resultObj.длина = elem.querySelector("[name='длина']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/powerPDU') {
            resultObj.тип = elem.querySelector("[name='брпТип']").value
            resultObj.выход = elem.querySelector("[name='outPdu']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/otherDinModule') {
            resultObj.тип = elem.querySelector("[name='категория']").value
            resultObj.конструкция = elem.querySelector("[name='конструкция']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/otherWallModule') {
            resultObj.тип = elem.querySelector("[name='категория']").value
            resultObj.конструкция = elem.querySelector("[name='конструкция']").value
            resultObj.количествоПортов = elem.querySelector("[name='количествоПортов']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/otherConnModule') {
            resultObj.тип = elem.querySelector("[name='категория']").value
            resultObj.конструкция = elem.querySelector("[name='конструкция']").value
            resultObj.Количество = elem.querySelector("[name='quantity']").value
        } else if (param == '/otherClampModule') {
            resultObj.тип = elem.querySelector("[name='типХомута']").value
            resultObj.длина = elem.querySelector("[name='длина']").value
            resultObj.ширина = elem.querySelector("[name='ширина']").value
            resultObj.цвет = elem.querySelector("[name='цвет']").value

            resultObj.Количество = elem.querySelector("[name='quantity']").value
        }





        return resultObj

    }

    //Рендинг шапки выбора оптических компонентов
    #renderOpticHead(type) {
        let elem = document.createElement('div')
        /*  elem.innerHTML =
             `
     <div data-name = 'Перечень оптические компоненты'>
     <select name="высотаТип">
     <option value="1U" selected>1U</option>
     <option value="2U">2U</option>
     
 </select>
 
     <select name="кабельТип">
         <option value="OS2" selected>OS2</option>
         <option value="OM2">    OM2</option>
         <option value="OM3">OM3</option>
         <option value="OM4">OM4</option>
     </select>
 
     <select name="полировкаТип">
         <option value="U" selected>UPC</option>
         <option value="A">APC</option>
         
     </select>
 
     <select name="адаптерТип">
         <option value="DLC" selected>LC Duplex/SC Simplex</option>
         <option value="QLC">LC Quad</option>
         <option value="DSC">SC Duplex</option>
         <option value="ST">ST Simplex</option>
         <option value="FC">FC Simplex</option>
         
     </select>
     
     <span></span>
     <div>
     <input type="button" id="btn" value="Подбор">
     <input type="checkbox" name="chBoxFiberNumber" id="">
     <label for="chBoxFiberNumber">
         <a href="" name='chBxHrefFiber'>Подбор по количеству волокон</a>
         </label>
     <input type="number" hidden name="fiberNumber" value = 24>
     </div>
     <div>
     Количество, шт <input type="number" name = "quantity" value="1">
     </div>
     ` */

        let cabinetOpticCross = `
      
        <div>
            <input type="checkbox" name="chBoxOptOrg" id="" checked>
            <label for="chBoxOptOrg">
                <a href="" name='chBoxOptOrgHref'>Включить в комплект оптический органайзер</a>
            </label>
            </div>
            <select name="высотаТип">
                <option value="1U" selected>1U</option>
                <option value="2U">2U</option>

            </select>

            <select name="кабельТип">
                <option value="OS2" selected>OS2</option>
                <option value="OM2"> OM2</option>
                <option value="OM3">OM3</option>
                <option value="OM4">OM4</option>
            </select>

            <select name="полировкаТип">
                <option value="U" selected>UPC</option>
                <option value="A">APC</option>

            </select>

            <select name="адаптерТип">
                <option value="DLC" selected>LC Duplex/SC Simplex</option>
                <option value="QLC">LC Quad</option>
                <option value="DSC">SC Duplex</option>
                <option value="ST">ST Simplex</option>
                <option value="FC">FC Simplex</option>

            </select>
           

            <span></span>
            
            <div>
                <input type="button" id="btn" name = "btnCabinetCross" value="Подбор">
                <input type="checkbox" name="chBoxFiberNumber" id="">
                <label for="chBoxFiberNumber">
                    <a href="" name='chBxHrefFiber'>Подбор по количеству волокон</a>
                </label>
               
                <input type="number" hidden name="fiberNumber" value=24>
            </div>
            <div>
                Количество, шт <input type="number" name="quantity" value="1">
            </div>
       
        
        
        
        `
        let wallOpticCross = `
        <lable for = "кабельТип">Тип кабеля:</lable>
        <select name="кабельТип">
                <option value="OS2" selected>OS2</option>
                <option value="OM4">OM4</option>
                <option value="OM5">OM5</option>
            </select>
        <lable for = "кроссТип">Тип кросса:</lable>
        <select name="кроссТип">
                <option value="24" selected>До 24 волокон</option>
                <option value="48">До 48 волокон</option>
        </select>
       
           
            <lable for = "полировкаТип">Тип полировки пигтейлов:</lable>
            <select name="полировкаТип">
            <option value="U" selected>UPC</option>
            <option value="A">APC</option>

            
            
        </select> 
 <div>
        <lable for = "fiberCountWallCross">Количество волокон:</lable>
        <input type = "number" value = "24" step = "1" name = "fiberCountWallCross"></input>
</div>
        <div>
        <input type="button" id="btn" name="btnWallCross" value="Подбор">
        
    </div>
    <div>
        Количество, шт <input type="number" name="quantity" value="1">
    </div>
        <div style = 'color:red'>Функционал в разработке</div>
        `
        let cabinetOpticCrossComplect = `
        
        <label for="кабельТип">Тип кабеля:</label>

            <select name="кабельТип">
                <option value="OS2" selected>OS2</option>
                <option value="OM2"> OM2</option>
                <option value="OM3">OM3</option>
                <option value="OM4">OM4</option>
            </select>

            <label for="адаптерТип">Тип адаптера:</label>
            
            <select name="адаптерТип">
                <option value="DLC" selected>LC Duplex</option>
                <option value="DSC">SC Duplex</option>
                
            </select>

            <label for="количеcтвоПортовКомплект">Количество портов:</label>
            <select name="количеcтвоПортовКомплект">
                <option value="4" selected>4 Duplex порта</option>
                <option value="6">6 Duplex портов</option>
                <option value="8">8 Duplex портов</option>
                <option value="12">12 Duplex портов</option>
                <option value="24">24 Duplex порта</option>
                
            </select>

            <span></span>
            <div>
                <input type="button" id="btn" name="btnWallCrossComplect" value="Подбор">
            </div>
            <div>
                Количество, шт <input type="number" name="quantity" value="1">
            </div>
       
        `


        elem.innerHTML = `
    <div data-name='Перечень оптические компоненты' style="display: table">

    <div style="display: table-row;">
        <div name=opticCrossMenu style="display: table-cell; width: 10%;">
            <ul class='menuOpticCross'>
                <li class="menuActive" name = 'cabinetOpticCross'> <a href="#">Стоечный кросс</a></li>
                <li name = 'cabinetOpticCrossComplect'> <a href="#">Стоечный кросс (комплект)</a></li>
                <li> <a href="#" name = 'wallOpticCross'>Настенный кросс</a></li>
            </ul>
        </div>



        
        <div style="display: table-cell" name = "opticCrossContent">
            ${cabinetOpticCross}
        </div>
         

        </div>
    </div>
    `



        let elMenuOptic = elem.querySelector("[name = 'opticCrossMenu']")

        let elsLiOptic = elMenuOptic.querySelectorAll('li')

        for (const iterator of elsLiOptic) {

            iterator.addEventListener('click', function () {
                for (const elIterator of elsLiOptic) {
                    elIterator.classList.remove('menuActive')
                }
                this.classList.add('menuActive')
            })


        }



        let elCrossContent = elem.querySelector("[name = 'opticCrossContent']")
        console.log(elCrossContent)

        let elCabinetOpticCross = elem.querySelector("[name = 'cabinetOpticCross']")
        let elCabinetOpticCrossComplect = elem.querySelector("[name = 'cabinetOpticCrossComplect']")
        let elWallOpticCross = elem.querySelector("[name = 'wallOpticCross']")

        function removeTable() {
            if (document.querySelector('table')) document.querySelector('table').remove()
        }


        elCabinetOpticCross.addEventListener('click', () => {
            removeTable()
            handlerCabinetOpticCross()
        })

        elWallOpticCross.addEventListener('click', () => {
            removeTable()
            handlerWallOpticCross()

        })

        elCabinetOpticCrossComplect.addEventListener('click', () => {
            removeTable()
            handlerCabinetOpticCrossComplect()
        })

        handlerCabinetOpticCross()

        //Обработка кнопки отбора
        let handlerButtonClick = this.#createParamObj
        let handleButtonDld = this.#manageHideBtnDld

        function handlerCabinetOpticCross() {
            elCrossContent.innerHTML = cabinetOpticCross





            let elemFiberChBx = elem.querySelector("[name = chBoxFiberNumber]")
            let elemFiber = elem.querySelector("[name = 'fiberNumber']")

            let elemQuantity = elem.querySelector("[name = 'quantity']")

            let elemchBxHrefFiber = elem.querySelector("[name = 'chBxHrefFiber']")
            elemchBxHrefFiber.addEventListener('click', function (event) {
                event.preventDefault()
                elemFiberChBx.checked = !elemFiberChBx.checked
                visibleFiber(elemFiberChBx)

            })


            elemFiberChBx.addEventListener('click', function () {

                visibleFiber(this)

            })

            function visibleFiber(checkElem) {
                checkElem.checked ? elemFiber.removeAttribute('hidden') : elemFiber.setAttribute('hidden', '')
                checkElem.checked ? elemQuantity.setAttribute('hidden', '') : elemQuantity.removeAttribute('hidden')

            }

            visibleFiber(elemFiberChBx)

            elemFiber.addEventListener('change', function () {

                if (this.value < 0) {
                    alert('Значение должно быть больше или равно нуль')
                    this.value = 0
                } else if (!Number.isInteger(+this.value)) {
                    alert('Количество волокн должно быть целое')
                    this.value = 0
                }
            })



            let elemSelectAdapter = elem.querySelector("[name = 'адаптерТип']")

            //Расчет оптической плотности и вывод на страницу
            opticValueContent(elemSelectAdapter)
            function opticValueContent(parentElement) {

                let elemTextOptinValueFunction = () => {
                    let opticValue = 0
                    if (parentElement.value == 'DLC' || parentElement.value == 'DSC') {
                        opticValue = 48
                    }
                    else if (parentElement.value == 'QLC') {
                        opticValue = 96
                    }
                    else if (parentElement.value == 'ST') {
                        opticValue = 24
                    }
                    else if (parentElement.value == 'FC') {
                        opticValue = 24
                    }

                    return `Оптическая плотность ${opticValue} волокон/1U`

                }

                let elemTextOptinValue = elem.querySelector('span')

                elemTextOptinValue.textContent = elemTextOptinValueFunction()
            }
            elemSelectAdapter.addEventListener('change', function () {
                opticValueContent(elemSelectAdapter)
            })

            let elChBoxOptOrg = elem.querySelector("[name = 'chBoxOptOrgHref']")
            let elChBx = elem.querySelector("[name = 'chBoxOptOrg']")

            elChBoxOptOrg.addEventListener('click', (event) => {

                event.preventDefault()

                if (elChBx.checked) {
                    elChBx.removeAttribute('checked')
                } else {
                    elChBx.setAttribute('checked', '')
                }


            })


            let elemBtn = elem.querySelector("[name = 'btnCabinetCross']")
            //alert(elemBtn)
            elemBtn.addEventListener('click', () => {

                let paramObj = handlerButtonClick(type, elem)

                let promise = fetch('/opticTable', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        import('./tableModuleCopy.js').then((TableResult1) => {

                            let elemBody = document.querySelector("[name='content']")



                            // console.log(JSON.stringify(resp))

                            let elemTable = new TableResult1.default('/opticTable', resp).elem

                            let currentElemTAble = document.querySelector('table')
                            if (currentElemTAble) currentElemTAble.remove()

                            elemBody.textContent.replace('{content}', '')

                            let elTd = elemTable.querySelector('td')
                            elTd.style.width = '15%'

                            elemBody.append(elemTable)

                            // elemBody.innerHTML = elemTable.outerHTML

                            handleButtonDld(elemBody)


                        })



                        // exportToExcel('','Оптика')

                        /* let table2excel = new Table2Excel();
                        table2excel.export(document.querySelectorAll("table"));
             */
                        //alert(resp.артикул + '_' + resp.наименование)
                    })




            })

            //Dcnfdbnm c.lkf



        }

        function handlerWallOpticCross() {
            elCrossContent.innerHTML = wallOpticCross

            let elemBtn = elem.querySelector("[name = 'btnWallCross']")

            elemBtn.addEventListener('click', () => {

                let paramObj = handlerButtonClick(type + 'Wall', elem)
                console.log(type)

                let promise = fetch('/opticTableWall', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        import('./tableModuleCopy.js').then((TableResult1) => {

                            let elemBody = document.querySelector("[name='content']")



                            // console.log(JSON.stringify(resp))

                            let elemTable = new TableResult1.default('/opticTable', resp).elem

                            let currentElemTAble = document.querySelector('table')
                            if (currentElemTAble) currentElemTAble.remove()

                            elemBody.textContent.replace('{content}', '')

                            let elTd = elemTable.querySelector('td')
                            elTd.style.width = '15%'

                            elemBody.append(elemTable)

                            // elemBody.innerHTML = elemTable.outerHTML

                            handleButtonDld(elemBody)


                        })



                        // exportToExcel('','Оптика')

                        /* let table2excel = new Table2Excel();
                        table2excel.export(document.querySelectorAll("table"));
             */
                        //alert(resp.артикул + '_' + resp.наименование)
                    })






            })


        }

        function handlerCabinetOpticCrossComplect() {

            elCrossContent.innerHTML = cabinetOpticCrossComplect

            let elemBtn = elem.querySelector("[name = 'btnWallCrossComplect']")

            elemBtn.addEventListener('click', async () => {

                let paramObj = handlerButtonClick(type + 'Complect', elem)
                console.log(paramObj)

                let respFetch = await fetch('/opticTableComplect', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })

                let respJson = await respFetch.json()

                import('./tableModuleCopy.js').then((TableResult1) => {

                    let elemBody = document.querySelector("[name='content']")



                    // console.log(JSON.stringify(resp))

                    let elemTable = new TableResult1.default('/opticTable', respJson).elem

                    let currentElemTAble = document.querySelector('table')
                    if (currentElemTAble) currentElemTAble.remove()

                    elemBody.textContent.replace('{content}', '')

                    let elTd = elemTable.querySelector('td')
                    elTd.style.width = '15%'

                    elemBody.append(elemTable)

                    // elemBody.innerHTML = elemTable.outerHTML

                    handleButtonDld(elemBody)


                })

                console.log(respJson)


            })


        }




        return elem

    }

    #manageHideBtnDld(elemBody) {
        if (elemBody) {
            let btnDld = document.querySelector('#btnDnld')
            btnDld.removeAttribute('hidden')
        }
    }

    //Рендинг шапки выбора патч-кордов
    #renderPatchCordHead(type) {
        let elem = document.createElement('div')
        elem.innerHTML =
            `
    <div data-name='Перечень патч-корды'>
    <select name="пкКатегория">
    <option value="5E" selected>5e</option>
    <option value="6">6</option>
    <option value="6A">6A</option>
   
    </select>

    <select name="пкКонструкция">
        <option value="UU" selected>U/UTP</option>
        <option value="FU">F/UTP</option>
        <option value="UF">U/FTP</option>
        <option value="FF">F/FTP</option>
        <option value="SF">S/FTP</option>
    </select>

    <select name="пкДлина">
        <option value="05" selected>0,5 метра</option>
        <option value="10">1 метр</option>
        <option value="15">1,5 метра</option>
        <option value="20">2 метра</option>
        <option value="30">3 метра</option>
        <option value="50">5 метров</option>
        <option value="70">7 метров</option>
        <option value="00">10 метров</option>

    </select>

    <select name="пкЦвет">
    <option value="WH" selected>Белый</option>    
     <option value="BL">Синий</option>
     <option value="BK">Черный</option>
     <option value="AQ">Бирюзовый</option>
     <option value="RD">Красный</option>
    
     <option value="GN">Зеленый</option>
        <option value="YL">Желтый</option>
        <option value="OR">Оранжевый</option>
    </select>
    <div>
    Количество, м <input type="number" name = "quantity" value="1">
    </div>
    <div>
    <input name="selectBtn" type="button" value="Подбор">
    <input type="button" name="btnSelectCat" value="Подбор только по категории">
    </div>
</div>
    `
        let elColorPc = elem.querySelector("[name = 'пкЦвет']").querySelectorAll('option')
        for (const el of elColorPc) {

            switch (el.value) {
                case 'WH':
                    el.setAttribute('style', 'background: white')
                    break
                case 'BL':
                    el.setAttribute('style', 'background: rgb(31, 65, 156)')
                    break
                case 'BK':
                    el.setAttribute('style', 'background: black; color: white')
                    break
                case 'GN':
                    el.setAttribute('style', 'background: rgb(146, 255, 131)')
                    break
                case 'AQ':
                    el.setAttribute('style', 'background: rgb(43, 183, 248)')
                    break
                case 'RD':
                    el.setAttribute('style', 'background: rgb(218, 47, 47)')
                    break
                case 'YL':
                    el.setAttribute('style', 'background: yellow')
                    break
                case 'OR':
                    el.setAttribute('style', 'background: orange')
                    break

            }

        }

        let elemBtn = elem.querySelector("[name='selectBtn']")
        //alert(elemBtn)
        elemBtn.addEventListener('click', () => {

            let paramObj = this.#createParamObj(type, elem)

            let promise = fetch('/pcordTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(paramObj)
            })
                .then(resp => resp.json())
                .then(resp => {

                    import('./tableModuleCopy.js').then((TableResult1) => {

                        let elemBody = document.querySelector("[name='content']")

                        // console.log(JSON.stringify(resp))

                        let elemTable = new TableResult1.default('/pcordTable', resp).elem

                        let currentElemTAble = document.querySelector('table')
                        if (currentElemTAble) currentElemTAble.remove()

                        elemBody.textContent.replace('{content}', '')

                        let elTd = elemTable.querySelector('td')
                        elTd.style.width = '15%'


                        elemBody.append(elemTable)

                        //elemBody.innerHTML = elemTable.outerHTML

                        this.#manageHideBtnDld(elemBody)




                    })



                })

        })

        let elemBtnCat = elem.querySelector("[name='btnSelectCat']")
        elemBtnCat.addEventListener('click', () => {

            let paramObj = this.#createParamObj(type + 'Cat', elem)

            let promise = fetch('/pcordTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(paramObj)
            })
                .then(resp => resp.json())
                .then(resp => {

                    import('./tableModuleCopy.js').then((TableResult1) => {
                        let elemBody = document.querySelector("[name='content']")

                        console.log(JSON.stringify(resp))

                        let elemTable = new TableResult1.default('/pcordTable', resp).elem

                        let currentElemTAble = document.querySelector('table')
                        if (currentElemTAble) currentElemTAble.remove()

                        elemBody.textContent.replace('{content}', '')

                        let elTd = elemTable.querySelector('td')
                        elTd.style.width = '15%'


                        elemBody.append(elemTable)

                        //  elemBody.innerHTML = elemTable.outerHTML

                        this.#manageHideBtnDld(elemBody)




                    })


                })

        })

        return elem

    }

    #renderPatchPanelHead(type) {
        let elem = document.createElement('div')
        elem.innerHTML =
            `
            <div>
            <div name="modulePanel" data-name = 'Перечень модульные патч-панели'>
                <h3>Моноблочные и модульные панели</h3>
                <select name="ппКатегорияМодульная">
                    <option value="5E" selected>5e</option>
                    <option value="6">6</option>
                    <option value="6A">6A</option>
        
                </select>
        
                <select name="ппКонструкцияМодульная">
                    <option value="U" selected>Неэкранированная (UTP)</option>
                    <option value="F">Экранированная (FTP)</option>
                    
                </select>
        
               
                <div>
                Количество, м <input type="number" name = "quantityModule" value="1">
                </div>
                <div>
                    <input type="button" name=selectBtnModule value="Подбор">
                    <input type="button" name="btnSelectCatModule" value="Подбор только по категории">
                   
                </div>
                <div name="modulePanelContent"></div>
                <hr>
            </div>
        
            <div name="varPanel" data-name='Перечень наборные патч-панели'>
                <h3>Наборные панели</h3>
                <select name="ппКатегорияНаборная">
                    <option value="5E" selected>5e</option>
                    <option value="6">6</option>
                    <option value="6A">6A</option>
        
                </select>
        
                <select name="ппКонструкцияНаборная">
                    <option value="U" selected>Неэкранированная (UTP)</option>
                    <option value="F">Экранированная (FTP)</option>
        
                </select>
                <select name="ппВысотаПанелиНаборная">
                    <option value="05" selected>0,5 U</option>
                    <option value="1">1 U</option>
        
                </select>
        
                <select name="ппПлотностьПанелиНаборная">
                    <option value="24" selected>24 порта/1U</option>
                    <option value="48">48 портов/1U</option>
        
                </select>
                <div>
                Количество, м <input type="number" name = "quantityVar" value="1">
                </div>
        
                <div>
                    <input type="button" name=selectBtnVar value="Подбор">
                    
                    
        
                </div>
                <div name="varPanelContent"></div>
                <hr>    
        
            </div>
        
        
        </div>
    `
        //Обработчик подбора модульной панели
        let elemBtn = elem.querySelector("[name='selectBtnModule']")
        //alert(elemBtn)
        elemBtn.addEventListener('click', () => {

            let paramObj = this.#createParamObj(type + "Module", elem)
            console.log(paramObj)
            let promise = fetch('/ppanelTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(paramObj)

            })
                .then(resp => resp.json())
                .then(resp => {

                    import('./tableModuleCopy.js').then((TableResult1) => {

                        let elemBody = document.querySelector("[name='modulePanelContent']")

                        //console.log(JSON.stringify(resp))

                        let elemTable = new TableResult1.default('/ppanelTable', resp).elem

                        let currentElemTAble = document.querySelector('table')
                        if (currentElemTAble) currentElemTAble.remove()

                        elemBody.textContent.replace('{content}', '')

                        let elTd = elemTable.querySelector('td')
                        elTd.style.width = '15%'


                        elemBody.append(elemTable)

                        // elemBody.innerHTML = elemTable.outerHTML

                        this.#manageHideBtnDld(elemBody)

                    })



                })

        })


        //Обработчик подбора модульной панели по категории
        let elemBtnCat = elem.querySelector("[name='btnSelectCatModule']")
        //alert(elemBtn)
        elemBtnCat.addEventListener('click', () => {

            let paramObj = this.#createParamObj(type + "ModuleCat", elem)
            console.log(paramObj)
            let promise = fetch('/ppanelTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(paramObj)

            })
                .then(resp => resp.json())
                .then(resp => {

                    import('./tableModuleCopy.js').then((TableResult1) => {

                        let elemBody = document.querySelector("[name='modulePanelContent']")

                        console.log(JSON.stringify(resp))

                        let elemTable = new TableResult1.default('/ppanelTable', resp).elem

                        let currentElemTAble = document.querySelector('table')
                        if (currentElemTAble) currentElemTAble.remove()

                        elemBody.textContent.replace('{content}', '')

                        let elTd = elemTable.querySelector('td')
                        elTd.style.width = '15%'

                        elemBody.append(elemTable)

                        // elemBody.innerHTML = elemTable.outerHTML

                        this.#manageHideBtnDld(elemBody)


                    })



                })

        })


        //Обработчик подбора наборной панели
        let elemBtnVar = elem.querySelector("[name='selectBtnVar']")

        elemBtnVar.addEventListener('click', () => {

            let paramObj = this.#createParamObj(type + "Var", elem)
            console.log(paramObj)
            let promise = fetch('/ppanelTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(paramObj)

            })
                .then(resp => resp.json())
                .then(resp => {

                    import('./tableModuleCopy.js').then((TableResult1) => {

                        let elemBody = document.querySelector("[name='varPanelContent']")

                        //   console.log(JSON.stringify(resp))

                        let elemTable = new TableResult1.default('/ppanelTableVar', resp).elem

                        let currentElemTAble = document.querySelector('table')
                        if (currentElemTAble) currentElemTAble.remove()

                        elemBody.textContent.replace('{content}', '')

                        let elTd = elemTable.querySelector('td')
                        elTd.style.width = '15%'

                        elemBody.append(elemTable)

                        //elemBody.innerHTML = elemTable.outerHTML

                        this.#manageHideBtnDld(elemBody)

                    })

                })

        })

        return elem

    }

    #renderPatchCordHeadOptic(type) {
        let elem = document.createElement('div')
        elem.innerHTML =
            `
            <div data-name='Перечень патч-корды оптика'>
            <select name="кабельТип">
                <option value="9" selected>OS2</option>
                <option value="50">    OM2</option>
                <option value="53">OM3</option>
                <option value="54">OM4</option>
            </select>
        
            <select name="адаптерКонструкция">
                <option value="LULU" selected>LC-LC (UPC)</option>
                <option value="LALA">LC-LC (APC)</option>
                <option value="CUCU">SC-SC (UPC)</option>
                <option value="CACA">SC-SC (APC)</option>
                <option value="FUFU">FC-FC (UPC)</option>
                <option value="SUSU">ST-ST (APC)</option>
                <option value="CULU">SC-LC (UPC)</option>
                <option value="CALA">SC-LC (APC)</option>
                <option value="CALU">SC(APC)-LC(UPC)</option>
                <option value="CULA">SC(UPC)-LC(APC)</option>
                <option value="FULU">FC-LC (UPC)</option>
                <option value="SULU">ST-LC (UPC)</option>
                <option value="CUFU">SC-FC (UPC)</option>
                <option value="SUFU">ST-FC (UPC)</option>
            </select>
        
            <select name="пкДлина">
                <option value="1" selected>1 метр</option>
                <option value="2">2 метра</option>
                <option value="3">3 метра</option>
                <option value="5">5 метров</option>
                <option value="7">7 метров</option>
                <option value="10">10 метров</option>
                <option value="15">15 метров</option>
                <option value="20">20 метров</option>
                <option value="30">30 метров</option>
                <option value="50">50 метров</option>
        
            </select>
        
           
            <div>
            Количество, м <input type="number" name = "quantity" value="1">
            </div>
            <div>
            <input name="selectBtn" type="button" value="Подбор">
            <input type="button" hidden name="btnSelecCable" value="Подбор только по кабелю">
            </div>
        </div>
    `

        let elemBtn = elem.querySelector("[name='selectBtn']")
        elemBtn.addEventListener('click', () => {

            let paramObj = this.#createParamObj(type, elem)

            // console.log(JSON.stringify(paramObj))

            let promise = fetch('/pcordOpticTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(paramObj)
            })
                .then(resp => resp.json())
                .then(resp => {

                    import('./tableModuleCopy.js').then((TableResult1) => {

                        let elemBody = document.querySelector("[name='content']")

                        //console.log(JSON.stringify(resp))

                        let elemTable = new TableResult1.default('/pcordOpticTable', resp).elem

                        let currentElemTAble = document.querySelector('table')
                        if (currentElemTAble) currentElemTAble.remove()

                        elemBody.textContent.replace('{content}', '')

                        let elTd = elemTable.querySelector('td')
                        elTd.style.width = '15%'


                        elemBody.append(elemTable)

                        // elemBody.innerHTML = elemTable.outerHTML

                        this.#manageHideBtnDld(elemBody)

                    })

                })

        })

        return elem

    }


    #renderCabinetHead(type) {
        let elem = document.createElement('div')

        let cabinetFloorContent = `
       <div data-name='Перечень шкафы напольные'>
    <div>
        <div style="display: inline-block;">
            <div>Высота</div>
            <select name="высота" autofocus>
                <option value="24" selected>24U</option>
                <option value="28">28U</option>
                <option value="32">32U</option>
                <option value="38">38U</option>
                <option value="42">42U</option>
                <option value="47">47U</option>
            </select>
        </div>

        <div style="display: inline-block;">
            <div>Ширина</div>
            <select name="ширина">
                <option value="6" selected>600 мм</option>
                <option value="8">800 мм</option>
            </select>
        </div>

        <div style="display: inline-block;">
            <div>Глубина</div>
            <select name="глубина">
                <option value="6" selected>600 мм</option>
                <option value="8">800 мм</option>
                <option value="10">1000 мм</option>
                <option value="12">1200 мм</option>
            </select>
        </div>

        <div style="display: inline-block;">
            <div>Цвет</div>
            <select name="цвет">
                <option value="7035" selected>Серый</option>
                <option value="9005">Черный</option>

            </select>
        </div>

        <div style="display: inline-block;">
            <div>Панель боковая тип</div>
            <select name="панельБоковаяТип">
                <option value="1" selected>Односекционная</option>
                <option value="2">Двухсекционная</option>

            </select>
        </div>
    </div>


    <div style="display: inline-block; border-left: solid 2px grey; padding-left: 5px">
        <h4>Передние двери</h4>
        <div style="display: inline-block;">

            <div>Передняя дверь</div>
            <select name="дверьПередняя">
                <option value="GS" selected>Стеклянная</option>
                <option value="PF">Перфорированная</option>
                <option value="MT">Сплошная</option>
            </select>

        </div>
        <div style="display: inline-block;">

            <div>Передняя дверь створки</div>
            <select name="дверьПередняяТип">
                <option value=1 selected>Одностворчатая</option>
                <option value=2>Двустворчатая (Перфорированная)</option>
            </select>
        </div>
    </div>



    <div style="display: inline-block; border-left: solid 2px grey; padding-left: 5px">
        <h4>Задние двери</h4>
        <div style="display: inline-block;">
            <div>Задняя дверь</div>
            <select name="дверьЗадняя">
                <option value="GS" selected>Стеклянная</option>
                <option value="PF">Перфорированная</option>
                <option value="MT">Сплошная</option>
            </select>
        </div>
        <div style="display: inline-block;">
            <div>Задняя дверь створки</div>
            <select name="дверьЗадняяТип">
                <option value=1 selected>Одностворчатая</option>
                <option value=2>Двустворчатая (Перфорированная)</option>
            </select>
        </div>
    </div>


    <div>
        Количество, м <input type="number" name="quantity" value="1">
    </div>
    <div>
        <input name="selectBtn" type="button" value="Подбор">

    </div>
    ${accessoriesContent('floor')}

</div>    
       
       `

        let cabinetWallContent = `

       <div data-name='Перечень шкафы напольные'>
    <div>
        <div style="display: inline-block;">
            <div>Высота</div>
            <select name="высота" autofocus>
                <option value="9" selected>9U</option>
                <option value="12">12U</option>
                <option value="16">16U</option>
                <option value="20">20U</option>
  
            </select>
        </div>
        <div style="display: inline-block;">
            <div>Ширина</div>
            <select name="ширина" disabled>
                <option value="6" disabled selected>600 мм</option>
            </select>
        </div>

        <div style="display: inline-block;">
            <div>Глубина</div>
            <select name="глубина">
                <option value="4" selected>400 мм</option>
                <option value="6">650 мм</option>
                
            </select>
        </div>

        <div style="display: inline-block;">
            <div>Цвет</div>
            <select name="цвет">
                <option value="7035" selected>Серый</option>
                <option value="9005">Черный</option>

            </select>
        </div>
        <div>Тип двери</div>
        <select name="дверьПередняя">
            <option value="GS" selected>Стеклянная</option>
            <option value="MT">Металлическая префoрирoванная</option>
        </select>

        </div>
        <div>
        Количество, м <input type="number" name="quantity" value="1">
    </div>
    <div>
        <input name="selectBtn" type="button" value="Подбор">

    </div>

    ${accessoriesContent('wall')}

    
      
       
       `
        function accessoriesContent(type) {
            let res
            if (type == 'floor') {
                res = `
                <hr>
                <h3>Аксессуары</h3>
                <div>
                    <select name="cabinetAccesoriesSelect">
                        <option value="Grounding">Комплект заземления</option>
                        <option value="Bracing">Набор крепежных гаек (50 шт)</option>
                        <option value="Unification">Объединение шкафов</option>
                        <option value="Plinth" hidden>Цоколь (RAL 7035)</option>
                        <option value="Stubs">Заглушки</option>
                        <option value="Fan">Вентиляционные панели (потолочные)</option>
                        <option value="DinModule">Модули с DIN рейкой</option>
                        <option disabled value="PDU">PDU (блоки распределения питания)</option>
                        <option value="Light">Элементы освещения (LED)</option>
                        <optgroup label = 'Уголки для оборудования'>
                        <option value="Bracket">Уголок для тяжелого оборудования</option>
                        <option value="BracketVar">Уголок регулируемый</option>
                        <option value="BracketVarMini">Направляющие</option>
                        </optgroup>
                        
                        <optgroup label = 'Кабельный менеджмент'>
                        <option value="OrganiserGorisont">Кабельный органайзер (горизонтальный)</option>
                        <option value="OrganiserVertical">Кабельный органайзер (вертикальный)</option>
                        <option value="OrganiserRing">Кабельные кольца (металл)</option>
                        </optgroup>
                        <optgroup label = 'Полки'>
                        <option value="shelf1U">Полки 1U </option>
                        <option value="shelf2U">Полки 2U </option>
                        
                        </optgroup>
            
            
                    </select>
            
                    <label name = 'shelfTypeBigDiv' hidden>Тип полки:
                    <select name="shelfBigType">
                    <option value="250">Полка консольная 2U (глуб. 250 мм)</option>
                    <option value="400">Полка консольная 2U (глуб. 400 мм)</option>
                    <option value="keyBoard">Полка выдвижная 2U (для клавиатуры)</option>
                     </select>
                     </label>
            
            
                    <label name = 'shelfTypeSmallDiv' hidden>Тип полки:
                    <select name="shelfSmallType">
                    <option value="const">Стационарная</option>
                    <option value="variable">Регулируемые по глубине</option>
                    <option value="track">Выдвижная</option>
                     </select>
                     </label>
            
                     <label name = 'shelfTypeSmallDepthDiv' hidden>Глубина:
                    <select name="shelfSmallDepth">
                    <option value="6">шкаф 600 (глубина 253 мм)</option>
                    <option value="8">шкаф 800 (глубина 453 мм)</option>
                    <option value="10">шкаф 1000 (глубина 653 мм)</option>
                    <option value="12">шкаф 1200 (глубина 853 мм)</option>
                     </select>
                     </label>
            
                    
            
                    <select name="stubsHeightOtion" hidden>
                     <option value="1">1U</option>
                     <option value="2">2U</option>
                     <option value="3">3U</option>
                     <option value="4">4U</option>
                     <option value="5">5U</option>
                     <option value="6">6U</option>
                     <option value="7">7U</option>
                     <option value="8">8U</option>
                     <option value="9">9U</option>
                     <option value="10">10U</option>
                     <option value="11">11U</option>
                     <option value="12">12U</option>
                    </select>
            
                <select name="fanQuantity" hidden>
                    
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                </select>
            
                 <select name="fanTerm" hidden>
                    <option value=true>Термостат присутствует</option>
                    <option value=false>Термостат отсутствует</option>
                </select>
            
                <select name="organiserGHeight" hidden>
                    <option value="1">1U</option>
                    <option value="2">2U</option>
                </select>
            
                <select name="organiserGDepth" hidden>
                    <option value="4">40 мм</option>
                    <option value="6">60 мм</option>
                </select>
            
                <select name="organiserGHole" hidden>
                    <option value="true">С отверстием</option>
                    <option value="false">Без отверстия</option>
                </select>
            
                <select name="organiserVDepth" hidden>
                    <option value="6">60 мм</option>
                    <option value="9">90 мм</option>
                </select>
                
                <label name="organiserRingWidthDiv" hidden>Ширина:
                <select name="organiserRingWidth">
                    
                <option value="4">40 мм</option>
                    <option value="6">60 мм</option>
                </select>
                </label>
                
                <label name="organiserRingDepthDiv" hidden>Глубина:
                <select name="organiserRingDepth">
                <option value="4">40 мм</option>    
                <option value="6">60 мм</option>
                    <option value="9">90 мм</option>
                    
                </select>
                </label>
                
            
                
                    <input name="btnAccesories" type="button" value="+ Добавить аксессуар">
                    <input name="btnGrounding" hidden type="button" value="+ Добавить комплект заземления">
                    <input name="btnBracing" hidden type="button" value="+ Добавить комплект крепежных гаек">
            
                </div>
                
               `
            } else if (type == 'wall') {
                res = `
                <hr>
                <h3>Аксессуары</h3>
                <div>
                    <select name="cabinetAccesoriesSelect">
                        <option value="Grounding">Комплект заземления</option>
                        <option value="Bracing">Набор крепежных гаек (50 шт)</option>
                       
                        <option value="Stubs">Заглушки</option>
                        <option disabled value="Fan">Вентиляционные панели (потолочные) - В ДОБРАБОТКЕ</option>
                        <option value="DinModule">Модули с DIN рейкой</option>
                        <option disabled value="PDU">PDU (блоки распределения питания)</option>
                        
                                 
                        <optgroup label = 'Кабельный менеджмент'>
                        <option value="OrganiserGorisont">Кабельный органайзер (горизонтальный)</option>
                        
                        <option value="OrganiserRing">Кабельные кольца (металл)</option>
                        </optgroup>
                        <optgroup label = 'Полки'>
                        <option value="shelf1U">Полки 1U </option>
                        <option value="shelf2U">Полки 2U </option>
                        
                        </optgroup>
            
            
                    </select>
            
                    <label name = 'shelfTypeBigDiv' hidden>Тип полки:
                    <select name="shelfBigType">
                    <option value="250">Полка консольная 2U (глуб. 250 мм)</option>
                    <option value="400">Полка консольная 2U (глуб. 400 мм)</option>
                    <option value="keyBoard">Полка выдвижная 2U (для клавиатуры)</option>
                     </select>
                     </label>
            
            
                    <label name = 'shelfTypeSmallDiv' hidden>Тип полки:
                    <select name="shelfSmallType">
                    <option value="const">Стационарная</option>
                    <option disabled value="track">Выдвижная</option>
                     </select>
                     </label>
            
                     <label name = 'shelfTypeSmallDepthDiv' hidden>Глубина:
                    <select name="shelfSmallDepth">
                    <option value="6">шкаф 600 (глубина 253 мм)</option>
                    <option value="8">шкаф 800 (глубина 453 мм)</option>
                    </select>
                     </label>
            
                    
            
                    <select name="stubsHeightOtion" hidden>
                     <option value="1">1U</option>
                     <option value="2">2U</option>
                     <option value="3">3U</option>
                     <option value="4">4U</option>
                     <option value="5">5U</option>
                     <option value="6">6U</option>
                     <option value="7">7U</option>
                     <option value="8">8U</option>
                     <option value="9">9U</option>
                     <option value="10">10U</option>
                     <option value="11">11U</option>
                     <option value="12">12U</option>
                    </select>
            
                <select name="fanQuantity" hidden>
                    
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                </select>
            
                 <select name="fanTerm" hidden>
                    <option value=true>Термостат присутствует</option>
                    <option value=false>Термостат отсутствует</option>
                </select>
            
                <select name="organiserGHeight" hidden>
                    <option value="1">1U</option>
                    <option value="2">2U</option>
                </select>
            
                <select name="organiserGDepth" hidden>
                    <option value="4">40 мм</option>
                    <option value="6">60 мм</option>
                </select>
            
                <select name="organiserGHole" hidden>
                    <option value="true">С отверстием</option>
                    <option value="false">Без отверстия</option>
                </select>
            
                <select name="organiserVDepth" hidden>
                    <option value="6">60 мм</option>
                    <option value="9">90 мм</option>
                </select>
                
                <label name="organiserRingWidthDiv" hidden>Ширина:
                <select name="organiserRingWidth">
                    
                <option value="4">40 мм</option>
                    <option value="6">60 мм</option>
                </select>
                </label>
                
                <label name="organiserRingDepthDiv" hidden>Глубина:
                <select name="organiserRingDepth">
                <option value="4">40 мм</option>    
                <option value="6">60 мм</option>
                    <option value="9">90 мм</option>
                    
                </select>
                </label>
                
            
                
                    <input name="btnAccesories" type="button" value="+ Добавить аксессуар">
                    <input name="btnGrounding" hidden type="button" value="+ Добавить комплект заземления">
                    <input name="btnBracing" hidden type="button" value="+ Добавить комплект крепежных гаек">
            
                </div>
                
               `
            }

            return res

        }



        elem.innerHTML =
            `
            <div data-name='Телекомуникационные шкафы' style="display: table">

            <div style="display: table-row;">
                <div name=cabinetMenu style="display: table-cell; width: 10%;">
                    <ul class='menuOpticCross'>
                        <li class="menuActive" name = 'cabinetFloor'> <a href="#">Напольные шкафы</a></li>
                        <li name = 'cabinetWall'> <a href="#">Навесные шкафы</a></li>
                    </ul>
                </div>
        
                <div style="display: table-cell" name = "cabinetContent">
                    ${cabinetFloorContent}
                </div>
                 
        
                </div>
            </div>

`
        let elCabinetMenu = elem.querySelector("[name = 'cabinetMenu']")

        let elsLiCabinet = elCabinetMenu.querySelectorAll('li')

        for (const iterator of elsLiCabinet) {

            iterator.addEventListener('click', function () {
                for (const elIterator of elsLiCabinet) {
                    elIterator.classList.remove('menuActive')
                }
                this.classList.add('menuActive')
            })


        }


        let elCabinetContent = elem.querySelector("[name = 'cabinetContent']")

        let elCabinetFloor = elem.querySelector("[name = 'cabinetFloor']")
        let elCabinetWall = elem.querySelector("[name = 'cabinetWall']")

        //Обработка кнопки отбора
        let handlerButtonClick = this.#createParamObj
        let handleButtonDld = this.#manageHideBtnDld
        let handlermanageViewFan = this.#manageViewFan
        let handlermanageHideBtnDld = this.#manageHideBtnDld
        let handlermanageView = this.#manageView

        function removeTable() {
            if (document.querySelector('table')) document.querySelector('table').remove()
            let eldnLdBn = document.querySelector('#btnDnld')
            if (eldnLdBn) eldnLdBn.setAttribute('hidden', '')
            console.log(eldnLdBn)
        }


        elCabinetFloor.addEventListener('click', () => {
            removeTable()
            handlerCabinetFloor(handlermanageViewFan)

        })

        elCabinetWall.addEventListener('click', () => {
            removeTable()
            handlerCabinetWall()
            //  console.log(elCabinetContent)
        })


        handlerCabinetFloor(handlermanageViewFan)

        //Обработка подбора напольного шкафа
        function handlerCabinetFloor(handlermanageViewFan) {
            elCabinetContent.innerHTML = cabinetFloorContent

            let elemBtn = elem.querySelector("[name='selectBtn']")
            elemBtn.addEventListener('click', () => {

                let paramObj = handlerButtonClick(type, elem)
                //this.#createParamObj(type, elem)

                console.log(JSON.stringify(paramObj))

                let promise = fetch('/cabinet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {

                        import('./tableModuleCopy.js').then((TableResult1) => {

                            let elemBody = document.querySelector("[name='content']")

                            //console.log(JSON.stringify(resp))

                            let elemTable = new TableResult1.default('/cabinetTable', resp).elem

                            let currentElemTAble = document.querySelector('table')
                            if (currentElemTAble) currentElemTAble.remove()

                            elemBody.textContent.replace('{content}', '')

                            let elTd = elemTable.querySelector('td')
                            elTd.style.width = '15%'

                            elemBody.append(elemTable)

                            // elemBody.innerHTML = elemTable.outerHTML

                            //this.#manageHideBtnDld(elemBody)
                            handleButtonDld(elemBody)


                        })



                    })

            })

            handlerAccesories('floor')

            //Обработка заполнения

            //Видимость в зависимости от высоты шкафа
            let elemSelHeight = elem.querySelector("[name='высота']")
            elemSelHeight.addEventListener('change', () => { handlermanageView(elemSelHeight, elem, handlermanageViewFan) })

            //Видимость в зависимости от высоты шкафа
            let elemDoorTypeFront = elem.querySelector("[name='дверьПередняя']")
            elemDoorTypeFront.addEventListener('change', () => { handlermanageView(elemSelHeight, elem, handlermanageViewFan) })

            //Видимость в зависимости от высоты шкафа
            let elemDoorTypeBack = elem.querySelector("[name='дверьЗадняя']")
            elemDoorTypeBack.addEventListener('change', () => { handlermanageView(elemSelHeight, elem, handlermanageViewFan) })

            handlermanageView(elemSelHeight, elem, handlermanageViewFan)
        }

        //Обработка подбора навесного шкафа
        function handlerCabinetWall() {
            elCabinetContent.innerHTML = cabinetWallContent

            let elemBtn = elem.querySelector("[name='selectBtn']")
            elemBtn.addEventListener('click', () => {



                let paramObj = handlerButtonClick(type + 'Wall', elem)
                //this.#createParamObj(type, elem)

                console.log(JSON.stringify(paramObj))

                let promise = fetch('/cabinetWall', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {

                        import('./tableModuleCopy.js').then((TableResult1) => {

                            let elemBody = document.querySelector("[name='content']")

                            //console.log(JSON.stringify(resp))

                            let elemTable = new TableResult1.default('/cabinetTable', resp).elem

                            let currentElemTAble = document.querySelector('table')
                            if (currentElemTAble) currentElemTAble.remove()

                            elemBody.textContent.replace('{content}', '')

                            let elTd = elemTable.querySelector('td')
                            elTd.style.width = '15%'

                            elemBody.append(elemTable)

                            // elemBody.innerHTML = elemTable.outerHTML

                            //this.#manageHideBtnDld(elemBody)
                            handleButtonDld(elemBody)


                        })



                    })

            })

            handlerAccesories('wall')


        }

        function handlerAccesories(typeCabinet) {

            let elShelfType = elem.querySelector("[name = 'shelfSmallType']")

            elShelfType.addEventListener('change', function () {
                let elShelfDepth = elem.querySelector("[name = shelfSmallDepth]")
                elShelfDepth.innerHTML = shelfHtml(this.value)
            })

            //Состав элемента select для полок 1U
            function shelfHtml(value) {

                let res = ''

                if (value == 'const') {
                    res = `<option value="6">шкаф 600 (глубина 253 мм)</option>
                <option value="8">шкаф 800 (глубина 453 мм)</option>
                <option value="10">шкаф 1000 (глубина 653 мм)</option>
                <option value="12">шкаф 1200 (глубина 853 мм)</option>`

                } else if (value == 'variable') {
                    res = `
                <option value="8">шкаф 800</option>
                <option value="10">шкаф 1000</option>
                `
                } else if (value = 'track') {
                    res = `<option value="6">шкаф 600 (глубина 253 мм)</option>
                <option value="8">шкаф 800 (глубина 453 мм)</option>
                <option value="10">шкаф 1000 (глубина 653 мм)</option>`
                }

                return res
            }

            let elemBtnGrounding = elem.querySelector("[name = 'btnGrounding']")
            let elemBtnBracing = elem.querySelector("[name = 'btnBracing']")
            let elemBtnAccesories = elem.querySelector("[name = 'btnAccesories']")
            let elemSelectAccessories = elem.querySelector("[name='cabinetAccesoriesSelect']")
            let elemWidthCabinet = elem.querySelector("[name = 'ширина']")

            elemWidthCabinet.addEventListener('change', () => {
                //this.#manageViewFan(elem)
                handlermanageViewFan(elem)
            })

            elemBtnGrounding.addEventListener('click', () => {
                let paramObj = handlerButtonClick(type + 'Grounding', elem)

                console.log(JSON.stringify(paramObj))

                let promise = fetch('/cabinetGrounding', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {

                        let elemBody = document.querySelector("[name='content']")

                        //console.log(JSON.stringify(resp))

                        let elemCurrentTable = elemBody.querySelector('table')

                        if (!elemCurrentTable) {
                            let elemTable = new TableResult('/cabinetTable', resp).elem

                            elemBody.append(elemTable)

                            elemBody.innerHTML = elemTable.outerHTML

                            handlermanageHideBtnDld(elemBody)
                        } else {
                            let elemTable = new TableResult('/cabinetTable', resp, true, 'Grounding').elem

                            /* console.log('elemTable----------')
                            console.log(elemTable) */
                            let elemCurrentTBody = elemCurrentTable.querySelector('tbody')

                            elemTable.forEach(item => elemCurrentTBody.append(item))



                            // elemBody.innerHTML = elemTable.outerHTML

                            handlermanageHideBtnDld(elemBody)

                        }



                    })
            })

            elemBtnBracing.addEventListener('click', () => {
                let paramObj = handlerButtonClick(type + 'Bracing', elem)

                //console.log(JSON.stringify(paramObj))

                let promise = fetch('/cabinetBracing', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        let elemBody = document.querySelector("[name='content']")

                        //console.log(JSON.stringify(resp))

                        let elemCurrentTable = elemBody.querySelector('table')

                        if (!elemCurrentTable) {
                            let elemTable = new TableResult('/cabinetTable', resp).elem

                            elemBody.append(elemTable)

                            elemBody.innerHTML = elemTable.outerHTML

                            handlermanageHideBtnDld(elemBody)
                        } else {
                            let elemTable = new TableResult('/cabinetTable', resp, true, 'Bracing').elem

                            /* console.log('elemTable----------')
                            console.log(elemTable) */
                            let elemCurrentTBody = elemCurrentTable.querySelector('tbody')

                            elemTable.forEach(item => elemCurrentTBody.append(item))



                            // elemBody.innerHTML = elemTable.outerHTML

                            handlermanageHideBtnDld(elemBody)

                        }



                    })
            })

            elemBtnAccesories.addEventListener('click', () => {

                let nameAccesories = ''

                nameAccesories = elemSelectAccessories.value

                console.log(nameAccesories)

                let paramObj = handlerButtonClick(type + nameAccesories, elem)

                console.log(paramObj)

                console.log(JSON.stringify(paramObj))

                let promise = fetch(`/cabinet${nameAccesories}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paramObj)
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        let elemBody = document.querySelector("[name='content']")

                        //console.log(JSON.stringify(resp))

                        let elemCurrentTable = elemBody.querySelector('table')

                        if (!elemCurrentTable) {
                            let elemTable = new TableResult('/cabinetTable', resp).elem

                            elemBody.append(elemTable)

                            elemBody.innerHTML = elemTable.outerHTML

                            handlermanageHideBtnDld(elemBody)
                        } else {

                            let elemTable = new TableResult('/cabinetTable', resp, true, nameAccesories).elem

                            /* console.log('elemTable----------')
                            console.log(elemTable) */
                            let elemCurrentTBody = elemCurrentTable.querySelector('tbody')

                            elemTable.forEach(item => elemCurrentTBody.append(item))



                            // elemBody.innerHTML = elemTable.outerHTML

                            handlermanageHideBtnDld(elemBody)

                        }



                    })
            })

            console.log(elemSelectAccessories)
            elemSelectAccessories.addEventListener('change', function () {

                let arrNamesHide = [
                    'stubsHeightOtion',
                    'fanQuantity',
                    'fanTerm',
                    'organiserGHeight',
                    'organiserGDepth',
                    'organiserGHole',
                    'organiserVDepth',
                    'organiserRingWidthDiv',
                    'organiserRingDepthDiv',
                    'shelfTypeSmallDiv',
                    'shelfTypeSmallDepthDiv',
                    'shelfTypeBigDiv'
                ]

                if (this.value == 'Stubs') {

                    let elemStubsHeight = elem.querySelector("[name = 'stubsHeightOtion']")
                    // elemStubsHeight.removeAttribute('hidden')

                    let arrNew = ['fanQuantity',
                        'fanTerm',
                        'organiserGHeight',
                        'organiserGDepth',
                        'organiserGHole',
                        'organiserVDepth',
                        'organiserRingWidthDiv',
                        'organiserRingDepthDiv'
                    ]

                    manageHideElem(arrNamesHide, [elemStubsHeight])
                } else if (this.value == 'Fan') {
                    let elemFanQuantity = elem.querySelector("[name = 'fanQuantity']")
                    //elemFanQuantity.removeAttribute('hidden')
                    let elemFanTerm = elem.querySelector("[name = 'fanTerm']")
                    //elemFanTerm.removeAttribute('hidden')
                    /*  manageHideElem(['stubsHeightOtion',
                         'organiserGHeight',
                         'organiserGDepth',
                         'organiserGHole',
                         'organiserVDepth',
                         'organiserRingWidthDiv',
                         'organiserRingDepthDiv'
                     ]) */

                    manageHideElem(arrNamesHide, [elemFanQuantity, elemFanTerm])

                } else if (this.value == 'OrganiserGorisont') {
                    let elemOrginiserGHeight = elem.querySelector("[name = 'organiserGHeight']")
                    //elemOrginiserGHeight.removeAttribute('hidden')
                    let elemOrginiserDepth = elem.querySelector("[name = 'organiserGDepth']")
                    //elemOrginiserDepth.removeAttribute('hidden')
                    let elemOrginiserGHole = elem.querySelector("[name = 'organiserGHole']")
                    //elemOrginiserGHole.removeAttribute('hidden')
                    /*   manageHideElem(['fanQuantity',
                          'fanTerm', 'stubsHeightOtion', 'organiserVDepth', 'organiserRingWidthDiv',
                          'organiserRingDepthDiv']) */
                    manageHideElem(arrNamesHide, [elemOrginiserGHeight, elemOrginiserDepth, elemOrginiserGHole])


                } else if (this.value == 'OrganiserVertical') {
                    let elemOrginiserVDepth = elem.querySelector("[name = 'organiserVDepth']")
                    //elemOrginiserVDepth.removeAttribute('hidden')
                    /* manageHideElem(['fanQuantity',
                        'fanTerm', 'stubsHeightOtion',
                        'organiserGHeight',
                        'organiserGDepth',
                        'organiserGHole',
                        'organiserRingWidthDiv',
                        'organiserRingDepthDiv']) */
                    manageHideElem(arrNamesHide, [elemOrginiserVDepth])
                }

                else if (this.value == 'OrganiserRing') {
                    let elemOrganiserRingWidth = elem.querySelector("[name = 'organiserRingWidthDiv']")
                    // elemOrganiserRingWidth.removeAttribute('hidden')
                    let elemOrganiserRingDepth = elem.querySelector("[name = 'organiserRingDepthDiv']")
                    //  elemOrganiserRingDepth.removeAttribute('hidden')
                    /*  manageHideElem(['fanQuantity',
                         'fanTerm', 'stubsHeightOtion',
                         'organiserGHeight',
                         'organiserGDepth',
                         'organiserGHole',
                         'organiserVDepth']) */
                    manageHideElem(arrNamesHide, [elemOrganiserRingWidth, elemOrganiserRingDepth])
                }
                else if (this.value == "shelf1U") {
                    let elemShelfType = elem.querySelector("[name = 'shelfTypeSmallDiv']")
                    let elemShelfDepth = elem.querySelector("[name = 'shelfTypeSmallDepthDiv']")
                    elemShelfDepth.querySelector('select').value = elem.querySelector("[name = 'глубина']").value
                    manageHideElem(arrNamesHide, [elemShelfType, elemShelfDepth])

                }

                else if (this.value == "shelf2U") {
                    let elemShelfType = elem.querySelector("[name = 'shelfTypeBigDiv']")
                    manageHideElem(arrNamesHide, [elemShelfType])

                }


                else {
                    let elemStubsHeight = elem.querySelector("[name = 'stubsHeightOtion']")
                    elemStubsHeight.setAttribute('hidden', '')
                    /* let elemFanQuantity = elem.querySelector("[name = 'fanQuantity']")
                    elemFanQuantity.setAttribute('hidden', '')
    
                    let elemFanTerm = elem.querySelector("[name = 'fanTerm']")
                    elemFanTerm.setAttribute('hidden', '') */

                    /* let arrNew = [['stubsHeightOtion'],
                        'fanQuantity',
                        'fanTerm',
                        'organiserGHeight',
                        'organiserGDepth',
                        'organiserGHole',
                        'organiserVDepth',
                        'organiserRingWidthDiv',
                        'organiserRingDepthDiv'] */

                    manageHideElem(arrNamesHide)


                }

                function manageHideElem(hiddenElemArrName, noHiddenElemArr) {
                    for (const it of hiddenElemArrName) {
                        let elemHide = elem.querySelector(`[name='${it}']`)
                        elemHide.setAttribute('hidden', '')
                    }

                    if (!noHiddenElemArr) return

                    for (const iterator of noHiddenElemArr) {
                        iterator.removeAttribute('hidden')
                    }
                }

            })

            elemSelectAccessories.addEventListener('click', function () {
                let elemheight = elem.querySelector("[name='ширина']").value
                let elemDepth = elem.querySelector("[name='глубина']").value
                //alert(elemDepth)
                let elemOptionsCollection = this.querySelectorAll('option')

                for (const elemOption of elemOptionsCollection) {

                    if (elemOption.value == 'Plinth') {
                        switch (true) {
                            case (elemDepth == '12' || (elemheight == '8' && elemDepth == '6')):
                                elemOption.setAttribute('disabled', '')

                                break
                            default:
                                elemOption.removeAttribute('disabled')
                                break
                        }
                    }



                }


            })



        }

        return elem
    }

    #manageView(elemHeight, elem, handlermanageViewFan) {

        let elemSidePanel = elem.querySelector("[name='панельБоковаяТип']")
        //elemSidePanel.removeAttribute('disabled')
        for (const elemSide of elemSidePanel.querySelectorAll('option')) {

            switch (true) {
                case (elemHeight.value == '24' || elemHeight.value == '28' || elemHeight.value == '32'):

                    if (elemSide.valu = '1') {
                        setView(elemSide, 1)

                    } else {
                        elemSidePanel.value = 1
                        setView(elemSide, 0)
                    }
                    break
                default:

                    setView(elemSide, 1)
                    break

            }

        }

        let elemWidthFan = elem.querySelector("[name='ширина']")
        //console.log(elemWidthFan)
        let elemColorFan = elem.querySelector("[name='цвет']")


        let elemFrontDoor = elem.querySelector("[name='дверьПередняя']")
        let elemBackDoor = elem.querySelector("[name='дверьЗадняя']")
        viewDoor(elemHeight, elemFrontDoor)
        viewDoor(elemHeight, elemBackDoor)


        /*  for (const elemSide of elemFrontDoor.querySelectorAll('option')) {
             elemSide.removeAttribute('selected')
             switch (true) {
                 case (elemHeight.value == '28'):
                     elemFrontDoor.setAttribute('disabled', '')
 
                     setView(elemSide, 0)
 
                     break
                 case (elemHeight.value == '32'):
                     elemFrontDoor.removeAttribute('disabled')
                     if (elemSide.value == 'PF') {
                         setView(elemSide, 1)
                         elemSide.setAttribute('selected', '')
 
                     } else {
                         setView(elemSide, 0)
                     }
                     break
                 default:
                     elemFrontDoor.removeAttribute('disabled')
 
                     setView(elemSide, 1)
                     break
 
             }
 
         }
        
         for (const elemSide of elemBackDoor.querySelectorAll('option')) {
             elemSide.removeAttribute('selected')
             switch (true) {
                 case (elemHeight.value == '28'):
                     elemBackDoor.setAttribute('disabled', '')
 
                     setView(elemSide, 0)
 
                     break
                 case (elemHeight.value == '32'):
                     elemBackDoor.removeAttribute('disabled')
                     if (elemSide.value == 'PF') {
                         setView(elemSide, 1)
                         elemSide.setAttribute('selected', '')
 
                     } else {
                         elemBackDoor.value='PF'
                         setView(elemSide, 0)
                     }
                     break
                 default:
                     elemBackDoor.removeAttribute('disabled')
 
                     setView(elemSide, 1)
                     break
 
             }
 
         } */

        function viewDoor(elemHeight, door) {
            for (const elemSide of door.querySelectorAll('option')) {
                //  elemSide.removeAttribute('selected')
                switch (true) {
                    case (elemHeight.value == '28'):
                        door.setAttribute('disabled', '')

                        setView(elemSide, 0)

                        break
                    case (elemHeight.value == '32'):
                        door.removeAttribute('disabled')
                        if (elemSide.value == 'PF') {
                            setView(elemSide, 1)
                            door.value = 'PF'
                            //elemSide.setAttribute('selected', '')

                        } else {
                            setView(elemSide, 0)
                        }
                        break
                    default:
                        door.removeAttribute('disabled')

                        setView(elemSide, 1)
                        break

                }

            }



        }


        let doorTypeFront = elem.querySelector("[name='дверьПередняяТип']")
        let doorTypeBack = elem.querySelector("[name='дверьЗадняяТип']")
        viewDoorType(doorTypeFront, elemFrontDoor)
        viewDoorType(doorTypeBack, elemBackDoor)

        function viewDoorType(doorType, elemDoor) {

            doorType.value = '1' //установка select при смене двери        

            for (const elemSide of doorType.querySelectorAll('option')) {

                switch (true) {
                    case (elemDoor.value == 'GS' || elemDoor.value == 'MT'):

                        if (elemSide.value == "2") {
                            setView(elemSide, 0)
                        } else {
                            setView(elemSide, 1)
                        }
                        break

                    default:

                        setView(elemSide, 1)
                        break

                }

            }

        }


        function setView(currentElem, propView) {

            if (propView) {
                currentElem.removeAttribute('disabled')

            } else {
                currentElem.setAttribute('disabled', '')
            }

        }




        handlermanageViewFan(elem)


    }

    #manageViewFan(elem) {

        //Обработка видимостью вентиляторов
        let elemWidthFan = elem.querySelector("[name='ширина']")

        let elemFanQuantity = elem.querySelector("[name = 'fanQuantity']")
        console.log(elemFanQuantity.querySelectorAll('option'))

        for (let fanQ of elemFanQuantity.querySelectorAll('option')) {


            switch (true) {
                case (elemWidthFan.value == '6'):

                    fanQ.parentElement.value = '4'

                    fanQ.value == '9' ? setView(fanQ, false) : setView(fanQ, true)

                    break
                case (elemWidthFan.value == '8'):
                    fanQ.parentElement.value = '6'


                    fanQ.value == '4' ? setView(fanQ, false) : setView(fanQ, true)


                    break


            }



        }

        function setView(currentElem, propView) {

            if (propView) {
                currentElem.removeAttribute('disabled')

            } else {
                currentElem.setAttribute('disabled', '')
            }

        }

    }

}