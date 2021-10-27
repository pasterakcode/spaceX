import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [startsOffset, setStartsOffset] = useState(0);
	const [mission, setMission] = useState();
	const [missionShips, setMissionShips] = useState();

	// useEffect(() => {
	// 	async function fetchData() {
	// 		await setAllInformationAboutMisionAndShips();
	// 	}
	// 	fetchData();
	// }, [startsOffset]);

	const fetchLaunchesSpaceX = async () => {
		try {
			const res = await axios.get(
				'https://api.spacex.land/rest/launches-past?apoapsis_km=0&block=0&cap_serial=string&capsule_reuse=string&core_flight=0&core_reuse=string&core_serial=string&customer=string&eccentricity=0&end=&epoch=&fairings_recovered=string&fairings_recovery_attempt=string&fairings_reuse=string&fairings_reused=string&fairings_ship=string&gridfins=string&id=&inclination_deg=0&land_success=string&landing_intent=string&landing_type=string&landing_vehicle=string&launch_date_local=&launch_date_utc=&launch_success=string&launch_year=string&legs=string&lifespan_years=0&longitude=0&manufacturer=string&mean_motion=0&mission_id=string&mission_name=string&nationality=string&norad_id=0&orbit=string&payload_id=string&payload_type=string&periapsis_km=0&period_min=0&raan=0&reference_system=string&regime=string&reused=string&rocket_id=string&rocket_name=string&rocket_type=string&second_stage_block=string&semi_major_axis_km=0&ship=string&side_core1_reuse=string&side_core2_reuse=string&site_id=string&site_name_long=string&site_name=string&start=&tbd=string&tentative_max_precision=string&tentative=string&limit=1&offset=' +
					startsOffset
			);
			const missionDetails = res.data[0];
			const mission = {
				missionName: missionDetails.mission_name,
				missionRocket: missionDetails.rocket.rocket_name,
				missionRocketIsRecovered: missionDetails.rocket.fairings.recovered,
				missionLunchDate: setMissionStartDate(missionDetails),
				missionLunchSiteShort: missionDetails.launch_site.site_name,
				missionLunchSiteLong: missionDetails.launch_site.site_name_long,
				missionShips: missionDetails.ships,
				missionLearnMore: missionDetails.links.wikipedia,
			};
			return mission;
		} catch (err) {
			console.log(err);
		}
	};
	const setMissionStartDate = mission => {
		const year = mission.launch_date_local.substr(0, 4);
		const month = mission.launch_date_local.substr(5, 2);
		const day = mission.launch_date_local.substr(8, 2);
		const startDate = [day, month, year].join('-');
		return startDate;
	};
	const fetchMissionShips = async shipId => {
		try {
			const res = await axios.get(
				'https://api.spacex.land/rest/ship/' + shipId
			);
			const shipDetails = res.data;
			const ship = {
				name: shipDetails.name,
				homePort: shipDetails.home_port,
				image: shipDetails.image,
				weight: shipDetails.weight_kg,
			};
			return ship;
		} catch (err) {
			console.log(err);
		}
	};
	const setAllInformationAboutMisionAndShips = async () => {
		try {
			const mission = await fetchLaunchesSpaceX();
			setMission(mission);
			const missionShipDetails = [];
			mission.missionShips.forEach(async ship => {
				let shipDetails = await fetchMissionShips(ship.id);
				missionShipDetails.push(shipDetails);
			});
			setMissionShips(missionShipDetails);
		} catch (err) {
			console.log(err);
		}
	};

	const consoleLog = async () => {
		setStartsOffset(startsOffset + 1);
		try {
      await setAllInformationAboutMisionAndShips();
    } catch(err) {
      console.log(err)
    }
	};

	return (
		<div className='App'>
			app
			<p>{mission}</p>
			<p>{missionShips}</p>
			<button >fetchMissionShips</button>
		</div>
	);
}

export default App;
