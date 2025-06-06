const select = { 
  templateOf: { 
    book: '#template-book',
  },
  containerOf: { 
    booksList: '.books-list', 
  }
}; 

const templates = { 
  book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

function render () { 
  const booksList = document.querySelector(select.containerOf.booksList);

  for (let book of dataSource.books) { 
    const generatedHTML = templates.book(book); 

    const element = utils.createDOMFromHTML(generatedHTML); 

    booksList.appendChild(element);
  }
}

const favoriteBooks = [];

const filters = [];

function initActions() {
  const booksList = document.querySelector(select.containerOf.booksList);

  booksList.addEventListener('dblclick', function(event) {
    event.preventDefault();

    const clickedElement = event.target.offsetParent;

    if (clickedElement && clickedElement.classList.contains('book__image')) {
      const bookId = clickedElement.getAttribute('data-id');

      if (!favoriteBooks.includes(bookId)) {
        clickedElement.classList.add('favorite');
        favoriteBooks.push(bookId);
      } else {
        clickedElement.classList.remove('favorite');
        const index = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(index, 1);
      }

      console.log('Ulubione książki:', favoriteBooks);
    }
  });

  const filtersForm = document.querySelector('.filters');

  filtersForm.addEventListener('click', function(event) { 
    const element = event.target; 

    if ( 
      element.tagName === 'INPUT' && 
      element.type === 'checkbox' && 
      element.name === 'filter'
    ) { 
      const filterValue = element.value; 
      console.log('klikniety filtr:', filterValue); 
      
      if (element.checked) { 
        if (!filters.includes(filterValue)) { 
          filters.push(filterValue);
        }
      } else { 
        const index = filters.indexOf(filterValue);
        if (index !== -1) { 
          filters.splice(index, 1);
        }
      }
      console.log('Aktywne filtry:', filters);
      filterBooks();
    }
  });
}

function filterBooks() { 
  for (const book of dataSource.books) { 
    let shouldBeHidden = false; 
    for (const filter of filters) { 
      if (!book.details[filter]) { 
        shouldBeHidden = true; 
        break;
      }
    }
    const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);

    if (bookImage) { 
      if (shouldBeHidden) { 
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }
}

render();
initActions();
