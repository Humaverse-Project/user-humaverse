const generateRandomData = (count) => {
    const formations = ['Formation A', 'Formation B', 'Formation C', 'Formation D', 'Formation E'];
    const competences = ['Compétence 1', 'Compétence 2', 'Compétence 3', 'Compétence 4', 'Compétence 5'];
    const niveaux = ['Débutant', 'Intermédiaire', 'Avancé'];
    const accessibilite = ['Physique', 'Distanciée', 'Dématérialisée'];
    const tarifs = ['Gratuit', 'Payant'];
    const supervision = ['Avec supervision humaine', 'Sans supervision humaine'];
  
    const data = [];
    for (let i = 1; i <= count; i++) {
        data.push({
            id : i,
            formation: formations[Math.floor(Math.random() * formations.length)],
            competences: competences.slice(0, Math.floor(Math.random() * competences.length) + 1),
            niveau: niveaux[Math.floor(Math.random() * niveaux.length)],
            accessible: accessibilite[Math.floor(Math.random() * accessibilite.length)],
            tarif: tarifs[Math.floor(Math.random() * tarifs.length)],
            duree: Math.floor(Math.random() * 40) + 20,
            supervision: supervision[Math.floor(Math.random() * supervision.length)]
        });
    }
    return data;
};
export const columns = [
    { field: 'id', headerName: 'ID', width: 70, editable: true },
    { field: 'formation', headerName: 'Nom de la formation', width: 200, editable: true },
    {
      field: 'competences',
      headerName: 'Compétences',
      width: 200,
      valueGetter: (params) => params.row.competences.join(', '),
      editable: true
    },
    { field: 'niveau', headerName: 'Niveau', width: 150, editable: true },
    { field: 'accessible', headerName: 'Accessible', width: 150, editable: true },
    { field: 'tarif', headerName: 'Tarif', width: 120, editable: true },
    { field: 'duree', headerName: 'Durée (heures)', width: 150, editable: true },
    { field: 'supervision', headerName: 'Supervision', width: 200, editable: true },
];
  // Utilisation :
export const rows = generateRandomData(20);