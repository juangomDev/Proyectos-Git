const canvas = document.querySelector(".myCanvas");
const ctx = canvas.getContext("2d");

// variables
const size_canvas = {
    ancho: 6000,
    alto: 5000
}

let pyramid_levels = 0

const edades = [
    "0 - 4", "5 - 9", "10 - 14", "15 - 19", "20 - 24", "25 - 29", "30 - 34", "35 - 39","40 - 44", "45 - 49", 
    "50 - 54", "55 - 59", "60 - 64", "65 - 69", "70 - 74", "75 - 79", "80 - 84", "85 - 89", "90 - 94", "95 y +"
]

function floor_pyramid(levels, datos) {

    const w = size_canvas.ancho/2 // El medio del canvas 
    const h = size_canvas.alto // el fondo del canvas

    const valor = 250

    const ancho_line = 210
    const separation_pyramid = ancho_line + 30
    const pl = ( h - (ancho_line + 100) ) - ( levels * separation_pyramid)

    const ancho_letra = ancho_line/1.5

    ctx.font = "bold "+ ancho_letra + "px" +" Courier New";
    
    // grafico de mujeres 
    ctx.fillStyle = "rgb(215, 31, 225)";
    ctx.fillRect(w, pl, datos[0][pyramid_levels] * valor, ancho_line);
    ctx.fillText(
        datos[0][pyramid_levels], 
        w + datos[0][pyramid_levels]* valor + 30 , 
        pl + ancho_line/1.5
    );

    // grafico de hombre
    ctx.fillStyle = "rgb(31, 47, 225)";
    ctx.fillRect( w - datos[1][pyramid_levels]* valor , pl, datos[1][pyramid_levels]  * valor, ancho_line);
    ctx.fillText(
        datos[1][pyramid_levels], 
        w - datos[1][pyramid_levels] * valor - ancho_letra*3, 
        pl + ancho_line/1.5
    );

    // texto
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillText(
        edades[pyramid_levels], 
        10, 
        pl + ancho_line/1.5
    );

    pyramid_levels++

}


function datospiramide() {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 6000, 5000);
    pyramid_levels = 0
    for (let r = 0; r < 20; r++) {
        floor_pyramid(pyramid_levels, [edad.m, edad.h]  )
    }
}
