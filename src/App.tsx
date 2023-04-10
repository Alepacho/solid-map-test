import { Component, createSignal } from 'solid-js';
import { Box, Container, notificationService } from '@hope-ui/solid';

import { Header, Options, Map, ModalCreate } from './components';
import { Point } from './types/Point';
import { OptionClickType } from './components/Options/types';

import { useStore } from './store';

// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
	var R = 6371; // km
	var dLat = toRad(lat2-lat1);
	var dLon = toRad(lon2-lon1);
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}

// Converts numeric degrees to radians
function toRad(Value: number) {
	return Value * Math.PI / 180;
}

const App: Component = () => {
	const [showOptions, setShowOptions] = createSignal(false);
	const [isAddingPoint, setIsAddingPoint] = createSignal(false);
	// const [points, setPoints] = createSignal<Point[]>([]);
	const { points, setPoints } = useStore();
	const store = useStore();

	const [newPointData, setNewPointData] = createSignal<Point>({
		name: "Новая точка",
		time: 30,
		lat: 131.91,
		lng: 43.11
	});
	const [showModal, setShowModal] = createSignal(false);

	const handleAddPoint = () => {
		setIsAddingPoint(!isAddingPoint());
	}

	const handleRun = () => {
		console.log({points})
		let dist = 0

		for (let i = 0; i < points.length - 1; i++) {
			const p1 = points[i];
			const p2 = points[i+1];
			dist += calcCrow(p1.lat, p1.lng, p2.lat, p2.lng);
		}

		let time = (dist / store.speed) * 60;

		notificationService.show({
			duration: 10_000,
			title: "Результат готов! ⚙️",
			description: `Дистанция между точками: ${dist.toFixed(5)} км. Скорость: ${store.speed} км/ч. Время: ${time.toFixed(1)} минут(а).`,
		});
	}

	return <Box>
		<ModalCreate
			isOpen={showModal()}
			onClose={() => {
				setShowModal(false);
			}}
			onSubmit={(data: any) => {
				console.log({data});
				setNewPointData({
					...newPointData(),
					name: data.name,
					time: data.time
				})
				setPoints([...points, newPointData()]);
				setShowModal(false);
				notificationService.show({
					title: "Поздравляю! 🎉",
					description: `Новая точка "${newPointData().name}" успешно добавлена!`,
				});
			}}
		/>
		<Header
			onShowOptions={() => { setShowOptions(true); }}
			onAddPoint={() => handleAddPoint()}
			isAddingPoint={isAddingPoint()}
			onClear={() => { setPoints([]); }}
			onClickProceed={() => handleRun()}
		/>
		<Options
			opened={showOptions()}
			onClick={(type: OptionClickType) => {
				switch (type) {
					case OptionClickType.ADD_POINT: {
						setIsAddingPoint(true);
						setShowOptions(false);
					} break;
				}
			}}
			onClose={() => { setShowOptions(false); }}
		/>
		<Map 
			isAddingPoint={isAddingPoint()}
			onAddPoint={(data) => {
				console.log({data});
				setIsAddingPoint(false);
				setNewPointData({ ...newPointData(), lat: data.lat, lng: data.lng });
				setShowModal(true);
			}}
		/>
	</Box>;
};

export default App;
