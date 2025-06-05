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

    function initActions() { 
        const booksList = document.querySelector(select.containerOf.booksList);
        const images = booksList.querySelectorAll('.book__image'); 

    for ( let image of images) { 
        image.addEventListener('dblclick', function (event) { 
            event.preventDefault();

            const clickedElement = this; 
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
        });
    }
}

render();
initActions();
