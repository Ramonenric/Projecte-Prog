
class Component {
  static fromTxt(line) {
    const partes = line.split(/\s+/);
    const formatNumber = str => parseFloat(str.replace(/,/, '.'));
    const f = partes[5] === 'F';
    const r = parseFloat((f ? partes[6] : partes[5]));
    return new Component(
      partes[0],
      partes[1], 
      partes[2], 
      formatNumber(Component.dataOrError(partes[3])),
      formatNumber(Component.dataOrError(partes[4])),
      r,
      f
    )
  }
  static dataOrError(str) {
    if(str) return str;
    throw new Error('Invalid data');
  }
  static fromCsv(line){
    const partes = line.split(/,+/);
    const removeQuotes = str => str.replace(/^"/, '').replace(/"$/, '');
    const formatNumber = str => parseFloat(str.replace(/,/, '.'));
    return new Component(
      removeQuotes(Component.dataOrError(partes[0])),
      removeQuotes(Component.dataOrError(partes[1])),
      removeQuotes(Component.dataOrError(partes[2])),
      formatNumber(Component.dataOrError(partes[3])),
      formatNumber(Component.dataOrError(partes[4])),
      formatNumber(Component.dataOrError(partes[5])),
      partes[6]
    )
  }
  constructor(id, type, outline, x, y, rotation, flip) {
    this.id = id;
    this.type = type;
    this.outline = outline;
    this.x = x;
    this.y = y;
    /**
     * @type {number}
     */
    this.rotation = rotation;
    this.flip = flip;
  }
}

const fs = require('fs');

try {
  const dades = parseTxt(fs.readFileSync('production1.txt').toString())
  console.log(toASQ(dades))
} catch(e) {
  console.log('Error al leer el archivo');
  console.log(e);
}


function parseTxt(data) {
  const components = [];
  let init = false;
  for(const line of data.split(/\r?\n/)) {
    if(line === '.PARTS'){
      init = true; 
      continue;
    }
    if(!init) continue;
    if(line === '.ENDPARTS'){
      break;
    }
    const component = Component.fromTxt(line); 
    components.push(component);
  }
  return components;
}

try {
  const dades = parseCsv(fs.readFileSync('production2_bottom.csv').toString())
  console.log(dades)
} catch(e) {
  console.log('Error al leer el archivo');
  console.log(e);
}

function parseCsv(data){
  const components = [];
  let init = false;
  for(const line of data.split(/\r?\n/)){
    if(line === 'Ref,Val,Package,PosX,PosY,Rot,Side'){
      init = true;
      continue;
    }
    if(!init) continue;
    if(!line){
      break;
    }
    const component = Component.fromCsv(line);
    components.push(component);
  }
  return components;
}

const endline = '\r\n';
/**
 * @param {Component[]} components 
 */
function toTxt(components) {
  let fitxer = '';
  fitxer = '.PARTS' + endline;
  function space(num, txt) {
    const len = txt.length;
    const nspace = num - len;
    let str = txt;
    for(let i = 0; i < nspace; i++) str+= ' ';
    return str;
  }
  for(const component of components){
    let linea = '';
    linea += space(7, component.part);
    linea += space(29, component.type);
    linea += space(24, component.outline);
    linea += space(10, component.x + '');
    linea += space(8, component.y + '');
    linea += space(2, component.flip ? 'F' : '');
    linea += component.rotation.toFixed(2) + endline;
    fitxer += linea;
  }
  fitxer += '.ENDPARTS' + endline;
  return fitxer;
}
/**
 * @param {Component[]} components 
 */
function toASQ(components) {
  let file = '';
  for(const component of components) {
    let line = '';
    line += `#${component.part}#,`;
    line += `${component.x}, `;
    line += `${component.y}, `;
    line += `${component.rotation},#PYX#,##,`;
    line += `#${component.type} ${component.outline} #,1,T,#1#,0,F,#TAPE#,#X#,#A#,##,##,F`;
    line += endline;//falta flip
    file += line;
  }
  file += endline
  return file;
}

