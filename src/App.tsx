import { Box, Container, Typography } from '@mui/material'
import useHabitStore from './store/store'
import AddHabitForms from './components/addHabitForms'
import HabitList from './components/habitList'
import { useEffect } from 'react';
import './App.css';

function App() {
  const {fetchHabits, isLoading} = useHabitStore()
  useEffect(() => {
    fetchHabits()
  }, [])
  return (
		<Container>
			<p className='text-amber-300'>test</p>
			<Box>
				{isLoading && <Typography variant='h3'>Loading...</Typography>}
				<Typography variant='h2'>Habit Tracker</Typography>
				{/* Form */}
				<AddHabitForms />
				{/* List of Habits */}
				<HabitList />
			</Box>
		</Container>
	);
}

export default App
