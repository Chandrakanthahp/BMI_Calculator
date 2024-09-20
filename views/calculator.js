// calculator.js
function calculate() {
    var height = document.getElementById("formtext").elements[0].value;
    var weight = document.getElementById("formtext").elements[1].value;
    var index = Math.floor(weight / (height * height));
    if (index < 16) {
        var text = "severe thinness";
    } else if (index <= 16 || index <= 17) {
        var text = "Moderate thinness";
    } else if (index >= 17 && index <= 18) {
        var text = "Mild thinness";
    } else if (index >= 18 && index <= 25) {
        var text = "Normal";
    } else if (index >= 25 && index <= 30) {
        var text = "over weight";
    } else if (index >= 30 && index <= 35) {
        var text = "obese, but you can control it";
    } else if (index > 35) {
        var text = "obese, but you can control it";
    }
    var supertext = "2";
    document.getElementById("h5text").innerHTML =
        "Your BMI is " + index + " kg/m" + supertext.sup() + "," + text;
}
