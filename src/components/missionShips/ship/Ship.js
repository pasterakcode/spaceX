import React from 'react';
import styles from './Ship.module.css';

function Ship(props) {
	const shipImage = {
		backgroundImage: 'url(' + props.ship.image + ')',
	};
	return (
		<div className={styles.shipCard}>
			<div className={styles.shipImage} style={shipImage}></div>
			<div className={styles.shipName}>
				<h2>{props.ship.name}</h2>
				<div className={styles.borderBottom}></div>
			</div>
			<div className={styles.shipDescriptions}>
				<div className={styles.titleDescriptionDiv}>
					<h6 className={styles.titleDescription}>Home port</h6>
					<h6 className={styles.titleDescription}>Weight [KG]</h6>
				</div>
				<div className={styles.infoDescriptionDiv}>
					<h6 className={styles.infoDescription}>{props.ship.homePort}</h6>
					<h6 className={styles.infoDescription}>{props.ship.weight ? props.ship.weight : "unknown"}</h6>
				</div>
			</div>
		</div>
	);
}

export default Ship;
