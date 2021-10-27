import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ship from './ship/Ship';
import styles from './MissionShips.module.css';
import LoadingPage from '../loadingPage/LoadingPage';

function MissionShips(props) {
	const [missionShips, setMissionShips] = useState();

	useEffect(() => {
		if (props.missionDetails) {
			setMissionShips();
			const arrayShipsId = props.missionDetails.ships;
			if (arrayShipsId.length > 0) {
				async function fetchData() {
					const acceptedMovies = await setAllMisionShips(arrayShipsId);
					setMissionShips(acceptedMovies);
				}
				fetchData();
			} else {
				setMissionShips(null);
			}
		}
	}, [props.missionDetails]);

	const fetchMissionShips = async shipId => {
		try {
			const res = await axios.get(
				'https://api.spacex.land/rest/ship/' + shipId
			);
			const shipDetails = res.data;
			console.log(shipDetails)
			const ship = {
				id: shipDetails.id,
				name: shipDetails.name,
				homePort: shipDetails.home_port,
				image: shipDetails.image,
				weight: shipDetails.weight_kg,
			};
			return ship;
		} catch (err) {
			return false;
		}
	};
	const setAllMisionShips = async arrayShipsId => {
		let missionShipDetails = [];
		for (const shipId of arrayShipsId) {
			if (shipId) {
				const ship = await fetchMissionShips(shipId.id);
				if (ship) {
					missionShipDetails.push(ship);
				}
			}
		}
		return missionShipDetails;
	};

	return (
		<div className={styles.section}>
			{missionShips ? (
				<>
					<h6>rescue ships</h6>
					{missionShips.map(ship => (
						<Ship ship={ship} key={ship.id}/>
					))}
				</>
			) : (
				(missionShips === null) ?  <p>no ships</p> : <LoadingPage/> 
			)}
		</div>
	);
}

export default MissionShips;
