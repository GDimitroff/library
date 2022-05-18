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
  myLibrary = JSON.parse(localStorage.getItem('books'));
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
  books.innerHTML = '';
  myLibrary.forEach((book, index) => renderBook(book, index));
  updateStats();
}

loadBooks();

addBtn.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
window.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(e) {
  if (e.key === 'Escape') closeModal();
}

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
  bookDiv.dataset.id = `${id}`;
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
        <input type="checkbox" ${book.status ? 'checked' : ''} tabindex="-1"/>
        <span class="slider round"></span>
      </label>
      <i class="fa-solid fa-trash"></i>
    </div>
  `;

  bookDiv.addEventListener('click', handleClick);
  books.appendChild(bookDiv);
}

function addBookToLibrary(book) {
  renderBook(book, myLibrary.length);
  myLibrary.push(book);
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

function handleClick(e) {
  const id = e.currentTarget.dataset.id;

  if (e.target.classList.contains('book')) {
    return;
  }

  if (e.target.classList.contains('slider')) {
    myLibrary[id].status = !myLibrary[id].status;
  }

  if (e.target.classList.contains('fa-trash')) {
    myLibrary.splice(id, 1);
    books.removeChild(e.currentTarget);
  }

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
