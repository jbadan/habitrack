





var d = new Date();
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var dayOfWeek = days[d.getDay()];
var today = d.getDate();

var m = new Date();
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var thisMonth = months[m.getMonth()];

//variables to plug in and use
today //the numerical day of the month
dayOfWeek // mon-sun
thisMonth //current month


<div class="big-cal-container">
  <div class="calendar-container">
    <header>
      <div class="day">{today}</div>
      <div class="month">{thisMonth}</div>
    </header>
    <table class="calendar">
      <thead>
        <tr>
          <td>Mon</td>
          <td>Tue</td>
          <td>Wed</td>
          <td>Thu</td>
          <td>Fri</td>
          <td>Sat</td>
          <td>Sun</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
        </tr>
        <tr>
          <td>8</td>
          <td>9</td>
          <td>10</td>
          <td>11</td>
          <td>12</td>
          <td>13</td>
          <td>14</td>
        </tr>
        <tr>
          <td>15</td>
          <td>16</td>
          <td>17</td>
          <td>18</td>
          <td>19</td>
          <td>20</td>
          <td>21</td>
        </tr>
        <tr>
          <td>22</td>
          <td>23</td>
          <td>24</td>
          <td>25</td>
          <td>26</td>
          <td>27</td>
          <td>28</td>
        </tr>
        <tr>
          <td>29</td>
          <td>30</td>
          <td>31</td>
          <td>" "</td>
          <td>" "</td>
          <td>" "</td>
          <td>" "</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
