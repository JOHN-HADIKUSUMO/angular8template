import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/app.component';
import { NavComponent } from './components/menus/nav.component';
import { AppRoutingModule, routingComponents, guardServices } from './app-routing.module';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FullnamePipe } from './pipes/fullname.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule, modalComponents } from './components/modals/modal.module';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ChartModule,
        AppRoutingModule,
        ModalModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxPaginationModule
    ],
    declarations: [
        AppComponent,
        NavComponent,
        routingComponents,
        modalComponents,
        FullnamePipe
    ],
    providers: [guardServices],
    bootstrap: [AppComponent]
})
export class AppModule {
}
