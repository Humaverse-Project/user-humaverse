const base_url = "http://humaverse.local/index.php"
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