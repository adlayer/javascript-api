# [Adlayer](http://adlayer.com.br) Javascript Api
Este projeto open source é a versão oficial do cliente javascript responsável por se conectar com os webservices da Adlayer e é mantida principalmente pela equipe Adlayer.

## Integração

### Páginas
Para integrar o Adlayer ao seu site você precisa adicionar uma ```nova página``` dentro de algum site de sua conta.
Cada página possui um ```código de integração``` único e que pode ser obtido na aba ```código``` dentro da página adicionada.

Insira esse código no html de sua página dentro da tag `head`.

EX:
```html
<script type="text/javascript" src="//api.adlayerjavascriptsdk.com/api.min.js?page=204ff4c502862221fa389fb18905fb42&site=effedddbcae1529f6728e7dd7d000da3" async="true" language="javascript" id="adlayerScript"></script>
```

### Espaços
Você precisará também criar os espaços publicitários para a página criada. Depois de adicionado insira o código do espaço no lugar que pretende mostrar publicidade em seu html.
EX:
```html
<div id="509051bed98c463abd4b213cee58a4a5" class="adlayer_space"></div>
```

### Exemplo final
```html
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>index</title>
		<script type="text/javascript" src="//api.adlayerjavascriptsdk.com/api.min.js?page=204ff4c502862221fa389fb18905fb42&site=effedddbcae1529f6728e7dd7d000da3" async="true" language="javascript" id="adlayerScript"></script>
	</head>
	<body>
		<div id="507ef609b60045a396d96dd8d8779272" class="adlayer_space"></div>
	</body>
</html>
```


## Como funciona (Para curiosos)
A Adlayer js Api foi desenvolvida para que a integração do Adlayer com seu site seja extremamente simples e que não exija muito conhecimento técnico para implementar.

Você poderá obter o 'código de integração' que utiliza a Adlayer Javascript API em sua conta Adlayer ao adicionar uma nova página.

### Parametros de requisição
Cada página possui um código de integração único que passa parâmetros na url de carregamento.

A primeira ação da JS API é parsear essas informações para obter os valores de ```page```e ```site```.

#### Page
O parametro ```page``` trata-se de um UUID (id único) que identifica a página requisitada.
ex: ```api.min.js?page=204ff4c502862221fa389fb18905fb42```

#### Site
O parametro ```site``` consiste de um UUID que identifica o site selecionado e será necessário para descobrir se o domínio requisitado tem permissão para servir os dados da página e respectivos espaços e peças publicitárias.
ex: ```api.min.js?site=effedddbcae1529f6728e7dd7d000da3```

### Execução

Uma vez que se obtém os ids do site e página, a biblioteca tenta se comunicar com o API de Adserving da Adlayer a fim de obter os dados relacionados a esta página, como lista de espaços publicitários cadastrados e respectivas peças.

> Em breve documentação completa da API de Adserving

Ao receber os dados do Ad Server a biblioteca passará a escanear o html tentando encontrar espaços que já foram integrados. 

Para cada espaços já inserido a biblioteca colocará a melhor peça publicitário para aquele usuário.

Quando uma peça é inserida e devidamente carregada, caracteriza-se uma ```impressão```.

A biblioteca então se comunica com outro serviço web, disponível na plataforma Adlayer chamado Tracker, para registrar uma visualização de peça e disponibilizando essa informação no relatório da campanha.

## API (Para desenvolvedores)

Para acessar os métodos e propriedades disponíveis na API, você poderá usar a varíavel/namespace ```adlayer```.

O namespace ```adlayer``` é a única variável global exposta pela Adlayer JS API. Esta variável estará disponível para o seu uso exatamente após o script ter sido inserido e carregado.

Exemplo:
```javascript
console.log(adlayer);
console.log(adlayer.ads);
console.log(adlayer.page);
console.log(adlayer.spaces);
```

Por padrão a inclusão dessa biblioteca executará automaticamente e preencherá os espaços publicitários com as devidas peças.

Se você deseja mudar esse comportamento, poderá antes de carregar a biblioteca inserir o seguinte código.
```javascript
<script type="text/javascript">
		var adlayer = adlayer || {};
		adlayer.config = {
			page:{autoRun:false;}
		};
</script>
```

### Métodos

#### markAdAsLoaded

Marca uma peça como carregada

Exemplo de uso:
```javascript
var ad = adlayer.markAdAsLoaded'mfkvfmvkdfvdf84848484');
```

### Propriedades


#### config

* Url 
* AdsPerSpace 
* Page

#### ads

Lista de peças renderizadas na página

Exemplo de uso:

```javascript
var ad = adlayer.ads['mfkvfmvkdfvdf84848484'];
ad.emit('load');
```

#### connections

Lista de conexões abertas e fechadas desse page view

#### page

Representação da página atual

#### spaces

Lista de espaços renderizados na página

Exemplo de uso:
```javascript
var space = adlayer.spaces['0202kjj44949999992j8'];
space.close();
```