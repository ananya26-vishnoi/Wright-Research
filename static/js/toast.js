function launch_toast() {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
}
function launch_toast_correct() {
    var x = document.getElementById("toast_correct")
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
}