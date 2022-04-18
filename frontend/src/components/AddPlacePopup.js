import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';

export default function AddPlacePopup(props) {
  const {
    isOpen,
    onClose,
    onAddPlaceSubmit
  } = props;
  const [cardTitle, setCardTitle] = useState('');
  const [cardLink, setCardLink] = useState('');

  useEffect(() => {
    setCardTitle('');
    setCardLink('');
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlaceSubmit({
      name: cardTitle,
      link: cardLink,
    });
  }

  function handleCardTitleChange(event) {
    setCardTitle(event.target.value);
  }

  function handleCardLinkChange(event) {
    setCardLink(event.target.value);
  }

  return (
    <PopupWithForm
      name='card'
      buttonText='Create'
      headerText="New place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >

      <Input
        inputName="card_title"
        type="title"
        placeholder="Title"
        onChange={handleCardTitleChange}
        value={cardTitle}
      />

      <Input
        inputName="card_link"
        type="link"
        placeholder="Image link"
        onChange={handleCardLinkChange}
        value={cardLink}
      />

    </PopupWithForm>
  )
}