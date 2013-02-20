# Adlayer Spaces Widget
Adlayer Spaces Widget é uma maneira de embedar espaços publicitarios de sua conta Adlayer.

## Estrutura
Este widget possui duas partes:

**Javascript Spaces Widget**

ex: 

```html
<script type="text/javascript" src="//api.adlayerjavascriptsdk.com/spaces.min.js" async="true" language="javascript"></script>
```

**Código do espaço**

ex:

```html
<div id="5091dbdf4bb049a79ac80f11d8779272" class="adlayer_space"></div>
```

## Integração
1. Insira o javascript dentro da head.
2. Adicione o código do espaço no lugar que deseja exibir as peça.

## Funcionamento
1. Após carregar a página.
2. O script de espaços vasculha a página e para cada espaço que possoui a classe "adlayer-global-space" efetua uma requisição ao  Adlayer adserver.
3. Cada espaço publicitário encontrado no corpo da página é renderizado com as devidas propriedades e preenchido a melhor peças publicitária disponível.

## Troubleshotting

### Conflito com integração de página
Certifique-se de que o código do seus espaços possuem a classe "adlayer-global-space". 

O código de espaços locais ou de página possuem a classe "adlayer-local-space".

Caso seus espaços globais não tenham a classe "adlayer-global-space" este não será interpretado como um espaço global e as respectivas peças não serão exibidas.