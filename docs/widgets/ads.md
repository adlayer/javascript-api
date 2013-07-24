# Adlayer Ads Widget
Através do Adlayer Ads Widget é possível inserir uma peça publicitária em um website e obter relatórios dela em apenas 1 minuto.
Alguns anunciante podem desejar utilizar deste método de integração para monitorar suas campanhas em sites de terceiros (Thirdy-party adserving).
Caso o arquivo da peça gráfica ou link de destino seja alterado a peça embedada será atomaticamente atualizado, não necessitando uma re-integração da peça no veículo destinado.

Embora a integração via "peça embedável" (Adlayer Ads Widget) seja um método rápido de visualizar uma peça em páginas da web, esta solução não é recomendada para publishers que pretendem gerenciar mais de uma peça ou espaço publicitário.


## Estrutura
Este widget possui duas partes:

**Javascript ads widget**

ex: 

```html
<script type="text/javascript" src="//api.adlayerjavascriptsdk.com/ads.min.js" async="true" language="javascript"></script>
```

**Html placeholder da peça**

ex:

```html
<div id="5091dbdf4bb049a79ac80f11d8779272" class="adlayer_ad_placeholder"></div>
```

## Integração
1. Insira o javascript dentro da head.
2. Adicione o html placeholder no lugar que deseja exibir a peça.

## Funcionamento
1. Após carregar a página.
2. O script consulta os dados de cada peça integrada (nome, uuid, arquivo e etc).
3. Cada __placeholder__ inserido no html é substituído por uma versão renderizada da peça publicitária que deverá ser exibida no lugar.