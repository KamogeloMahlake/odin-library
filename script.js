const myLibrary = [];
const dialogButtons = document.querySelectorAll('.dialog');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const tbody = document.querySelector('tbody');

dialogButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.id === 'open' ? dialog.showModal() : dialog.close()
  })
})

class Book
{
  constructor(title, author, status) 
  {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.status = status;
  }
}

const addBookToLibrary = (title, author, status) => {
  const book = new Book(title, author, status);
  myLibrary.push(book);
};

const createtd = (text) => {
  const td = document.createElement('td');
  td.textContent = text;
  return td;
};

const updateDom = () => {
  tbody.innerHTML = '';
  let i = 0;
  console.log(myLibrary)
  for (const book of myLibrary) 
  {
    const row = document.createElement('tr');
    row.appendChild(createtd(book.id));
    row.appendChild(createtd(book.title));
    row.appendChild(createtd(book.author));
    row.appendChild(createtd(book.status));
    row.appendChild(createButtons(book, i));
    tbody.appendChild(row);
    i++;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const status = document.getElementById('status');

  addBookToLibrary(title.value, author.value, status.value);
  dialog.close();
  updateDom();
});

const createButtons = (book, index) => {
  const statusButton = document.createElement('button');
  statusButton.textContent = 'Change Status';
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';

  statusButton.addEventListener('click', () => {
    book.status = book.status === 'Plan to Read' ? 'Complete' : 'Plan to Read';
    updateDom();
  });

  removeButton.addEventListener('click', () => {
    myLibrary.splice(index, 1);
    updateDom();
    
  });

  const buttons = document.createElement('td');
  buttons.appendChild(statusButton);
  buttons.appendChild(removeButton);
  return buttons;
};
