
'use client';
import React, { useState } from 'react';

interface Schedule {
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    description: string;
}

export const ScheduleForm: React.FC = () => {
    const [schedule, setSchedule] = useState<Schedule>({
        title: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchedule({
            ...schedule,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button style={styles.button}>cancel</button>
                <div>New Schedule</div>
                <button style={styles.button}>create</button>
            </div>
            <div style={styles.formGroup}>
                <input
                    type="text"
                    name="title"
                    value={schedule.title}
                    onChange={handleChange}
                    placeholder="Title"
                    style={styles.input}
                />
                <input
                    type="date"
                    name="startDate"
                    value={schedule.startDate}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="time"
                    name="startTime"
                    value={schedule.startTime}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="date"
                    name="endDate"
                    value={schedule.endDate}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="time"
                    name="endTime"
                    value={schedule.endTime}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="text"
                    name="description"
                    value={schedule.description}
                    onChange={handleChange}
                    placeholder="Description"
                    style={styles.input}
                />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: '100%',
        padding: '10px',
        backgroundColor: '#3366FF' // Adjust your blue color here
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        padding: '10px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '90%',
        padding: '10px',
        margin: '5px',
        border: 'none',
        borderRadius: '5px'
    },
    button: {
        color: 'white',
        backgroundColor: 'transparent',
        border: 'none'
    }
};
