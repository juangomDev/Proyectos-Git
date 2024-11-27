let excel_Pobrez = {}
// ubigeo level variables
let total = 0,
    pobres = 0,
    noPobres = 0,
    pobresNoExtremos = 0,
    pobresExtremos = 0

let asistenciaEscolar = 0,
    hacinamiento = 0,
    viviendasInadecuadas = 0,
    viviendasServicio = 0,
    dependencia = 0

let edad_0_4 = 0,
    edad_5_64 = 0,
    edad_65 = 0,
    edades_total = 0


let edad = {
    h: [],
    m: []
}

// Linea 45 y 88

const form_header = document.querySelector("#form-header");
const pointer_text = document.querySelector("#pointer-text");

let option = "";

let select_value = [];

let state_select = "";
let label_municipality = "";
let municipality_select = "";
let label_parish = "";
let parish_select = "";

// datos

let chart_grafh

const ndp = document.querySelectorAll(".ndp")
let nivele_de_pobreza = 0,
    nameLabel = ["Total", "Pobres", "No pobres", "Pobres no extremos", "Pobres extremos"]


let DATA_STATE, data_excel;

 fetch("POBREZA.xlsx")
.then(response => response.arrayBuffer())
.then(file => {
    const workbook = XLSX.read(file);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    excel_Pobrez = XLSX.utils.sheet_to_json(worksheet, { header: "A" });

    return fetch("ubigeo.json");
})
.then(response => response.json())
.then(ubigeo => {
    DATA_STATE = ubigeo
    main(ubigeo);
    datospiramide()
})   

fetch("edades.xlsx")
.then(response => response.arrayBuffer())
.then(file => {
    const workbook = XLSX.read(file);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    excel_Edades = XLSX.utils.sheet_to_json(worksheet, { header: "A" });
})

// if (window.Worker) {
//     const worker = new Worker('./worker.js')
//     worker.postMessage("hola")
// }


function main(ubigeo) {
    const total_excel_data = getExcelData();
    // console.log(total_excel_data,);
    // setChart("total-chart", total_excel_data);

    state_select = document.querySelector("#state-select");

    const estados = ubigeo["Estados"];

    for (let i = 0; i < estados.length; i++) {
        let option = document.createElement("option");
        option.text = estados[i].Nombre;
        option.value = formatTwoDigits(i);

        state_select.appendChild(option);
    }

    // Remove this to init the chart with the event dispather
    let excel_data = getExcelData();
    const state_chart = setChart("state-chart", excel_data);
    chart_grafh = state_chart

    ndp[0].addEventListener("click", () => {
        menu_chart(false)
        nivele_de_pobreza = 0
        nameLabel = ["Total", "Pobres", "No pobres", "Pobres no extremos", "Pobres extremos"]
        data = []
        data.push(total, pobres, noPobres, pobresNoExtremos, pobresExtremos);
        changeData(state_chart, data);
    })
    
    ndp[1].addEventListener("click", () => {
        menu_chart(false)
        nivele_de_pobreza = 1
        nameLabel = ["Asistencia escolar", "Hacinamiento", "Viviendas inadecuadas", "Viviendas sin servicio", "Dependencia"]
        data = []
        data.push(asistenciaEscolar, hacinamiento, viviendasInadecuadas, viviendasServicio, dependencia);

        changeData(state_chart, data);
    })

    ndp[2].addEventListener("click", () => {
        menu_chart(false)
        nivele_de_pobreza = 2

        nameLabel = ["Edades 0-14", "Edades 15-64", "Edades 65 y más"]
        data = []
        data.push(edad_0_4, edad_5_64, edad_65);

        changeData(state_chart, data);
    })

    ndp[3].addEventListener("click", () => {
        menu_chart(true)
    })



    state_select.addEventListener('change', (e) => {

        if(parish_select) {
            form_header.removeChild(label_parish);
            form_header.removeChild(parish_select);
            parish_select = "";
        }

        select_value = getExcelData(e.target.value);

        console.log(e.target.value);

        changeData(state_chart, select_value);

        municipality_select = document.querySelector('#municipality-select');
        label_municipality = document.querySelector('#municipality-label');

        if (municipality_select) {
            form_header.removeChild(municipality_select);
            form_header.removeChild(label_municipality);
        }

        label_municipality = document.createElement("label");
        label_municipality.textContent = 'Municipio';
        label_municipality.id = 'municipality-label'


        municipality_select = document.createElement("select");
        municipality_select.id = "municipality-select"

        insertAfter(state_select, label_municipality);
        insertAfter(label_municipality, municipality_select);

        const selected_state = Number(e.target.value) ;
        const municipios = estados[selected_state]['Municipios'];


        option = document.createElement("option");
        option.text = "Total del estado";
        option.value = "state";
        municipality_select.appendChild(option);

        for (let i = 0; i < municipios.length; i++) {
            option = document.createElement("option");
            option.text = municipios[i ].Nombre;
            option.value = e.target.value + formatTwoDigits(i + 1);
            // Insert next to state
            municipality_select.appendChild(option);

        }

        pointer_text.innerHTML = state_select.options[state_select.selectedIndex].text;

        setMunicipalityListener(state_chart, municipios);
    });

    // state_select.dispatchEvent(new Event("change"));
}


function getExcelData(ubigeo = '', level = 0) {

    let data = [];
    total = 0
    pobres = 0
    noPobres = 0
    pobresNoExtremos = 0
    pobresExtremos = 0
    // por variable
    asistenciaEscolar = 0
    hacinamiento = 0
    viviendasInadecuadas = 0
    viviendasServicio = 0
    dependencia = 0
    // por edades 
    edad_0_4 = 0
    edad_5_64 = 0
    edad_65 = 0
    edades_total = 0
    edad.h = []
    edad.m = []
    ge_r(ge)
    ge_r(gef)
    
    
    if (!ubigeo || ubigeo == "00") {
        total = excel_Pobrez[3]["E"];
        pobres = excel_Pobrez[3]["F"];
        noPobres = excel_Pobrez[3]["G"];
        pobresNoExtremos = excel_Pobrez[3]["H"];
        pobresExtremos = excel_Pobrez[3]["I"];
        ///
        asistenciaEscolar = excel_Pobrez[3]["J"];
        hacinamiento = excel_Pobrez[3]["K"];
        viviendasInadecuadas = excel_Pobrez[3]["L"];
        viviendasServicio = excel_Pobrez[3]["M"];
        dependencia = excel_Pobrez[3]["N"];


        edades_suma()

    } else {
        for (let i = 5; i < excel_Pobrez.length; i++) {
            setUbigeoLevelVariables(i, ubigeo, level);
        }
        total = Math.round(total);
        pobres = Math.round(pobres);
        noPobres = Math.round(noPobres);
        pobresNoExtremos = Math.round(pobresNoExtremos);
        pobresExtremos = Math.round(pobresExtremos);
        ////
        asistenciaEscolar = Math.round(asistenciaEscolar);
        hacinamiento = Math.round(hacinamiento);
        viviendasInadecuadas = Math.round(viviendasInadecuadas);
        viviendasServicio = Math.round(viviendasServicio);
        dependencia  = Math.round(dependencia);

        // ////
        edad_0_4 = Math.round(edad_0_4)
        edad_5_64 = Math.round(edad_5_64)
        edad_65 = Math.round(edad_65)

        // 
        Object.keys(ge).map( x => {
            let hombre = ( ge[x] * 100) / edades_total
            let mujer =  ( gef[x] * 100) / edades_total
    
            edad.h.push(  hombre.toFixed(1) )
            edad.m.push(  mujer.toFixed(1) )
    
        })


    }

    if (nivele_de_pobreza == 0) {
        data.push(total, pobres, noPobres, pobresNoExtremos, pobresExtremos);
    } else if(nivele_de_pobreza == 1){
        data.push(asistenciaEscolar, hacinamiento, viviendasInadecuadas, viviendasServicio, dependencia);
    }else{
        data.push(edad_0_4, edad_5_64, edad_65)
    }
    datospiramide()
    
    
    return data;
}

function setChart(id, data) {
    return new Chart(id, {
        type: 'bar',
        data: {
            labels: [...nameLabel],
            datasets: [{
                label: false,
                data: data,
                borderWidth: 1,
                backgroundColor: ['green', 'blue', 'orange', 'red', 'orange', 'red']
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

function formatTwoDigits(number) {
    return String(number).padStart(2, '0')
}

function getUbigeoCode(string, level) {

    if (string == null) {
        return string;
    }

    switch (level) {
        case 0:
            return string.slice(0, 2);
        case 1:
            return string.slice(0, 4);
        case 2:
            return string.slice(0, 6);
    }
}

function changeData(chart, data) {
    // console.log(data);
    chart.data.datasets[0].data = data;
    chart.data.labels = nameLabel;
    chart.update();
}

function setMunicipalityListener(municipality_chart, municipios) {

    municipality_select.addEventListener('change', (e) => {

        if (e.target.value == "state") {
            state_select.dispatchEvent(new Event("change"));
            return;
        }

        // Get municipality data
        select_value = getExcelData(e.target.value, 1);
        changeData(municipality_chart, select_value);

        parish_select = document.querySelector('#parish-select');
        label_parish = document.querySelector('#parish-label');

        if (parish_select) {
            form_header.removeChild(parish_select);
            form_header.removeChild(label_parish);
        }

        label_parish = document.createElement("label");
        label_parish.textContent = 'Parroquia';
        label_parish.id = 'parish-label'

        parish_select = document.createElement("select");
        parish_select.id = "parish-select";

        insertAfter(municipality_select, label_parish);
        insertAfter(label_parish, parish_select);

        const selected_municipality = Number(e.target.value.slice(2, 4)) - 1;
        const parroquias = municipios[selected_municipality]['Parroquias'];


        option = document.createElement("option");
        option.text = "Total del municipio";
        option.value = "municipality";
        parish_select.appendChild(option);

        for (let i = 0; i < parroquias.length; i++) {
            option = document.createElement("option");
            option.text = parroquias[i].Nombre;
            option.value = e.target.value + formatTwoDigits(i + 1);

            parish_select.appendChild(option);

        }

        pointer_text.innerHTML = municipality_select.options[municipality_select.selectedIndex].text;

        setParishListener(municipality_chart);
    });
}

function setUbigeoLevelVariables(i, ubigeo, level) {

    const current_ubigeo = getUbigeoCode(excel_Pobrez[i]["A"], level);

    if (current_ubigeo == ubigeo) {
        total += excel_Pobrez[i]["E"];
        pobres += excel_Pobrez[i]["F"];
        noPobres += excel_Pobrez[i]["G"];
        pobresNoExtremos += excel_Pobrez[i]["H"];
        pobresExtremos += excel_Pobrez[i]["I"];

        asistenciaEscolar += excel_Pobrez[i]["J"]
        hacinamiento += excel_Pobrez[i]["K"]
        viviendasInadecuadas += excel_Pobrez[i]["L"]
        viviendasServicio += excel_Pobrez[i]["M"]
        dependencia += excel_Pobrez[i]["N"]

        edades_suma(i)
        
    }
}

function setParishListener(parish_chart) {
    parish_select.addEventListener('change', (e) => {
        
        if (e.target.value == "municipality") {
            municipality_select.dispatchEvent(new Event("change"));
            return;
        }

        select_value = getExcelData(e.target.value, 2);
        changeData(parish_chart, select_value);

        pointer_text.innerHTML = parish_select.options[parish_select.selectedIndex].text;

    });

}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


function edades_suma(value = 3) {

    const ne = (l) => {return excel_Edades[value][l]};

    edades_total += ne("F")
     
    edad_0_4 += ( ne("G") + ne("H") + ne("I") ) ;

    edad_5_64 += ( ne("J") + ne("K") + ne("L") + ne("M") + ne("N") + ne("O") + ne("P") + ne("Q") + ne("R") + ne("S") )

    edad_65 += ( ne("T") + ne("U") + ne("V") + ne("W") + ne("X") + ne("Y") + ne("Z") )


 
    let letra =  ["AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU"]
    let letra2 = ["AW","AX","AY","AZ","BA","BB","BC","BD","BE","BF","BG","BH","BI","BJ","BK","BL","BM","BN","BO","BP"]
    
    grupo_edad(ge, letra, value)
    grupo_edad(gef, letra2, value)
    
    if (value === 3) {
        for (let r = 0; r < letra.length; r++) {

            let hombre = ( excel_Edades[value][letra[r]] * 100) / edades_total
            let mujer =  ( excel_Edades[value][letra2[r]] * 100) / edades_total

            edad.h.push(  hombre.toFixed(1) )
            edad.m.push(  mujer.toFixed(1)   )

        }
    }
    

}

function grupo_edad(gel, value, number) {
    const ne = (l) => {return excel_Edades[number][l]}

    gel.n0_4   += ne(value[0])
    gel.n5_9   += ne(value[1])
    gel.n10_14 += ne(value[2])
    gel.n15_19 += ne(value[3])
    gel.n20_24 += ne(value[4])
    gel.n25_29 += ne(value[5])
    gel.n30_34 += ne(value[6])
    gel.n35_39 += ne(value[7])
    gel.n40_44 += ne(value[8])
    gel.n45_49 += ne(value[9])
    gel.n50_54 += ne(value[10])
    gel.n55_59 += ne(value[11])
    gel.n60_64 += ne(value[12])
    gel.n65_69 += ne(value[13])
    gel.n70_74 += ne(value[14])
    gel.n75_79 += ne(value[15])
    gel.n80_84 += ne(value[16])
    gel.n85_89 += ne(value[17])
    gel.n90_94 += ne(value[18])
    gel.n95    += ne(value[19])
}

let ge = {
    n0_4: 0, 
    n5_9: 0,
    n10_14: 0, 
    n15_19: 0, 
    n20_24: 0, 
    n25_29: 0, 
    n30_34: 0, 
    n35_39: 0,
    n40_44: 0, 
    n45_49: 0, 
    n50_54: 0, 
    n55_59: 0, 
    n60_64: 0, 
    n65_69: 0, 
    n70_74: 0, 
    n75_79: 0, 
    n80_84: 0, 
    n85_89: 0, 
    n90_94: 0,
    n95: 0
}

let gef = {
    n0_4: 0, 
    n5_9: 0,
    n10_14: 0, 
    n15_19: 0, 
    n20_24: 0, 
    n25_29: 0, 
    n30_34: 0, 
    n35_39: 0,
    n40_44: 0, 
    n45_49: 0, 
    n50_54: 0, 
    n55_59: 0, 
    n60_64: 0, 
    n65_69: 0, 
    n70_74: 0, 
    n75_79: 0, 
    n80_84: 0, 
    n85_89: 0, 
    n90_94: 0,
    n95: 0
}

function ge_r(gel) {
    gel.n0_4   = 0
    gel.n5_9   = 0
    gel.n10_14 = 0
    gel.n15_19 = 0
    gel.n20_24 = 0
    gel.n25_29 = 0
    gel.n30_34 = 0
    gel.n35_39 = 0
    gel.n40_44 = 0
    gel.n45_49 = 0
    gel.n50_54 = 0
    gel.n55_59 = 0
    gel.n60_64 = 0
    gel.n65_69 = 0
    gel.n70_74 = 0
    gel.n75_79 = 0
    gel.n80_84 = 0
    gel.n85_89 = 0
    gel.n90_94 = 0
    gel.n95    = 0
}