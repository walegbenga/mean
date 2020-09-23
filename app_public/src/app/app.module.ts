import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { HomelistComponent } from './homelist/homelist.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FrameworkComponent } from './framework/framework.component';
import { MostRecentFirstPipe } from './most-recent-first.pipe';
import { HtmlLineBreaksPipe } from './html-line-breaks.pipe';

@NgModule({
  declarations: [
    HomelistComponent,
    DetailsPageComponent,
    HomepageComponent,
    PostDetailsComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    PageHeaderComponent,
    SidebarComponent,
    FrameworkComponent,
    MostRecentFirstPipe,
    HtmlLineBreaksPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
