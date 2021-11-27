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
  function numberOfReservations(content) {
    let myCount = content.length;
    const resNo = document.getElementById('resNo');
    if (myCount === undefined) {
      myCount = 0;
    }
    resNo.innerText = `Count (${myCount})`;
  }
  reserve.forEach((res) => {
    res.addEventListener('click', (e) => {
      const getData = async (id) => {
        const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mma6q7VN5qNR4YprTjTv/reservations?item_id=${id}`;
        const data = await fetch(url);
        const content = await data.json();
        numberOfReservations(content);
        return content;
      };

      const addReservation = (id) => {
        const reservationList = document.querySelector('.res-list');
        getData(id).then((data) => {
          reservationList.innerHTML = '';
          data.forEach((e) => {
            reservationList.innerHTML += `
            <p>${e.date_end} to ${e.date_start} by ${e.username}</p>`;
          });
        });
      };
      e.preventDefault();

      const cardItem = e.target;
      for (let i = 0; i < 15; i++) {
        if (v[i].id === cardItem.id) {
          const resItem = `
            <div class="modal-background"></div>
            <div class="modal-content">
              <img class="res-img" src="${v[i].url}" alt="">
              <p class="res-meme-name">${v[i].name}</p>
              <h3 id="resNo" class="counter">Count</h3>
              <div class="res-list">
              </div>
              <h3 class="form-content subtitle">
                Add a reservation
              </h3>
              <form class="res-form" action="#">
                <input id="name" class="input is-primary" type="text" placeholder="Your Name" name="user"> <br>
                <input class="input is-primary" type="date" name="" id="start-date"> <br>
                <input class="input is-primary" type="date" name="" id="end-date"> <br>
              </form>
              <button type="submit" class="res-button button is-primary" data-id="${v[i].id}" id="reservation-button">Reservation</button>
            </div>
            <button id="close-modal" class="modal-close is-large" aria-label="close"></button>`;

          resModal.innerHTML = resItem;
          addReservation(v[i].id);
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
      const createReservation = async (id) => {
        const username = document.getElementById('name').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const dataObj = {
          item_id: id,
          username,
          date_start: startDate,
          date_end: endDate,
        };

        const data = await fetch(
          'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mma6q7VN5qNR4YprTjTv/reservations',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataObj),
          },
        );
        return data;
      };
      const btn = document.getElementById('reservation-button');
      btn.addEventListener('click', () => {
        createReservation(btn.dataset.id).then((data) => {
          if (data.status === 201) {
            addReservation(btn.dataset.id);
          }
        });
      });
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
