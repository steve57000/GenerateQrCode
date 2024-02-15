// Gérer les changements dans les champs de formulaire et générer le QR code
document.getElementById('url').addEventListener('input', handleInputChange);
document.getElementById('foregroundColor').addEventListener('input', handleInputChange);
document.getElementById('backgroundColor').addEventListener('input', handleInputChange);
document.getElementById('imageSize').addEventListener('input', handleInputChange);
document.getElementById('errorCorrectionLevel').addEventListener('change', handleInputChange);

// Déclarer borderRadius et padding en dehors de la fonction generateQRCode pour les rendre accessibles globalement
let borderRadius;
let padding;

// Générer le QR code par défaut lors du chargement de la page
window.addEventListener('load', function() {
  generateQRCode();
});

// Gérer le clic sur le bouton "Valider" pour générer les boutons de téléchargement
document.getElementById('generate').addEventListener('click', function() {
  clearDownloadButtons();
  generateDownloadButtons();
});

// Fonction pour générer le QR code en fonction des valeurs saisies par l'utilisateur
// Fonction pour générer le QR code en fonction des valeurs saisies par l'utilisateur
function generateQRCode() {
  const url = document.getElementById('url').value;
  const foregroundColor = document.getElementById('foregroundColor').value;
  const backgroundColor = document.getElementById('backgroundColor').value;
  const imageSize = 250; // Taille fixe du QR code affiché dans le conteneur
  const errorCorrectionLevel = document.getElementById('errorCorrectionLevel').value;
  padding = 15; // Padding autour du QR code
  if (errorCorrectionLevel === 'H' || errorCorrectionLevel === 'Q') {
    padding = 10; // Réduire le padding pour les niveaux H et Q
  }
  borderRadius = 20; // Rayon des coins arrondis pour le carré extérieur

  // Taille du carré extérieur
  const outerSize = imageSize + 2 * padding;

  // Créer un élément canvas pour le QR code et le carré extérieur
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Configurer QRious pour générer le QR code avec les couleurs spécifiées
  const qr = new QRious({
    value: url,
    size: imageSize, // Taille réelle du QR code
    foreground: foregroundColor, // Couleur sombre
    background: backgroundColor, // Couleur claire
    level: errorCorrectionLevel // Niveau de correction d'erreur
  });

  // Définir la taille du canvas incluant le padding
  canvas.width = outerSize;
  canvas.height = outerSize;

  // Dessiner le carré extérieur avec les coins arrondis
  context.fillStyle = backgroundColor; // Utiliser la couleur de fond du QR code
  context.beginPath();
  context.moveTo(borderRadius, 0);
  context.arcTo(outerSize, 0, outerSize, outerSize, borderRadius);
  context.arcTo(outerSize, outerSize, 0, outerSize, borderRadius);
  context.arcTo(0, outerSize, 0, 0, borderRadius);
  context.arcTo(0, 0, outerSize, 0, borderRadius);
  context.closePath();
  context.fill();

  // Dessiner le QR code à l'intérieur du carré extérieur
  context.drawImage(qr.canvas, padding, padding, imageSize, imageSize);

  // Afficher le canvas dans le conteneur
  const qrCodeContainer = document.getElementById('qrcode-container');
  qrCodeContainer.innerHTML = ''; // Effacer le contenu précédent
  qrCodeContainer.appendChild(canvas);
}


// Fonction pour générer les boutons de téléchargement
function generateDownloadButtons() {
  const downloadPngButton = document.createElement('button');
  downloadPngButton.id = 'downloadPng';
  downloadPngButton.textContent = 'Télécharger PNG';
  downloadPngButton.addEventListener('click', downloadPng);
  document.getElementById('containerDownload').appendChild(downloadPngButton);

  const downloadSvgButton = document.createElement('button');
  downloadSvgButton.id = 'downloadSvg';
  downloadSvgButton.textContent = 'Télécharger SVG';
  downloadSvgButton.addEventListener('click', downloadSvg);
  document.getElementById('containerDownload').appendChild(downloadSvgButton);
}

// Fonction pour supprimer les boutons de téléchargement
function clearDownloadButtons() {
  const containerDownload = document.getElementById('containerDownload');
  containerDownload.innerHTML = '';
}
// Fonction pour dessiner un rectangle avec des coins arrondis
function drawRoundedRect(context, size, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(radius, 0);
  context.arcTo(size, 0, size, size, radius);
  context.arcTo(size, size, 0, size, radius);
  context.arcTo(0, size, 0, 0, radius);
  context.arcTo(0, 0, size, 0, radius);
  context.closePath();
  context.fill();
}

// Fonction pour télécharger le QR code au format PNG
function downloadPng() {
  const imageSizePng = document.getElementById('imageSize').value;
  const backgroundColor = document.getElementById('backgroundColor').value; // Récupérer la couleur de fond

  const canvas = document.querySelector('canvas'); // Sélectionnez le canvas contenant le QR code

  // Créer un nouvel élément canvas avec les coins arrondis à la taille spécifiée par l'utilisateur
  const downloadCanvas = document.createElement('canvas');
  downloadCanvas.width = imageSizePng;
  downloadCanvas.height = imageSizePng;
  const downloadContext = downloadCanvas.getContext('2d');

  // Dessinez le carré extérieur avec les coins arrondis et la couleur de fond spécifiée par l'utilisateur
  drawRoundedRect(downloadContext, imageSizePng, borderRadius, backgroundColor); // Utiliser la couleur de fond spécifiée

  // Dessinez le QR code à l'intérieur du carré extérieur avec le padding approprié
  downloadContext.drawImage(canvas, padding, padding, imageSizePng - 2 * padding, imageSizePng - 2 * padding);

  // Convertir le canvas en URL de données au format PNG
  const resizedImageData = downloadCanvas.toDataURL('image/png');

  // Créer un lien temporaire pour le téléchargement
  const link = document.createElement('a');
  link.href = resizedImageData;
  link.download = 'qr_code.png'; // Nom du fichier à télécharger

  // Ajouter le lien à la page et déclencher le téléchargement
  document.body.appendChild(link);
  link.click();

  // Nettoyer
  document.body.removeChild(link);
}

// Fonction pour télécharger le QR code au format SVG
function downloadSvg() {
  const imageSizeSvg = document.getElementById('imageSize').value;
  const backgroundColor = document.getElementById('backgroundColor').value; // Récupérer la couleur de fond

  const canvas = document.querySelector('canvas'); // Sélectionnez le canvas contenant le QR code

  // Créer un nouvel élément canvas avec les coins arrondis à la taille spécifiée par l'utilisateur
  const downloadCanvas = document.createElement('canvas');
  downloadCanvas.width = imageSizeSvg;
  downloadCanvas.height = imageSizeSvg;
  const downloadContext = downloadCanvas.getContext('2d');

  // Dessinez le carré extérieur avec les coins arrondis et la couleur de fond spécifiée par l'utilisateur
  drawRoundedRect(downloadContext, imageSizeSvg, borderRadius, backgroundColor); // Utiliser la couleur de fond spécifiée

  // Dessinez le QR code à l'intérieur du carré extérieur avec le padding approprié
  downloadContext.drawImage(canvas, padding, padding, imageSizeSvg - 2 * padding, imageSizeSvg - 2 * padding);

  // Créer un élément <svg> pour le contenu SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', imageSizeSvg);
  svg.setAttribute('height', imageSizeSvg);

  // Créer un élément <image> pour le QR code
  const qrImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
  qrImage.setAttribute('width', imageSizeSvg);
  qrImage.setAttribute('height', imageSizeSvg);

  // Convertir le canvas en une URL de données au format PNG
  const imageDataURI = downloadCanvas.toDataURL('image/png');

  // Définir l'URL de l'image redimensionnée comme source de l'élément <image>
  qrImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', imageDataURI);

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


// Fonction pour gérer les changements dans les champs de formulaire et générer le QR code
function handleInputChange() {
  clearDownloadButtons();
  generateQRCode();
}

// // Fonction pour générer le QR code en fonction des valeurs saisies par l'utilisateur
// function generateQRCode() {
//   const url = document.getElementById('url').value;
//   const foregroundColor = document.getElementById('foregroundColor').value;
//   const backgroundColor = document.getElementById('backgroundColor').value;
//
//   // Taille fixe du QR code
//   const size = 300;
//
//   // Résolution du QR code
//   const resolution = 1440; // Augmentez la résolution selon vos besoins
//
//   // Créer un élément canvas pour le QR code
//   const canvas = document.createElement('canvas');
//   canvas.width = resolution;
//   canvas.height = resolution;
//   const qrCodeContainer = document.getElementById('qrcode-container');
//   qrCodeContainer.innerHTML = ''; // Effacer le contenu précédent
//
//   // Configurer QRious pour générer le QR code avec les couleurs spécifiées
//   new QRious({
//     element: canvas,
//     value: url,
//     size: size,
//     foreground: foregroundColor, // Couleur sombre
//     background: backgroundColor // Couleur claire
//   });
//
//   // Créer un canvas temporaire pour redimensionner le QR code avec une meilleure qualité
//   const tempCanvas = document.createElement('canvas');
//   tempCanvas.width = size;
//   tempCanvas.height = size;
//   const tempContext = tempCanvas.getContext('2d');
//   tempContext.drawImage(canvas, 0, 0, size, size);
//
//   // Redimensionner le canvas avec interpolation bilinéaire
//   const resizedCanvas = document.createElement('canvas');
//   resizedCanvas.width = size;
//   resizedCanvas.height = size;
//   const resizedContext = resizedCanvas.getContext('2d');
//   resizedContext.drawImage(tempCanvas, 0, 0, size, size, 0, 0, size, size);
//
//   // Ajouter le canvas redimensionné au conteneur
//   qrCodeContainer.appendChild(resizedCanvas);
//
//   // Activer les boutons de téléchargement du PNG et du SVG
//   document.getElementById('downloadPng').style.display = 'inline-block';
//   document.getElementById('downloadSvg').style.display = 'inline-block';
// }
//
// // Gérer le clic sur le bouton "Valider"
// document.getElementById('generate').addEventListener('click', function() {
//     // Appeler la fonction pour générer le QR code
//     generateQRCode();
// });
//
// // Fonction pour télécharger le QR code au format PNG
// function downloadPng() {
//   const imageSizePng = document.getElementById('imageSize').value;
//
//   const canvas = document.querySelector('canvas'); // Sélectionnez le canvas contenant le QR code
//
//   // Créer un nouvel élément canvas pour redimensionner l'image
//   const resizedCanvas = document.createElement('canvas');
//   resizedCanvas.width = imageSizePng;
//   resizedCanvas.height = imageSizePng;
//   const resizedContext = resizedCanvas.getContext('2d');
//
//   // Dessinez l'image redimensionnée sur le nouveau canvas
//   const image = new Image();
//   image.src = canvas.toDataURL('image/png');
//
//   image.onload = function() {
//     resizedContext.drawImage(image, 0, 0, imageSizePng, imageSizePng);
//
//     // Convertir le canvas redimensionné en URL de données au format PNG
//     const resizedImageData = resizedCanvas.toDataURL('image/png');
//
//     // Créer un lien temporaire pour le téléchargement
//     const link = document.createElement('a');
//     link.href = resizedImageData;
//     link.download = 'qr_code.png'; // Nom du fichier à télécharger
//
//     // Ajouter le lien à la page et déclencher le téléchargement
//     document.body.appendChild(link);
//     link.click();
//
//     // Nettoyer
//     document.body.removeChild(link);
//   };
// }
//
// // Fonction pour télécharger le QR code au format SVG
// function downloadSvg() {
//   const imageSizeSvg = document.getElementById('imageSize').value;
//
//   const canvas = document.querySelector('canvas'); // Sélectionnez le canvas contenant le QR code
//
//   // Créer un élément <svg> pour le contenu SVG
//   const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//   svg.setAttribute('width', imageSizeSvg);
//   svg.setAttribute('height', imageSizeSvg);
//
//   // Créer un élément <image> pour le QR code
//   const qrImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
//   qrImage.setAttribute('width', imageSizeSvg);
//   qrImage.setAttribute('height', imageSizeSvg);
//
//   // Créer un canvas temporaire pour redimensionner l'image avec une meilleure qualité
//   const tempCanvas = document.createElement('canvas');
//   tempCanvas.width = imageSizeSvg;
//   tempCanvas.height = imageSizeSvg;
//   const tempContext = tempCanvas.getContext('2d');
//
//   // Dessiner l'image redimensionnée sur le canvas temporaire
//   tempContext.drawImage(canvas, 0, 0, imageSizeSvg, imageSizeSvg);
//
//   // Convertir le canvas temporaire en URL de données au format PNG
//   const resizedImageData = tempCanvas.toDataURL('image/png');
//
//   // Définir l'URL de l'image redimensionnée comme source de l'élément <image>
//   qrImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', resizedImageData);
//
//   // Ajouter l'élément <image> à l'élément <svg>
//   svg.appendChild(qrImage);
//
//   // Créer un lien temporaire pour le téléchargement
//   const link = document.createElement('a');
//   link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));
//   link.download = 'qr_code.svg'; // Nom du fichier à télécharger
//
//   // Ajouter le lien à la page et déclencher le téléchargement
//   document.body.appendChild(link);
//   link.click();
//
//   // Nettoyer
//   document.body.removeChild(link);
// }
//
// // Ajouter des écouteurs d'événements pour les boutons de téléchargement
// document.getElementById('downloadPng').addEventListener('click', downloadPng);
// document.getElementById('downloadSvg').addEventListener('click', downloadSvg);





