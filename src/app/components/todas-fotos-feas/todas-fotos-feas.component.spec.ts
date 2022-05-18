import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodasFotosFeasComponent } from './todas-fotos-feas.component';

describe('TodasFotosFeasComponent', () => {
  let component: TodasFotosFeasComponent;
  let fixture: ComponentFixture<TodasFotosFeasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TodasFotosFeasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodasFotosFeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
