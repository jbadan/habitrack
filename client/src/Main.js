import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { MuiThemeProvider, AppBar, IconButton } from 'material-ui';


class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div>
					<h3>Write some things about HabiTracker...</h3>

					<div className="about-section">

						<div className="dev-profile">
							<h4>Jenna Badanowski</h4>
							<img src="http://lorempixel.com/100/100/cats"/>
							<p>Lorem ipsum dolor sit amet et delectus
							 accommodare his consul copiosae legendos
							  at vix ad putent delectus delicata usu.
								Vidit dissentiet eos cu eum an brute
								copiosae hendrerit. Eos erant
								dolorum an. Per facer</p>
						</div>

						<div className="dev-profile">
							<h4>Matthew Bell</h4>
							<img src="http://lorempixel.com/100/100/cats"/>
							<p>Lorem ipsum dolor sit amet et delectus
							 accommodare his consul copiosae legendos
							  at vix ad putent delectus delicata usu.
								Vidit dissentiet eos cu eum an brute
								copiosae hendrerit. Eos erant
								dolorum an. Per facer</p>
						</div>

						<div className="dev-profile">
						 <h4>Evan Haala</h4>
						 <img src="http://lorempixel.com/100/100/cats"/>
							<p>Lorem ipsum dolor sit amet et delectus
							 accommodare his consul copiosae legendos
							  at vix ad putent delectus delicata usu.
								Vidit dissentiet eos cu eum an brute
								copiosae hendrerit. Eos erant
								dolorum an. Per facer</p>
						</div>

						<div className="dev-profile">
							<h4>Lauren Perez</h4>
							<img src="http://lorempixel.com/100/100/cats"/>
							<p>Lorem ipsum dolor sit amet et delectus
							 accommodare his consul copiosae legendos
							  at vix ad putent delectus delicata usu.
								Vidit dissentiet eos cu eum an brute
								copiosae hendrerit. Eos erant
								dolorum an. Per facer</p>
						</div>

					</div>
				</div>
			</div>
		)
	}
}

export default Main;
