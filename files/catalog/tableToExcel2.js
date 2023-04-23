function tableToExcel2(){
    var table2excel = new Table2Excel();

    let elemTable = document.querySelectorAll('table')
   /*  for (const elem of elemTable) {
        alert(111) */
        table2excel.export(elem,'Таблица');    
    /* } */

    
}