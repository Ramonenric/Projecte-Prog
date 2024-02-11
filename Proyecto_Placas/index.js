class LineaArchivoTXT {
  constructor(line) {
    const partes = line.split(/\s+/);
    this.part = partes[0];
    this.type = partes[1];
    this.outline = partes[2];
    // Convertir las coordenadas a punto flotante sin usar replace
    this.posicionX = partes[3] ? parseFloat(partes[3].replaceAll(',', '.')) : null;
    this.posicionY = partes[4] ? parseFloat(partes[4].replaceAll(',', '.')) : null;
    this.rotation = partes[5] ? parseFloat(partes[5]) : null;
  }
}

const fs = require('fs');

fs.readFile('production1.txt', 'utf-8', (err, data) => {
  if(err) {
    console.log('Error al leer el archivo:', err);
  } else {
    // Separar el contenido del archivo en líneas y recorrer cada línea
    data.split(/\r?\n/).forEach(line =>  {
      // Crear una instancia de la clase LineaArchivo para cada línea del archivo
      const lineaObjeto = new LineaArchivoTXT(line);
      // Imprimir los atributos de la línea
      console.log(lineaObjeto);
    });
  }
});

class LineaArchivoASQ {
  constructor(line) {
    const partes = line.split(',');
    this.part = partes[0];
    this.posicionX = partes[1] ? parseFloat(partes[1]) : null;
    this.posicionY = partes[2] ? parseFloat(partes[2]) : null;
    this.rotation = partes[3] ? parseFloat(partes[3]) : null;
    this.type = partes[6] ? partes[6] : undefined;
    this.outline = partes[6] ? partes[6] : undefined;
  }
}

fs.readFile('production1Maquina1.asq', 'utf-8', (err, data) => {
  if(err) {
    console.log('Error al llegir el fitxer:', err);
  } else {
    // Separar el contingut del fitxer en línies i recórrer cada línia
    data.split(/\r?\n/).forEach(line =>  {
      // Crear una instància de la classe LineaArchivo per a cada línia del fitxer
      const lineaObjeto = new LineaArchivoASQ(line);
      // Crear un objecte amb el format desitjat
      const jsonOutput = {
        LineaArchivoASQ: {
          part: lineaObjeto.part,
          type: lineaObjeto.type,
          outline: lineaObjeto.outline,
          posicionX: lineaObjeto.posicionX,
          posicionY: lineaObjeto.posicionY,
          rotation: lineaObjeto.rotation
        }
      };
      // Imprimir els atributs de la línia en format JSON
      console.log(jsonOutput);
    });
  }
});
