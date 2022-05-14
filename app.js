const body = document.querySelector('body');
const addBtn = body.querySelector('.btn-add');
const overlay = body.querySelector('.overlay');
const modal = body.querySelector('.modal');

let myLibrary = [];

class Book {
  constructor(title, author, pages, read = 'false') {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
      return `${title} by ${author}, ${pages} pages, ${
        read ? 'already read' : 'not read yet'
      }`;
    };
  }
}

const dune = new Book('Dune', 'Frank Herbert', '389', true);
console.log(dune.info());

function addBookToLibrary() {
  // do stuff here
}

addBtn.addEventListener('click', (e) => {
  body.style.pointerEvents = 'none';
  body.style.overflow = 'hidden';
  overlay.classList.add('active');
  modal.classList.add('active');
});

overlay.addEventListener('click', (e) => {
  body.style.pointerEvents = 'auto';
  body.style.overflow = 'auto';
  overlay.classList.remove('active');
  modal.classList.remove('active');
});
