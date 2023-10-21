export function elemPowerPduModule(){
    let elem = `
    <label for="брпТип">Тип PDU:</label>

            <select name="брпТип">
                <option value="19" selected>горизонтальный</option>
                <option value="V">вертикальный</option>
            </select>

            <label for="outPdu">Выходной разъем:</label>
            
            <select name="outPdu">
                <option value="SH" selected>Shuko</option>
                <option value="IEC">С13</option>
                <option value="C19">C19</option>
                
                
            </select>

        
            <span></span>
            <div>
                <input type="button" id="btn" name="btnPowerPDU" value="Подбор">
            </div>
            <div>
                Количество, шт <input type="number" name="quantity" value="1">
            </div>
    
    
    `
    return elem
}

