import useHabitStore, { Habit } from '../store/store';
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HabitList = () => {
    const { habits, removeHabit, markHabitComplete } = useHabitStore();
    const today = new Date().toISOString().split('T')[0];
    const getProgress = (habit: Habit) => { 
        let progress = 0;
        const currentDate = new Date();

        while (true) {
            const dateString = currentDate.toISOString().split('T')[0]
            if (habit.completedDates.includes(dateString)) {
                progress++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }
        return progress;
    }
    console.log(habits)
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
			{habits?.map((habit) => (
				<Paper
					key={habit.id}
					elevation={2}
					sx={{ p: 2 }}
				>
					<Grid
						container
						alignItems='center'
					>
						<Grid
							xs={12}
							sm={6}
						>
							<Typography variant='h6'>{habit.name}</Typography>
							<Typography
								variant='body2'
								color='text.secondary'
							>
								{habit.frequency}
							</Typography>
						</Grid>
						<Grid
							xs={12}
							sm={6}
						>
							<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                <Button variant='outlined' color={habit.completedDates.includes(today) ? 'success' : 'primary'}  onClick={() => markHabitComplete(habit.id, today)}>
                                    {habit.completedDates.includes(today) ? 'Completed' : 'Mark Complete'}
                                    </Button>
								<Button
									variant='outlined'
                                    color='error'
                                    onClick={() => removeHabit(habit.id)}
								>
									Remove
								</Button>
							</Box>
						</Grid>
                    </Grid>
                    <Box>
                        <Typography>Status : {getProgress(habit)/30 * 100}</Typography>
                        <LinearProgress
                            variant='determinate'
                            value={getProgress(habit)}
                        />
                    </Box>
				</Paper>
			))}
		</Box>
	);
};

export default HabitList;
