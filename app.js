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

let myLibrary = [
  {
    title: 'Dune',
    author: 'Frank Herbert',
    pages: '879',
    language: 'English',
    published: '1988',
    read: false,
  },
  {
    title: 'The Lord of the Rings',
    author: 'J. R. R. Tolkien',
    pages: '1300',
    language: 'English',
    published: '1978',
    read: true,
  },
];

class Book {
  constructor(title, author, pages, language, published, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.published = published;
    this.read = read;
  }
}

function loadBooks() {
  myLibrary.forEach((book) => renderBook(book));
  updateStats();
}

loadBooks();

addBtn.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { title, author, pages, language, published, read } =
    Object.fromEntries(formData);
  const book = new Book(title, author, pages, language, published, read);
  book.read = book.read ? true : false;

  addBookToLibrary(book);
  updateStats();
  form.reset();
  closeModal();
});

function renderBook(book) {
  const div = document.createElement('div');
  div.classList.add('book');
  div.innerHTML = `
    <header>
      <h2>${book.title}</h2>
      <p>${book.author}t</p>
    </header>
    <p>Pages: ${book.pages}</p>
    <p>Language: ${book.language}</p>
    <p>Published: ${book.published}</p>
    <div>
      <label class="switch">
        <input type="checkbox" ${book.read ? 'checked' : ''} tabindex="-1"/>
        <span class="slider round"></span>
      </label>
      <i class="fa-solid fa-trash"></i>
    </div>
  `;

  books.appendChild(div);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderBook(book);
  updateStats();
}

function updateStats() {
  let booksCountNumber = 0;
  let readCountNumber = 0;
  myLibrary.forEach((book) => {
    booksCountNumber++;
    if (book.read) {
      readCountNumber++;
    }
  });

  booksCount.textContent = booksCountNumber;
  readCount.textContent = readCountNumber;
  notReadCount.textContent = booksCountNumber - readCountNumber;
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
