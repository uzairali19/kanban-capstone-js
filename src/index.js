import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import './style.css';

const url = 'https://api.imgflip.com/get_memes';

const getData = async () => {
  const scores = await fetch(url)
    .then((res) => res.json())
    .then((resData) => resData.data.memes)
    .catch((err) => err);
  return scores;
};

const mainBody = document.querySelector('#body');

getData().then((v) => {
  for (let i = 0; i < 15; i++) {
    const bodyItems = `<article class="media">
      <figure class="media-left">
        <p class="image">
          <img
            src="${v[i].url}"
          />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>${v[i].name}</p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small"
                ><i class="fa fa-heart"></i>
              </span>
              <p class="like-text">like</p>
            </a>
          </div>
        </nav>
        <div class="level">
          <button
            class="modal-button button is-primary is-small"
            data-target="modal"
            aria-haspopup="true"
            >
            Comments
            </button>
          <button id="${v[i].id}" class="reservations button is-warning is-small">
            Reservations
          </button>
        </div>
      </div>
      </article>`;
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('main-div');
    mainDiv.innerHTML = bodyItems;
    mainBody.appendChild(mainDiv);
  }
  const resModal = document.querySelector('#res-modal');

  const reserve = document.querySelectorAll('.reservations');
  reserve.forEach((res) => {
    res.addEventListener('click', (e) => {
      e.preventDefault();
      const cardItem = e.target;
      for (let i = 0; i < 15; i++) {
        if (v[i].id === cardItem.id) {
          const resItem = `
            <div class="modal-background"></div>
            <div class="modal-content">
              <img class="res-img" src="${v[i].url}" alt="">
              <p class="res-meme-name">${v[i].name}</p>
              <div class="res-list">
                <p class="start-date">03/11/2021</p>
                <p>-</p>
                <p class="start-end">03/12/2021</p>
                <p class="res-name">Henry G</p>
              </div>
              <h3 class="form-content subtitle">
                Add a reservation
              </h3>
              <form class="res-form" action="">
                <input class="input is-primary" type="text" placeholder="Your Name"> <br>
                <input class="input is-primary" type="date" name="" id="start-date"> <br>
                <input class="input is-primary" type="date" name="" id="end-date"> <br>
              </form>
              <button class="res-button button is-primary" id="reservation-button">Reservation</button>
            </div>
            <button id="close-modal" class="modal-close is-large" aria-label="close"></button>`;
          resModal.innerHTML = resItem;
          resModal.classList.toggle('is-active');
        }
      }
      if (resModal.classList.contains('is-active')) {
        const closeCard = document.querySelector('#close-modal');
        closeCard.addEventListener('click', (e) => {
          e.preventDefault();
          resModal.classList.remove('is-active');
        });
      }
      // get data from api
    });
  });
});