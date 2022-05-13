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
