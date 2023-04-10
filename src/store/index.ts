// https://raqueebuddinaziz.com/blog/state-management-in-solid-js/
import create from 'solid-zustand';
import { Point } from '../types/Point'

export interface AppStore {
	speed: number,
	points: Point[],
	setSpeed: (value: number) => void,
	setPoints: (data: Point[]) => void
}

export const useStore = create<AppStore>()((set) => ({
	speed: 4.0, // Средняя скорость человека во время ходьбы (км/час)
	points: [],
	setSpeed: (value: number) => set(state => ({ speed: value })),
	setPoints: (data: Point[]) => set(state => ({ points: data }))
}));