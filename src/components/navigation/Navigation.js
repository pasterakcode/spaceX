import React from 'react';
import styles from './Navigation.module.css'

function Navigation(props) {
	return (
		<div className={styles.sectionNavigation}>
			<button className={`${styles.btn} ${(props.missionNumber === 0) ? `${styles.btnNoActive}` : ""}`} onClick={() => props.onPreviousMission()}><i className="bi bi-chevron-left"></i></button>
			<div className={styles.logo}></div>
			<button className={`${styles.btn}`} onClick={() => props.onNextMission()}><i className="bi bi-chevron-right"></i></button>
		</div>
	);
}

export default Navigation;
