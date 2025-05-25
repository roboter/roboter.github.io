import { useState } from 'react';
import styles from './Counter.module.css';

export default function ReactCounter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Interactive Counter</h3>
      
      <p className={styles.description}>
        Try the buttons below or type something
      </p>
      
      {/* Counter Section */}
      <div className={styles.counterSection}>
        <button 
          onClick={() => setCount(c => c - 1)}
          aria-label="Decrement"
          className={styles.button}
        >-</button>
        
        <span className={styles.counterDisplay}>{count}</span>
        
        <button 
          onClick={() => setCount(c => c + 1)}
          aria-label="Increment"
          className={styles.button}
        >+</button>
      </div>

      {/* Input Section */}
      <div className={styles.inputSection}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something here..."
          aria-label="Text input"
          className={styles.input}
        />
        <p className={styles.inputMessage}>
          {inputValue ? `You typed: ${inputValue}` : 'Waiting for your input...'}
        </p>
      </div>
    </div>
  );
}