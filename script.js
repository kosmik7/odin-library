const myLibrary = [];
const tableEl = document.getElementById('bookTable');
const tbodyEl = tableEl.querySelector('tbody');

function Book(title, author, pages, isRead) {
    this.title = title,
        this.author = author,
        this.pages = pages
    this.isRead = isRead
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

function displayBooks() {
    myLibrary.forEach((book) => {
        let row = document.createElement("tr");

        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;

        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;

        const pagesCell = document.createElement("td");
        pagesCell.textContent = book.pages;

        const readInput = document.createElement("input");
        readInput.type = "checkbox";
        readInput.checked = book.isRead;
        const readCell = document.createElement("td");
        readCell.appendChild(readInput)

        row.append(titleCell, authorCell, pagesCell, readCell)
        tbodyEl.appendChild(row);
    })

}

addBookToLibrary("Rendezvous with Rama", "Arthur C. Clarke", 243, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("Hyperion", "Dan Simmons", 500, true);
addBookToLibrary("The Girl with the Dragon Tattoo", "Stieg Larsson", 480, false);

displayBooks();