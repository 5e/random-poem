async function getPoems(maxLines) {
    const randomNumberOfLines = Math.floor(Math.random() * maxLines) + 1;
    const url = `https://poetrydb.org/linecount/${randomNumberOfLines}`;
    const response = await fetch(url);
    if (response.status !== 200) {
        throw new Error('Oops... Something went wrong :(');
    }
    const poems = await response.json();
    //generate random number from 0 to poems.lines.length
    const randomPoem = Math.floor(Math.random() * poems.length);
    const poemDiv = document.getElementById('poem');
    const authorDiv = document.getElementById('author');
    const titleDiv = document.getElementById('title');
    poems[randomPoem].lines.forEach(element => {
        poemDiv.innerHTML += `<p>${element}</p>`;
    });

    authorDiv.innerHTML = poems[randomPoem].author;
    titleDiv.innerHTML = poems[randomPoem].title;

}

function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    if (element.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "true");
    } else {
        localStorage.setItem("dark-mode", "false");
    }
}


function checkDarkMode() {
    var element = document.body;
    if (localStorage.getItem("dark-mode") === "false") {
        element.classList.toggle("dark-mode");
    }
}

function getPoemMaxLines() {
    if (localStorage.getItem("poem-max-lines") === null) {
        localStorage.setItem("poem-max-lines", "10");
        document.getElementById('maxLines').value = 10;
        return 10;
    } else {
        document.getElementById('maxLines').value = localStorage.getItem("poem-max-lines");
        return localStorage.getItem("poem-max-lines");
    }
}

const dialog = document.querySelector('dialog');
const showDialogButton = document.getElementById('showDialog');
const closeDialogButton = document.getElementById('closeDialog');
const inputMaxLines = document.getElementById('maxLines');

inputMaxLines.addEventListener('input', (event) => {
    localStorage.setItem("poem-max-lines", event.target.value);
});

showDialogButton.addEventListener("click", () => {
    dialog.showModal();
});
closeDialogButton.addEventListener("click", () => {
    dialog.close();
});

let maxLines = getPoemMaxLines();
checkDarkMode();
getPoems(maxLines);
