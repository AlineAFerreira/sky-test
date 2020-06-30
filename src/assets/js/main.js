window.SKY = {
  highlights: [],
  carousels: [],
  darkTheme: false,
  fontSize: 14,

  init() {
    this.getTheme();
    this.getFontSize();
    this.configEvents();
    this.getData();
  },

  configEvents() {    
    $('[changetheme]').on('click', ()=> {
      this.switchTheme();
    });

    $('[increasefont]').on('click', ()=> {
      this.increaseFontSize();
    });

    $('[decreasefont]').on('click', ()=> {
      this.decreaseFontSize();
    })    
  },

  getData() {
    $.ajax({
      url: 'https://sky-frontend.herokuapp.com/movies',
      type: 'GET',
      success: (data) => {
        this.highlights = data.filter(item => item.type === 'highlights');
        this.carousels = data.filter(item => item.type === 'carousel-portrait');

        this.makeHighlights();
        this.makeCarousels();
      },
      error: (error) => {
        console.log(error.statusText, error.status);
      }
    });
  },

  getTheme() {
    this.darkTheme = eval(atob(localStorage.getItem(btoa('dark-theme')))) || false;
    this.setTheme();
  },

  setTheme() {
    this.darkTheme? $('body').addClass('dark') : $('body').removeClass('dark');
    localStorage.setItem(btoa('dark-theme'), btoa(this.darkTheme));
  },

  switchTheme() {
    this.darkTheme = !this.darkTheme;
    this.setTheme();
  },

  getFontSize() {
    this.fontSize = parseInt(atob(localStorage.getItem(btoa('fontSize')))) || this.fontSize;
    this.setFont();
  },

  setFont() {
    $('html').attr('style', `font-size: ${this.fontSize}px`)
    localStorage.setItem(btoa('fontSize'), btoa(this.fontSize));
  },

  increaseFontSize() {
    if (this.fontSize < 18) {
      this.fontSize++;
      this.setFont();
    }    
  },

  decreaseFontSize() {
    if (this.fontSize > 10 && this.fontSize <= 18) {
      this.fontSize--;
      this.setFont();
    }    
  },

  makeHighlights() {
    const html = this.highlights[0].items.map(item => {
      return `
        <div class="item">
          <a href="#">
            <img src="${item.images[0].url}" alt="${item.title}">
          </a>
        </div>`
    });

    $('.slider').html(html).removeClass('loading');
    this.initHighlights();
  },

  makeCarousels() {
    const html = this.carousels.map(carousel => {
      return `
        <div class="movie-list">
          <h2 class="header-list">${carousel.title}</h2>
          <div class="box-carousel">
            ${carousel.movies.map(movie =>{
              return `
              <div class="item ${movie.isBlocked ? 'blocked' : ''}">
                <div class="box-img">
                  <a href="#">
                    <img src="${movie.images[0].url}" alt="${movie.title}" />
                  </a>
                </div>
              </div>
            `
            }).join('')}
          </div>
        </div> `;
    })

    $('.carousels-wrapper').html(html);
    this.initCarousels()
  },

  initHighlights() {
    $('.slider').slick({
      centerMode: true,
      centerPadding: '25%',
      dots: true,
      autoplay: false,
      autoplaySpeed: 1000,
      responsive: [
        {
        breakpoint: 768,
          settings: {
            arrows: false,
            dots: false,
            centerMode: false,
            centerPadding: 0,
          }
        }
      ]
    });
  },

  initCarousels() {
    $('.box-carousel').slick({
      initialSlide: 0,
      infinite: false,
      slidesToShow: 7,
      slidesToScroll: 7,      
      responsive: [{
        breakpoint: 992,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
          }
        },{
          breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: false,
              slidesToShow: 4,
              slidesToScroll: 1,
            }
        },{
          breakpoint: 599,
            settings: {
              arrows: false,
              centerMode: false,
              slidesToShow: 2,
              slidesToScroll: 1,
            }
      }]
    })
  }
}
