import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToastrService } from "ngx-toastr";
import { HeaderComponent } from "../header/header.component";

import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent],
      providers: [{ provide: ToastrService, useValue: ToastrService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
