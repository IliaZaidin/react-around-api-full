function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <h2 className="footer__title">&copy; {year} Ilia Zaidin</h2>
    </footer>
  );
}

export default Footer;