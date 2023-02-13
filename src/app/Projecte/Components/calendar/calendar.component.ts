import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef,
    OnInit,
} from '@angular/core';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
} from 'date-fns';
import { catchError, Subject, take, throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Guardia } from '../../Model/api/entities/guardia/Guardia';
import { Guardias } from '../../Model/api/entities/guardies/guardies';
import { guardiaApi } from '../../Serveis/Api/guardiaApi';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Treballador } from '../../Model/Entitats/Implementations/Treballador/Treballador';

registerLocaleData(localeEs);

const colors: Record<string, EventColor> = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
};
@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CalendarComponent implements OnInit {
    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;

    viewDate: Date = new Date();

    modalData: {
        action: string;
        event: CalendarEvent;
    } | undefined;

    actions: CalendarEventAction[] = [
        {
            label: '<i class="fas fa-fw fa-pencil-alt"></i>',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            },
        },
        {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter((iEvent) => iEvent !== event);
                this.handleEvent('Deleted', event);
            },
        },
    ];

    refresh = new Subject<void>();

    events: CalendarEvent[] = [
        // {
        //     start: subDays(startOfDay(new Date()), 1),
        //     end: addDays(new Date(), 1),
        //     title: 'A 3 day event',
        //     color: { ...colors['red'] },
        //     actions: this.actions,
        //     allDay: true,
        //     resizable: {
        //         beforeStart: true,
        //         afterEnd: true,
        //     },
        //     draggable: true,
        // },
        // {
        //     start: startOfDay(new Date()),
        //     title: 'An event with no end date',
        //     color: { ...colors['yellow'] },
        //     actions: this.actions,
        // },
        // {
        //     start: subDays(endOfMonth(new Date()), 3),
        //     end: addDays(endOfMonth(new Date()), 3),
        //     title: 'A long event that spans 2 months',
        //     color: { ...colors['blue'] },
        //     allDay: true,
        // },
        // {
        //     start: addHours(startOfDay(new Date()), 2),
        //     end: addHours(new Date(), 2),
        //     title: 'A draggable and resizable event',
        //     color: { ...colors['yellow'] },
        //     actions: this.actions,
        //     resizable: {
        //         beforeStart: true,
        //         afterEnd: true,
        //     },
        //     draggable: true,
        // },
    ];

    activeDayIsOpen: boolean = true;

    guardies!: Guardias;
    rol!:string;

    constructor(private modal: NgbModal, private guardiaApi: guardiaApi) { }

    ngOnInit(): void {
        this.searchEvents();
    }
    createCalendarEvents() {
        this.guardies.getGuardias().forEach(obj => {
            let data = new Date(obj.data);
            let color: string;
            if (obj.torn == "Dia") {
                color = "yellow";
            } else {
                color = "black";
            }
            this.events.push(
                {
                    start: data,
                    end: data,
                    title: obj.idGuardia + " - " + obj.zona + " - " + obj.categoria + ": " + obj.torn,
                    color: { ...colors[color] },
                    actions: this.actions,
                    allDay: true,
                    resizable: {
                        beforeStart: true,
                        afterEnd: true,
                    },
                    draggable: true,
                }
            )
        });

    }

    searchEvents() {
        console.log("searchelements")
        this.guardiaApi.getGuardies().subscribe(guardies => {
            this.guardies = new Guardias(guardies);
            this.createCalendarEvents();
        });
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }

    eventTimesChanged({
        event,
        newStart,
        newEnd,
    }: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd,
                };
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        this.modal.open(this.modalContent, { size: 'lg' });
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors['red'],
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true,
                },
            },
        ];
    }

    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    apuntar(titol: string | undefined) {
        let usuari: string = localStorage.getItem("usuari")!
        let idGuardia: string | undefined = titol?.split(" - ")[0];
        console.log(usuari);
        console.log(idGuardia);
        this.guardiaApi.apuntarTreballador(usuari, idGuardia).subscribe(missatge => {
            console.log(missatge);
        });
    }

    getRol() {
        let usuari: string = localStorage.getItem("usuari")!
        let rol = "";
        let treballador;
        this.guardiaApi.getTreballador(usuari).pipe(
            take(1),
            catchError((err: any) => {
                return throwError(() => new Error("Error al agafar guardia"))
            })
        ).subscribe({

            next: (x) => {
                treballador = JSON.stringify(x);
                treballador = JSON.parse(treballador);
                rol = treballador.rol;
            },
            error: (err: any) => {
                console.log(err.message)
            },
            complete: () => { },
        })
        return rol;
    }

    esAdmin() {
        let rol = this.getRol();
        return rol == "admin";
    }
}
