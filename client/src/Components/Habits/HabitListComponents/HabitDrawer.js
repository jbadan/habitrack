import React, { Component } from 'react';
import axios from 'axios';
import '../../../Styles/habitList.css';
//material-ui
import { List, ListItem, IconMenu, IconButton, Drawer, MenuItem } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

  const iconButtonElement = (
    <IconButton touch={true}>
      <MoreVertIcon color={grey400} />
    </IconButton>
  );

class HabitDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItem: true
    }
  }
  //sub menu with more and delete
    menuClicked = (event, value) => {
      this.setState({
         selectedItem: value
     }, () => {
       //if selectedItem is number(ie index then delete has been selected)
       if(this.state.selectedItem.length === 24){
         let id = this.state.selectedItem;
         axios.post('/habit/delete', {
           user: this.props.user,
           habitId: id
         }).then(result => {
           this.props.liftHabitArray(result);
         })
         //this means more info has been selected - redirect to habit info page
       }else if(typeof this.state.selectedItem === "string"){
         let habitName = this.state.selectedItem;
         axios.post('/habit/details', {
          user: this.props.user,
          name: habitName
         }).then(result => {
           this.props.liftHabit(result.data);
           this.props.liftDrawer();
         })
       }
     })
   }
  render() {

    return (
      <Drawer
        docked={false}
        width={200}
        open={this.props.open}
        onRequestChange={() => {this.props.closeDrawer()}}
      >
          <h1 className="center">My Habits</h1>
          <List>
          {this.props.habitArray.map((habit, index) => {
            return(
                  <ListItem
                    key={index}
                    primaryText={habit.name}
                    rightIconButton={
                        <IconMenu iconButtonElement={iconButtonElement} value= { this.state.selectedItem } onChange={ this.menuClicked }>
                          <MenuItem value={habit.name}>More Information</MenuItem>
                          <MenuItem value={habit._id}>Delete</MenuItem>
                        </IconMenu>
                    }
                  />

            )
          })}
          </List>
        </Drawer>
    );
  }
}

export default HabitDrawer;
