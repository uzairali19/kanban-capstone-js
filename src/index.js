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
const modal = document.querySelector('.modal');
const closeModal = document.getElementById('close');

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

function commentsCard(e) {
  const idNumber = e.target;
  const meme = getData();
  if (meme.id === idNumber){
    const commentItems = `
      <div class="card-image">
              <figure class="image is-3by2">
                <img
                  src="https://bulma.io/images/placeholders/1280x960.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img
                      src="https://bulma.io/images/placeholders/96x96.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">John Smith</p>
                  <p class="subtitle is-6">@johnsmith</p>
                </div>
              </div>
    `;  }


}

mainBody.addEventListener('click', manipulate);

function manipulate(e) {
  const item = e.target;
  console.log(item.id);

  if (item.classList.contains('modal-button')) {

    modal.classList.add('is-active');
    commentsCard(item.id);
  }
}

closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.remove('is-active');
});