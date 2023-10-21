//кнопки выбора
function arrayProp(command){
    let objProps = new ComandObjProps(command)
    return objProps.arrBtnBot
}

class ComandObjProps {
    constructor(comandName){
        this.arrBtnBot = this.#arrProp(comandName)
        
    }
    #arrProp(comandName){
        
        if(comandName==='/selection'){
            return [
                [{text:'Медный кабель Витая пара',callback_data:'selectCableCu'}],
                [{text:'Оптический кабель',callback_data:'selectCableFi'}],
                [{text:'Патч-панель',callback_data:'selectPPCu'}],
                [{text:'Оптические кроссы',callback_data:'selectPPFi'}],
                [{text:'Патч-корд Медь',callback_data:'selectPCordCu'}],
                [{text:'Патч-корд Оптика',callback_data:'selectPCordFi'}]
              ]
        }

        if(comandName==='selectCableCu'){
            return[
                [{text:'5E',callback_data:'5E'}],
                [{text:'6',callback_data:'6'}],
                [{text:'6A',callback_data:'6A'}],
            ]
        }
        if(comandName==='selectCableFi'){
            return[
                [{text:'OS2',callback_data:'OS2'}],
                [{text:'OM2',callback_data:'OM2'}],
                [{text:'OM3',callback_data:'OM3'}],
                [{text:'OM4',callback_data:'OM4'}],
            ]
        }
        if(comandName==='selectPPCu'){
            return[
                [{text:'5E',callback_data:'PP5E'}],
                [{text:'6',callback_data:'PP6'}],
                [{text:'6A',callback_data:'PP6A'}],
            ]
        }
        if(comandName==='selectPPCu'){
            return[
                [{text:'5E',callback_data:'PC5E'}],
                [{text:'6',callback_data:'PC6'}],
                [{text:'6A',callback_data:'PC6A'}],
            ]
        }
        if(comandName==='selectPCordFi'){
            return[
                [{text:'OS2',callback_data:'PCOS2'}],
                [{text:'OM2',callback_data:'PCOM2'}],
                [{text:'OM3',callback_data:'PCOM3'}],
                [{text:'OM4',callback_data:'PCOM4'}],
            ]
        }
        

        return undefined
    }

    
}


module.exports.btnsConfig = arrayProp

