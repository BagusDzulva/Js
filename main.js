const books = [];
const RENDER_EVENT = "bookApps";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
});

function addBook() {
  const title = document.getElementById("inputBookTitle").value;
  const penulis = document.getElementById("inputBookAuthor").value;
  const tahun = document.getElementById("inputBookYear").value;
  const isCompleteBook = document.getElementById(`inputBookIsComplete`).checked;

  console.log(isCompleteBook);
  const id = generateID();
  const bookObject = generateBook(id, title, penulis, tahun, isCompleteBook);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));

  function generateID() {
    return +new Date();
  }

  function generateBook(id, title, penulis, tahun, isCompleteBook) {
    return {
      id,
      title,
      penulis,
      tahun,
      isCompleteBook,
    };
  }
}
document.addEventListener(RENDER_EVENT, function () {});

function makeBook(bookObject) {
  const title = document.createElement("h3");
  title.innerText = bookObject.title;
  const penulis = document.createElement("p");
  penulis.innerText = bookObject.penulis;
  const tahun = document.createElement("p");
  tahun.innerText = bookObject.tahun;

  const articleText = document.createElement("div");
  articleText.classList.add("book_data");
  articleText.append(title, penulis, tahun);

  const article = document.createElement("article");
  article.classList.add("book_item");
  article.append(articleText);
  article.setAttribute("id", `books-${bookObject.id}`);

  if (bookObject.isCompleteBook) {
    const undoButton = document.createElement("button");
    undoButton.innerText = "Belum di Baca ";
    undoButton.setAttribute("id", `undoButton`);

    undoButton.addEventListener("click", function () {
      undobookFromCompleted(bookObject.id);
    });

    const removeButton = document.createElement("button");
    removeButton.setAttribute("id", `removeButton`);
    removeButton.innerText = "Hapus buku";
    article.append(removeButton, undoButton);

    removeButton.addEventListener("click", function () {
      removeBookFromCompleted(bookObject.id);
    });
  } else {
    const compeletedButton = document.createElement("button");
    compeletedButton.innerHTML = "Buku Telah Selesai Dibaca";

    compeletedButton.addEventListener("click", function () {
      addBookToCompleted(bookObject.id);
    });

    const removeButton = document.createElement("button");
    removeButton.setAttribute("id", `removeButton`);
    removeButton.innerText = "Hapus buku";
    article.append(removeButton, compeletedButton);

    removeButton.addEventListener("click", function () {
      removeBookFromCompleted(bookObject.id);
    });
  }

  return article;
}

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBookList = document.getElementById(
    "incompleteBookshelfList"
  );
  uncompletedBookList.innerHTML = "";

  const compeletedBookList = document.getElementById("completeBookshelfList");
  compeletedBookList.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleteBook) uncompletedBookList.append(bookElement);
    else compeletedBookList.append(bookElement);
  }
});

function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleteBook = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id == bookId) {
      return bookItem;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  console.log(bookId);
  const bookTarget = findBook(bookId);
  if (bookTarget === -1) return;
  books.slice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function undobookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleteBook = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}
function findBookIndex(bookId) {
  console.log(bookId);

  for (const index in books) {
    if (books[index] === bookId) {
      return index;
    }
  }
  return -1;
}
function removeBookFromCompleted(bookId) {
  const bookTarget = findBookIndex(bookId);
  if (bookTarget == -1) return;
  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}
