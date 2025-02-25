let myLibrary = [];
const addBookDialog = document.querySelector(".add-book-dialog");
const closeDialog = document.querySelector(".close-dialog");
const addBookButton = document.querySelector("form button");
const form = document.querySelector("form");
const dialog = document.querySelector("dialog");

addBookDialog.addEventListener("click", () => {
  dialog.showModal();
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const status = document.querySelector("#status");
  addBookToLibrary(title.value, author.value, pages.value, status.value);
  title.value = "";
  author.value = "";
  pages.value = "";
  status.value = "Plan to Read";
  dialog.close();
});

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function addBookToLibrary(title, author, pages, status) {
  myLibrary.push(new Book(title, author, pages, status));
  addBookToDOM(myLibrary[myLibrary.length - 1], myLibrary.length - 1);
}

function addBookToDOM(book, index) {
  const tbody = document.querySelector("tbody");

  const row = document.createElement("tr");
  row.append(createCell(book.title));
  row.append(createCell(book.author));
  row.append(createCell(book.pages));
  row.append(createCell(book.status));
  row.setAttribute("data-index", index);
  row.append(createButtons(book, index));
  tbody.append(row);
}

function createCell(content) {
  const cell = document.createElement("td");
  cell.textContent = content;
  return cell;
}
function createButtons(book, index) {
  const buttons = document.createElement("td");
  const readButton = document.createElement("button");
  readButton.textContent = "Read/Unread";
  readButton.addEventListener("click", () => {
    book.status = book.status === "Plan to Read" ? "Completed" : "Plan to Read";
    updateBookStatusInDOM(book, index);
  });

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    myLibrary.splice(index, 1);
    removeBookFromDOM(index);
  });
  buttons.append(readButton);
  buttons.append(removeButton);
  return buttons;
}

function updateBookStatusInDOM(book, index) {
  const row = document.querySelector(`tr[data-index="${index}"]`);
  row.querySelector("td:nth-child(4)").textContent = book.status;
}

function removeBookFromDOM(index) {
  const row = document.querySelector(`tr[data-index="${index}"]`);
  row.remove();
}
