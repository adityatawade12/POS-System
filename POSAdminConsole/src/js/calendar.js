document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      timeZone: 'local',
      locale:'hi',
      
            events: [
        {
        // id: 'a',
        title: 'leave',
        start: "2021-04-10",
        end:"2021-04-14"
        }
        ,
    //     {
    //         // id: 'a',
    //         display:"background",
    //         start: "2021-04-02",
    //         end:"2021-04-07",
    //         // color:"#541aab"
    //  },
     {
        // id: 'a',
        display:"background",
        start: new Date(2021,01,04),
        end:new Date(2021,04,04),
        color:"#f9545a"
 },

    ]
    });
    calendar.render();
    calendar.setOption('locale', 'en');
  });