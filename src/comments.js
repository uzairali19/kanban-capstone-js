const url = 'https://api.imgflip.com/get_memes';
const commenturl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mma6q7VN5qNR4YprTjTv/comments';

const getData = async () => {
  const memes = await fetch(url)
    .then((res) => res.json())
    .then((resData) => resData.data.memes)
    .catch((err) => err);
  return memes;
};

const board = (comment) => {
  const myList = document.getElementById('commentList');
  const listELement = document.createElement('p');
  listELement.innerHTML = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
  myList.appendChild(listELement);
};
const loadComments = (comments) => {
  comments.forEach((comment) => board(comment));
};

const getComments = async () => {
  const itemId = document.getElementById('thismemeId').value;
  const geturl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mma6q7VN5qNR4YprTjTv/comments?item_id=${itemId}`;
  const request = await fetch(geturl);
  const comments = await request.json();
  loadComments(comments);
};

const addComment = async () => {
  const newComment = {
    username: document.getElementById('name').value,
    comment: document.getElementById('comment').value,
    item_id: document.getElementById('thismemeId').value,
  };
  (
    await fetch(commenturl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newComment),
    })
  );
};

const cardJS = document.querySelector('#cardJS');
const modal = document.querySelector('.modal');
const closeModal = document.getElementById('close');
const thismemeId = document.getElementById('thismemeId');
const commentBtn = document.getElementById('btn-comment');
const myList = document.getElementById('commentList');

export default function commentsCard(e) {
  const itemID = e;
  const memes = getData();
  memes.then((v) => {
    v.forEach((meme) => {
      if (meme.id === itemID) {
        const commentItem = `
           <div id="${meme.id}" class="card-image">
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
            </div>              
              `;
        const cardItem = document.createElement('div');
        cardItem.innerHTML = commentItem;
        cardJS.appendChild(cardItem);
        thismemeId.value = meme.id;
        getComments();
      }
    });
  });
}

commentBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addComment();
  document.getElementById('form').reset();
});

closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.remove('is-active');
  cardJS.innerHTML = '';
  myList.innerHTML = '';
});
