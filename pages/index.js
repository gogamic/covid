import Head from 'next/head';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
	useEffect(() => {
		const table = document.querySelector('#myTable');
		let cases = document.querySelector('#Cases');
		let a = [];
		fetch('https://data.covid19india.org/v2/state_district_wise.json')
			.then((r) => r.json())
			.then((d) => {
				cases.textContent = Object.values(d)
					.map((p) =>
						Object.values(p.districtData).reduce((i, c) => i + c.confirmed, 0)
					)
					.reduce((i, v) => i + v, 0);
				for (let i in d) {
					let b = [];
					for (let j in d[i].districtData) {
						console.log(i);
						b.push(d[i].districtData[j].confirmed);
					}
					a.push({
						state: d[i].state,
						cases: b.reduce((a, b) => a + b),
					});
				}
				a = a.sort((a, b) => a.cases - b.cases).reverse();
				for (let i in a) {
					table.innerHTML += `
    <tr>
      <td>${a[i].state}</td>
      <td>${a[i].cases}</td>
      
    </tr>
  `;
				}
			});

		fetch('https://data.covid19india.org/data.json')
			.then((r) => r.json())
			.then((d) => {
				let ee = d.cases_time_series;
				const arrSum = (ee) => ee.reduce((a, b) => a + b, 0);

				for (let i in ee) {
					let b = [];
					for (let j in ee[i].totalrecovered) {
						b = i;
					}
				}
			});

		function dark() {
			var element = document.body;
			element.classList.toggle('dark-mode');
		}
	}, []);
	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta
					name='description'
					content='A realtime app to track the effect of coronavirus/covid19 in india in each an every state'
				/>
				<meta
					name='keywords'
					content='COVID-19, covid ,coronavirus, lockdown, virus,india ,latest news'
				/>
				<link
					rel='icon'
					href='https://cdn.glitch.com/89859ba4-9bda-4d16-aaf5-a69241038e1c%2Fcovid-logo.svg?v=1588241563114'
					type='image/gif'
					sizes='16x16'
				/>

				<link
					href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
					rel='stylesheet'
					integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
					crossOrigin='anonymous'
				/>
			</Head>
			<div className={styles.main_div}>
				<nav className='navbar navbar-expand-lg'>
					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#navbarTogglerDemo01'
						aria-controls='navbarTogglerDemo01'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
						<a className='navbar-brand' href='/' id='title'>
							COVID-19
						</a>
						<ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
							<li className='nav-item active'>
								<a className='nav-link' href='index.html'>
									HOME
								</a>
							</li>
							<li className='nav-item'>
								<a
									className='nav-link'
									href='https://github.com/gogamic/gamic-bot/'
								>
									GITHUB
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link' href='#'>
									CONTACT
								</a>
							</li>
						</ul>
					</div>
					<div
						className='navbar-collapse collapse w-100 order-3 dual-collapse2'
						id='nav'
					>
						<ul className='navbar-nav ml-auto'>
							<li className='nav-item'>
								<dark-mode-toggle
									id='dark-mode-toggle-1'
									legend=' '
									appearance='switch'
									dark=''
									light=''
								></dark-mode-toggle>
							</li>
						</ul>
					</div>
				</nav>
				<main>
					<div className='container-fluid' id='banner'>
						<center>
							<h2>
								There is no evidence that hot weather will stop the virus! You
								can! Stay home, stay safe.
							</h2>
						</center>
					</div>

					<div className='container'>
						<h1>
							<b>INDIA COVID-19 TRACKER</b>
						</h1>
						<div>
							<h6>PLEASE STAY HOME! AVOID RUMORS!</h6>
						</div>
					</div>

					<div className='container'>
						<center>
							<div className='card' id='confirmed' style={{ width: '18rem' }}>
								<div className='card-body'>
									<h5 className='card-title'>CONFIRMED</h5>
									<p className='card-text'>
										<h4 id='Cases'>-</h4>
									</p>
								</div>
							</div>
						</center>
					</div>

					<div className='container'>
						<div className='table-responsive'>
							<center>
								<table
									id='myTable'
									className={`table table-hover ${styles.main_table}`}
								>
									<thead>
										<h2>
											<th scope='col'>STATE/UT</th>
											<th scope='col'>CONFIRMED</th>
										</h2>
									</thead>
								</table>
							</center>
						</div>
					</div>
				</main>
				<footer></footer>
				<script
					src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
					integrity='sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p'
					crossOrigin='anonymous'
				></script>{' '}
			</div>
		</>
	);
}
