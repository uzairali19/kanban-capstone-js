import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import './style.css';

const url = 'https://api.imgflip.com/get_memes';
const api = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mma6q7VN5qNR4YprTjTv/likes';

const getData = async () => {
  const scores = await fetch(url)
    .then((res) => res.json())
    .then((resData) => resData.data.memes)
    .catch((err) => err);
  return scores;
};

const mainBody = document.querySelector('#body');

const likeMeal = async (memeId) => {
  await fetch(api, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      item_id: memeId,
    }),
  });
};

const getLikes = async (api) => {
  const resp = await fetch(api)
    .then((res) => res.json())
    .then((resData) => resData)
    .catch((err) => err);
  return resp;
};

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
            <a id="${v[i].id}" class="level-item like">
              <span class="icon is-small"
                ><i class="fa fa-heart"></i>
              </span> 
            </a>
            <p id="${v[i].id}" class="like-text"></p>
          </div>
        </nav>
        <div class="level">
          <button class="button is-primary is-small">Comments</button>
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
