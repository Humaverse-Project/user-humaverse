import { base_url } from './BaseUrl'

export async function listmetier() {
    const url = `${base_url}/metier`;

    const response = await fetch(url, {
        method: 'GET'
    });
    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}

export async function postmetier(formdata) {
    const url = `${base_url}/metier/new`;

    const body = new URLSearchParams();
    body.append('code', formdata.code);
    body.append('nom', formdata.nom);
    body.append('description_c', formdata.description_c);
    body.append('description_l', formdata.description_l);

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

export async function updatemetier(formdata) {
    const url = `${base_url}/metier/${formdata.id}/edit`;

    const body = new URLSearchParams();
    body.append('code', formdata.code);
    body.append('nom', formdata.nom);
    body.append('description_c', formdata.descriptionC);
    body.append('description_l', formdata.descriptionL);

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

export async function deletemetier(id) {
    const url = `${base_url}/metier/${id}`;

    const body = new URLSearchParams();
    body.append('id', id);

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