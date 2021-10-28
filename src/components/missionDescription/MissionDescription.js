import React, { useState, useEffect } from 'react';
import LoadingPage from '../loadingPage/LoadingPage';
import styles from './MissionDescriptions.module.css'

function MissionDescription(props) {
	const [missionDescription, setMissionDescription] = useState();

	useEffect(() => {
		if (props.missionDetails) {
			setMissionObj();
		}
	}, [props.missionDetails]);

	const setMissionObj = () => {
		const missionDesc = {
			missionName: props.missionDetails.mission_name,
			missionRocket: props.missionDetails.rocket.rocket_name,
			missionRocketIsRecovered: checkRocketStatus(),
			missionLunchDateShort: setMissionStartDate(props.missionDetails),
			missionLunchDateLong: (props.missionDetails.launch_date_local).replace("T", " "),
			missionLunchSiteShort: props.missionDetails.launch_site.site_name,
			missionLunchSiteLong: props.missionDetails.launch_site.site_name_long,
			missionShips: props.missionDetails.ships,
			missionLearnMore: props.missionDetails.links.wikipedia,
		};
		setMissionDescription(missionDesc);
	};
	const checkRocketStatus = () => {
		let wasRecovered;
		try {
			wasRecovered = props.missionDetails.rocket.fairings.recovered;
		} catch (err) {
			wasRecovered = false;
		}
		if (!wasRecovered) {
			wasRecovered = false;
		}
		return wasRecovered;
	};

	const setMissionStartDate = mission => {
		const year = mission.launch_date_local.substr(0, 4);
		const month = mission.launch_date_local.substr(5, 2);
		const day = mission.launch_date_local.substr(8, 2);
		const startDate = [day, month, year].join('-');
		return startDate;
	};

	return (
		<div className={styles.sectionDescriptions}>
			{missionDescription ? (
				<>
					<div className={styles.leftSiteDescription}>
						<div>
							<h6 className={styles.descriptionHeader}>mission</h6>
							<p className={styles.missionTitle}>{missionDescription.missionName}</p>
						</div>
						<div>
							<h6 className={styles.descriptionHeader}>rocket</h6>
							<div className={styles.rocketDetails}>
							<p className={styles.additionalInformation}>{missionDescription.missionRocket}</p>
							{missionDescription.missionRocketIsRecovered ? (
								<span className={`${styles.recovered} ${styles.didRecovered}`}>recovered</span>
							) : (
								<span className={`${styles.unrecovered} ${styles.didRecovered}`}>unrecovered</span>
							)}
							</div>
						</div>
						<a className={styles.learnMore} href={`${missionDescription.missionLearnMore}`}>learn more</a>
					</div>
					<div className={styles.rightSiteDescription}>
						<div>
							<h6 className={styles.descriptionHeader}>launch date</h6>
							<p className={`${styles.additionalInformation} ${styles.launchDate}`}>{(window.innerWidth > 959) ? missionDescription.missionLunchDateShort : missionDescription.missionLunchDateLong}</p>
						</div>
						<div>
							<h6 className={styles.descriptionHeader}>launch site</h6>
							<p className={styles.additionalInformation}>{missionDescription.missionLunchSiteShort}</p>
						</div>
					</div>
				</>
			) : (
				<LoadingPage/>
			)}
		</div>
	);
}

export default MissionDescription;
