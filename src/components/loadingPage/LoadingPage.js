import React from 'react';

function LoadingPage() {
	const style = {
		width: '100%',
	};
	return (
		<div className='d-flex justify-content-center' style={style}>
			<div className='spinner-border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	);
}

export default LoadingPage;
