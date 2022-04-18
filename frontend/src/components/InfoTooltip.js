import failure from '../images/failure.png';
import success from '../images/success.png';

function InfoTooltip(props) {
  const {
    isOpen,
    onClose,
    isRegistered
  } = props;

  function preventBubbling(event) {
    event.stopPropagation();
  }

  return (
    <section className={`popup ${isOpen && 'popup_is_opened'}`} onMouseDown={onClose}>
      <div className={`popup__wrapper popup__wrapper_type_tooltip`} onMouseDown={preventBubbling}>
        <button className={`popup__close`} onClick={onClose} type="button">&#10005;</button>
        {
          isRegistered ?
            <>
              <img src={success} alt="V sign"></img>
              <h2 className={`popup__title popup__title_type_tooltip`}>Success! You have now been registered.</h2>
            </> :
            <>
              <img src={failure} alt="X sign"></img>
              <h2 className={`popup__title popup__title_type_tooltip`}>Oops, something went wrong! Please try again.</h2>
            </>
        }
      </div>
    </section>
  );
}

export default InfoTooltip;