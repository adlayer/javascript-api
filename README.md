# [Adlayer](http://adlayer.com.br) Javascript Api

Esta documentação é relativa aos metodos e propriedades expostos   pela Adlayer javascript api standalone ou os widgets fornecidos neste repositório.

## Visão geral
* Configurações
* Conexões
* Adserver
* Tracker
* Page
* Espaços
* Biblioteca

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

## Adserver
```adlayer.adlayer``` é o cliente responsável por se comunicar com o [adserver da adlayer](https://github.com/adlayer/adserver-api-docs) através de uma api 1 x 1 dos metodos suportados.

Para obter dados sobre uma página usando esta api:
```javascript
adlayer.adserver.page('0210288667211ff5b96d3a4ec50647ce', function(err, res){
	// Handle request
});
```
