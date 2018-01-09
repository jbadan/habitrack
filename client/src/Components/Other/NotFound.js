import React  from 'react';
import sleepingPuppies from '../../img/sleepingPuppies.gif';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router-dom';

const NotFound = (props) => {
  return (
    <div className='not-found-container'>
      <div className='not-found-items'>
        <h1>We couldn't find that page</h1>
        <p>But while you're here, here's some sleeping puppies</p>
        <img src={sleepingPuppies} alt='sleeping puppies' />
        <p>When you're done:</p>
        <Link to='/'>
          <RaisedButton label={'Go to Main Page ' + String.fromCharCode(8594)} primary={true} onClick={props.handleRedirect}/>
        </Link>
      </div>
    </div>
  )
}

export default NotFound;
