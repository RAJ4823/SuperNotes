ls = localStorage;

//Color changing script
let color = document.querySelector(`link[href="CSS/Themes/colors/temp.css"]`);
//Accent themes
let rose = "CSS/Themes/colors/rose.css";      //1
let gold = "CSS/Themes/colors/gold.css";      //2
let purple = "CSS/Themes/colors/purple.css";  //3
let green = "CSS/Themes/colors/green.css";    //4 
let silver = "CSS/Themes/colors/silver.css";  //5
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
let themeLink = document.querySelector(`link[href="CSS/Themes/bootstrap-light.css"]`);
let path = "CSS/Themes/bootstrap-";
let themeTxt = document.getElementById("theme");

//Previous Theme
let oldTheme = ls.getItem("theme");
if (oldTheme == null) oldTheme = "light";
themeLink.href = path + oldTheme + '.css';

//Updating Previous Theme text
if (ls.getItem('theme') == "dark")
    themeTxt.innerHTML = "Light Mode";
else
    themeTxt.innerHTML = "Dark Mode";


function changeTheme() {
    themeTxt = document.getElementById("theme");

    if (themeTxt.innerHTML != "Light Mode") {
        themeLink.href = path + "dark.css";
        themeTxt.innerHTML = "Light Mode";
        ls.setItem("theme", "dark");
    } else {
        themeLink.href = path + "light.css";
        themeTxt.innerHTML = "Dark Mode";
        ls.setItem("theme", "light");
    }
}