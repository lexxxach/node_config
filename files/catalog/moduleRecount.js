

function elemContent() {
    return `
    <label for="fileRecount">Загрузка файла:</label>
<input type="file" name="fileRecount" id="fileRecount" accept = ".txt">
<input type="button" name="btnRecount" value="Пересчитать">

`
}

function elemDoc() {
    let elemDoc = document.createElement('div')
    elemDoc.setAttribute('name', 'divCount')
    elemDoc.innerHTML = elemContent()

    let btnRecount = elemDoc.querySelector("[name = 'btnRecount']")
    console.log(elemDoc)
    btnRecount.addEventListener('click', () => {

        let fileRead = new FileReader()
        let fileFromList = elemDoc.querySelector("[name = 'fileRecount']").files[0]
        console.log(fileFromList)

        let res = fileRead.readAsText(fileFromList)

        fileRead.addEventListener('load', () => {

            console.log(fileRead.result)

            let arrAert = fileRead.result.replace(/\r/g, '').toUpperCase().split('\n')
            let resArr = arrAert.map(element => element.replace(/\s/g, ''));

            console.log(JSON.stringify(resArr))



            fetch('/recountModule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(resArr)
            })
                .then(resp => resp.json())
                .then(resp => {
                    import('./tableModuleCopy.js').then((TableResult1) => {

                        let elemBody = document.querySelector("[name='content']")


                        console.log('JSON.stringify(resp)')
                        console.log(JSON.stringify(resp))

                        let elemTable = new TableResult1.default('/recountTable', resp).elem

                        let currentElemTAble = document.querySelector('table')
                        if (currentElemTAble) currentElemTAble.remove()

                        elemBody.textContent.replace('{content}', '')

                        let elTd = elemTable.querySelector('td')
                        elTd.style.width = '15%'

                        elemBody.append(elemTable)


                        manageHideBtnDld(elemBody)


                    }).then((resp) => {
                        let elemBody = document.querySelector("[name='content']")
                        manageHideBtnDld(elemBody)
                    })



                })

               function manageHideBtnDld(elemBody) {
                    if (elemBody) {
                        let btnDld = document.querySelector('#btnDnld')
                        btnDld.removeAttribute('hidden')
                    }
                }

        })




    })

    return elemDoc

}

export { elemDoc }