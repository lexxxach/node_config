export default class Toast {
    constructor(textContent) {
        this.elem = this.#render(textContent)
    }
    #render(textContent) {
        let elem = document.createElement('div')
        elem.classList.add('toast')
        elem.setAttribute('name','toast')
        elem.innerHTML =
            `
         <div>
        <span>${textContent}</span>
        </div>
        `
        return elem
    }
}