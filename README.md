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

### Parametros de requisição
#### Page
O parametro ```page``` trata-se de um UUID (id único) que identifica a página requisitada.
ex: ```api.min.js?***page=204ff4c502862221fa389fb18905fb42***```

#### Site
O parametro ```site``` consiste de um UUID que idenfica o site selecionado e será necessário para descobrir se o dominio requisitado tem permissão para servir os dados da página e respectivos espaços e peças publicitárias.
ex: ```api.min.js?***site=effedddbcae1529f6728e7dd7d000da3***```

### Espaços
Para que a biblioteca possa preencher os espaços publicitários com as devidas peças eles devem estar presentes no corpo do Adlayer.

O bloco de código relativo a cada espaço pode ser encontrado na aba "espaços" dentro da página desejada em sua conta Adlayer.
Exemplo:1
```html
<div id="509051bed98c463abd4b213cee58a4a5" class="adlayer_space"></div>
```

### Exemplo final
Sintetizando para integrar uma página simples com um espaço publicitário, seu código deverá parecer com isso:
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


## Feito para a 'hackabilidade'
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