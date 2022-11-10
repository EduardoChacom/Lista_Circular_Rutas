class Base {
  constructor(nombre, minutos) {
      this.nombre = nombre;
      this.minutos = minutos;
      this.sig = null;
      this.ant = null;
  }
}


class rutasDeTrasporte {
  constructor() {
      this.primero = null;
  }

  agregar(nuevo) {
      if (this.primero == null) {
          this.primero = nuevo;
          nuevo.sig = this.primero;
          nuevo.ant = this.primero;
      } else {
          nuevo.sig = this.primero;
          nuevo.ant = this.primero.ant;
          this.primero.ant = nuevo;
          nuevo.ant.sig = nuevo;
      }
  }

  buscar(nombre) {
    if (!this.primero) return
    function vuelta(base, primero) {
      if (base.nombre === nombre) return base;
      if (base.sig === primero) return
      return vuelta(base.sig, primero);
    }
    return vuelta(this.primero, this.primero);
  }

  eliminar(codigo) {
     if (this.buscar( codigo)) {
      if (this.primero == this.primero.sig) {
        this.primero = null;
      } else {
        let aux = this.primero;
        while (aux.nombre != codigo) {
          aux = aux.sig;
        }
        aux.ant.sig = aux.sig;
        aux.sig.ant = aux.ant;
        if ( aux == this.primero) {
          this.primero = aux.sig;
        }
      }
      return true;
     } else {
      return false;
     }
  }

  listar() {
      let str = "";
      let aux = this.primero;
      if (this.primero == null) {
          return null
      } else {
          do {
              str += `Nombre: ${aux.nombre} Minutos: ${aux.minutos} \n`;
              aux = aux.sig;
          } while (aux != this.primero);
      }
      return str;
  }

  recorrido(baseInicio, horaInicio, minutoInicio, horaFin, minutoFin) {
      let str = "";
      let inicio = new Date();
      inicio.setHours(horaInicio);
      inicio.setMinutes(minutoInicio);

      let fin = new Date();
      fin.setHours(horaFin);
      fin.setMinutes(minutoFin);

      this.buscar(baseInicio);
      str = `Hora de inicio: ${inicio.getHours()}:${inicio.getMinutes()}\nHora de finalización: ${fin.getHours()}:${fin.getMinutes()} \n`;

      if (this.primero == null) {
          return false;
      }

      let aux = this.primero;
      do {
          str += `Base ${aux.nombre} - ${inicio.getHours()}:${inicio.getMinutes()}\n`;
          inicio.setMinutes(inicio.getMinutes() + this.primero.minutos);
          aux = aux.sig;
      } while (inicio.getHours() < fin.getHours() || (inicio.getHours() == fin.getHours() &&
      inicio.getMinutes() <= fin.getMinutes()));

      return str;

  }
}
