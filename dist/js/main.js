window.SKY={highlights:[],carousels:[],init(){this.getData()},getData(){$.ajax({url:"https://sky-frontend.herokuapp.com/movies",type:"GET",success:s=>{this.highlights=s.filter(s=>"highlights"===s.type),this.carousels=s.filter(s=>"carousel-portrait"===s.type),this.makeHighlights(),this.makeCarousels()},error:s=>{console.log(s.statusText,s.status)}})},makeHighlights(){const s=this.highlights[0].items.map(s=>`\n        <div class="item">\n          <a href="#">\n            <img src="${s.images[0].url}" alt="${s.title}">\n          </a>\n        </div>`);$(".slider").html(s).removeClass("loading"),this.initHighlights()},makeCarousels(){const s=this.carousels.map(s=>`\n        <div class="movie-list">\n          <h2 class="header-list">${s.title}</h2>\n          <div class="box-carousel">\n            ${s.movies.map(s=>`\n              <div class="item ${s.isBlocked?"blocked":""}">\n                <div class="box-img">\n                  <a href="#">\n                    <img src="${s.images[0].url}" alt="${s.title}" />\n                  </a>\n                </div>\n              </div>\n            `).join("")}\n          </div>\n        </div> `);$(".carousels-wrapper").html(s),this.initCarousels()},initHighlights(){$(".slider").slick({centerMode:!0,centerPadding:"25%",dots:!0,autoplay:!1,autoplaySpeed:1e3,responsive:[{breakpoint:768,settings:{arrows:!1,dots:!1,centerMode:!1,centerPadding:0}}]})},initCarousels(){$(".box-carousel").slick({initialSlide:0,infinite:!1,slidesToShow:7,slidesToScroll:7,responsive:[{breakpoint:992,settings:{slidesToShow:5,slidesToScroll:5}},{breakpoint:768,settings:{arrows:!1,centerMode:!1,slidesToShow:4,slidesToScroll:1}},{breakpoint:599,settings:{arrows:!1,centerMode:!1,slidesToShow:2,slidesToScroll:1}}]})}};