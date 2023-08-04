import React, { useState, useEffect } from 'react';

const PoleEmplois = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://exemple-api.com/connexion/oauth2/access_token?realm=%2Fpartenaire';
        const clientId = '[identifiant client]';
        const clientSecret = '[clé secrète]';
        const scope = 'api_labonneboitev1';

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
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  // Affichez les données récupérées
  return JSON.stringify(data, null, 2);
};

export default PoleEmplois;