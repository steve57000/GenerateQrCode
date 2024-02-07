// Fonction pour générer le QR code en fonction des valeurs saisies par l'utilisateur
function generateQRCode() {
  const url = document.getElementById('url').value;
  const foregroundColor = document.getElementById('foregroundColor').value;
  const backgroundColor = document.getElementById('backgroundColor').value;

  // Taille fixe du QR code
  const size = 300;

  // Résolution du QR code
  const resolution = 1440; // Augmentez la résolution selon vos besoins

  // Créer un élément canvas pour le QR code
  const canvas = document.createElement('canvas');
  canvas.width = resolution;
  canvas.height = resolution;
  const qrCodeContainer = document.getElementById('qrcode-container');
  qrCodeContainer.innerHTML = ''; // Effacer le contenu précédent

  // Configurer QRious pour générer le QR code avec les couleurs spécifiées
  new QRious({
    element: canvas,
    value: url,
    size: size,
    foreground: foregroundColor, // Couleur sombre
    background: backgroundColor // Couleur claire
  });

  // Créer un canvas temporaire pour redimensionner le QR code avec une meilleure qualité
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = size;
  tempCanvas.height = size;
  const tempContext = tempCanvas.getContext('2d');
  tempContext.drawImage(canvas, 0, 0, size, size);

  // Redimensionner le canvas avec interpolation bilinéaire
  const resizedCanvas = document.createElement('canvas');
  resizedCanvas.width = size;
  resizedCanvas.height = size;
  const resizedContext = resizedCanvas.getContext('2d');
  resizedContext.drawImage(tempCanvas, 0, 0, size, size, 0, 0, size, size);

  // Ajouter le canvas redimensionné au conteneur
  qrCodeContainer.appendChild(resizedCanvas);

  // Activer les boutons de téléchargement du PNG et du SVG
  document.getElementById('downloadPng').style.display = 'inline-block';
  document.getElementById('downloadSvg').style.display = 'inline-block';
}



// Gérer le clic sur le bouton "Valider"
document.getElementById('generate').addEventListener('click', function() {
    // Appeler la fonction pour générer le QR code
    generateQRCode();
});

// Fonction pour télécharger le QR code au format PNG
function downloadPng() {
  const imageSizePng = document.getElementById('imageSize').value;

  const canvas = document.querySelector('canvas'); // Sélectionnez le canvas contenant le QR code

  // Créer un nouvel élément canvas pour redimensionner l'image
  const resizedCanvas = document.createElement('canvas');
  resizedCanvas.width = imageSizePng;
  resizedCanvas.height = imageSizePng;
  const resizedContext = resizedCanvas.getContext('2d');

  // Dessinez l'image redimensionnée sur le nouveau canvas
  const image = new Image();
  image.src = canvas.toDataURL('image/png');

  image.onload = function() {
    resizedContext.drawImage(image, 0, 0, imageSizePng, imageSizePng);

    // Convertir le canvas redimensionné en URL de données au format PNG
    const resizedImageData = resizedCanvas.toDataURL('image/png');

    // Créer un lien temporaire pour le téléchargement
    const link = document.createElement('a');
    link.href = resizedImageData;
    link.download = 'qr_code.png'; // Nom du fichier à télécharger

    // Ajouter le lien à la page et déclencher le téléchargement
    document.body.appendChild(link);
    link.click();

    // Nettoyer
    document.body.removeChild(link);
  };
}

// Fonction pour télécharger le QR code au format SVG
function downloadSvg() {
  const imageSizeSvg = document.getElementById('imageSize').value;

  const canvas = document.querySelector('canvas'); // Sélectionnez le canvas contenant le QR code

  // Créer un élément <svg> pour le contenu SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', imageSizeSvg);
  svg.setAttribute('height', imageSizeSvg);

  // Créer un élément <image> pour le QR code
  const qrImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
  qrImage.setAttribute('width', imageSizeSvg);
  qrImage.setAttribute('height', imageSizeSvg);

  // Créer un canvas temporaire pour redimensionner l'image avec une meilleure qualité
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = imageSizeSvg;
  tempCanvas.height = imageSizeSvg;
  const tempContext = tempCanvas.getContext('2d');

  // Dessiner l'image redimensionnée sur le canvas temporaire
  tempContext.drawImage(canvas, 0, 0, imageSizeSvg, imageSizeSvg);

  // Convertir le canvas temporaire en URL de données au format PNG
  const resizedImageData = tempCanvas.toDataURL('image/png');

  // Définir l'URL de l'image redimensionnée comme source de l'élément <image>
  qrImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', resizedImageData);

  // Ajouter l'élément <image> à l'élément <svg>
  svg.appendChild(qrImage);

  // Créer un lien temporaire pour le téléchargement
  const link = document.createElement('a');
  link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));
  link.download = 'qr_code.svg'; // Nom du fichier à télécharger

  // Ajouter le lien à la page et déclencher le téléchargement
  document.body.appendChild(link);
  link.click();

  // Nettoyer
  document.body.removeChild(link);
}




// Ajouter des écouteurs d'événements pour les boutons de téléchargement
document.getElementById('downloadPng').addEventListener('click', downloadPng);
document.getElementById('downloadSvg').addEventListener('click', downloadSvg);





