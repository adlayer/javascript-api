# [Adlayer](http://adlayer.com.br) Javascript Api


## API

### Métodos

* markAdAsLoaded

Marca uma peça como carregada

### Propriedades

* ads

Lista de peças renderizadas

Exemplo:

```javascript
var ad = adlayer.ads['mfkvfmvkdfvdf84848484'];
ad.emit('load');
```

* config

Configurações da biblioteca

* connections

Lista de conexões abertas e fechadas

* page

Representação da página atual

* spaces

Lista de espaços renderizados

Exemplo:
```javascript
var space = adlayer.spaces['0202kjj44949999992j8'];
space.close();
```