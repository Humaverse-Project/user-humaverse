import { base_url } from "./BaseUrl";

export async function listmetier() {
  const url = `${base_url}/metier`;

  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("erreur backend");
  }
  return await response.json();
}

export async function listmetiermetier() {
  const url = `${base_url}/fiches/postes/metier`;

  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("erreur backend");
  }
  return await response.json();
}

export async function getdatarome(code) {
  const url = `${base_url}/fiches/postes/detail`;

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


export async function postmetier(agrementlist, ficheslist, conditionlist, formdata) {
  const url = `${base_url}/fiches/postes/newbo`;

  const body = new URLSearchParams();
  body.append("competanceid", formdata.competanceid);
  body.append("titre", formdata.titre);
  body.append("emploisid", formdata.emploisid);
  body.append("convention", formdata.convention);
  body.append("romeid", formdata.romeid);
  body.append("formation", formdata.formation);
  body.append("definition", formdata.definition);
  body.append("activite", formdata.activite);
  body.append("metierid", formdata.metierid);

  for (let index = 0; index < agrementlist.length; index++) {
    const element = agrementlist[index];
    body.append('agrement[]', element.name);
    body.append('agrementid[]', element.id);
  }
  for (let index = 0; index < ficheslist.length; index++) {
    const element = ficheslist[index];
    body.append('ficheslist[]', element.name);
    body.append('ficheslistid[]', element.id);
  }
  for (let index = 0; index < conditionlist.length; index++) {
    const element = conditionlist[index];
    body.append('conditionlist[]', element.name);
    body.append('conditionlistid[]', element.id);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error("erreur backend");
  }
  return await response.json();
}

export async function updatemetier(formdata) {
  const url = `${base_url}/metier/${formdata.id}/edit`;

  const body = new URLSearchParams();
  body.append("code", formdata.code);
  body.append("nom", formdata.nom);
  body.append("description_c", formdata.descriptionC);
  body.append("description_l", formdata.descriptionL);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error("erreur backend");
  }
  return await response.json();
}

export async function deletemetier(id) {
  const url = `${base_url}/metier/${id}`;

  const body = new URLSearchParams();
  body.append("id", id);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error("erreur backend");
  }
  return await response.json();
}
