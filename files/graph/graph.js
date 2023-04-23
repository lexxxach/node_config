
class ElPathLine {

    constructor(width, heigth, xmlns, color, dPath) {
        this.elem = this.#render(width, heigth, xmlns, color, dPath)
    }

    #render(width, heigth, xmlns, color, dPath) {

        let elPath = document.createElementNS(xmlns, 'path')

        elPath.setAttribute('fill', "'none")
        elPath.setAttribute('stroke', color)
        elPath.setAttribute('d', dPath)

        return elPath

    }

}

//создание объекта с абсолютным и относительным значением мощности
class powerValueObjClass {
    constructor(power, index, quantity) {
        this.powerValue = power * index / (quantity),
            this.powerPercent = 100 * index / (quantity)
    }
}

function f() {

    let elDivTable = document.createElement('div')
    elDivTable.style = 'display:table'

    let elDivTableTr = document.createElement('div')
    elDivTableTr.style = 'display:table-row; padding:auto; vertical-align:middle'

    

    let elDiv = document.createElement('div')
    elDiv.style = 'display:table-cell'
    let elDivLegend = document.createElement('div')
    elDivLegend.style = 'display:table-cell; vertical-align:middle'
    let elBody = document.querySelector('body')

    elDivTable.append(elDivTableTr)
    elDivTableTr.append(elDiv)
    elDivTableTr.append(elDivLegend)
    
    let objUpsArr = createObjUpsArr('SMALLR1')
    objUpsArr.reverse().forEach(item=>{
        let elDivText = document.createElement('div')
        //elDivText.textContent = item
        console.log(item)
        elDivText.style = `color:${item.arrObjValues.color}`
        elDivText.append(item.arrObjValues.fullName)
        elDivLegend.append(elDivText)
    })
    console.log(objUpsArr)

   
    elBody.append(elDivTable)
    //elBody.append(elDivLegend)


    let width = 800
    let heigth = 500
    let indent = 35
    let indentR = 150
    let power = 900

    let elGraph = getElGrapf(width, heigth, indent, indentR, power)
    let elGraphLegend = getElGraphLegend(100, heigth, indent, indentR, power)

    elDiv.append(elGraph)
    //elDivLegend.append(elGraphLegend)




}

function getElGraphLegend(width, heigth, indent, indentR, power){
    const xmlns = 'http://www.w3.org/2000/svg'

    let elSvgGrapfLegend = document.createElementNS(xmlns, 'svg')
    elSvgGrapfLegend.setAttribute('style', 'margin-top:50px; margin-bottom:50px')
    elSvgGrapfLegend.setAttribute('width', '100%')
    elSvgGrapfLegend.setAttribute('height', `${heigth}`)
    return elSvgGrapfLegend
}



function getElGrapf(width, heigth, indent, indentR, power) {

    const xmlns = 'http://www.w3.org/2000/svg'

    let elSvgGrapf = document.createElementNS(xmlns, 'svg')
    elSvgGrapf.setAttribute('style', 'margin-top:50px;margin-bottom:50px;margin-left:50px')
    elSvgGrapf.setAttribute('width', `${width}`)
    elSvgGrapf.setAttribute('height', `${heigth}`)



    //прорисовка верстикальных линий
    let arrVertLines = createVerticalLines(10, width, heigth, width, xmlns, power, indent, indentR)
    //console.log(arrVertLines)
    arrVertLines.forEach(item => elSvgGrapf.append(item))

    //прорисовка верстикальных линий
    let arrHorizLines = createHorisontalLines(4, width, heigth, heigth, xmlns, power, indent)
    //console.log(arrHorizLines)
    arrHorizLines.forEach(item => elSvgGrapf.append(item))

    //добавление точек
    let arrCircles = createCircles(10, width, heigth, xmlns, 4, power, indent)
    arrCircles.forEach(item => elSvgGrapf.append(item))

    //прорисовка осей
    let arrAxis = createAxis(width, heigth, xmlns, indent)
    arrAxis.forEach(item => elSvgGrapf.append(item))


    return elSvgGrapf

}

//создание точек
function createCircles(countVertAxis, width, heigth, xmlns, countHorisontalAxis, power, indent) {

    arrRes = []

    //alert(width)

    let range = (width) / (countVertAxis + 1) //горизонтальный период

    let rangeVertical = heigth / countHorisontalAxis //вертикальный период
    //console.log('------'+rangeVertical)

    let arrLog = createLogArr(10000)

    let arrObjUps = createObjUpsArr('SMALLR1')

    arrObjUps.forEach(item => {

        let arrLines = []

        let cx = indent

        let cyStart = heigth - 50



        let fullName = item.arrObjValues.fullName

        let colorLine = item.arrObjValues.color
        
        console.log(colorLine)

        let prX = 0, prY = 0, cX = 0, cY = 0    //координаты начальные для кривой



        item.arrObjValues.valueArr.forEach((value, ind, currentArray) => {

            let powerValue = new powerValueObjClass(power, ind + 1, currentArray.length)

            console.log(powerValue)

            cx = cx + range

            let multY = Math.log10(value)

            cy = cyStart - rangeVertical * multY

            if (!ind) {
                cX = cx
                cY = cy
            } else {
                prX = 0 + cX
                prY = 0 + cY

                cX = cx
                cY = cy

                let dPath = `M${prX} ${prY} L ${cX} ${cY}`

                let elVarLine = document.createElementNS(xmlns, 'path')
                elVarLine.setAttribute('fill', "none")
                elVarLine.setAttribute('stroke', colorLine)
                elVarLine.setAttribute('stroke-width', 2)
                elVarLine.setAttribute('d', dPath)
                arrLines.push(elVarLine)

            }





            /* console.log(value)
            console.log(multY)
            console.log(cy) */
            let elCircle = document.createElementNS(xmlns, 'circle')
            elCircle.setAttribute('fill', "white")
            elCircle.setAttribute('stroke', 'red')
            elCircle.setAttribute('cx', cx)
            elCircle.setAttribute('cy', cy)
            elCircle.setAttribute('r', 4)
            elCircle.setAttribute('data-value', value)
            // elCircle.setAttribute('r', 4)


            elCircle.addEventListener('mouseover', function (event) {

                event.target.setAttribute('r', 10)
                console.log('' + this.getAttribute('cx') + ' ' + this.getAttribute('cy'))

                let elTextGrapf = textGraph(elCircle.dataset.value, powerValue, fullName)
                elTextGrapf.setAttribute('name', 'textGraph')

                elTextGrapf.style.position = "absolute";

                let clientX = event.clientX + 30
                let clientY = event.clientY - 20



                elTextGrapf.style.left = clientX + 'px';
                elTextGrapf.style.top = clientY + 'px';

                document.body.append(elTextGrapf)

                arrLines.forEach(iterator=>iterator.setAttribute('stroke-width', 4))
                



            })
            elCircle.addEventListener('mouseout', function (event) {

                let elTextGraph = document.querySelector("[name = 'textGraph']")
                elTextGraph.remove()

                event.target.setAttribute('r', 4)
                arrLines.forEach(iterator=>iterator.setAttribute('stroke-width', 2))
            })

            arrRes.push(elCircle)
          arrLines.forEach(iterator=>arrRes.unshift(iterator))

           // console.log(arrRes)



        })





    })




    return arrRes




}

//создание кривой линии
function createVarLine(prX, prY, cX, cY) {

    let dPath = `M${prX}, ${prY} L${cX}, ${cY}`

    let res = new ElPathLine('', '', xmlns, 'orange', dPath)

    return res

}


//создание надписи на графике
function textGraph(value, powerValue, fullName) {

    let elGraph = document.createElement('div')
    elGraph.setAttribute('display', 'inline')
    elGraph.style.background = 'white'
    elGraph.style = 'border:solid red 2px; background:white; border-radius:15px; padding:15px'
    elGraph.innerHTML = `
    <div>Мощность: ${powerValue.powerValue} Вт.</div>
    <div>Нагрузка: ${powerValue.powerPercent}%</div>
    <div>Время автономной работы: ${Math.round(+value)} мин.</div>
    <div>Конфигурация: ${fullName}</div>
    `
    return elGraph

}

//создание осей
function createAxis(width, heigth, xmlns, indent) {
    let arrRes = []

    //оси
    dHValue = `M ${10+indent}, ${heigth - 50} L ${width},${heigth - 50}`
    let axisH = new ElPathLine(width, heigth, xmlns, 'red', dHValue).elem

    dVValue = `M ${10+indent}, ${heigth - 50} L ${10+indent},10`
    let axisV = new ElPathLine(width, heigth, xmlns, 'red', dVValue).elem

    arrRes.push(axisH)
    arrRes.push(axisV)

    return arrRes
}

//создание вертикальных линий
function createVerticalLines(quantityH, width, height, lenght, xmlns, power, indent, indentR) {

    let arrRes = []

    let delQuantity = quantityH + 1
    let range = +lenght / delQuantity
    let currentX = indent

    for (let index = 0; index < delQuantity; index++) {

        if (!index) {
            let elXertText = document.createElementNS(xmlns, 'text')
            elXertText.setAttribute('x', currentX)
            elXertText.setAttribute('y', +height - 50 + 30)
            elXertText.textContent = 'P, Вт'
            arrRes.push(elXertText)
            continue
        }

        currentX += range

        dHValue = `M ${currentX}, ${height - 50 + 15} L ${currentX},10`
        let elVert = new ElPathLine(width, height, xmlns, 'grey', dHValue).elem

        let elXertText = document.createElementNS(xmlns, 'text')
        elXertText.setAttribute('x', currentX - 20)
        elXertText.setAttribute('y', +height - 50 + 30)
        elXertText.setAttribute('style', 'font-size:80%')

        // console.log(index)
        // console.log(quantityH - index + 1)
        let powerValue = new powerValueObjClass(power, index, quantityH)
        elXertText.textContent = `${powerValue.powerValue} \n (${powerValue.powerPercent}%)`

        arrRes.push(elVert)
        arrRes.push(elXertText)
        // console.log(currentX)
    }

    return arrRes

}

//создание объекта с абсолютным и относительным значением мощности
class powerValueObj {
    constructor(power, index, quantity) {
        this.powerValue = power * index / (quantity),
            this.powerPercent = 100 * index / (quantity)
    }
}


//создание горизонтальных линий
function createHorisontalLines(quantityV, width, height, lenght, xmlns, power, indent) {

    let arrRes = []

    let delQuantity = quantityV
    let range = +height / delQuantity
    let currentY = height

    for (let index = 0; index <= delQuantity; index++) {

        dVValue = `M ${10+indent}, ${currentY - 50} L ${width},${currentY - 50}`
        let elHoriz = new ElPathLine(width, height, xmlns, 'grey', dVValue).elem

        let arrTimeAsix = [1,10,100,1000,10000] //значения подписи логарифмической сетки

        if(index!=1) arrRes.push(elHoriz)

        let elYText = document.createElementNS(xmlns, 'text')
        elYText.setAttribute('x', -20 + indent)
        elYText.setAttribute('y', currentY-50)
        elYText.setAttribute('style', 'font-size:80%')
        elYText.textContent = arrTimeAsix[index]
        
        if(index == delQuantity){
            let textYAsix = document.createElementNS(xmlns, 'text')
            textYAsix.setAttribute('x', 20 + indent)
            textYAsix.setAttribute('y', 30)
            textYAsix.setAttribute('style', 'font-size:100%')
            textYAsix.textContent = 't, мин'
            arrRes.push(textYAsix)
        }

        currentY -= range

        arrRes.push(elYText)

    }

    let arrLog = createLogArr(10000)

    let currentYLog = height

    //создание строк логарифмической сетки
    arrLog.forEach((item, ind) => {


        dVValueLog = `M ${10+indent}, ${currentYLog - 50} L ${width},${currentYLog - 50}`
        let elHorizLog = new ElPathLine(width, height, xmlns, 'grey', dVValueLog).elem

        currentYLog = height - range * item

        if(ind) arrRes.push(elHorizLog)

    })

    return arrRes

}



//создание массива логарифмических значений
function createLogArr(logInt) {

    let arrLog = []

    let mult = 1;

    let currentMult = 0

    for (let index = 1; index <= logInt; index = index + mult) {
        let resLog = Math.log10(index)
        arrLog.push(resLog)

        if (resLog < 1) {
            mult = 1
        } else if (resLog < 2) {
            mult = 10
        } else if (resLog < 3) {
            mult = 100
        } else if (resLog < 4) {
            mult = 1000

        } else break

    }
    return arrLog

}

function createCircle() {

}

class objUps {
    constructor(name) {
        this.name = name
        this.arrObjValues = this.#createValues(name)
    }

    #createValues(name) {

        let resObj = {
            name: '',
            fullName: '',
            colorLines:'',
            valueArr: []
        }

        let objValues = {
            SMALLR1A5I: [50.5, 26.3, 17.1, 12.2, 9.1, 7.2, 5.9, 4.9, 4.2, 3.7],
            SMALLR1A5I_BPSMLR1_24V: [411.4, 215.2, 139.9, 99.9, 74.7, 58.9, 48.1, 40.4, 34.7, 30.2],
            SMALLR1A0PI_2_BPSMLR1_36V: [527.9, 273.0, 177.4, 126.8, 94.7, 74.7, 61.1, 51.3, 44.0, 38.3],
            SMALLR1A0PI_3_BPSMLR1_36V: [886.0, 463.5, 301.2, 215.2, 160.8, 126.8, 103.7, 87.1, 74.7, 65.1],
            SMALLR1A0PI_4_BPSMLR1_36V: [1289.8, 674.7, 438.5, 313.3, 234.1, 184.6, 150.9, 126.8, 108.7, 94.7],
            SMALLR1A0PI_5_BPSMLR1_36V: [1725.9, 902.8, 586.7, 419.2, 313.3, 246.9, 201.9, 169.6, 145.5, 126.8]
        }

        let objNames = {
            SMALLR1A5I: 'SMALLR1A5I',
            SMALLR1A5I_BPSMLR1_24V: 'SMALLR1A5I + BPSMLR1-24V',
            SMALLR1A0PI_2_BPSMLR1_36V: 'SMALLR1A0PI + 2 х BPSMLR1-36V',
            SMALLR1A0PI_3_BPSMLR1_36V: 'SMALLR1A0PI + 3 х BPSMLR1-36V',
            SMALLR1A0PI_4_BPSMLR1_36V: 'SMALLR1A0PI + 4 х BPSMLR1-36V',
            SMALLR1A0PI_5_BPSMLR1_36V: 'SMALLR1A0PI + 5 х BPSMLR1-36V'
        }

        let objcolorLines = {
            SMALLR1A5I: 'orange',
            SMALLR1A5I_BPSMLR1_24V: 'teal',
            SMALLR1A0PI_2_BPSMLR1_36V: 'green',
            SMALLR1A0PI_3_BPSMLR1_36V: 'red',
            SMALLR1A0PI_4_BPSMLR1_36V: 'blue',
            SMALLR1A0PI_5_BPSMLR1_36V: 'purple'
        }

        resObj.name = name
        resObj.fullName = objNames[name]
        resObj.valueArr = objValues[name]
        resObj.color = objcolorLines[name]


        return resObj


    }

}

function createObjUpsArr(name) {

    let arrRes = []



    let nameArr = {
        SMALLR1: ['SMALLR1A5I', 'SMALLR1A5I_BPSMLR1_24V', 'SMALLR1A0PI_2_BPSMLR1_36V', 'SMALLR1A0PI_3_BPSMLR1_36V', 'SMALLR1A0PI_4_BPSMLR1_36V', 'SMALLR1A0PI_5_BPSMLR1_36V']
    }

    nameArr[name].forEach(item => arrRes.push(new objUps(item)))


    console.log(nameArr)

    return arrRes

}


f()


