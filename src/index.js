import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import './style.css';

import commentsCard from './comments';

import { memeCount } from './counter';
import { getData, getLikes, likeMeme } from './apiHandle';


const url = 'https://api.imgflip.com/get_memes';
const api = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mma6q7VN5qNR4YprTjTv/likes';

const mainBody = document.querySelector('#body');
const modal = document.querySelector('.modal');

getData(url).then((v) => {
  for (let i = 0; i < 15; i++) {
    if (v[i].name.length > 40) {
      v[i].name = `${v[i].name.substr(0, 23)}..`;
    }
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
            <a id="${v[i].id}" class="level-item like">
              <span class="icon is-small"
                ><i class="fa fa-heart"></i>
              </span> 
            </a>
            <p id="${v[i].id}" class="like-text"></p>
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

function manipulate(e) {
  const item = e.target;

  if (item.classList.contains('modal-button')) {
    modal.classList.add('is-active');
    commentsCard(item.id);
  }
}

mainBody.addEventListener('click', manipulate);
  memeCount(getData(url), mainBody);
  const likeBtn = document.querySelectorAll('.like');
  const likeText = document.querySelectorAll('.like-text');
  const id = [];
  const likes = [];
  window.addEventListener('load', (e) => {
    e.preventDefault();
    getLikes(api).then((b) => {
      b.forEach((v) => {
        id.push(v.item_id);
        likes.push(v.likes);
      });
      likeText.forEach((text, i) => {
        if (text.id === id[i]) {
          text.innerHTML = `${likes[i]} likes`;
        }
      });
    });
  });

  likeBtn.forEach((v) => {
    v.addEventListener('click', (e) => {
      e.preventDefault();
      likeMeme(api, v.id);
      likeText.forEach((text, i) => {
        if (text.id === v.id) {
          text.innerHTML = `${likes[i] + e.detail} likes`;
        }
      });
      v.style.color = 'red';
    });
  });
});

