const menuIcon = document.getElementById('menu-icon');
const header = document.getElementById('header');
const headerContainer = document.getElementById('header-container');
menuTop = menuIcon.offsetTop;
menuLeft = menuIcon.offsetLeft;

menuIcon.addEventListener("click", () => {
    if (headerContainer.style.display == "block") {
        headerContainer.style.display = "none"
    } else {
        headerContainer.style.display = "block"
    }
});


function menu_chart(valor) {

    if(valor){ 
        document.querySelector(".myCanvas").style.opacity = 1
        document.querySelector("#state-chart").style.opacity = 0
     }else{
        document.querySelector(".myCanvas").style.opacity = 0
        document.querySelector("#state-chart").style.opacity = 1
     }

    
     
}