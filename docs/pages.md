# Adlayer Page Widget
Adlayer Page Widget é uma maneira automatizada e fácil de integrar o Adlayer em seus sites.

## Estrutura
Este widget possui duas partes:

### 1 - Javascript page widget
ex: 

```html
<script type="text/javascript" src="../../dist/page.js?page=82e719877b60e205471a9d8ef00564ab&site=82e719877b60e205471a9d8ef0055af6" async="true" language="javascript" id="adlayerScript"></script>
```

### 2 - Código dos espaços
ex:

```html
<div id="509051bed98c463abd4b213cee58a4a5" class="adlayer_space"></div>
```

```html
<div id="82e719877b60e205471a9d8ef00564ab" class="adlayer_space"></div>
```

## Como funciona
Depois inserir o script do widget dentro da tag head da página e o código dos espaços no body, o script iniciará uma busca pelos espaços publicitários disponíveis na página e passará a preencher cada espaço com uma peça publicitária vinculada ao mesmo.

## Troubleshotting
1. A página integrada deve existir no adserver.
2. Deve haver apenas um script em cada página.
3. O script integrado deve fornecer o uuid da página e do site.
4. O domínio que requisita os dados do adserver devem estar habilitados.
5. Todos os espaços da página devem estar integrados.