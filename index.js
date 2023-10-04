document.addEventListener("DOMContentLoaded", () => fetchData)

function fetchData() {
    fetch('http://localhost:3000')
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}