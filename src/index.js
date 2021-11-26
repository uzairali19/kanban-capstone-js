import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import './style.css';
import commentsCard from './comments';

const url = 'https://api.imgflip.com/get_memes';

const getData = async () => {
  const scores = await fetch(url)
    .then((res) => res.json())
    .then((resData) => resData.data.memes)
    .catch((err) => err);
  return scores;
};

const mainBody = document.querySelector('#body');
const modal = document.querySelector('.modal');

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
            id="${v[i].id}"
            class="modal-button button is-primary is-small"
            data-target="modal"
            aria-haspopup="true"
            >
            Comments
            </button>
          <button class="button is-warning is-small">
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
});

function manipulate(e) {
  const item = e.target;

  if (item.classList.contains('modal-button')) {
    modal.classList.add('is-active');
    commentsCard(item.id);
  }
}

mainBody.addEventListener('click', manipulate);
