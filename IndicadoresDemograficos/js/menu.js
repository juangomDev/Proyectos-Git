const menuIcon = document.getElementById('menu-icon');
const browse = document.querySelector('.browse');

menuIcon.addEventListener("click", () => {
    let display = browse.style.display
    if (display ==  "none") {  browse.style.display = "grid" } 
    else if (display ==  "grid") { browse.style.display = "none"  }
    else { browse.style.display = "grid" }
});