# HabiTrack


##### Habitrack is an accountability tool for organizing and tracking desirable habits.

View the live site at https://habitrackapp.herokuapp.com/

## About the App

### How to use Habitrack:

1. Start by creating a user profile by selecting “Sign Up” on the homepage.

2. From the user dashboard, select the pink floating “+” icon.

3. Enter a descriptive name for a habit you wish to track.

4. Indicate the level of difficulty anticipated when incorporating this habit into your routine.

5. Select the desired frequency of your new habit.

6. Add several habits to populate the “habit list” displayed on your user dashboard.

7. To begin tracking, select which tasks or “habits” have been completed for the day. This is done by checking the box next to the habit’s name.

8. To view more information about a specific habit, such as the desired frequency or individual habit progress, select the icon to the right of the habit in the “all habits” list.

9. By consistently marking your habits as “complete” in the habit list, you will begin to see your habit data compile in the dashboard charts.

10. Use your data to make decisions about how you approach your daily activities and build new positive habits.


### User Stories:

1. Michelle is a busy college student who wants an organization and tracking tool for keeping her daily stress relief habits consistent. She wants a tool that can go with her, so mobile viewing is important. Using Habitrack, she will be able to see how often she engages in mediation and which days she tends to forget.

2. David is a retiree who wants to develop a new habit of reading for one hour each afternoon. He wants a tracking tool that enables him to see his day’s tasks in one place and log his activity with minimal navigation or button clicks. Using Habitrack, he can establish this goal and track his progress daily from one page with one button tap.



## Under the Hood

### Key Technologies Used:

* React
* React Router
* Express
* MongoDB
* Mongoose
* D3
* Recharts
* Material UI
* React Flexbox Grid


### Project Timeline

#### Planning  and Scaffolding Phase

* Shared ideas, concerns, and thoughts on the usability of a habit tracker.
* Developed two user stories.
* Whiteboard sketched first wireframes.
* Created forms for adding user data.
* Created GET and POST routes for creating and reading user habits in the database.
* Created graphic wireframes.

#### Building  Phase

* Set up React Router and links to pages.
* Created UPDATE and DELETE routes for editing dates and deleting habits from user habit list.
* Began initial layout styling of components with React Flexbox Grid.
* Created first draft of D3 line graph for mapping habit frequency.
* Created first draft of radar graph in Recharts.
* Material UI style components added to main profile page.
* Added skeleton build of front landing page.
* Reworked user flow through the signup process.
* Final draft of main line graph complete.
* Final draft of radar graph complete.
* Points system implemented to add a motivational aspect to logging user data.
* Added "About Us" section.

#### Testing and Debugging Phase

* Clear forms when dialogs are closed.
* Set up final error handling.
* Created seed data.
* Final checks for chart functionality.

#### Organization

For project task management and coordination, we used a shared document in Google docs.

### Wire Frames

##### Home Page
![alt text](/client/src/img/homepage1.png "Home Page 1")
https://wireframe.cc/y0uruu

##### Home Page Continued
![alt text](/client/src/img/homepage2.png "Home Page 2")
https://wireframe.cc/pnzLDN

##### User Dashboard
![alt text](/client/src/img/dashboardpage.png "Dashboard Page")
https://wireframe.cc/ydmerF

##### Habit Details Page
![alt text](/client/src/img/habitdetails.png "Habit Details Page")
https://wireframe.cc/qkAF5f


### Routes

![alt text](/client/src/img/routes.png "Routes")


### Individual Contributors:

* Jenna Badanowski - Front/Back-end development, Routes, Data storage management and manipulation  
[View My GitHib](http://github.com/jbadan)  
[View My Linkedin](https://www.linkedin.com/in/jennabadanowski/)  

* Matthew Bell (Git Master) - Front-end development, Data visualization with D3 charts, Data manipulation  
[View My GitHib](https://github.com/Foozie3Moons)  
[View My Linkedin](https://www.linkedin.com/in/matthew-bell-290/)  

* Evan Haala- Front/Back-end Development, Routes, Data manipulation, Responsive design  
[View My GitHib](https://github.com/ehaala)  
[View My Linkedin](https://www.linkedin.com/in/ejhaala/)  

* Lauren Perez - Front-end Development, Routes, Data visualization with Recharts, Responsive design  
[View My GitHib](https://github.com/laurenperez)  
[View My Linkedin](https://www.linkedin.com/in/lauren-ashley-perez/)  



### Next Steps and Future Improvements

1. Divide Habit Lists- Habits could be displayed in separate lists based on when those tasks will be performed by the user- such as separate lists for weekly vs. daily tasks.

2. Posting to Social Media - Users would be able to share their daily point achievements with their network on Twitter or Facebook.

3. Achievement Badges - Users could earn personal goal achievement badges that would display on their dashboard and could be shared via social media.
