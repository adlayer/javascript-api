# Adlayer Ads Widget
Adlayer Ads Widget é uma maneira de embedar peças de sua conta Adlayer.

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