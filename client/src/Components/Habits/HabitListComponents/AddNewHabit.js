import React, { Component } from 'react';
import axios from 'axios';
import ContentAdd from 'material-ui/svg-icons/content/add';
import '../../../Styles/habitList.css';
//material-ui
import {SelectField, RadioButton, RadioButtonGroup,TextField, FlatButton, Dialog, MenuItem, FloatingActionButton } from 'material-ui';

class AddNewHabit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      newItem: '',
      difficulty: 'easy',
      value: 0,
      habitArray: this.props.habitArray,
      weeklyGoal: this.props.weeklyGoal
    }
  }
  //handlers for opening/closing add more dialog button
   handleOpen = () => {
      this.setState({open: true});
   };
   handleClose = () => {
     this.setState({
       open: false,
       newItem: '',
       difficulty: 'easy',
     });
   };
   //change handler for new habit name
   newItemChange = (e) => {
     this.setState({
       newItem: e.target.value
     })
   }

   //change handler for radio buttons (difficulty)
   handleOptionChange = (e) =>{
     const value = e.target.value;
     const name = e.target.name;
     this.setState({
       [name]: value
     });
   }
   //change handler for goal setting
   handleChange = (event, index, value) => this.setState({value});

 //add new habit to database and list
   addItem = (e) => {
     e.preventDefault()
     var updates = this.props.habitArray;
     updates.push({name: this.state.newItem, difficulty: this.state.difficulty, goal: this.state.value});
     //post new item to database
     axios.post('/habit/new',{
       user: this.props.user,
       name: this.state.newItem,
       difficulty: this.state.difficulty,
       goal: this.state.value,
       weeklyGoal: this.props.weeklyGoal
     }).then(result => {
       this.props.liftAfterAdd({result: result.data, updates:updates});
       this.handleClose();
     })
   }
  render() {
    //add new item modal button controls
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={(e) => this.addItem(e)}
        />,
      ];
    return (
      <div>
        <FloatingActionButton
          secondary={true}
          onClick={this.handleOpen}
          style={{marginTop: '50px'}}
        >
            <ContentAdd />
        </FloatingActionButton>
        <Dialog
          open={this.state.open}
          onRequestClose = {this.handleClose}
          actions={actions}
          >
              <form>
                  <TextField name="habit" onChange={(e) => this.newItemChange(e)} value={this.state.newItem} hintText="Type new habit here"/> <br/>

                 <RadioButtonGroup onChange={this.handleOptionChange} name="difficulty" defaultSelected="Easy">
                      <RadioButton
                            value="easy"
                            label="Easy"
                          />
                          <RadioButton
                            value="medium"
                            label="Medium"
                          />
                          <RadioButton
                            value="hard"
                            label="Hard"
                          />
                </RadioButtonGroup>

               <SelectField
                   floatingLabelText="Frequency"
                   name="goal"
                   default="Everyday"
                   value={this.state.value}
                   onChange={this.handleChange}
                >
                   <MenuItem value={7} primaryText="Everyday" />
                   <MenuItem value={5} primaryText="Weekdays" />
                   <MenuItem value={2} primaryText="Weekends" />
              </SelectField> <br/>
              </form>
          </Dialog>
        </div>
    );
  }
}

export default AddNewHabit;
