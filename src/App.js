import React, { useState, useEffect } from 'react';
import styles from './App.css';
import axios from 'axios';
import Navigation from './components/navigation/Navigation';
import MissionDescription from './components/missionDescription/MissionDescription';
import MissionShips from './components/missionShips/MissionShips';
import missionURL from './config';

function App() {
	const [missionNumber, setMissionNumber] = useState(0);
	const [missionDetails, setMissionDetails] = useState();
	const [knowsMissionShips, setKnowsMissionShips] = useState([]);
	const [currentMissionShips, setCurrentMissionShips] = useState([]);
	const [loading, setLoading] = useState(true);
	const [handleCountServerError500, setHandleCountServerError500] = useState(0)

	useEffect(() => {
		getMission();
	}, [missionNumber]);

	const fetchLaunchesSpaceX = async () => {
		try {
			const res = await axios.get(missionURL + missionNumber);
			return res.data[0];
		} catch (err) {
			console.log(err);
		}
	};

	const fetchShip = async shipId => {
		try {
			const res = await axios.get(
				'https://api.spacex.land/rest/ship/' + shipId
			);
			const shipDetails = res.data;
			const ship = {
				id: shipDetails.id,
				name: shipDetails.name,
				homePort: shipDetails.home_port,
				image: shipDetails.image,
				weight: shipDetails.weight_kg,
			};
			setCurrentMissionShips(prev => [...prev, ship]);
			setKnowsMissionShips(prev => [...prev, { [shipId]: ship }]);
		} catch (err) {
			return false;
		}
	};

	const getMission = async () => {
		setLoading(true);
		try {
			const newMission = await fetchLaunchesSpaceX();
			setMissionDetails(newMission);
			if ( newMission.ships ){
				const allShipsIds = newMission.ships.map(x =>  x && x.id);
				if (allShipsIds.length !== 0) {
				const curentIds = knowsMissionShips.map(x => Object.keys(x)[0]);
					allShipsIds.forEach((id, index) => {
						if (!curentIds.includes(id)) {
							fetchShip(id);
						} else {
							const currentShip = knowsMissionShips.find(y =>
								Object.keys(y).includes(id)
							);
							setCurrentMissionShips(prev => [...prev, currentShip[id]]);
						}
						if (index === allShipsIds.length - 1) {
							setLoading(false);
						}
					});
				} else {
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		} catch (err) {
			if( handleCountServerError500 < 8 ){
				console.log(handleCountServerError500)
				setTimeout(() => {
					setHandleCountServerError500(prev => prev + 1);
					getMission();
				}, 2000);
			} else {
				alert("Serwer is overloded: please make refresh this website.")
			}
		}
	};

	const handleMissionChange = direction => {
		if (!(missionNumber === 0 && direction === -1) && loading === false) {
			setHandleCountServerError500(0);
			setMissionDetails(null);
			setCurrentMissionShips([]);
			setMissionNumber(prev => prev + direction);
		}
	};

	return (
		<div className={`App ${styles.mainSection} container`}>
			<Navigation
				onHandleMissionChange={handleMissionChange}
				missionNumber={missionNumber}
			/>
			<MissionDescription missionDetails={missionDetails} />
			<MissionShips missionShips={currentMissionShips} loading={loading} />
		</div>
	);
}

export default App;
