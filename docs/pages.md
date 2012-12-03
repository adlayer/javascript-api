# Adlayer Page Widget
Adlayer Page Widget é uma maneira automatizada e fácil de integrar o Adlayer em seus sites.

## Estrutura
Este widget possui duas partes:

***Javascript page widget***

ex: 

```html
<script type="text/javascript" src="../../dist/page.js?page=82e719877b60e205471a9d8ef00564ab&site=82e719877b60e205471a9d8ef0055af6" async="true" language="javascript" id="adlayerScript"></script>
```

***Código dos espaços***

ex:

```html
<div id="509051bed98c463abd4b213cee58a4a5" class="adlayer_space"></div>
```

```html
<div id="82e719877b60e205471a9d8ef00564ab" class="adlayer_space"></div>
```

## Integração
1. Adicione o script da página dentro da tag "head".
2. Cole o código de cada espaço nos lugares que deseja exibir as peças (dentro do body).

## Funcionamento
1. Ao carregar a página
2. O script consulta dos dados disponível para a página em exibição (nome, espaços e peças publicitárias).
3. Inicia-se uma busca pelo código dos espaços publicitários.
4. Cada espaço encontrado é renderizado segundo seu tipo e comportamento (estático, expansível ou flutuante) 
5. Os espaços renderizados são preenchidos com uma das peça vinculada ao mesmo.

## Troubleshotting
Se suas peças não estiverem aparecendo, confira se todas se sua integração cumpre todos os seguintes requisitos:

* A página integrada deve existir no adserver.
* Deve haver apenas um script em cada página.
* O script integrado deve fornecer o uuid da página e do site.
* O domínio que requisita os dados do adserver devem estar habilitados.
* Todos os espaços da página devem estar integrados.
* Não deve haver nenhum código de espaço duplicado.