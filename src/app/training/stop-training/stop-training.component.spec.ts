import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopTrainingComponent } from './stop-training.component';

describe('StopTrainingComponent', () => {
  let component: StopTrainingComponent;
  let fixture: ComponentFixture<StopTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
