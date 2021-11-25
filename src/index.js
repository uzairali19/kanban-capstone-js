import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import './style.css';
import { forEach } from 'lodash';

const url = 'https://api.imgflip.com/get_memes';

const getData = async () => {
  const scores = await fetch(url)
    .then((res) => res.json())
    .then((resData) => resData.data.memes)
    .catch((err) => err);
  return scores;
};

const cardJS = document.querySelector('#cardJS');
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
  const itemID = e;
  let memes = getData();
  memes.then((v) => {
    v.forEach((meme) => {
      if (meme.id === itemID){
         console.log(meme.id);
         const commentItem = `
           <div class="card-image">
              <figure class="image is-3by2">
                <img
                  src="${meme.url}"
                  alt="Placeholder image"
                />
              </figure>              
            </div>
            <div class="card-content">
              
                <div class="content">
                  <h2 class="subtitle is-3 is-spaced ">Name: ${meme.name}</h2>
                  <p>height: ${meme.height}  Width: ${meme.width}</p>
                  <p>Box count: ${meme.box_count}</p>

                  
                </div>

                <div class="content">
                  <h2 class="subtitel is-4 is-spaced" > Comments (2)</h2>
                  <p>03/11/2021 Uzair: So funny!</p>
                  <p>21/11/2021 Grace: Mhhhhhhh!!!</p>
                </div>
              </div>
              
              
              `;
         const cardItem = document.createElement('div');
         cardItem.innerHTML = commentItem;
         cardJS.appendChild(cardItem);
      }
     
    });
    console.log(v[10].url);
  });
}

mainBody.addEventListener('click', manipulate);

function manipulate(e) {
  let item = e.target;

  if (item.classList.contains('modal-button')) {
    modal.classList.add('is-active');
    commentsCard(item.id);
  }
}

closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.remove('is-active');
});
