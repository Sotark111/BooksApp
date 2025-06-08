class BooksList { 
  constructor() { 
    this.initData();
    this.getElements();
    this.render();
    this.initActions();
  }

  initData() { 
    this.data = dataSource.books;
    this.favoriteBooks = [];
    this.filters = [];
  }

  getElements(){ 
    this.dom = {};
    this.dom.booksList = document.querySelector('.books-list');
    this.dom.filtersForm = document.querySelector('.filters');
  }

  render() {
    for (let book of this.data) {
      const ratingBgc = this.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;

      const template = Handlebars.compile(
        document.querySelector('#template-book').innerHTML
      );

      const generatedHTML = template(
        Object.assign({}, book, {
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth,
        })
      );

      const element = utils.createDOMFromHTML(generatedHTML);
      this.dom.booksList.appendChild(element);
    }
  }

  initActions() {
    this.dom.booksList.addEventListener('dblclick', (event) => {
      event.preventDefault();

      const clickedElement = event.target.offsetParent;

      if (clickedElement && clickedElement.classList.contains('book__image')) {
        const bookId = clickedElement.getAttribute('data-id');

        if (!this.favoriteBooks.includes(bookId)) {
          clickedElement.classList.add('favorite');
          this.favoriteBooks.push(bookId);
        } else {
          clickedElement.classList.remove('favorite');
          const index = this.favoriteBooks.indexOf(bookId);
          this.favoriteBooks.splice(index, 1);
        }

        console.log('Ulubione książki:', this.favoriteBooks);
      }
    });

    this.dom.filtersForm.addEventListener('click', (event) => {
      const element = event.target;

      if (
        element.tagName === 'INPUT' &&
        element.type === 'checkbox' &&
        element.name === 'filter'
      ) {
        const filterValue = element.value;

        if (element.checked) {
          if (!this.filters.includes(filterValue)) {
            this.filters.push(filterValue);
          }
        } else {
          const index = this.filters.indexOf(filterValue);
          if (index !== -1) {
            this.filters.splice(index, 1);
          }
        }

        this.filterBooks();
      }
    });
  }

  filterBooks() {
    for (const book of this.data) {
      let shouldBeHidden = false;

      for (const filter of this.filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage = this.dom.booksList.querySelector(
        `.book__image[data-id="${book.id}"]`
      );

      if (bookImage) {
        if (shouldBeHidden) {
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
      }
    }
  }

  determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }
}

const app = new BooksList(); // eslint-disable-line no-unused-vars
