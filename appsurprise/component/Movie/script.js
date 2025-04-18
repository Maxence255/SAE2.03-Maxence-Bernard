let templateFile = await fetch("./component/Movie/template.html");

let template = await templateFile.text();

let templateFile2 = await fetch("./component/Movie/templateCard.html");

let templateCards = await templateFile2.text();

let MovieCard = {};

MovieCard.format = function (obj) {
    let html = template;
    let cardsHTML = "";
    for (let c of obj) {
        let card = templateCards;
        card = card.replace("{{image}}", c.image);
        card = card.replace("{{name}}", c.name);
        card = card.replace("{{onclick}}", `C.handlerDetail(${c.id})`);
        card = card.replace("{{handlerFavoris}}", `C.handlerFavoris(${c.id})`);
        card = card.replace(
            "{{handlerDelete}}",`C.handlerdeleteFavoris(${c.id})`
          );
        cardsHTML += card;
    }
    html = html.replace("{{cards}}", cardsHTML);
    return html;
};
let currentSlide = 0;
const cardsPerPage = 4;

function scrollCarousel(direction) {
  const track = document.querySelector('.carousel-track');
  const cards = track.querySelectorAll('.movie__card');
  const totalCards = cards.length;
  const maxSlide = Math.ceil(totalCards / cardsPerPage) - 1;

  currentSlide += direction;

  if (currentSlide < 0) currentSlide = 0;
  if (currentSlide > maxSlide) currentSlide = maxSlide;

  const cardWidth = cards[0].offsetWidth + 32; // carte + gap (2rem = 32px)
  const offset = currentSlide * cardWidth * cardsPerPage;

  track.style.transform = `translateX(-${offset}px)`;
}
export { MovieCard };
