# [Adlayer](http://adlayer.com.br) Javascript Api
Este projeto open source é a versão oficial do cliente javascript responsável por se conectar com os webservices Adlayer e é mantida principalmente pela equipe Adlayer.


## Como utilizar
A Adayer js Api foi desenvolvida para que a integração do Adlayer com seu site seja extremamente simples e que não exija muito conhecimento técnico para implementar.

Você poderá obter o 'código de integração' que utiliza a Adlayer Javascript API em sua interface Adlayer ao adicionar uma nova página.

O código fornecido será similar a esse:
```html
<script type="text/javascript" src="//api.adlayerjavascriptsdk.com/api.min.js?page=204ff4c502862221fa389fb18905fb42&site=effedddbcae1529f6728e7dd7d000da3" async="true" language="javascript" id="adlayerScript"></script>
```

Este bloco carregará a última versão testada e publicada desta biblioteca e passará alguns parametros de configuração para identificar o comportamente de qual página deverá ser executado.

### Page
O parametro ```page``` trata-se de um UUID (id único) que identifica a página requisitada.

### Site
O parametro ```site``` consiste de um UUID que idenfica o site selecionado e será necessário para descobrir se o dominio requisitado tem permissão para servir os dados da página e respectivos espaços e peças publicitárias.


## Métodos

### markAdAsLoaded

Marca uma peça como carregada


## Propriedades


### config
> Configurações da biblioteca

* Url 
* AdsPerSpace 
* Page 
** autoRun
** scriptTagId


### ads

Lista de peças renderizadas

Exemplo:

```javascript
var ad = adlayer.ads['mfkvfmvkdfvdf84848484'];
ad.emit('load');
```

### connections

Lista de conexões abertas e fechadas

### page

Representação da página atual

### spaces

Lista de espaços renderizados

Exemplo:
```javascript
var space = adlayer.spaces['0202kjj44949999992j8'];
space.close();
```