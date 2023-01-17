import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-calendari',
  templateUrl: './calendari.component.html',
  styleUrls: ['./calendari.component.css']
})
export class CalendariComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ] // here you should put your events data and it should be an array
  };
  eventsPromise!: Promise<EventInput>;

  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr);
  }

  constructor() { }

  ngOnInit() {
  }

}
