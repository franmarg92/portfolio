import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AboutMeComponent } from './about-me/about-me.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { ContactComponent } from './contact/contact.component';
import { EstudiosComponent } from './estudios/estudios.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ExperienciasComponent } from './experiencias/experiencias.component';

interface WindowItem {
  title: string;
  component: any;
  minimized: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio';
  isDropdownOpen: boolean = false;
  userName: string = 'Franco Gabrielleschi';
  openWindows: WindowItem[] = [];
  currentTime = new Date();
  isMobile: boolean = false;
  lastClickTime: number = 0;

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.isMobile = window.innerWidth <= 768;
  }
}
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
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


handleIconClick(title: string): void {
  if (this.isMobile) {
    this.openWindow(title); 
  } else {
    const now = new Date().getTime();
    if (now - this.lastClickTime < 300) {
      this.openWindow(title); 
    }
    this.lastClickTime = now;
  }
}
  openWindow(title: string): void {
    const componentMap: { [key: string]: any } = {
      'Sobre_mi': AboutMeComponent,
      'Habilidades': HabilidadesComponent,
      'Contacto': ContactComponent,
      'Estudios': EstudiosComponent,
      'Experiencias': ExperienciasComponent,
      'Calculadora': CalculadoraComponent
      
    };

    const existingWindow = this.openWindows.find(win => win.title === title);

    if (!existingWindow && componentMap[title]) {
      this.openWindows.push({
        title,
        component: componentMap[title],
        minimized: false
      });
    } else if (existingWindow) {
      existingWindow.minimized = false;
    }
  }

  minimizeWindow(win: WindowItem): void {
    win.minimized = true;
  }

  restoreWindow(win: WindowItem): void {
    win.minimized = false;
  }

  closeWindow(winToClose: WindowItem): void {
    this.openWindows = this.openWindows.filter(
      win => win.title !== winToClose.title
    );
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'assets/FrancoGabrielleschiCV.pdf';
    link.download = 'CV_Franco_Gabrielleschi.pdf';
    link.click();
  }
}
