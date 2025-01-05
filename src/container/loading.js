import React from 'react';

const styles = {
  container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f9f9f9',
      flexDirection: 'column'
  },
  image: {
      width: '200px', 
      height: '200px',
  },
  text: {
    fontSize: '2rem',
    fontWeight: '600',
    fontFamily: 'monospace'
  }
};

const Loading = () => {
  return (
      <div style={styles.container}>
          <img src="/logo.gif" alt="Loading..." style={styles.image} />
          {/* <span style={styles.text}>Vui lòng chờ</span> */}
      </div>
  );
};
export default Loading;