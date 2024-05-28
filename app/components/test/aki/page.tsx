'use client';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option) ? prev.filter(opt => opt !== option) : [...prev, option]
    );
  };

  const handleSubmit = () => {
    alert(`Selected options: ${selectedOptions.join(', ')}`);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>BurgerNator</h1>
      </header>
      <main style={styles.main}>
        <div style={styles.questionContainer}>
          <h2 style={styles.question}>質問1/5:</h2>
          <p style={styles.subQuestion}>お風呂いつ入りますか？（複数選択可）</p>
        </div>
        <div style={styles.optionsContainer}>
          {['朝', '昼', '夜'].map(option => (
            <button
              key={option}
              style={{
                ...styles.optionButton,
                backgroundColor: selectedOptions.includes(option) ? '#f4a261' : '#f1faee',
              }}
              onClick={() => handleOptionToggle(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button style={styles.submitButton} onClick={handleSubmit}>
          決定
        </button>
      </main>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#1d3557',
    color: '#f4a261',
  },
  header: {
    width: '100%',
    textAlign: 'center' as 'center',
    backgroundColor: '#1d3557',
    padding: '10px 0',
  },
  title: {
    fontSize: '2.5em',
    margin: '0',
  },
  main: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    backgroundColor: '#f1faee',
    padding: '20px',
    borderRadius: '10px',
  },
  questionContainer: {
    textAlign: 'center' as 'center',
    marginBottom: '20px',
  },
  question: {
    fontSize: '1.5em',
    margin: '0',
    color: '#000', // ここで質問のテキストを黒色に設定
  },
  subQuestion: {
    fontSize: '1em',
    margin: '0',
    color: '#000',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    width: '80%',
    padding: '10px 0',
    margin: '10px 0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#f4a261',
    color: '#1d3557',
    border: 'none',
    padding: '10px 20px',
    margin: '20px 0 0 0',
    fontSize: '1em',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default App;
/*
ReactDOM.render(<App />, document.getElementById('root'));
*/