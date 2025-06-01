import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  form = {
    user_email: '',
    message: ''
  };

  sendEmail() {
    emailjs.send(
      'service_jjzxa0b',     
      'template_l73cmo8',     
      this.form,
      '_DjtX78mWa3QF_N1V'       
    ).then(() => {
      alert('¡Mensaje enviado con éxito!');
      this.form = { user_email: '', message: '' };
    }).catch((error) => {
      console.error('Error al enviar el mensaje:', error);
      alert('Hubo un error al enviar el mensaje.');
    });
  }
}
