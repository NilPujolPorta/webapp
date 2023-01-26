import { HttpClient,HttpClientJsonpModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { localeEs, MbscCalendarEvent, MbscEventcalendarOptions, Notifications } from '@mobiscroll/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  constructor(private http: HttpClient) {}

  myEvents: MbscCalendarEvent[] = [];

  eventSettings: MbscEventcalendarOptions = {
      locale: localeEs,
      theme: 'ios',
      themeVariant: 'light',
      clickToCreate: false,
      dragToCreate: false,
      dragToMove: false,
      dragToResize: false,
      eventDelete: false,
      responsive: {
          xsmall: {
              view: {
                  calendar: {
                      type: 'week',
                  },
                  agenda: {
                      type: 'day'
                  }
              }
          },
          custom: { // Custom breakpoint
              breakpoint: 600,
              view: {
                  calendar: {
                      labels: true
                  }
              }
          }
      }
  };

  ngOnInit(): void {
      /*this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
          this.myEvents = resp;
      });*/
  }

}
