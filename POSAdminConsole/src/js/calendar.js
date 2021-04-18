var calendar=null;
var eventArray=[]
document.addEventListener('DOMContentLoaded', loadCalendar(eventArray));

function loadCalendar() {
  var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      timeZone: 'local',
      locale:'hi',
      events:eventArray
    //         events: [
    //     // {
    //     // // id: 'a',
    //     // title: 'leave',
    //     // start: "2021-04-10",
    //     // end:"2021-04-14"
    //     // }
    //     // ,
    //     {
    //         // id: 'a',
    //         display:"background",
    //         start: "2021-04-02",
    //         end:"2021-04-07",
    //         // color:"#541aab"
    //  },
    

    // ]
    });
    
    calendar.render();
    calendar.setOption('locale', 'en');
}