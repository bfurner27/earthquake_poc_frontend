import { Component, ElementRef, EventEmitter, Inject, Input, Output, Renderer2, ViewChild, inject } from '@angular/core';
import { Earthquake } from '../earthquake';
import { DateFormatterService } from '../date-formatter.service';
import { IsoToStandardPipe } from '../iso-to-standard.pipe';
import { ObjDumpPipe } from '../obj-dump.pipe';
import { ToIsoDatePipe } from "../to-iso-date.pipe";
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

export interface EarthquakeUpdateEvent {
  old: Earthquake,
  new: Earthquake,
}

export interface EarthuqakeDeleteEvent {
  type: 'delete' | 'discard',
  id?: number;
}

@Component({
  selector: 'app-earthquake-item',
  standalone: true,
  templateUrl: './earthquake-item.component.html',
  styleUrl: './earthquake-item.component.scss',
  imports: [IsoToStandardPipe, ObjDumpPipe, CommonModule, ToIsoDatePipe, ReactiveFormsModule]
})
export class EarthquakeItemComponent {
  private toIsoDatePipe: ToIsoDatePipe = new ToIsoDatePipe()

  @Input({ required: true }) earthquake!: Earthquake;
  @Input() isEditOnly: boolean = false;
  @Output() update: EventEmitter<EarthquakeUpdateEvent> = new EventEmitter<EarthquakeUpdateEvent>();
  @Output() delete: EventEmitter<EarthuqakeDeleteEvent> = new EventEmitter<EarthuqakeDeleteEvent>();
  @ViewChild('earthquakeEntry') earthquakeEntry!: ElementRef;
  @ViewChild('earthquakeInput') earthquakeInput!: ElementRef;

  isEditMode: boolean = false;
  editKey: string | undefined = undefined;

  validateNumber = Validators.pattern(/^\d+(\.\d{1,16})?$/)
  validateNegativeNumber = Validators.pattern(/^-?\d+(\.\d{1,16})?$/)
  formControllers: Record<string, FormControl> = {
    'date': new FormControl<string>('', [Validators.required]),
    'magnitude': new FormControl<number>(0.0, [Validators.required, this.validateNumber]),
    'latitude': new FormControl<number>(0.0, [Validators.required, this.validateNegativeNumber]),
    'longitude': new FormControl<number>(0.0, [Validators.required, this.validateNegativeNumber]),
    'depth': new FormControl<number | undefined>(undefined, [this.validateNumber]),
    'type': new FormControl<string | undefined>(undefined),
  }

  displayKeyOrder = ['date', 'magnitude', 'latitude', 'longitude', 'depth', 'type']
  dateFormControl: FormControl = new FormControl()
  magnitudeFormControl: FormControl = new FormControl();


  constructor(private renderer: Renderer2, private dateFormatterService: DateFormatterService) {
    // found code here https://stackoverflow.com/a/51152404 and modified it to my case
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.isEditMode && !this.earthquakeEntry.nativeElement.contains(e.target)) {
        this.endEditMode()
      }
    })
  }

  ngOnInit() {
    if (this.isEditOnly) {
      this.editKey = 'date';
      this.setEditMode()
    }

    this.formControllers['date'].setValue(this.toIsoDatePipe.transform(this.earthquake.date));
    this.formControllers['magnitude'].setValue(this.earthquake.magnitude);
    this.formControllers['latitude'].setValue(this.earthquake.latitude);
    this.formControllers['longitude'].setValue(this.earthquake.longitude);
    this.formControllers['depth'].setValue(this.earthquake.depth);
    this.formControllers['type'].setValue(this.earthquake.type);
  }

  setEditMode() {
    this.isEditMode = true;

    const key = this.editKey;
    if (key !== undefined) {
      setTimeout(() => {
        const nativeElement: HTMLElement = this.earthquakeInput.nativeElement;

        // need to get the focus element from the dom somehow (traversing it like this does not seem to work)
        for (let i = 0; i < nativeElement.childNodes.length; i++) {
          const child = nativeElement.childNodes[i];
          const childEl = nativeElement.children[i];

          if (childEl.classList.contains(key)) {
            (child as HTMLElement).focus();
            break;
          }
        }
      }, 0)
    }
  }

  endEditMode() {
    const newEarthquake: Earthquake = { ...this.earthquake };
    newEarthquake.date = this.dateFormatterService.formatDateISO(
      this.dateFormatterService.fromISO(
        this.formControllers['date'].value,
      )
    );
    newEarthquake.magnitude = this.formControllers['magnitude'].value;
    newEarthquake.latitude = this.formControllers['latitude'].value;
    newEarthquake.longitude = this.formControllers['longitude'].value;
    newEarthquake.depth = this.formControllers['depth'].value;
    newEarthquake.type = this.formControllers['type'].value;

    if (
      this.toIsoDatePipe.transform(this.earthquake.date) !== this.toIsoDatePipe.transform(newEarthquake.date)
      || this.earthquake.magnitude !== newEarthquake.magnitude
      || this.earthquake.latitude !== newEarthquake.latitude
      || this.earthquake.longitude !== newEarthquake.longitude
      || this.earthquake.depth !== newEarthquake.depth
      || this.earthquake.type !== newEarthquake.type
    ) {
      this.update.emit({ new: newEarthquake, old: this.earthquake })
    }

    this.isEditMode = false;
  }

  handleDoubleClick(event: Event, key: string) {
    this.editKey = key;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key == 'z' && event.ctrlKey) {
      const key = this.editKey
      if (key !== undefined) {
        setTimeout(() => {
          let val: string | number | undefined = '';
          if (key === 'date') {
            val = this.toIsoDatePipe.transform(this.earthquake.date);
          } else if (key === 'magnitude') {
            val = this.earthquake.magnitude;
          } else if (key === 'latitude') {
            val = this.earthquake.latitude;
          } else if (key === 'longitude') {
            val = this.earthquake.longitude;
          } else if (key === 'depth') {
            val = this.earthquake.depth;
          } else if (key === 'type') {
            val = this.earthquake.type
          }

          this.formControllers[key].setValue(val);
        }, 0)
      }
    }
  }

  handleFocus(event: Event, key: string) {
    this.editKey = key;
  }

  handleBlur(event: Event, key: string) {
    this.editKey = undefined;
  }

  handleDelete(event: Event) {
    if (this.isEditOnly) {
      const result = confirm('Do you want to discard this new entry');
      this.delete.emit({ type: 'discard' });
      this.isEditMode = false;
      return;
    }

    const result = confirm('Do you want to delete this existing entry');
    if (result == true) {
      this.delete.emit({ type: 'delete', id: this.earthquake.id });
      this.isEditMode = false;
    }
  }
}
