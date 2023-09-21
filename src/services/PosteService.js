import { base_url } from './BaseUrl'

export async function listpost() {
    const url = `${base_url}/fiches/postes/`;

    const response = await fetch(url, {
        method: 'GET'
    });
    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}

export async function postPoste(formdata) {
    const url = `${base_url}/fiches/postes/new`;

    const body = new URLSearchParams();
    let keylist = Object.keys(formdata);
    for (let index = 0; index < keylist.length; index++) {
        const element = keylist[index];
        body.append(element, formdata[element]);
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
