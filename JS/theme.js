ls = localStorage;

//Color changing script
let color = document.querySelector(`link[href="CSS/Themes/colors/black.css"]`);
//Accent themes
let colorName = ls.getItem("color");
let __colors = "CSS/Themes/colors/";

//Color changer
color.href = __colors + 'purple.css';
if (colorName != null)
    color.href = __colors + colorName + '.css';

function changeColor(colorName) {
    color.href = __colors + colorName + '.css';
    ls.setItem("color", colorName);
}

//Theme Changer
let themeLink = document.querySelector(`link[href="CSS/Themes/bootstrap-dark.css"]`);
let __themes = "CSS/Themes/bootstrap-";
let themeTxt = document.getElementById("theme");

//Previous Theme
themeLink.href = __themes + ls.getItem("theme") + '.css';

//Updating Previous Theme text
if (ls.getItem('theme') == dark)
    themeTxt.innerHTML = "Light Mode";
else
    themeTxt.innerHTML = "Dark Mode";


function changeTheme() {
    themeTxt = document.getElementById("theme");

    if (themeTxt.innerHTML != "Light Mode") {
        themeLink.href = __themes + "dark.css";
        themeTxt.innerHTML = "Light Mode";
        ls.setItem("theme", "dark");
    } else {
        themeLink.href = __themes + "light.css";
        themeTxt.innerHTML = "Dark Mode";
        ls.setItem("theme", "light");
    }
}

