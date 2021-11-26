const memeCount = (memeData) => {
  memeData.then((v) => {
    const memes = document.querySelector('#meme-counter');
    for (let i = 0; i < 15; i++) {
      memes.innerHTML = `Elements shown ${i + 1}, Elements recieved ${v.length}`;
      count++;
    }
  });
};

const counter = (v) => {
  return v.childElementCount;
};

module.exports = { memeCount, counter };
