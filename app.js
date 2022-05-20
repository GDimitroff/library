let mockupData = [
  {
    title: 'The Lord of the Rings',
    author: 'J. R. R. Tolkien',
    pages: '1178',
    language: 'English',
    published: '1954',
    status: true,
  },
  {
    title: 'Shogun',
    author: 'James Clavell',
    pages: '1152',
    language: 'English',
    published: '1975',
    status: true,
  },
  {
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    pages: '112',
    language: 'French',
    published: '1943',
    status: false,
  },
  {
    title: 'The Master and Margarita',
    author: 'Mikhail Bulgakov',
    pages: '372',
    language: 'Russian',
    published: '1967',
    status: true,
  },
];

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

class Library {
  constructor() {
    this.books = [];
  }

  getBook(id) {
    return this.books[id];
  }

  getStats() {
    let booksCount = this.books.length;
    let readCount = 0;
    let notReadCount = 0;
    let totalPages = 0;

    this.books.forEach((book) => {
      totalPages += Number(book.pages);
      if (book.status) {
        readCount++;
      }
    });

    return { booksCount, readCount, notReadCount, totalPages };
  }

  addBook(newBook) {
    this.books.push(newBook);
  }

  removeBook(id) {
    this.books.splice(id, 1);
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}

const library = new Library();

if (localStorage.getItem('library') !== null) {
  library.books = JSON.parse(localStorage.getItem('library'));
}

const books = document.querySelector('.books');
const stats = document.querySelector('.stats');
const addBtn = document.querySelector('.btn-add');
const demoDataBtn = document.querySelector('.btn-demo-data');
const btnDeleteAll = document.querySelector('.btn-delete-all');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
const booksCount = document.querySelector('.books-count');
const readCount = document.querySelector('.read-count');
const notReadCount = document.querySelector('.not-read-count');
const totalPages = document.querySelector('.total-pages');

function loadBooks() {
  books.innerHTML = '';
  library.books.forEach((book, index) => renderBook(book, index));
  updateStats();
}

loadBooks();

addBtn.addEventListener('click', openModal);
demoDataBtn.addEventListener('click', loadDemoData);
btnDeleteAll.addEventListener('click', handleDeleteAll);
overlay.addEventListener('click', closeModal);
window.addEventListener('keydown', handleKeyboardInput);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { title, author, pages, language, published, status } =
    Object.fromEntries(formData);
  const book = new Book(title, author, pages, language, published, status);
  book.status = book.status ? true : false;

  library.addBook(book);
  renderBook(book, library.books.length - 1);
  updateStats();
  saveLocal();

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
      <p>${book.author}</p>
    </header>
    <p><span class="bold">Pages: </span>${book.pages}</p>
    <p><span class="bold">Language:  </span>${book.language}</p>
    <p><span class="bold">Published:  </span>${book.published}</p>
    <div>
      <label class="switch">
        <input type="checkbox" ${book.status ? 'checked' : ''} tabindex="-1"/>
        <span class="slider round"></span>
      </label>
      <i class="fa-solid fa-trash"></i>
    </div>
  `;

  book.status
    ? (bookDiv.style.borderBottomColor = 'var(--primary-green)')
    : (bookDiv.style.borderBottomColor = 'var(--primary-red)');
  bookDiv.addEventListener('click', handleClick);
  books.appendChild(bookDiv);

  setTimeout(() => {
    bookDiv.classList.add('load');
  }, 300);
}

function updateStats() {
  const stats = library.getStats();

  booksCount.textContent = stats.booksCount;
  readCount.textContent = stats.readCount;
  notReadCount.textContent = stats.booksCount - stats.readCount;
  totalPages.textContent = stats.totalPages.toLocaleString();
}

function handleClick(e) {
  if (e.target.classList.contains('book')) {
    return;
  }

  const id = e.currentTarget.dataset.id;
  const bookDiv = e.currentTarget;

  if (e.target.classList.contains('slider')) {
    library.getBook(id).status = !library.getBook(id).status;
    library.getBook(id).status
      ? (bookDiv.style.borderBottomColor = 'var(--primary-green)')
      : (bookDiv.style.borderBottomColor = 'var(--primary-red)');
  }

  if (e.target.classList.contains('fa-trash')) {
    library.removeBook(id);
    bookDiv.classList.remove('load');

    setTimeout(() => {
      books.removeChild(bookDiv);
    }, 300);
  }

  updateStats();
  saveLocal();
}

function handleKeyboardInput(e) {
  if (e.key === 'Escape') closeModal();
}

function saveLocal() {
  localStorage.setItem('library', JSON.stringify(library.books));
}

function loadDemoData() {
  localStorage.removeItem('library');
  library.books = mockupData.slice();
  loadBooks();
}

function handleDeleteAll() {
  localStorage.removeItem('library');
  library.books = [];
  loadBooks();
}

function openModal(e) {
  form.children[0].children[0].focus();
  overlay.classList.add('active');
  modal.classList.add('active');
}

function closeModal(e) {
  overlay.classList.remove('active');
  modal.classList.remove('active');
}
