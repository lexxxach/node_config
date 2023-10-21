
export function removeTableCommand() {
    if (document.querySelector('table')) document.querySelector('table').remove()
    let eldnLdBn = document.querySelector('#btnDnld')
    if (eldnLdBn) eldnLdBn.setAttribute('hidden', '')
    console.log(eldnLdBn)
}