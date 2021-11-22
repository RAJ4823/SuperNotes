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
let themeTxt = document.getElementById("theme");
let root = document.documentElement.style;
root.setProperty('--x', ls.getItem('theme'));

if (ls.getItem('theme') == 1 || themeTxt.innerHTML == 'Light Mode') {
    themeTxt.innerHTML = "Light Mode";
}
else {
    themeTxt.innerHTML = "Dark Mode";
}

function changeTheme() {
    themeTxt = document.getElementById("theme");

    if (themeTxt.innerHTML != "Light Mode") {
        let check = confirm("Colors will be varies from original. Dark mode is still in devlopment, Are you want to change theme ?");
        if (check) {

            root.setProperty('--x', '1');
            themeTxt.innerHTML = "Light Mode";
            ls.setItem("theme", 1);
        }
    } else {
        root.setProperty('--x', '-1');
        themeTxt.innerHTML = "Dark Mode";
        ls.setItem("theme", -1);
    }
}

