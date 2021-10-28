import React from 'react';
import Ship from './ship/Ship';
import styles from './MissionShips.module.css';
import LoadingPage from '../loadingPage/LoadingPage';

function MissionShips({ missionShips, loading }) {

	return (
		<div className={styles.section}>
			{
				loading && <LoadingPage/> 
			}
			{
				missionShips.length > 0 && <h6>rescue ships</h6>
			}
			{
				missionShips.length > 0 && (missionShips.map(ship => (
					<Ship ship={ship} key={ship.id}/>
				)))
			}
			{
				(missionShips.length === 0 && loading === false) && <p>no ships</p>
			}
		</div>
	);
}

export default MissionShips;
