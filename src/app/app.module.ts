import { LoginGuard } from './guard/login.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AppRouteModule } from './app-route/app-route.module';
import { LoginService } from './service/login.service';
import { FileFilterPipe } from './table/file-filter.pipe';
import { FileSortPipe } from './table/file-sort.pipe';
import { ModalBoxComponent } from './modal-box/modal-box.component';
import { FileInputComponent } from './file-input/file-input.component';
import { HiswsService } from './hisws/hisws.service';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ContentComponent,
    SidebarComponent,
    TableComponent,
    LoginComponent,
    UserComponent,
    FileFilterPipe,
    FileSortPipe,
    ModalBoxComponent,
    FileInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRouteModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [LoginService, LoginGuard, HiswsService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
