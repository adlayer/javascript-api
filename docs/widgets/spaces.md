# Adlayer Spaces Widget
O Adlayer Spaces Widget é o metodo de integração mais indicado para o caso mais comum de gestão de espaços publicitários. Também conhecido como "espaços globais", os espaços publicitários integrados desta forma, normalmente estão presentes em todas as páginas do website.
Cada espaços no Adlayer pode receber um numero indeterminado de peças publicitárias e por padrão apenas uma peça publicitária é mostrada por vez (pageview).

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
<div id="5091dbdf4bb049a79ac80f11d8779272" class="adlayer_space adlayer_global_space"></div>
```

## Integração
1. Insira o javascript dentro da head.
2. Adicione o código do espaço no lugar que deseja exibir as peça.

## Funcionamento
1. Após carregar a página.
2. O script de espaços vasculha a página e para cada espaço que possui a classe "adlayer_global_space" efetua uma requisição ao  Adlayer Adserver.
3. Cada espaço publicitário encontrado no corpo da página é "renderizado" com as devidas propriedades e preenchido a melhor peças publicitária disponível.

## Troubleshooting

### Conflito com integração de página
Certifique-se de que o código do seus espaços possuem a classe "adlayer_global_space". 

Caso seus espaços globais não tenham a classe "adlayer_global_space" este não será interpretado como um espaço global e as respectivas peças não serão exibidas.