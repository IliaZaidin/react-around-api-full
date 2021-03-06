import { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const {
    isOpen,
    onClose,
    onUpdateUser
  } = props;

  const currentUser = useContext(CurrentUserContext);
  const [profileName, setProfileName] = useState('');
  const [profileJob, setProfileJob] = useState('');

  function handleProfileNameChange(event) {
    setProfileName(event.target.value);
  }

  function handleProfileJobChange(event) {
    setProfileJob(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: profileName,
      about: profileJob,
    });
  }

  useEffect(() => {
    setProfileName(currentUser.name || '');
    setProfileJob(currentUser.about || '');
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      buttonText="Save"
      headerText="Edit profile"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Input
        inputName="profile_name"
        type="name"
        value={profileName}
        placeholder="Full name"
        onChange={handleProfileNameChange}
      />

      <Input
        inputName="profile_job"
        type="about"
        value={profileJob}
        placeholder="Occupation"
        onChange={handleProfileJobChange}
      />
    </PopupWithForm>
  )
}