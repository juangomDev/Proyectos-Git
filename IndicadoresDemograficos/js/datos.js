
import * as sheetjs from 'https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js'


export async function n(xlsx_) {

    const response = await fetch(xlsx_)
    const file = await response.arrayBuffer()

    const workbook = XLSX.read(file);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    return await XLSX.utils.sheet_to_json(worksheet, { header: "A", blankrows: true });

}

export function get_excel_data(row, data) {
    let info = []

    !row[0] ? row = data.length : row = row.length

    for (let rowf = 0; rowf < row; rowf++) {

        if ( !!data[rowf]["A"] && !!data[rowf]["B"]) {

            info.push({
                row: rowf,
                ubigeo: data[rowf]["A"],
                name: data[rowf]["B"]
            })
        }
    }

    return info
}



// 