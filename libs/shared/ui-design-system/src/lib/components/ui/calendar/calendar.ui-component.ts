import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { CalendarOptions, DatesSetArg } from '@fullcalendar/core';
import { ButtonUiComponent } from '../button/button.ui-component';
import { CalendarEvent } from './calendar-event.type';
import { Dictionary } from '@fullcalendar/core/internal';

@Component({
  selector: 'simplified-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, ButtonUiComponent],
  templateUrl: './calendar.ui-component.html',
  styleUrls: ['./calendar.ui-component.scss'],
})
export class CalendarUiComponent {
  @ViewChild('calendar') protected calendarComponent!: FullCalendarComponent;
  @Input() public calendarEvents: CalendarEvent[] = [];
  @Output() public readonly datesChange = new EventEmitter<{
    startDate: Date;
    endDate: Date;
  }>();
  @Output() public readonly eventSelected = new EventEmitter<{
    start: string;
    extendedProps: Dictionary;
  }>();
  protected calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      start: 'title',
      center: '',
      end: '',
    },

    dayCellClassNames: 'dark:border-gray-700',
    dayHeaderClassNames: 'dark:border-gray-700',
    viewClassNames: 'dark:border-gray-700',
    eventClassNames: 'pl-2 pr-2',

    eventClick: (e) => {
      this.eventSelected.emit({
        start: e.event.start?.toISOString() as string,
        extendedProps: e.event.extendedProps,
      });
    },
    firstDay: 1,
    datesSet: this.handleDatesSet.bind(this),
  };

  protected get viewType() {
    return this.calendarComponent?.getApi().view.type;
  }

  protected customPrev() {
    this.calendarComponent.getApi().prev();
  }

  protected customNext() {
    this.calendarComponent.getApi().next();
  }

  protected goToToday() {
    const today = new Date();
    this.calendarComponent.getApi().gotoDate(today);
  }

  protected changeView(view: string) {
    this.calendarComponent.getApi().changeView(view);
  }

  private handleDatesSet(arg: DatesSetArg) {
    const view = arg.view;
    const startDate = view.activeStart;
    const endDate = view.activeEnd;

    this.datesChange.emit({ startDate, endDate });
  }
}
