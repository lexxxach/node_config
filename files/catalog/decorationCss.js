function decorationMenu() {
    let elem = document.querySelector('.menu')
    let elemCollectionMenu = elem.querySelectorAll('.menu li')

    /* 
       console.log(window.location.pathname)
        */

    for (let elemMenu of elemCollectionMenu) {

        let url = new URL(elemMenu.querySelector('a').href)
        
      //  if (!elemMenu.querySelector('a').href.includes(window.location.pathname)) {
        if (url.pathname!=(window.location.pathname)) {

           
            elemMenu.classList.remove('menuActive')


        } else {
            console.log(elemMenu.href)
            elemMenu.classList.add('menuActive')

        }

    }


}

decorationMenu()