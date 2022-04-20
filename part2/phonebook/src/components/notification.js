const Notification = ({ notificationInfo }) => {
  if (notificationInfo === null) return null;

  const messageStyle = {
    color: 'green',
    borderRadius: '3px',
    borderStyle: 'solid',
    backgroundColor: 'lightgray',
    fontSize: '15px',
    padding: '15px',
  };

  const errorStyle = {
    color: 'red',
    backgroundColor: 'lightgray',
    borderRadius: '3px',
    borderStyle: 'solid',
    fontSize: '15px',
    padding: '15px',
  };

  return (
    <aside
      style={notificationInfo.isError ? errorStyle : messageStyle}
    >
      {notificationInfo.message}
    </aside>
  );
};

export default Notification;
