import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import useHabitStore from '../store/store';

const AddHabitForms = () => {
	const [habitName, setHabitName] = React.useState('');
    const [frequency, setFrequency] = React.useState<'daily' | 'weekly'>('daily');
    const { addHabit, habits } = useHabitStore();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(habitName.trim() === '') return;
        addHabit(habitName, frequency);
        setHabitName('');
    }
    console.log('habits', habits);
	return (
		<form>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<TextField
					label='Habit Name'
					value={habitName}
					onChange={(e) => setHabitName(e.target.value)}
					placeholder='Enter habit name'
					fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel id="frequency">Frequency</InputLabel>
                    <Select
                        labelId="frequency"
                        id="frequency"
                        value={frequency}
                        label="Frequency"
                        onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
                    >
                        <MenuItem value={'daily'}>Daily</MenuItem>
                        <MenuItem value={'weekly'}>Weekly</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" type="submit" onClick={handleSubmit}>Add Habit</Button>
			</Box>
		</form>
	);
};

export default AddHabitForms;
