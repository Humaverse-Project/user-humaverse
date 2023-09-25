import { base_url } from './BaseUrl'

export async function listrome() {
    const url = `${base_url}/rome/list`;

    const response = await fetch(url, {
        method: 'GET'
    });
    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}

export async function updaterome(formdata) {
  const url = `${base_url}/rome/${formdata.id}/edit`;

  const body = new URLSearchParams();
  body.append('nom', formdata.nom);
  body.append('rome_definition', formdata.rome_definition);
  body.append('rome_acces_metier', formdata.rome_acces_metier);

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

export async function getdatarome(code) {
  const url = `${base_url}/rome/detail`;

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