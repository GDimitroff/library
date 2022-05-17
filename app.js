let myLibrary = [];

class Book {
  constructor(title, author, pages, language, published, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.published = published;
    this.status = status;
  }
}

if (localStorage.getItem('books') === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('books'));
  myLibrary = booksFromStorage;
}

const body = document.querySelector('body');
const books = body.querySelector('.books');
const stats = body.querySelector('.stats');
const addBtn = body.querySelector('.btn-add');
const overlay = body.querySelector('.overlay');
const modal = body.querySelector('.modal');
const form = body.querySelector('.form');
const booksCount = body.querySelector('.books-count');
const readCount = body.querySelector('.read-count');
const notReadCount = body.querySelector('.not-read-count');

function loadBooks() {
  myLibrary.forEach((book, index) => renderBook(book, index));
  updateStats();
}

loadBooks();

addBtn.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { title, author, pages, language, published, status } =
    Object.fromEntries(formData);
  const book = new Book(title, author, pages, language, published, status);
  book.status = book.status ? true : false;

  addBookToLibrary(book);
  form.reset();
  closeModal();
});

function renderBook(book, id) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');
  bookDiv.innerHTML = `
    <header>
      <h2>${book.title}</h2>
      <p>${book.author}t</p>
    </header>
    <p>Pages: ${book.pages}</p>
    <p>Language: ${book.language}</p>
    <p>Published: ${book.published}</p>
    <div>
      <label class="switch">
        <input type="checkbox" ${
          book.status ? 'checked' : ''
        } tabindex="-1" data-id="${id}"/>
        <span class="slider round"></span>
      </label>
      <i class="fa-solid fa-trash"></i>
    </div>
  `;

  books.appendChild(bookDiv);
  bookDiv.addEventListener('change', updateStatus);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderBook(book, myLibrary.length);
  updateStats();

  localStorage.setItem('books', JSON.stringify(myLibrary));
}

function updateStats() {
  let booksCountNumber = 0;
  let readCountNumber = 0;
  myLibrary.forEach((book) => {
    booksCountNumber++;
    if (book.status) {
      readCountNumber++;
    }
  });

  booksCount.textContent = booksCountNumber;
  readCount.textContent = readCountNumber;
  notReadCount.textContent = booksCountNumber - readCountNumber;
}

function updateStatus(e) {
  const id = e.target.dataset.id;
  myLibrary[id].status = !myLibrary[id].status;
  updateStats();
  localStorage.setItem('books', JSON.stringify(myLibrary));
}

function openModal(e) {
  form.children[0].children[0].focus();
  body.style.pointerEvents = 'none';
  body.style.overflow = 'hidden';
  overlay.classList.add('active');
  modal.classList.add('active');
}

function closeModal(e) {
  body.style.pointerEvents = 'auto';
  body.style.overflow = 'auto';
  overlay.classList.remove('active');
  modal.classList.remove('active');
}
