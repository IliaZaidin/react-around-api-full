import { Link } from "react-router-dom";

function Menu(props) {
  const {
    email,
    isOpen,
    handleLogout
  } = props;

  return (
    <div className={`menu ${isOpen && 'menu_is_opened'}`}>
      <h2 className="menu__title">{email}</h2>
      <Link className="menu__link" to='/signin' onClick={handleLogout}>Log out</Link>
    </div>
  );
}
export default Menu;