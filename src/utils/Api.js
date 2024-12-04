class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return this._fetch(`/cards`);
  }

  getUserInfo() {
    return this._fetch(`/users/me`);
  }

  editUserInfo({ name, about }) {
    return this._fetch(
      `/users/me`,
      "PATCH",
      JSON.stringify({
        name,
        about,
      })
    );
  }
  editUserAvatar(avatar) {
    return this._fetch(
      `/users/me/avatar`,
      "PATCH",
      JSON.stringify({
        avatar,
      })
    );
  }
  addCard({ name, link }) {
    return this._fetch(
      `/cards`,
      "POST",
      JSON.stringify({
        name,
        link,
      })
    );
  }
  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, "DELETE");
  }
  changeLike(isLiked, cardId) {
    return this._fetch(`/cards/${cardId}/likes`, isLiked ? "DELETE" : "PUT");
  }

  _fetch(endpoint, method = "GET", body) {
    return fetch(this._baseUrl + endpoint, {
      method: method,
      headers: this._headers,
      body: body,
    }).then((res) => {
      if (res.ok) return res.json();
      else Promise.reject(`Error: ${res.status}`);
    });
  }
}
export default Api;
