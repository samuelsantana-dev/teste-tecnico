fetch('https://empreender.nyc3.cdn.digitaloceanspaces.com/static/teste-prod-1.json')
  .then(response => {
    if (response.ok) {
      console.log('SUCESSO NA CHAMADA');
      return response.json();
    } else {
      throw new Error('API request failed');
    }
  })
  .then(data => {
    console.log('DADOS DA API', data);
  })
  .catch(error => {
    console.log('ERRO NA CHAMADA', error);
  });