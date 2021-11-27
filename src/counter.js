const counter = (v) => v.childElementCount;

const memeCount = (memeData, body) => {
  memeData.then((v) => {
    const memes = document.querySelector('#meme-counter');
    memes.innerHTML = `Elements shown ${counter(body)}, Elements recieved ${v.length}`;
  });
};

module.exports = { memeCount, counter };
