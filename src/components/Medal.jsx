import React from 'react';

const Medal = () => {
  return (
    <div style={styles.medalContainer}>
      <h2>Gold Medal</h2>
      <div style={styles.medal}>
        <img src="https://via.placeholder.com/100" alt="Gold Medal" />
      </div>
      <p style={styles.medalDescription}>Awarded for excellence in performance</p>
    </div>
  );
};

const styles = {
  medalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px 0',
  },
  medal: {
    backgroundColor: 'gold',
    borderRadius: '50%',
    padding: '30px',
    margin: '20px',
  },
  medalDescription: {
    fontSize: '18px',
    color: '#333',
  },
};

export default Medal;
