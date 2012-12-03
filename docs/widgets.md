
# Adlayer Widgets

Widgets são blocos de códigos preparados para renderizar recursos embedáveis do Adlayer (peças publicitárias, páginas e seus espaços).

Os widgets usam e expõem a Adlayer Javascript API o que permite que os scripts inseridos possam se comunicar com os webservers do Adlayer.

## Documentação de cada widget
* [Page](https://github.com/adlayer/javascript-api/blob/master/docs/pages.md)
* [Ads](https://github.com/adlayer/javascript-api/blob/master/docs/ads.md)

## Funcionamento
1. Depois de inseridos cada bloco de código em seu devido lugar.
2. O script dos widgets se comunicam com o adserver do Adlayer, para certificar-se que o recurso requisitado está disponível e obter os dados relacionados a ele.
3. Com os dados transferidos do adserver os recursos são renderizados no html.
4. Somente quando uma peça é totalmente carregada caracteriza-se uma "impressão".
5. Uma mensagem informando os dados da impressão (onde e quando) o evento ocorreu é enviado para o serviço de monitoramento do Adlayer e estará disponível nos relatórios em tempo real da campanha.

## Troubleshotting

### Protocolo de requisição
Os scripts dos widgets fornecidos pelo Adlayer apontam para algum arquivo javascript hospedado em nossos servidores.

ex:
//api.adlayerjavascriptsdk.com/page.min.js

A url do javascript copiado da interface de gerenciamento começa com __"//"__, este padrão permite que o script seja carregado usando o mesmo protocolo que o a página foi carregado (http ou https).

Se deseja visualizar um widget renderizado em ambiente de teste ou desenvolvimento onde a página que embeda o código não está em um webserver (ex: apache) será necessário inserir um protocolo para fazer a requisição.

ex:

http://api.adlayerjavascriptsdk.com/page.min.js

### Múltiplos scripts de widgets
É altamente recomendado que o script de renderização de widget não seja duplicado durante a visualização da página. Inserir mais de uma vez o mesmo script pode prejudicar a performace do seu site bem como gerar incompatibilidade na execução do código.

***Certo***:

```html
<script type="text/javascript" src="//api.adlayerjavascriptsdk.com/ads.min.js" async="true" language="javascript"></script>
<div id="5091dbdf4bb049a79ac80f11d8779272" class="adlayer_ad_placeholder"></div>

<div id="98673dbdf4bb049a79ac80f11d8jd000" class="adlayer_ad_placeholder"></div>

<div id="99hd88dbdf4bb049a79ac80f11d878393" class="adlayer_ad_placeholder"></div>
```

***Errado***

```html
<script type="text/javascript" src="//api.adlayerjavascriptsdk.com/ads.min.js" async="true" language="javascript"></script>
<div id="5091dbdf4bb049a79ac80f11d8779272" class="adlayer_ad_placeholder"></div>

<script type="text/javascript" src="//api.adlayerjavascriptsdk.com/ads.min.js" async="true" language="javascript"></script>
<div id="98673dbdf4bb049a79ac80f11d8jd000" class="adlayer_ad_placeholder"></div>

<script type="text/javascript" src="//api.adlayerjavascriptsdk.com/ads.min.js" async="true" language="javascript"></script>
<div id="99hd88dbdf4bb049a79ac80f11d878393" class="adlayer_ad_placeholder"></div>
```