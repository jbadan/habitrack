import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';
import { Row, Col } from 'react-flexbox-grid';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { MuiThemeProvider, AppBar, IconButton, Paper, RaisedButton } from 'material-ui';
import dash from './img/dash.png';
import line from './img/line.png';
import list from './img/list.png';
import radar from './img/radar.png';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';

import Jenna from './img/Jenna.jpeg';
import Matt from './img/Matt.png';
import Evan from './img/Evan.jpeg';
import Lauren from './img/Lauren.jpeg';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		}
	}

	handleRedirect = () => this.setState({redirect: true});

	render() {

			const style1 = {
			  height: 150,
			  width: 300,
			  textAlign: 'center',
			  display: 'inline-block',
				color: '#FFFFFF',
				padding: 15,

			};

			const style2 = {
			  height: 200,
			  width: 300,
			  textAlign: 'center',
			  display: 'inline-block',
				color: '#FFFFFF',
				padding: 15,
				fontfamily: 'Lato',
			};

			const style3 = {
			  height: 150,
			  width: 300,
			  textAlign: 'center',
			  display: 'inline-block',
				color: '#FFFFFF',
				padding: 15,
				fontfamily: 'Lato',
			};

			const center = {
				textAlign: 'center'
			}
      const padding = {
        paddingRight: "10px"
      }

    const {redirect} = this.state;
    if(redirect){
      return <Redirect to ='/display'/>
    };

		return (
			<div id="mainPage">

				<div className="spacer"></div>

				<div id="welcome">
					<h1>Enter your habits. See your Progress.</h1>
					<p>Mindfulness is about being in the moment. HabiTrack helps focus attention
					 on the activities and behaviors you value the most.</p>
					<h2>Get started today.</h2>
				</div>

				<div className="spacer"></div>

				<Row>
					<Col xs={3} />
					<Col xs={6} style={center}>
            {this.props.user.id ?
              (
                <RaisedButton
                  label={`Go to My Dashboard ${String.fromCharCode(8594)}`}
                  primary={true}
                  onClick={this.handleRedirect}
                />
              ) : (
                <Signup user={this.props.user} lift={this.props.lift} primary={true} />
              )
            }

					</Col>
					<Col xs={3} />
				</Row>

        <div className="spacer"></div>

				<Row className="sectionHeaders">
					<Col xs={12}>
						<Row center="xs">
							<Col xs={6}>
							<h1>Custom Dashboards</h1>
							</Col>
						</Row>
					</Col>
				</Row>

				<Row>
					<Col xs={12}>
						<Row center="xs">
							<Row middle="xs">
								<Col xs={5}>
									<Paper style={style1} zDepth={4}>
										<p className="paperText">From a personalized, interactive dashboard, HabiTrack allows
										 users to track and visualize frequency data about their daily activities.</p>
									</Paper>
								</Col>
							</Row>
							<Col xs={1}></Col>
							<Row middle="xs">
								<Col xs={5}>
									<img src={dash} width={700} height={550}/>
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
								<p>Simply enter habits you want to track, log your daily activities, and watch your data grow!</p>
							</Col>
						</Row>
					</Col>
				</Row>

				<Row className="sectionHeaders">
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
									<Paper style={style2} zDepth={4}>
										<p className="paperText">Data is displayed in easy-to-analyze
										graphics, offering accountability and awareness of behavior trends. The charts are comprehensive, yet easy
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
								<p>Daily tracking provides a more thorough data snapshot.</p>
							</Col>
						</Row>
					</Col>
				</Row>

				<Row className="sectionHeaders">
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
									<Paper style={style3} zDepth={4}>
										<p className="paperText">Habit activity is logged using an easy check off list logging stystem.
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

				<Row className="sectionHeaders">
					<Col xs={12}>
						<Row center="xs">
							<Col xs={6}>
							<h2>About Us</h2>
							</Col>
						</Row>
					</Col>
				</Row>

				<Row bottom="xs" className="about-section">
					<Row around="xs" center="xs">
						<Col xs={2}>
							<h4>Jenna Badanowski</h4>
							<img className="devPhotos" src={Jenna}/>
              <p>
              <a style={padding}  href="http://github.com/jbadan"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
              <a href="https://www.linkedin.com/in/jennabadanowski/"><i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>
              </p>
							<p> Backend Development
							</p>
						</Col>
						<Col xs={2}>
							<h4>Matthew Bell</h4>
							<img className="devPhotos" src={Matt}/>
              <p>
              <a style={padding}  href="https://github.com/Foozie3Moons"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
              <a href="https://www.linkedin.com/in/matthew-bell-290/"><i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>
              </p>
							<p> sit amet et delectus
							 accommodare his consul copiosae legendos
								at vix ad putent delectus delicata usu.
							</p>
						</Col>
						<Col xs={2}>
							<h4>Evan Haala</h4>
							<img className="devPhotos" src={Evan}/>
              <p>
              <a style={padding} href="https://github.com/ehaala"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
              <a href="https://www.linkedin.com/in/ejhaala/"><i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>
              </p>
							<p> sit amet et delectus
							 accommodare his consul copiosae legendos
								at vix ad putent delectus delicata usu.
							</p>
						</Col>
						<Col xs={2}>
							<h4>Lauren Perez</h4>
							<img className="devPhotos" src={Lauren}/>
              <p>
              <a style={padding} href="https://github.com/laurenperez"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
              <a href="https://www.linkedin.com/in/lauren-ashley-perez/"><i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>
              </p>
							<p> sit amet et delectus
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
