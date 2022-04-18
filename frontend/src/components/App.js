import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Login from './Login';
import Register from './Register';
import api from '../utils/api';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
// import Menu from './Menu';
import auth from '../utils/auth';

export default function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const [cardData, setCardData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    api.getUserData()
      .then(data => {
        if (data.email) {
          setLoggedIn(true);
          setEmail(data.email);
          setCurrentUser(data);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log("Error: ", err.status, err.statusText);
      });

    api.getCards()
      .then(data => {
        setCards(data);
      })
      .catch((err) => {
        console.log("Error: ", err.status, err.statusText);
      });

  }, [history])


useEffect(() => {
  const closeByEscape = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  };
  document.addEventListener('keydown', closeByEscape);
  return () => document.removeEventListener('keydown', closeByEscape);
}, [])

function handleEditAvatarClick() {
  setEditAvatarPopupOpen(true);
}

function handleEditProfileClick() {
  setEditProfilePopupOpen(true);
}

function handleAddPlaceClick() {
  setAddPlacePopupOpen(true);
}

function handleCardClick() {
  setCardPopupOpen(true);
}

function handleCardDeleteClick(card) {
  setDeleteConfirmationOpen(true);
  setCardToDelete(card);
}

function closeAllPopups() {
  setEditAvatarPopupOpen(false);
  setEditProfilePopupOpen(false);
  setAddPlacePopupOpen(false);
  setCardPopupOpen(false);
  setDeleteConfirmationOpen(false);
}

function handleCardData(cardData) {
  setCardData(cardData);
}

function handleUpdateUser(inputData) {
  api.editProfile(inputData.name, inputData.about)
    .then(data => {
      setCurrentUser(data);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      console.log("Error: ", err.status, err.statusText);
    });
}

function handleUpdateAvatar(inputData) {
  api.updateProfilePicture(inputData.avatar)
    .then(data => {
      setCurrentUser(data);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      console.log("Error: ", err.status, err.statusText);
    });
}

function toggleLike(card) {
  setCards(cards =>
    cards.map(element =>
      element._id === card._id ? card : element
    ))
}

function handleCardLike(card) {
  const isLiked = card.likes.some(owner => owner.toString() === currentUser._id);
  if (!isLiked) {
    api.like(card._id.toString())
      .then(card => {
        toggleLike(card);
      })
      .catch((err) => {
        console.log("Error: ", err.status, err.statusText);
      });
  } else {
    api.unlike(card._id.toString())
      .then(card => {
        toggleLike(card);
      })
      .catch((err) => {
        console.log("Error: ", err.status, err.statusText);
      });
  }
}

function handleCardDelete(event) {
  event.preventDefault();
  api.deleteCard(cardToDelete._id)
    .then(() =>
      setCards(cards =>
        cards.filter(element =>
          element._id !== cardToDelete._id)
      ))
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      console.log("Error: ", err.status, err.statusText);
    });
}

function handleAddPlaceSubmit(cardData) {
  api.addCard(cardData.name, cardData.link)
    .then(newCard =>
      setCards([newCard, ...cards]),
    )
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      console.log("Error: ", err.status, err.statusText);
    });
}

// Authentication functions
function handleMenuOpen() {
  setMenuOpen(true);
}

function handleMenuClose() {
  setMenuOpen(false);
}

function handleEmail(event) {
  setEmail(event.target.value)
}

function handlePassword(event) {
  setPassword(event.target.value)
}

function handleRegister(event) {
  event.preventDefault();
  auth.register(email, password)
    .then((response) => {
      console.log(response);
      if (response.email === email) {
        setRegistered(true);
      }
    })
    .catch((err) => {
      console.log("Error: ", err.status, err.statusText);
      setRegistered(false);
    })
    .finally(() => {
      setTooltipOpen(true);
    })
}

function handleLogin(event) {
  event.preventDefault();
  auth.login(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
      }
    })
    .then(() => {
      setLoggedIn(true);
      history.push("/");
    })
    .catch((err) => {
      console.log("Error: ", err.status, err.statusText);
    });
}

function handleLogout() {
  localStorage.removeItem('jwt');
  setLoggedIn(false);
  setEmail('');
  history.push("/signin");
}

function handleTooltipClose() {
  setTooltipOpen(false);
  setRegistered(false);
}

return (
  <div className="page" >
    <div className="page__wrapper" >
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={email}
          isLoggedIn={isLoggedIn}
          isMenuOpen={isMenuOpen}
          closeMenu={handleMenuClose}
          openMenu={handleMenuOpen}
          handleLogout={handleLogout}
        />
        <Switch>
          <Route path="/signup">
            <Register
              email={email}
              password={password}
              handleRegister={handleRegister}
              handleEmail={handleEmail}
              handlePassword={handlePassword}
            />
          </Route>

          <Route path="/signin">
            <Login
              email={email}
              password={password}
              setEmail={setEmail}
              setLoggedIn={setLoggedIn}
              handleLogin={handleLogin}
              handleEmail={handleEmail}
              handlePassword={handlePassword}
            />
          </Route>

          <ProtectedRoute
            exact path="/"
            component={Main}
            isLoggedIn={isLoggedIn}
            setCurrentUser={setCurrentUser}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            updateCardData={handleCardData}
            cards={cards}
            setCards={setCards}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleCardDeleteClick}
          />

          <Route path='*'>
            <Redirect to='/' />
          </Route>

        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <ConfirmDeletePopup
          isOpen={isDeleteConfirmationOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />
        <ImagePopup
          onClose={closeAllPopups}
          isOpen={isCardPopupOpen}
          cardData={cardData}
        />
        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={handleTooltipClose}
          isRegistered={isRegistered}
        />
        <Footer />
      </CurrentUserContext.Provider >
    </div>
  </div>
)
};
