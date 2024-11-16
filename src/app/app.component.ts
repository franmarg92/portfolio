import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio';
  isDropdownOpen: boolean = false;
  userName: string = 'Franco Gabrielleschi';
  openWindows: {title: string; route: string; minimized: boolean }[] = [];
  currentTime = new Date();
window: any;


  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Ejecuta solo en el cliente
      setInterval(() => this.updateTime(), 1000);
    }
  }

  updateTime(): void {
    this.currentTime = new Date();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOnOutsideClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.start-menu') && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  openWindow(title: string, route: string): void {
    const existingWindow = this.openWindows.find((win) => win.route === route);
    if (!existingWindow) {
      
      this.openWindows.push({ title, route, minimized: false });
      this.router.navigate([route]);
    } else {
      
      existingWindow.minimized = false;
      this.router.navigate([route]);
    }
  }
  minimizeWindow(window: { title: string; route: string; minimized: boolean }): void {
    window.minimized = true; 
  }
  
  restoreWindow(window: { title: string; route: string; minimized: boolean }): void {
    window.minimized = false; 
    this.router.navigate([window.route]); 
  }
  

  closeWindow(windowToClose: { title: string; route: string }): void {
    this.openWindows = this.openWindows.filter(
      (window) => window.route !== windowToClose.route
    );
  }


  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'Franco.Gabrielleschi.Martin.pdf'; 
    link.download = 'CV_Franco_Gabrielleschi.pdf'; 
    link.click();
  }

  
}
