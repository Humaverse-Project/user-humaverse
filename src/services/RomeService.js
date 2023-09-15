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