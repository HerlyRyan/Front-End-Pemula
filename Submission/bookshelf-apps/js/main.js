const books = [];
const RENDER_BOOK = "render-book";
const SAVED_ITEM = "saved-book";
const STORAGE_KEY = "BOOK_APPS";
let filteredBookItems = null;

// Membuat penyimpanan di web storage
function isStorageExist() {
  if (typeof Storage !== undefined) {
    return true;
  }
  alert("Browser tidak mendukung local storage");
  return false;
}

function saveDataBooks() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_ITEM));
  }
}

function loadDataBooksStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
  if (data !== null) {
    for (const bookItem of data) {
      books.push(bookItem);
    }
  }

  document.dispatchEvent(new Event(RENDER_BOOK));
}

// Membuat id secara otomatis
function generateId() {
  return +new Date();
}

// Membuat book object
function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

// Membuat function untuk menambah buku
function addBooks() {
  const inputBookTitle = document.getElementById("inputBookTitle").value;
  const inputBookAuthor = document.getElementById("inputBookAuthor").value;
  const inputBookYear = document.getElementById("inputBookYear").value;
  const inputBookIsComplete = document.getElementById(
    "inputBookIsComplete"
  ).checked;

  const id = generateId();
  const bookObject = generateBookObject(
    id,
    inputBookTitle,
    inputBookAuthor,
    inputBookYear,
    inputBookIsComplete
  );

  books.push(bookObject);
  saveDataBooks();

  document.dispatchEvent(new Event(RENDER_BOOK));
}

function makeDisplayBooks(bookObject) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = bookObject.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = `Penulis: ${bookObject.author}`;

  const bookYear = document.createElement("p");
  bookYear.innerText = `Tahun: ${bookObject.year}`;

  const button = document.createElement("button");
  button.classList.add("green");

  const removeButton = document.createElement("button");
  removeButton.innerText = "Hapus";
  removeButton.addEventListener("click", function () {
    removeBook(bookObject.id);
  });
  removeButton.classList.add("red");

  const bookAction = document.createElement("div");
  bookAction.classList.add("action");

  const bookContainer = document.createElement("article");
  bookContainer.classList.add("book_item");
  bookContainer.append(bookTitle, bookAuthor, bookYear);
  bookContainer.setAttribute("id", `book-${bookObject.id}`);

  if (bookObject.isComplete) {
    button.innerText = "Belum selesai dibaca";
    button.addEventListener("click", function () {
      addToIncompleteBooks(bookObject.id);
    });
    bookAction.append(button, removeButton);
    bookContainer.append(bookAction);
  } else {
    button.innerText = "Selesai dibaca";
    button.addEventListener("click", function () {
      addToCompleteBooks(bookObject.id);
    });
    bookAction.append(button, removeButton);
    bookContainer.append(bookAction);
  }

  // clear all input value
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));

  return bookContainer;
}

function removeBook(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;
  const check = confirm("Apakah anda ingin menghapus buku ini?");
  if (check) {
    books.splice(bookTarget, 1);
    saveDataBooks();
    alert("Buku berhasil dihapus");
  }
  document.dispatchEvent(new Event(RENDER_BOOK));
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

function addToIncompleteBooks(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  saveDataBooks();
  document.dispatchEvent(new Event(RENDER_BOOK));
}

function addToCompleteBooks(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  saveDataBooks();
  document.dispatchEvent(new Event(RENDER_BOOK));
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function searchBook() {
  const searchBook = document.getElementById("searchBookTitle");
  const filter = searchBook.value.toUpperCase();
  const bookItem = document.querySelectorAll(
    "section.book_shelf > .book_list > .book_item"
  );
  for (let i = 0; i < bookItem.length; i++) {
    txtValue = bookItem[i].textContent || bookItem[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      bookItem[i].style.display = "";
    } else {
      bookItem[i].style.display = "none";
    }
  }
}

function checkButton() {
  const span = document.querySelector("span");
  if (inputBookIsComplete.checked) {
    span.innerText = "Selesai dibaca";
  } else {
    span.innerText = "Belum selesai dibaca";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  const inputSearchBook = document.getElementById("searchBook");
  const inputBookIsComplete = document.getElementById("inputBookIsComplete");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Buku berhasil ditambah");
    addBooks();
  });

  inputSearchBook.addEventListener("keyup", function (event) {
    event.preventDefault();
    searchBook();
  });

  inputSearchBook.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  inputBookIsComplete.addEventListener("input", function (event) {
    event.preventDefault();
    checkButton();
  });

  if (isStorageExist()) {
    loadDataBooksStorage();
  }
});

document.addEventListener(RENDER_BOOK, function () {
  const inCompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  inCompleteBookshelfList.innerHTML = "";

  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );
  completeBookshelfList.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = makeDisplayBooks(bookItem);
    if (!bookItem.isComplete) {
      inCompleteBookshelfList.append(bookElement);
    } else {
      completeBookshelfList.append(bookElement);
    }
  }

  console.log(books);
});
