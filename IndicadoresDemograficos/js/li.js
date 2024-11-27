import * as chart from "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"
import * as sheetjs from 'https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js'

// grafica
export function setChart(id, data) {
    return new Chart(id, {
        type: 'bar',
        data: {
            labels: [...nameLabel],
            datasets: [{
                label: false,
                data: data,
                borderWidth: 1,
                backgroundColor: ['green', 'blue', 'orange', 'red', 'orange', 'red','green', 'blue', 'orange', 'red', 'orange', 'red','green', 'blue', 'orange', 'red', 'orange', 'red','green', 'blue', 'orange', 'red', 'orange', 'red']
            }]
        },
        options: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            legend: {
                display: false
            }
        }
    });
}

export function changeData(chart, data, nameLabel) {
    chart.data.datasets[0].data = data;
    chart.data.labels = nameLabel;
    chart.update();
}

// datos

export async function ReadExcel(xlsx_) {

    const response = await fetch(xlsx_)
    const file = await response.arrayBuffer()

    const workbook = XLSX.read(file);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    return await XLSX.utils.sheet_to_json(worksheet, { header: "A", blankrows: true });

}

export const GetExcelData = {

    row: (row, column, data) => {
        if ( typeof column != 'string' ) return console.log("dato de columna no valido");
        if ( typeof row[0] == 'number' ) return row.map( x => data[x][column] ); 
        else console.log("dato de fila no valido");
    },

    column: (row, column, data) => {
        if ( typeof row != 'number' ) return console.log("dato de fila no valido");
        if ( typeof column[0] == 'string' ) return column.map( x => data[row][x] ); 
        else console.log("dato de columna no valido");
    },

    search: (key, column, data) => {
        if ( typeof key[0] != 'string' ) return console.log("dato de key no valido");
        if ( typeof column != 'string' ) return console.log("dato de columna no valido");
        if ( key.length == column.length ) return console.log("clave valor no iguales");

        let datos = []
        for (let R = 0; R < data.length; R++) {
            let opject = {}

            opject.row = R
            key.map( (x, n) => opject[x] = data[ R ][ column[n] ] )
            datos.push(opject)
        }

        return datos
    }

}

export function get_excel_data_row(row, column, data) {

    if ( typeof column != 'string' ) return console.log("dato de columna no valido");
    if ( typeof row[0] == 'number' ) return row.map( x => data[x][column] ); 
    else console.log("dato de fila no valido");
    
}

export function get_excel_data_column(row, column, data) {

    
}

// 