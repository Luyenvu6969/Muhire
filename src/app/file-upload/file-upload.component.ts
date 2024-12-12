import { Component, AfterViewInit, QueryList, ViewChildren, Renderer2, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements AfterViewInit {
  mediaUrls: any[] = [];  // Stores all uploaded media (images and videos)
  selectedFile: File | null = null;  // Holds the selected file
  isFullScreen = false;  // Tracks if full-screen mode is active
  fullScreenMedia: any = {};  // Stores the media currently in full-screen mode

  @ViewChildren('video') videos: QueryList<any> = QueryList<any> as any;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  // Handles file selection (image or video)
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Uploads the selected file and adds it to the mediaUrls array
  uploadFile(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const mediaType = this.selectedFile?.type.startsWith('image') ? 'image' : 'video';
        this.mediaUrls.push({
          url: reader.result as string,
          type: mediaType
        });
        this.selectedFile = null;  // Clear the selected file after upload
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Opens the media in full-screen
  openFullScreen(media: any): void {
    this.fullScreenMedia = media;
    this.isFullScreen = true;
  }

  // Closes the full-screen view
  closeFullScreen(): void {
    this.isFullScreen = false;
  }

  // After view initialization, mute all videos
  ngAfterViewInit(): void {
    // Ensure view is fully initialized before manipulating DOM
    this.cdr.detectChanges();

    // Mute all videos with a small delay
    setTimeout(() => {
      this.videos.forEach((video: any) => {
        if (video.nativeElement && !video.nativeElement.muted) {
          this.renderer.setProperty(video.nativeElement, 'muted', true);  // Mute the video
        }
      });
    }, 100);  // Slight delay to ensure videos are rendered
  }
}
