import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FlightSearchComponent } from './flight-search.component';
import { FlightBookingModule } from '../flight-booking.module';
import { SharedModule } from '../../shared/shared.module';
import { FlightService } from '../flight.service';
import { DefaultFlightService } from '../default-flight.service';

describe('Unit test: FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FlightBookingModule, SharedModule],
      providers: [
        {
          provide: FlightService,
          useClass: DefaultFlightService
        }
      ]
    });

    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not have any flights loaded initially', () => {
    expect(component.flights.length).toBe(0);
  });

  it('should load a flight when user entered from and to', () => {
    component.from = 'Graz';
    component.to = 'Hamburg';
    component.search();

    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

    const req = httpTestingController.expectOne('http://www.angular.at/api/flight?from=Graz&to=Hamburg');
    // req.request.method === 'GET'

    req.flush([
      {
        id: 22,
        from: 'Graz',
        to: 'Hamburg',
        date: ''
      }
    ]);

    expect(component.flights.length).toBe(1);

    expect(component.flights[0]).toMatchObject({
      id: 22,
      from: 'Graz',
      to: 'Hamburg',
      date: ''
    });
  });
});
