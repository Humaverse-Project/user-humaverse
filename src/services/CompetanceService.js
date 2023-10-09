import { base_url } from './BaseUrl'

export async function listcompetance() {
    const url = `${base_url}/fiches/competences`;

    const response = await fetch(url, {
        method: 'GET'
    });
    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}

export async function postcompetance(formdata, brique, accreditationlist, romeid, nouvellecompetance=[]) {
    const url = `${base_url}/fiches/competences/new`;

    const body = new URLSearchParams();
    body.append('applicationall', formdata.applicationall);
    body.append('romeid', romeid);
    body.append('emploisid', formdata.emploisid);
    body.append('titre', formdata.titre);
    body.append('version', formdata.version);
    for (let index = 0; index < brique.length; index++) {
        const element = brique[index];
        body.append('brique[]', element.id);
        body.append('niveau[]', element.niveau);
    }
    for (let index = 0; index < accreditationlist.length; index++) {
        const element = accreditationlist[index];
        body.append('accreditationname[]', element.accreditaiontitre);
        body.append('accreditationvalue[]', element.acrreditationvalue);
    }
    for (let index = 0; index < nouvellecompetance.length; index++) {
        const element = nouvellecompetance[index];
        body.append('globaltitre[]', element.globaltitre);
        body.append('globalid[]', element.globalid);
        body.append('compettitre[]', element.compettitre);
        body.append('globalcategorie[]', element.globalcategorie);
        body.append('niveauvaovao[]', element.niveau);
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });

    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}

export async function getdatacompetance(code) {
    const url = `${base_url}/fiches/competences/detail`;

    const body = new URLSearchParams();
    body.append('code', code);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });

    if (!response.ok) {
        throw new Error('erreur backend');
    }
    return await response.json();
}
export async function loadcompetanceglobal(formdata) {
    const url = `${base_url}/briques/competences/load`;

    const body = new URLSearchParams();
    body.append('categorie_id', formdata.id);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });

    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}

export async function deletecompetance(id) {
    console.log(id)
    const url = `${base_url}/fiches/competences/delete/${id}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}