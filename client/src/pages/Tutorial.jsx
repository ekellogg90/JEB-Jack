import React from 'react';

const Tutorial = () => {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: 'auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5dc',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
      fontSize: '32px',
      marginBottom: '20px',
      color: '#333',
    },
    section: {
      marginBottom: '20px',
    },
    sectionHeader: {
      fontSize: '24px',
      marginBottom: '10px',
      color: '#444',
    },
    paragraph: {
      fontSize: '18px',
      lineHeight: '1.6',
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Helpful Rules for Jebjack</h1>

      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Main Rules</h2>
        <p style={styles.paragraph}>
          Get to 21, easy. easy? If you draw a tarot card, that card's value is
          now your score for that hand. All Uno and Mahjong have the value they
          display.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Special Cards</h2>
        <p style={styles.paragraph}>
          There are special cards in this game with their own game altering
          mechanics. Hover over the cards to see their attached tooltip.
        </p>
      </div>
    </div>
  );
};

export default Tutorial;
