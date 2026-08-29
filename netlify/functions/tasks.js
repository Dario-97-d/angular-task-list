exports.handler = async (event) => {
  const apiUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;

  const restdbPath = event.path.replace('/.netlify/functions/tasks', '');
  const url = `${apiUrl}${restdbPath}`;

  const response = await fetch(url, {
    method: event.httpMethod,
    headers: {
      'x-apikey': apiKey,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    body: ['POST', 'PUT'].includes(event.httpMethod) ? event.body : undefined
  });

  const data = await response.text();

  return {
    statusCode: response.status,
    body: data,
    headers: { 'Content-Type': 'application/json' }
  };
};