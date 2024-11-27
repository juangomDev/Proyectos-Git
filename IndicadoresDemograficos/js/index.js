// import * as menu from './menu.js'
import * as excelDatos from './datos.js'
import * as chart from "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"

let data
let grafph
let var_key = "C"

const variable = [
    {name: "Densidad de Población (Hab./Km2)", ubigeo: "C" }, 
    {name:"Razón de Dependencia Demográfica Total (RDD)", ubigeo:"D" },
    {name:"Razón de Dependencia Demográfica Menor de 15 Años", ubigeo:"E" },
    {name:"Razón de Dependencia Demográfica Mayor de 64 Años", ubigeo:"F" },
    {name:"Índice de Masculinidad", ubigeo:"G" },
    {name:"Índice de Envejecimiento de la Población", ubigeo:"H" },
    {name:"Razón de Apoyo a los Padres", ubigeo:"I" }
]

let estados
let muni, municipios
let parr, parroquia
let current_state = "00"
const c = document.querySelector(".browse")
const canvas = document.querySelector(".mycanvas")

let nameLabel = []


function Newlabels(labelText, options, callback) {
    const label = document.createElement("label");
    label.className = "browse-menu";
    label.textContent = labelText;

    const select = document.createElement("select");
    select.innerHTML = "Hello";
    select.onchange = (e) => callback(e)
    select.style.borderRadius = "4px";

    options.forEach(element => {
        const optionElement = document.createElement('option');
        optionElement.value = element.ubigeo
        optionElement.textContent = element.name;
        select.appendChild(optionElement);
    });

    label.appendChild(select)
    c.appendChild(label)
    return label

}

function anloadData() {

    if (current_state == "00") {
        nameLabel = estados.map( x => x.name)
        let data_chart = estados.map( x => data[x.row][var_key] )

        changeData(grafph, data_chart)
    }

    const currentMuni = municipios.filter(x => x.ubigeo.slice(0, 2) == current_state)

    if (!!currentMuni[0]) {
        // muni = Newlabels("Municipio", currentMuni, choise_2)

        if (current_state == "01" || current_state == "22") {
            const current = parroquia.filter(x => x.ubigeo.slice(0, 4) == current_state + "01")
            // parr = Newlabels("Parroquia", current, (e) => { console.log(e.target.value) })

            nameLabel = current.map( x => x.name)
            let data_chart = current.map( x => data[x.row][var_key])

            changeData(grafph, data_chart)
            return
        }

        
        
        nameLabel = currentMuni.map( x => x.name)
        let data_chart = currentMuni.map( x => data[x.row][var_key])

        changeData(grafph, data_chart)
        
    }
    
}

function choise(e) {
    console.log(e.target.value);
    // const currentMuni = municipios.filter(x => x.ubigeo.slice(0, 2) == e.target.value)

    current_state = e.target.value

    if (!!muni) {
        remover(muni)
        muni = false
    }
    if (!!parr) {
        remover(parr)
        parr = false
    }
    
    
        anloadData()
    
}

function choise_2(e) {
    console.log(e);

    var_key = e.target.value

    let num = 0
    if(var_key == "C") num = 0
    if(var_key == "D") num = 1
    if(var_key == "E") num = 2
    if(var_key == "F") num = 3
    if(var_key == "G") num = 4
    if(var_key == "H") num = 5
    if(var_key == "I") num = 6

    document.querySelector(".subtitle").innerHTML = e.target[num].innerHTML

    anloadData()
}

// const www = Newlabels("Estados", datos, choise)


function remover(v) {
    return c.removeChild(v)
}




excelDatos.n("./datos/INDICADORES ESTIMADOS FOLLETO.xlsx")
    .then(res => {
        data = res
        let datos_excel = excelDatos.get_excel_data("", res)

        estados = datos_excel.filter(e => e.ubigeo.length == 2)
        municipios = datos_excel.filter(e => e.ubigeo.length == 4)
        parroquia = datos_excel.filter(e => e.ubigeo.length == 6)

        const www = Newlabels("Entidad Federal", estados, choise)
        const variables = Newlabels("Indicadores", variable, choise_2)

        console.log(municipios[30].ubigeo.slice(0, 2));

        let currentMuni = municipios.filter(x => x.ubigeo.slice(0, 2) == current_state)
        let currentP = parroquia.filter(x => x.ubigeo.slice(0, 4) == current_state + "01")

        // console.log(estados);
        // console.log(municipios);
        // console.log(parroquia);

        // console.log(currentMuni);
        console.log(currentP);

        estados.splice(0, 1)
        nameLabel = estados.map( x => x.name)
        let data_chart = estados.map( x => res[x.row]["C"])

        grafph = setChart(canvas, data_chart)
    })



function setChart(id, data) {
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

function changeData(chart, data) {
    // console.log(data);
    chart.data.datasets[0].data = data;
    chart.data.labels = nameLabel;
    chart.update();
}