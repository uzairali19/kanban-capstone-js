const memeCount = (memeData, body) => {
  memeData.then((v) => {
    const memes = document.querySelector('#meme-counter');
    const bodyCount = body.childElementCount;
    memes.innerHTML = `Elements shown ${bodyCount}, Elements recieved ${v.length}`;
  });
};

const counter = (v) => v.childElementCount;
module.exports = { memeCount, counter };
