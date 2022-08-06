ls = localStorage;

//Color changing script
let color = document.querySelector(`link[href="Themes/temp.css"]`);
//Accent themes
let rose = "Themes/rose.css";      //1
let gold = "Themes/gold.css";      //2
let purple = "Themes/purple.css";  //3
let green = "Themes/green.css";    //4 
let silver = "Themes/silver.css";  //5
let colorArr = [0, rose, gold, purple, green, silver];
let oldColor = ls.getItem("color");

//Color changer
if (oldColor == null)
    color.href = purple;
else
    color.href = colorArr[oldColor];

function changeColor(i) {
    color.href = colorArr[i];
    ls.setItem("color", i);
}

//Theme Changer
let themeLink = document.querySelector(`link[href="Themes/bootstrap-dark/dist/css/bootstrap-dark.min.css"]`)
let darkTheme = "Themes/bootstrap-dark/dist/css/bootstrap-dark.min.css";
let lightTheme = "Themes/bootstrap-dark/dist/css/bootstrap-light.min.css";
let themeTxt = document.getElementById("theme");

//Previous Theme
themeLink.href = ls.getItem("theme");

//Updating Previous Theme text
if (ls.getItem('theme') == darkTheme)
    themeTxt.innerHTML = "Light Mode";
else
    themeTxt.innerHTML = "Dark Mode";


function changeTheme() {
    themeTxt = document.getElementById("theme");

    if (themeTxt.innerHTML != "Light Mode") {
        themeLink.href = darkTheme;
        themeTxt.innerHTML = "Light Mode";
        ls.setItem("theme", darkTheme);
    } else {
        themeLink.href = lightTheme;
        themeTxt.innerHTML = "Dark Mode";
        ls.setItem("theme", lightTheme);
    }
}

