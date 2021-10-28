import React, { useState, useEffect } from 'react';
import styles from './App.css';
import axios from 'axios';
import Navigation from './components/navigation/Navigation';
import MissionDescription from './components/missionDescription/MissionDescription';
import MissionShips from './components/missionShips/MissionShips';

function App() {
	const [missionNumber, setMissionNumber] = useState(0);
	const [missionDetails, setMissionDetails] = useState();

	useEffect(() => {
		async function fetchData() {
			await setMission();
		}
		fetchData();
	}, [missionNumber]);

	const fetchLaunchesSpaceX = async () => {
		try {
			const res = await axios.get(
				'https://api.spacex.land/rest/launches-past?apoapsis_km=0&block=0&cap_serial=string&capsule_reuse=string&core_flight=0&core_reuse=string&core_serial=string&customer=string&eccentricity=0&end=&epoch=&fairings_recovered=string&fairings_recovery_attempt=string&fairings_reuse=string&fairings_reused=string&fairings_ship=string&gridfins=string&id=&inclination_deg=0&land_success=string&landing_intent=string&landing_type=string&landing_vehicle=string&launch_date_local=&launch_date_utc=&launch_success=string&launch_year=string&legs=string&lifespan_years=0&longitude=0&manufacturer=string&mean_motion=0&mission_id=string&mission_name=string&nationality=string&norad_id=0&orbit=string&payload_id=string&payload_type=string&periapsis_km=0&period_min=0&raan=0&reference_system=string&regime=string&reused=string&rocket_id=string&rocket_name=string&rocket_type=string&second_stage_block=string&semi_major_axis_km=0&ship=string&side_core1_reuse=string&side_core2_reuse=string&site_id=string&site_name_long=string&site_name=string&start=&tbd=string&tentative_max_precision=string&tentative=string&limit=1&offset=' +
					missionNumber
			);
			return res.data[0];
		} catch (err) {
			console.log(err);
		}
	};
	const setMission = async () => {
		try {
			const missionDetails = await fetchLaunchesSpaceX();
			setMissionDetails(missionDetails);
			console.log(missionDetails);
		} catch (err) {
			console.log(err);
		}
	};
	const previousMission = () => {
		if (missionNumber !== 0) {
			setMissionNumber(missionNumber - 1);
		} else {
			console.log('oglądasz ostatnią misję');
		}
	};
	const nextMission = () => {
			setMissionNumber(missionNumber + 1);
	};
	return (
		<div className={`App ${styles.mainSection} container`}>
			<Navigation onPreviousMission={previousMission} onNextMission={nextMission} missionNumber={missionNumber}/>
			<MissionDescription missionDetails={missionDetails}/>
			<MissionShips missionDetails={missionDetails}/>
		</div>
	);
}

export default App;
