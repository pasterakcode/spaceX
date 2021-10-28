import React from 'react';

function LoadingPage() {
	const style = {
		width: '100%',
		height: '300px',
	};
	return (
		<div className='d-flex justify-content-center align-items-center' style={style}>
			<div className='spinner-border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	);
}

export default LoadingPage;
