import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { WeatherStore } from '../../../../weather/application/weather.store';
import { ACTIVITY_TYPES, ActivityType } from '../../../domain/model/activity-type';
import { CapacityExceededError } from '../../../domain/model/capacity-exceeded.error';
import { AdventureCampsStore } from '../../../application/adventure-camps.store';

function notBlank(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return typeof value === 'string' && value.trim().length === 0 ? { blank: true } : null;
}

@Component({
  selector: 'app-new-reservation',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TranslatePipe,
  ],
  templateUrl: './new-reservation.html',
  styleUrl: './new-reservation.css',
})
export class NewReservation implements OnInit {
  private readonly router = inject(Router);
  private readonly adventureCampsStore = inject(AdventureCampsStore);
  protected readonly weatherStore = inject(WeatherStore);

  protected readonly activityTypes = ACTIVITY_TYPES;

  private readonly selectedActivityType = signal<ActivityType | null>(null);

  protected readonly availableCapacity = computed(() => {
    const activityType = this.selectedActivityType();
    if (!activityType) {
      return null;
    }
    const occupancy = this.adventureCampsStore
      .occupancies()
      .find((item) => item.adventureCamps.activityType === activityType);
    return occupancy ? occupancy.availableCapacity : null;
  });

  protected readonly saving = signal(false);

  protected readonly saveErrorKey = signal<string | null>(null);

  private readonly withinCapacity: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const available = this.availableCapacity();
    const value = control.value;
    return available !== null && typeof value === 'number' && value > available
      ? { exceedsCapacity: true }
      : null;
  };

  protected readonly form = new FormGroup({
    activityType: new FormControl<ActivityType | null>(null, [Validators.required]),
    participantName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, notBlank],
    }),
    participants: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]+$'),
      this.withinCapacity,
    ]),
  });

  ngOnInit(): void {
    this.adventureCampsStore.loadAll();
    this.weatherStore.reset();
  }

  protected onActivityTypeChange(activityType: ActivityType): void {
    this.selectedActivityType.set(activityType);
    this.form.controls.participants.updateValueAndValidity();
    const adventureCamps = this.adventureCampsStore.findAdventureCampsByActivityType(activityType);
    if (adventureCamps) {
      this.weatherStore.loadCurrentWeather(adventureCamps.latitude, adventureCamps.longitude);
    }
  }

  protected get cannotCreate(): boolean {
    return this.form.invalid || !this.weatherStore.reading() || this.saving();
  }

  protected onSubmit(): void {
    const reading = this.weatherStore.reading();
    const { activityType, participantName, participants } = this.form.getRawValue();
    if (this.form.invalid || !reading || !activityType || participants === null) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.saveErrorKey.set(null);
    this.adventureCampsStore
      .createReservation({
        activityType,
        participantName: participantName.trim(),
        participants,
        weatherTemperature: reading.temperature,
      })
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.router.navigate(['/home']);
        },
        error: (error: unknown) => {
          this.saving.set(false);
          this.saveErrorKey.set(
            error instanceof CapacityExceededError
              ? 'new-reservation.error-capacity'
              : 'new-reservation.error-save',
          );
        },
      });
  }

  protected onCancel(): void {
    this.router.navigate(['/home']);
  }
}
