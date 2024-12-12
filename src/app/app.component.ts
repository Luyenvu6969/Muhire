import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component'; // Import LogoComponent correctly
import { FileUploadComponent } from './file-upload/file-upload.component'; // Import FileUploadComponent correctly

@Component({
  selector: 'app-root',
  standalone: true,  // This makes the component standalone
  imports: [LogoComponent, FileUploadComponent],  // Import both LogoComponent and FileUploadComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}
