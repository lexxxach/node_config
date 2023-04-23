function setParams(){

  /*  navigator.geolocation.getCurrentPosition(()=>{
      alert(111)  
    }) */

    
    /* console.log(navigator.geolocation.getCurrentPosition(()=>{
        
    })) */
    //console.log(navigator.oscpu)

    let elMenu = document.querySelector('.menu')
   // console.log(elMenu)
    
     
    if(!elMenu) return

    for (const elem of elMenu.querySelectorAll('a')) {

        elem.addEventListener('click',()=>{

            


           // alert(navigator.geolocation)

        })
        
    }


}

setParams()