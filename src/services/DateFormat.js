export function datefonctionun(dateString) {

    // Créez un objet Date à partir de la chaîne
    const dateObject = new Date(dateString);

    // Obtenez les composants de date (année, mois, jour, heure, minute, seconde)
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Notez que les mois commencent à 0, donc ajoutez 1
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getSeconds()).padStart(2, '0');

    // Formatez la date selon le modèle "YYYY-m-d H:i:s"
    return ` ${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

export function datefonctiondeux(dateString) {

    // Créez un objet Date à partir de la chaîne
    const dateObject = new Date(dateString);

    // Obtenez les composants de date (année, mois, jour, heure, minute, seconde)
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Notez que les mois commencent à 0, donc ajoutez 1
    const day = String(dateObject.getDate()).padStart(2, '0');

    // Formatez la date selon le modèle "YYYY-m-d H:i:s"
    return ` ${day}/${month}/${year}`;
}