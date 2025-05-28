import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type frequency = 'daily' | 'weekly' | 'monthly';

export interface Habit {
    id: string;
    name: string;
    frequency: frequency;
    completedDates: string[];
    createdAt: string;
}

interface HabitState {
    habits: Habit[];
    addHabit: (name: string, frequency: frequency) => void;
    removeHabit: (id: string) => void;
    markHabitComplete: (id: string, date: string) => void;
    fetchHabits: () => Promise<void>;
    isLoading: boolean;
    error: string;
}

const useHabitStore = create<HabitState>()(devtools(
    persist((set) => {
    return {
        habits: [],
        isLoading: false,
        error: '',
        fetchHabits: async () => { 
            set({ isLoading: true });
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                set({ isLoading: false });
            } catch {
                set({ error: 'Failed to fetch habits', isLoading: false });
            }
        },
        addHabit: (name, frequency) => set((state) => {
            return {
                habits: [
                    ...state.habits,
                    {
                        id: Math.random().toString(36).substr(2, 9),
                        name,
                        frequency,
                        completedDates: [],
                        createdAt: new Date().toISOString()
                    }
                ]
            }
        }),
        removeHabit: (id) => set((state) => {
            return {
                habits: state.habits.filter((habit) => habit.id !== id)
            }
        }),
        markHabitComplete: (id, date) => set((state) => {
            return {
                habits: state.habits.map((habit) => {
                    if (habit.id === id) {
                        return {
                            ...habit,
                            completedDates: habit.completedDates.includes(date) ? habit.completedDates.filter((d) => d !== date) : [...habit.completedDates, date]
                        }
                    }
                    return habit;
                })
            }
        })
    }
    }, {
        name: 'habits',
    })
));

export default useHabitStore;