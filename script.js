const myLibrary = {};
let myLibraryIndex = 0;

const tableEl = document.getElementById('bookTable');
const tbodyEl = tableEl.querySelector('tbody');

const modal = document.getElementById("formModal");
const modalShowBtn = document.getElementById("openModal");
const modalCloseBtn = document.getElementById("closeModal");

const formTitle = document.getElementById('bookTitle');
const formAuthor = document.getElementById('bookAuthor');
const formPages = document.getElementById('bookPages');
const formRead = document.getElementById('bookRead');

const formSubmitBtn = document.getElementById("formSubmit");
const formSubmitBtnText = document.getElementById("formSubmit").textContent;
const formHeader = document.getElementById("formHeader");
const formHeaderText = document.getElementById("formHeader").textContent;

function Book(title, author, pages, isRead) {
    this.index = myLibraryIndex++,
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead
}

Book.prototype.toggleReadStatus = function (checked) {
    this.isRead = checked;
    console.log("Toggle isRead for:", this)
};

Book.prototype.deleteBook = function () {
    document.querySelector(`[data-index="${this.index}"]`).
        remove();
    console.log("Deleted:", this)
    delete myLibrary[this.index]
};

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    return myLibrary[newBook.index] = newBook;
}

function displayBooks(object = myLibrary) {
    const fragment = document.createDocumentFragment();
    for (let index in object) {
        const book = object[index]

        let row = document.createElement("tr");
        row.dataset.index = book.index

        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;

        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;

        const pagesCell = document.createElement("td");
        pagesCell.textContent = book.pages;

        const readInput = document.createElement("input");
        readInput.type = "checkbox";
        readInput.checked = book.isRead;
        readInput.classList = "readBtn"
        const readCell = document.createElement("td");
        readCell.appendChild(readInput)

        const editInput = document.createElement("button");
        editInput.classList = "editBtn"
        const editIcon = document.createElement("img");
        editIcon.src = "ico-edit.svg"
        editInput.appendChild(editIcon)

        const deleteInput = document.createElement("button");
        deleteInput.classList = "deleteBtn"
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "ico-delete.svg"
        deleteInput.appendChild(deleteIcon)

        const actionsCell = document.createElement("td");
        actionsCell.append(editInput, deleteInput)

        row.append(titleCell, authorCell, pagesCell, readCell, actionsCell)
        fragment.appendChild(row);
    }
    tbodyEl.appendChild(fragment);
}

function editBook(index) {
    formSubmitBtn.dataset.edit = index;
    formHeader.textContent = "Edit a book";
    formSubmitBtn.textContent = "Edit";
    formTitle.value = myLibrary[index].title;
    formAuthor.value = myLibrary[index].author;
    formPages.value = myLibrary[index].pages;
    formRead.checked = myLibrary[index].isRead;
    modal.showModal();
}

function submitEditBook() {
    const index = formSubmitBtn.dataset.edit
    delete formSubmitBtn.dataset.edit;
    myLibrary[index].deleteBook()
}

function submitAddBook() {
    const book = addBookToLibrary(
        formTitle.value,
        formAuthor.value,
        formPages.value,
        formRead.checked,
    )
    displayBooks({ book });
    console.log("Added:", book)
}

modalShowBtn.addEventListener("click", () => {
    formHeader.textContent = formHeaderText;
    formSubmitBtn.textContent = formSubmitBtnText;
    formTitle.value = "",
        formAuthor.value = "",
        formPages.value = "",
        formRead.checked = false,
        modal.showModal();
});

modalCloseBtn.addEventListener("click", () => {
    modal.close();
});

formSubmitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (formSubmitBtn.dataset.edit) submitEditBook()
    submitAddBook()
    modal.close();
});

tableEl.addEventListener("click", (event) => {
    if (event.target.closest('.editBtn')) {
        editBook(event.target.closest('tr').dataset.index)
    };
    if (event.target.closest('.deleteBtn')) {
        myLibrary[event.target.closest('tr').dataset.index].deleteBook()
    };
    if (event.target.closest('.readBtn')) {
        myLibrary[event.target.closest('tr').dataset.index].toggleReadStatus(event.target.checked)
    };
});

addBookToLibrary("Rendezvous with Rama", "Arthur C. Clarke", 243, true);
addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", 96, true);
addBookToLibrary("Hyperion", "Dan Simmons", 500, true);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, false);
addBookToLibrary("Don Quixote", "Miguel de Cervantes", 863, false);

displayBooks();
