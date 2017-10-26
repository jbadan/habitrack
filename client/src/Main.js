import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';
import { Row, Col } from 'react-flexbox-grid';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { MuiThemeProvider, AppBar, IconButton, Paper } from 'material-ui';
import dash from './dash.png';
import line from './line.png';
import list from './list.png';
import radar from './radar.png';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {

			const style = {
			  height: 200,
			  width: 300,
			  margin: 20,
			  textAlign: 'center',
			  display: 'inline-block',
				color: '#FFFFFF',
				padding: 20,
				fontfamily: 'Lato'
			};

		return (
			<div id="mainPage">

				<div className="spacer"></div>

				<div id="welcome"><h1>Enter your habits. See your Progress.</h1></div>

				<div className="spacer"></div>

				<Row>
					<Col xs={12}>
						<Row center="xs">
							<Col xs={6}>
							<h1>Custom Dashboard</h1>
							</Col>
						</Row>
					</Col>
				</Row>

				<Row>
					<Col xs={12}>
						<Row center="xs">
							<Row middle="xs">
								<Col xs={5}>
									<Paper style={style} zDepth={4}>
										<p>From a personalized, interactive dashboard, HabiTrack allows
										 user{`'`}s to track and visualize frequency data about their daily activities.</p>
									</Paper>
								</Col>
							</Row>
							<Col xs={1}></Col>
							<Row middle="xs">
								<Col xs={5}>
									<img src={dash} width={600} height={350}/>
								</Col>
							</Row>
						</Row>
					</Col>
				</Row>

				<div className="spacer"></div>

				<Row>
					<Col xs={12}>
						<Row center="xs">
							<Col xs={6}>
							<h1>Comprehensive Charts</h1>
							</Col>
						</Row>
					</Col>
				</Row>

				<Row>
					<Col xs={12}>
						<Row center="xs">
							<Row middle="xs">
								<Col xs={5}>
									<img src={line} width={600} height={300}/>
								</Col>
							</Row>
							<Col xs={1}></Col>
							<Row middle="xs">
								<Col xs={5}>
									<Paper style={style} zDepth={4}>
										<p>The personalized charts are comprehensive, yet easy
										to read for comparing and understanding personal data.</p>
									</Paper>
								</Col>
							</Row>
						</Row>
					</Col>
				</Row>

				<div className="spacer"></div>

				<Row>
					<Col xs={12}>
						<Row center="xs">
							<Col xs={6}>
							<h1>Easy Logging</h1>
							</Col>
						</Row>
					</Col>
				</Row>

				<Row>
					<Col xs={12}>
						<Row center="xs">
							<Row middle="xs">
								<Col xs={3}>
									<img src={list} width={300} height={300}/>
								</Col>
							</Row>
							<Col xs={1}></Col>
							<Row middle="xs">
								<Col xs={3}>
									<Paper style={style} zDepth={4}>
										<p>Habit activity is logged using an easy check off list logging stystem.
										 Daily and weekly activity cna be viewed on each habits individual page.</p>
									</Paper>
								</Col>
							</Row>
							<Col xs={1}></Col>
							<Row middle="xs">
								<Col xs={3}>
									<img src={radar} wiradardth={300} height={300}/>
								</Col>
							</Row>
						</Row>
					</Col>
				</Row>

				<div className="spacer"></div>

				<Row bottom="xs" className="about-section">
					<Row around="xs" center="xs">
						<Col xs={2}>
							<h4>Jenna Badanowski</h4>
							<img className="devPhotos" src="http://lorempixel.com/100/100/cats"/>
							<p>Lorem ipsum dolor sit amet et delectus
							 accommodare his consul copiosae legendos
								at vix ad putent delectus delicata usu.
							</p>
						</Col>
						<Col xs={2}>
							<h4>Matthew Bell</h4>
							<img className="devPhotos" src="http://lorempixel.com/100/100/cats"/>
							<p>Lorem ipsum dolor sit amet et delectus
							 accommodare his consul copiosae legendos
								at vix ad putent delectus delicata usu.
							</p>
						</Col>
						<Col xs={2}>
							<h4>Evan Haala</h4>
							<img className="devPhotos" src="http://lorempixel.com/100/100/cats"/>
							<p>Lorem ipsum dolor sit amet et delectus
							 accommodare his consul copiosae legendos
								at vix ad putent delectus delicata usu.
							</p>
						</Col>
						<Col xs={2}>
							<h4>Lauren Perez</h4>
							<img className="devPhotos" src="http://lorempixel.com/100/100/cats"/>
							<p>Lorem ipsum dolor sit amet et delectus
							 accommodare his consul copiosae legendos
								at vix ad putent delectus delicata usu.
							</p>
						</Col>
					</Row>
				</Row>
			</div>
		)
	}
}

export default Main;
