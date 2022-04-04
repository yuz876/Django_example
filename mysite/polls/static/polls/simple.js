function addsomewords(event){
    document.getElementById("forjstest").textContent = "This is added by JS.";
    event.preventDefault();
}
document.addEventListener('DOMContentLoaded', addsomewords);