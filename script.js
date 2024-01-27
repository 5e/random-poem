const getPoems = async () => {
    //generate random number from 1 to 10, think 10 lines is enough for a homepage
    const randomNumberOfLines = Math.floor(Math.random() * 10) + 1;
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

getPoems();

//get div by id

