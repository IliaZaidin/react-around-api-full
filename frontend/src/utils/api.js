class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(this._checkResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse);
  }

  updateProfilePicture(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then(this._checkResponse);
  }

  like(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then(this._checkResponse);
  }

  unlike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://api.around.zaidin.online"
  // baseUrl: "http://localhost:3000"
});

export default api;
