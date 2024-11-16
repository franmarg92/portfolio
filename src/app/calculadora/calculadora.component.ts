import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})

export class CalculadoraComponent {
  pantalla: string = ''; 

  agregar(valor: string): void {
    this.pantalla += valor;
  }

  borrar(): void {
    this.pantalla = '';
  }

  calcular(): void {
    try {
      
      this.pantalla = eval(this.pantalla).toString();
    } catch (error) {
      this.pantalla = 'Error';
    }
  }
}