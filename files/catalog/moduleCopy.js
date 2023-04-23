
import Toast from './moduleToast.js'

export default class CopyContent {
    constructor(textContent) {
        this.elem = this.#render(textContent)
    }
    #render(textContent) {

        let elem = document.createElement('span')
        elem.setAttribute('name', 'copyLable')

        elem.innerHTML = `
        
        <a href="#!">
        <img src="./files/catalog/img/copyContent.png" alt="" style="height: 20 px; width: 20px; padding: 0px; marging: 0px">
        </a>
        `

        elem.addEventListener('click', () => {

            let currentToast = document.querySelector("[name='toast']")
            if (currentToast) currentToast.remove()

            let elemToast = new Toast('Скопировано').elem
            setTimeout(() => elemToast.classList.add('toastDisp'), 50)
            document.body.append(elemToast)

            setTimeout(() => elemToast.classList.remove('toastDisp'), 1000)

            let textArea = document.createElement("textarea");
            textArea.value = textContent;
            textArea.style.position = "fixed";  //avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            let successful = document.execCommand('copy');

            document.body.removeChild(textArea)

        })

        return elem

    }
}