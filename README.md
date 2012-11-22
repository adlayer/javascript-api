# [Adlayer](http://adlayer.com.br) Javascript Api
Este projeto open source é a versão oficial do cliente javascript responsável por se conectar com os webservices da Adlayer e é mantida principalmente pela equipe Adlayer.

## API

Para acessar os métodos e propriedades disponíveis na API, você poderá usar a varíavel/namespace ```adlayer```.

O namespace ```adlayer``` é a única variável global exposta pela Adlayer JS API. 

Esta variável estará disponível para o seu uso exatamente após o arquivo da api ou widget ter sido carregado.

### Métodos

#### markAdAsLoaded

Marca uma peça como carregada

Exemplo de uso:
```javascript
var ad = adlayer.markAdAsLoaded'mfkvfmvkdfvdf84848484');
```

### Propriedades

#### adserver
#### tracker
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


## Hackability
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