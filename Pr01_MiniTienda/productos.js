const productosJSON = `[
  {
    "id": "TSH01",
    "nombre": "MACACARENA",
    "descripcion": "Quan balles sense vergonya i el ritme et domina.",
    "precioBase": 19.95,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "mostaza"],
    "imagenes": {
      "blanco": "img/MACACARENA.png",
      "negro": "img/MACACARENA_BLACK.png",
      "mostaza": "img/MACACARENA.png"
    },
    "tags": ["nuevo"]
  },
  {
    "id": "TSH02",
    "nombre": "NINETIES MODE",
    "descripcion": "Un homenatge pixelat als anys 90.",
    "precioBase": 21.50,
    "tallas": ["S", "M", "L", "XL", "XXL"],
    "colores": ["gris", "negro"],
    "imagenes": {
      "gris": "img/NINETIES.png",
      "negro": "img/NINETIES_BLACK.png"
    },
    "tags": ["retro"]
  },
  {
    "id": "TSH03",
    "nombre": "RESERVOIR INVADERS",
    "descripcion": "Quan Tarantino coneix els videojocs clàssics.",
    "precioBase": 22.90,
    "tallas": ["M", "L", "XL"],
    "colores": ["azul", "negro"],
    "imagenes": {
      "azul": "img/RESERVOIR.png",
      "negro": "img/RESERVOIR_BLACK.png"
    },
    "tags": ["edicion-especial"]
  },
  {
    "id": "TSH04",
    "nombre": "VITRUVIAN CODE",
    "descripcion": "Art, codi i proporció perfecta.",
    "precioBase": 24.00,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro"],
    "imagenes": {
      "blanco": "img/VITRUVIAN.png",
      "negro": "img/VITRUVIAN_BLACK.png"
    },
    "tags": ["premium"]
  }
]
`;

let camisetas = JSON.parse(productosJSON);

let contenedor = document.getElementById("tshirts");

camisetas.forEach(camiseta => {

  let articulo = document.createElement("article");
  articulo.className = "camiseta"

  let imagen = document.createElement('img')
  let primerColor = camiseta.colores[0]; // "blanco"
  imagen.setAttribute('src', camiseta.imagenes[primerColor]);

  let titulo = document.createElement('h3')
  titulo.innerText = camiseta.nombre

  let descripcion = document.createElement('p')
  descripcion.innerText = camiseta.descripcion

  let precio = document.createElement('p')
  precio.innerText = `${camiseta.precioBase}€`

  //TALLA
  let divTallas = document.createElement('select')
  let tallas = camiseta.tallas
  tallas.forEach(talla => {
      divTallas.innerHTML += `<option value="${talla}">${talla}</option>`
  });

  //Colores
  let divColores = document.createElement('select')
  let colores = camiseta.colores
  colores.forEach(color => {
      divColores.innerHTML += `<option value="${color}">${color}</option>`
  });

  //Boton
  let boton = document.createElement('button')
  boton.innerText = "Añadir al carrito" 
  boton.addEventListener('click', () => {

  });



  articulo.appendChild(imagen)
  articulo.appendChild(titulo)
  articulo.appendChild(descripcion)
  articulo.appendChild(divTallas)
  articulo.appendChild(divColores)
  articulo.appendChild(precio)
  articulo.appendChild(boton)
  
  contenedor.appendChild(articulo)
});