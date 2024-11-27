
const search = document.querySelector("#search-text")
const list_o = document.querySelectorAll(".option_list")

let state_value = 0
let muni_value = 0


let Estados_list = []
let Municipios_list = []
let Parroquias_list = []

let display_search = []

const search_length = 10;

// Estado Nombre

function search_obigeo(d_ubigeo, estado, number) {
    d_ubigeo.find( (e, index) => {
        number = index 
        return e.Nombre == estado
    })

    return number
}


function Search(array, newArray, value, estado = '', muni = '') {
    newArray = []

    for (let i = 0; i < array.length; i++) {
        if (newArray.length == search_length) break
        if (array[i].Nombre.toLowerCase().includes(value.toLowerCase())) {

            state_value = search_obigeo( DATA_STATE.Estados, estado)
            muni_value = search_obigeo( DATA_STATE.Estados[state_value].Municipios, muni)

            let codigo_ubigeo 

            if (estado == "" && muni == "") {
                codigo_ubigeo = formatTwoDigits(i)
            }else if( muni == "" ) {
                codigo_ubigeo = formatTwoDigits(state_value) + formatTwoDigits(i + 1)
            }else{
                codigo_ubigeo =  formatTwoDigits(state_value) + formatTwoDigits(muni_value + 1) + formatTwoDigits(i + 1)
            }

            newArray.push([array[i].Nombre, estado, codigo_ubigeo]);
        }
    }
    return newArray
}

function global_Search(s_search, value) {
    display_search = []

    let number_m = 1
    let number_p = 0

    const topics = [
        DATA_STATE.Estados,
        DATA_STATE.Estados[number_m].Municipios,
        DATA_STATE.Estados[number_m].Municipios[number_p].Parroquias
    ]


    Estados_list = Search(topics[0], s_search, value)
    !!Estados_list.length ? display_search = display_search.concat(Estados_list) : false
    if (display_search.length == search_length) return display_search

    for (let e = 1; e < topics[0].length; e++) {
        if (display_search.length == search_length) break

        number_m = e
        topics[1] = DATA_STATE.Estados[number_m].Municipios

        Municipios_list = Search(topics[1], s_search, value, DATA_STATE.Estados[number_m].Nombre)
        // console.log(Municipios_list);

        !!Municipios_list.length ? display_search = display_search.concat(Municipios_list) : false

        for (let p = 0; p < topics[1].length; p++) {
            if (display_search.length == search_length) break

            number_p = p
            topics[2] = DATA_STATE.Estados[number_m].Municipios[number_p].Parroquias

            Parroquias_list = Search(
                topics[2], s_search, 
                value, 
                DATA_STATE.Estados[number_m].Nombre,
                DATA_STATE.Estados[number_m].Municipios[number_p].Nombre
            )

            !!Parroquias_list.length ? display_search = display_search.concat(Parroquias_list) : false
        }
    }



    return display_search
}


search.addEventListener("keyup", e => {
    global_Search(display_search, e.target.value)


    for (let i = 0; i < search_length; i++) {
        if (!!display_search[i]) {

            list_o[i].style.display = "block"
            
            list_o[i].innerHTML = display_search[i][0] + '; ' + display_search[i][1]

            list_o[i].lang = display_search[i][2]

            // console.log(display_search[i][2]);
        }else{
            list_o[i].style.display = "none"
            list_o[i].innerHTML = ""
            list_o[i].lang = ""
        }

        
    }

    sino = false
    
})




Array.from(list_o).map( x => {

    x.addEventListener("click", e => {

        search.value = x.innerHTML

        pointer_text.innerHTML = x.innerHTML
        
        if (e.target.lang.length == 6) {
            select_value = getExcelData(e.target.lang, 2);
        }else if(e.target.lang.length == 4) {
            select_value = getExcelData(e.target.lang, 1);
        }else{
            select_value = getExcelData(e.target.lang);
        }

        changeData(chart_grafh, select_value);
        datospiramide()


    })
    
})




// 
let sino = true
document.querySelector("#header").addEventListener("click", e => {
    if(sino == true) return sino = false
    for (let i = 0; i < search_length; i++) {
        list_o[i].style.display = "none"
    }
    sino = true
})

search.addEventListener("click", e => {
    for (let i = 0; i < search_length; i++) {
        if (!!display_search[i]) {
            list_o[i].style.display = "block"
        }
    }
})
