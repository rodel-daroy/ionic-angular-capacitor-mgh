import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagePlanPage } from './manage-plan.page';

describe('ManagePlanPage', () => {
  let component: ManagePlanPage;
  let fixture: ComponentFixture<ManagePlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePlanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagePlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
