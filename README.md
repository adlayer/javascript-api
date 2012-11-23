# Adlayer Javascript Api

## [Widgets](https://github.com/adlayer/javascript-api/blob/master/docs/widgets.md)
Afim de deixar o processo de integração muito mais simples providencias widgets (recursos embedaveis) que permitem inserir publicidade em seu site apenas copiando e colando pequenos trechos de código sem se preocupar com programação.

Veja os [widgets disponíveis](https://github.com/adlayer/javascript-api/blob/master/docs/widgets.md)

## API
Esta documentação é relativa aos metodos e propriedades expostos   pela Adlayer javascript api standalone ou os widgets fornecidos neste repositório.

* [Configurações](https://github.com/adlayer/javascript-api#configurações)
* [Conexões](https://github.com/adlayer/javascript-api#conexões)
* [Adserver](https://github.com/adlayer/javascript-api#adserver)
* [Tracker](https://github.com/adlayer/javascript-api#tracker)
* [Page](https://github.com/adlayer/javascript-api#page)
* [Espaços](https://github.com/adlayer/javascript-api#spaces)
* [Biblioteca](https://github.com/adlayer/javascript-api#biblioteca)

## Configurações
Propriedades disponíveis:
* url
* adsPerSpace
* page

Para acessar as configurações da biblioteca:
```javascript
adlayer.config
```
Para sobrescrever as configurações padrões, antes de carregar a biblioteca ou widget adicione o a seguinte declaração:
```javascript
var adlayer = adlayer || {};
```
E então declare as opções que deseja sobrescrever
```javascript
var adlayer = adlayer || {};
adlayer.url = adlayer.url || {};
adlayer.url.adserver = 'dev.adserver.adlayer.com.br';
```

## Conexões
Está sessão armazena as conexões expostas pela api, este modulo permite monitorar e criar requições para conexões estabelecidas.

Para listar todas as conexões da feitas:
```javascript
console.log(adlayer.connections);
```

Para acessar todas as requisições feitas ao servidor de trackamento:
```javascript
console.log(adlayer.connections.tracker);
```

## Adserver
```adlayer.adlayer``` é o cliente responsável por se comunicar com o [adserver da adlayer](https://github.com/adlayer/adserver-api-docs) via http.

Para obter dados sobre uma página usando esta api:
```javascript
adlayer.adserver.page('0210288667211ff5b96d3a4ec50647ce', function(err, res){
	// Handle request
});
```

Para obter dados de uma peça específica:
```javascript
adlayer.adserver.ads('0210288667211ff5b96d3a4ec50647ce', function(err, res){
	// Handle request
});
```

## Tracker
O modulo tracker ```adlayer.tracker``` permite que se faça o tracking dos eventos como as impressões que serão visualizadas em tempo real na respectiva conta Adlayer.

Adicionando uma impressão ao relatório:
```javascript
var event = {
campaign_id: '0210288667211ff5b96d3a4ec50647ce',
type: 'impression'
};

adlayer.tracker.track('0210288667211ff5b96d3a4ec50647ce', event, function(err, res){
	// Handle result
});
```

# Page
Para manipular e ler dados referentes a página renderizada utilize o modulo ```adlayer.page```.

Obtendo o id da página:
```javascript
console.log(adlayer.page.id);
```

Lista de espaços da página:
```javascript
console.log(adlayer.page.spaces);
```

# Spaces

O modulo spaces permite a interação com espaços publicitários da página.

Listando todos os espaços:
```javascript
console.log(adlayer.spaces);
```

Fechando um espaço publicitário:
```javascript
var space = adlayer.spaces['0210288667211ff5b96d3a4ec50647ce'];
space.close();
```

## Biblioteca
Este repositório tem como base grande parte de seu conteúdo proviente da Adlayer JS Library, e a API js expoe todos os modulos dessa biblioteca da seguinte forma:

```javascript
console.log(adlayer.lib);
```

Confira a [lista completa de modulos](http://github.com/adlayer/javascript-library);

