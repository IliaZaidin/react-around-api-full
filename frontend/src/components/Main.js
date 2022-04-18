import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';

function Main(props) {
  const {
    onEditProfileClick,
    onAddPlaceClick,
    onEditAvatarClick,
    onCardClick,
    updateCardData,
    cards,
    onCardLike,
    onCardDeleteClick
  } = props;

  const currentUserContext = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile"> Profile
        <span className="profile__picture-edit" >
          <img className="profile__picture" src={currentUserContext.avatar} alt={currentUserContext.name || 'avatar'} onClick={onEditAvatarClick} />
        </span>
        <button className="profile__edit-button" type="button" onClick={onEditProfileClick} />
        <button className="profile__add-button" type="button" onClick={onAddPlaceClick}>+</button>
        <h1 className="profile__title">{currentUserContext.name}</h1>
        <p className="profile__subtitle">{currentUserContext.about}</p>
      </section>
      <section className="picture-grid">
        {
          cards.map((element) => (
            <Card
              key={element._id}
              card={element}
              onClick={onCardClick}
              updateCardData={updateCardData}
              onCardLike={onCardLike}
              onCardDeleteClick={onCardDeleteClick}
            />
          ))
        }
      </section>
    </main>
  );
}

export default Main;