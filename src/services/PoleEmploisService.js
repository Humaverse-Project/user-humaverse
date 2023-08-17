export async function authenticateClient() {
    const url = '/connexion/oauth2/access_token?realm=%2Fpartenaire';
    const clientId = 'PAR_humaverse_037f8107c29931a29e9ac891692aab1865a81cdb5477cf462443e7bbd9afb860';
    const clientSecret = 'bd8be64e6c7090e20a4dfebad4292d21f9831318995f2964e6ec8e4b87197d1f';
    const scope = 'api_rome-fiches-metiersv1 nomenclatureRome';

    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');
    body.append('client_id', clientId);
    body.append('client_secret', clientSecret);
    body.append('scope', scope);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
}
  
export async function getFicheMetierData(accessToken) {
    const url = 'https://api.pole-emploi.io/partenaire/rome-fiches-metiers/v1/fiches-rome/fiche-metier';
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return await response.json();
}

export async function getFicheMetierDataCode(accessToken, code) {
    const url = `https://api.pole-emploi.io/partenaire/rome-fiches-metiers/v1/fiches-rome/fiche-metier/${code}`;
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return await response.json();
}