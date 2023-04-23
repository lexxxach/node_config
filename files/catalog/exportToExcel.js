export default function exportToExcel(tableID,filename){
    //alert(123)
    let downloadurl
    let dataFileType = 'application/csv;charset=utf-8';
    //let tableSelect = document.getElementById(tableID);
    let tableSelect = document.querySelector('TABLE');
    let tableHTMLData = tableSelect.outerHTML.replace(/ /g, '%20');
    //let tableHTMLData = tableSelect.outerHTML
    //alert(tableHTMLData)
    
    // Определение имени файла
    filename = filename?filename+'.csv':'export_excel_data.xls';
    
    // Создание ссылки на скачивание
    downloadurl = document.createElement("a");
    
    document.body.appendChild(downloadurl);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTMLData], {
            type: dataFileType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Создание ссылки на файл
        downloadurl.href = 'data:' + dataFileType + ', ' + tableHTMLData;
        alert('data:' + dataFileType + ', ' + tableHTMLData)
    
        // Установка имени файла
        downloadurl.download = filename;
        
        //вызов функции
        downloadurl.click();
    }
}