const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    marginTop: '300px',
  };

  return (
    <footer style={footerStyle}>
      <em>
        Note app: Department of Computer Science, University of Helsinki 2002
      </em>
    </footer>
  );
};

export default Footer;
