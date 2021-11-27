const getData = async (url) => {
  const scores = await fetch(url)
    .then((res) => res.json())
    .then((resData) => resData.data.memes)
    .catch((err) => err);
  return scores;
};

const likeMeme = async (api, memeId) => {
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

module.exports = { getData, getLikes, likeMeme };
