var dados;

  function chamadaApi(){
    fetch('https://empreender.nyc3.cdn.digitaloceanspaces.com/static/teste-prod-1.json')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('API request failed');
      }
    })
    .then(data => {
      dados = data
      console.log('dados', dados);
      inserirElementosSelect()
      inserirTamanhosSelect()
    })
    .catch(error => {
      console.log('ERRO NA CHAMADA', error);
    });
  }

  chamadaApi()

  function inserirElementosSelect(){

    const valuesCores = dados.values
    const cores = valuesCores[1].map(item => item)
    cores.map(item => {
      let select = document.getElementById('select');
      let option = document.createElement('option');
      option.value = item;
      option.text = item;
      select.add(option);
    })
  }
  function inserirTamanhosSelect(){

    const valuesTamanhos = dados.values
    const cores = valuesTamanhos[0].map(item => item)
    cores.map(item => {
      let select = document.getElementById('tamanho');
      let option = document.createElement('option');
      option.value = item;
      option.text = item;
      select.add(option);
    })
  }

  function verificarEstoque() {
    let select = document.getElementById('select');
    let selectTamanho = document.getElementById('tamanho');
  
    const dadosValuesTamanho = dados.variants.filter(
      (item) => item.values[0] === selectTamanho.value && item.values[1] === select.value
    );


    if (dadosValuesTamanho.length === 0 || dadosValuesTamanho[0].inventory_quantity <= 0) {

      alert('Produto sem estoque');
    } else {
      alert(`Produto em estoque`);
    }
  }

  function enviarPedido() {
    const cor = document.getElementById('select').value;
    const tamanho = document.getElementById('tamanho').value;
    console.log('cor', cor);
    console.log('tamanho', tamanho);
  
    const variante = dados.variants.find(item => item.values[0] === tamanho && item.values[1] === cor);
    const data = {
        values: [cor, tamanho],
        quantity: 1,
        product_id: variante.product_id,
        variant_id: variante.id
      }
      // Deu erro de cors Access to fetch at 'https://app.landingpage.com.br/api/checkoutloja/LPL2gc/5d87eb644e5631bc6a03f1e43a804e1c' from origin 'null' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.
    fetch('https://app.landingpage.com.br/api/checkoutloja/LPL2gc/5d87eb644e5631bc6a03f1e43a804e1c', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
    })
    .catch(error => {
    console.error('Erro:', error);
    });
  }

    
  



  