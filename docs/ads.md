# Adlayer Ads Widget
Adlayer Ads Widget é uma maneira de embedar peças de sua conta Adlayer.

## Estrutura
Este widget possui duas partes:

### 1 - Javascript ads widget
ex: 

```html
<script type="text/javascript" src="//api.adlayerjavascriptsdk.com/ads.min.js" async="true" language="javascript"></script>
```

### 2 - Html placeholder da peça
ex:

```html
<div id="5091dbdf4bb049a79ac80f11d8779272" class="adlayer_ad_placeholder"></div>
```

# Como funciona
Depois de inserir o script e o html placeholder da peça, o script buscará todos os placeholders da página e o substituirá pela peça publicitária que deverá aparecer alí.