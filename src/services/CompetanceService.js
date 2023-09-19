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

export async function postcompetance(formdata, brique) {
    const url = `${base_url}/fiches/competences/new`;

    const body = new URLSearchParams();
    body.append('accreid', formdata.accreid);
    body.append('accretitre', formdata.accretitre);
    body.append('niveau', formdata.niveau);
    body.append('titre', formdata.titre);
    body.append('version', formdata.version);
    for (let index = 0; index < brique.length; index++) {
        const element = brique[index];
        body.append('brique[]', element.id);
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