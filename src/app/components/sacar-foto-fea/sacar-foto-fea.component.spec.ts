import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SacarFotoFeaComponent } from './sacar-foto-fea.component';

describe('SacarFotoFeaComponent', () => {
  let component: SacarFotoFeaComponent;
  let fixture: ComponentFixture<SacarFotoFeaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SacarFotoFeaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SacarFotoFeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
