// const showCard = (item,data) => {
//   const showItem = item;
//   let memes = data;
//   memes.then((v) => {
//     v.forEach((meme) => {
//       if (meme.id === showItem.id){
//         const resItem = `
//         <div id="res-modal" class="modal">
//         <div class="modal-background"></div>
//         <div class="modal-content">
//           <img class="res-img" src="${meme.url}" alt="">
//           <p class="res-meme-name">Meme name</p>
//           <div class="res-list">
//             <p class="start-date">03/11/2021</p>
//             <p>-</p>
//             <p class="start-end">03/12/2021</p>
//             <p class="res-name">Henry G</p>
//           </div>
//           <h3 class="form-content subtitle">
//             Add a reservation
//           </h3>
//           <form class="res-form" action="">
//             <input class="input is-primary" type="text" placeholder="Your Name"> <br>
//             <input class="input is-primary" type="date" name="" id="start-date"> <br>
//             <input class="input is-primary" type="date" name="" id="end-date"> <br>
//           </form>
//           <button class="res-button button is-primary" id="reservation-button"></button>
//         </div>
//         <button id="close-modal" class="modal-close is-large" aria-label="close"></button>
//       </div>`;

//       }
//       });
//     });
//   }

//  export default showCard