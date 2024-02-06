// Fonction pour générer le QR code en fonction des valeurs saisies par l'utilisateur
function generateQRCode() {
    const url = document.getElementById('url').value;
    let size = document.getElementById('size').value;
    const foregroundColor = document.getElementById('foregroundColor').value;
    const backgroundColor = document.getElementById('backgroundColor').value;

    // Limiter la taille maximale à 500
    size = Math.min(size, 500);

    // Mettre à jour la valeur de l'élément input si elle dépasse la limite
    document.getElementById('size').value = size;

    // Créer un élément canvas pour le QR code
    const canvas = document.createElement('canvas');
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

    // Ajouter le canvas au conteneur
    qrCodeContainer.appendChild(canvas);

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
    const canvas = document.querySelector('canvas'); // Sélectionnez le canvas contenant le QR code
    const url = canvas.toDataURL('image/png'); // Convertir le canvas en URL de données au format PNG
    const link = document.createElement('a'); // Créer un élément <a> pour le téléchargement
    link.href = url; // Définir l'URL de données comme lien de téléchargement
    link.download = 'qr_code.png'; // Nom du fichier à télécharger
    document.body.appendChild(link); // Ajouter le lien à la page
    link.click(); // Cliquez sur le lien pour démarrer le téléchargement
    document.body.removeChild(link); // Supprimer le lien après le téléchargement
}

// Fonction pour télécharger le QR code au format SVG
function downloadSvg() {
    const canvas = document.querySelector('canvas'); // Sélectionnez le canvas contenant le QR code

    // Créer un élément <a> pour le téléchargement
    const link = document.createElement('a');

    // Convertir le contenu du canvas en URL de données au format PNG
    const imageData = canvas.toDataURL('image/png');

    // Créer le contenu du fichier SVG avec l'image du canvas
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg" width="' + canvas.width + '" height="' + canvas.height + '" xmlns:xlink="http://www.w3.org/1999/xlink">' +
        '<image xlink:href="' + imageData + '" width="' + canvas.width + '" height="' + canvas.height + '" />' +
        '</svg>';

    const blob = new Blob([svgContent], { type: 'image/svg+xml' }); // Créer un Blob avec le contenu SVG
    const url = URL.createObjectURL(blob); // Créer une URL pour le Blob

    link.href = url; // Définir l'URL du Blob comme lien de téléchargement
    link.download = 'qr_code.svg'; // Nom du fichier à télécharger

    document.body.appendChild(link); // Ajouter le lien à la page
    link.click(); // Cliquez sur le lien pour démarrer le téléchargement

    // Libérer l'URL après le téléchargement
    URL.revokeObjectURL(url);
    document.body.removeChild(link); // Supprimer le lien après le téléchargement
}

// Ajouter des écouteurs d'événements pour les boutons de téléchargement
document.getElementById('downloadPng').addEventListener('click', downloadPng);
document.getElementById('downloadSvg').addEventListener('click', downloadSvg);

// Sélection de l'élément <input type="number">
const sizeInput = document.getElementById('size');

// Ajout d'un gestionnaire d'événements pour l'événement "input"
sizeInput.addEventListener('input', function() {
    // Récupération de la valeur saisie
    let size = parseInt(sizeInput.value);

    // Limiter la taille maximale à 500
    size = Math.min(size, 500);

    // Mettre à jour la valeur de l'élément input si elle dépasse la limite
    sizeInput.value = size;
});



