import { CustomerUpdateComponent } from './customer/customer-update/customer-update.component';
import { CustomerComponent } from './customer/customer.component';
import { TableComponent } from './home/table/table.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-modal';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CustomerService } from './customer/customer.service';
import { SearchPipe } from './home/table/filter.pipe';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'lista', component: TableComponent },
  { path: 'cadastro', component: CustomerComponent },
  { path: 'atualizar', component: CustomerUpdateComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerUpdateComponent,
    HeaderComponent,
    HomeComponent,
    TableComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ModalModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule { }
