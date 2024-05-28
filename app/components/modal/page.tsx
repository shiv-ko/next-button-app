import React from 'react';
import { ScheduleForm } from './modal';

const App: React.FC = () => {
    return (
        <div style={{ backgroundColor: '#3366FF', height: '100vh', width: '100%' }}>
            <ScheduleForm />
            
            
        </div>
    );
};

/*
<footer style={styles.navBar}>
                <button style={styles.navButton}>Home</button>
                <button style={styles.navButton}>Calendar</button>
                <button style={styles.navButton}>ToDo</button>
                <button style={styles.navButton}>Memories</button>
</footer>
*/
const styles = {
    navBar: {
        position: 'fixed' as const,
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#003366', // Adjust your darker blue color here
        color: 'white',
        padding: '10px 0'
    },
    navButton: {
        border: 'none',
        backgroundColor: 'transparent',
        color: 'white'
    }
};

export default App;
