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

function displayBooks(array = myLibrary) {
    const fragment = document.createDocumentFragment();

    array.forEach((book) => {
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
        fragment.appendChild(row);
    })
    tbodyEl.appendChild(fragment);
}

const modal = document.getElementById("formModal");
const modalShowBtn = document.getElementById("openModal");
const modalCloseBtn = document.getElementById("closeModal");
const formSubmitBtn = document.getElementById("formSubmit");

modalShowBtn.addEventListener("click", () => {
    modal.showModal();
});

modalCloseBtn.addEventListener("click", () => {
    modal.close();
});

formSubmitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary(
        document.getElementById('bookTitle').value,
        document.getElementById('bookAuthor').value,
        document.getElementById('bookPages').value,
        document.getElementById('bookRead').checked
    )
    displayBooks([myLibrary.at(-1)]);
    modal.close();
});

addBookToLibrary("Rendezvous with Rama", "Arthur C. Clarke", 243, true);
addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", 96, true);
addBookToLibrary("Hyperion", "Dan Simmons", 500, true);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, false);
addBookToLibrary("Don Quixote", "Miguel de Cervantes", 863, false);

displayBooks();
