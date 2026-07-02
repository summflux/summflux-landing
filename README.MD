# SummFlux Landing Page

Landing page institucional da SummFlux, posicionada para apresentar a plataforma como uma IA para operacoes comerciais que analisam conversas, preenchem leads automaticamente e reduzem trabalho manual no WhatsApp e no Gmail.

## Objetivo

Esta landing existe para:

- apresentar a proposta comercial da SummFlux com clareza;
- explicar como a Ary AI economiza tempo da equipe;
- destacar a diferenca real entre Starter, Pro e Business;
- gerar demanda para teste e cadastro;
- sustentar a operacao com paginas legais e tutorial.

## Estrutura

```text
summflux-landing-page/
|-- index.html
|-- privacidade.html
|-- termos.html
|-- tutorial-instalacao.html
|-- sitemap.xml
|-- README.MD
`-- assets/
    |-- css/
    |   |-- global.css
    |   |-- styles.css
    |   `-- media_querys.css
    |-- js/
    |   `-- app.js
    |-- icons/
    |   `-- st-logo.png
    |-- images/
    |   |-- dashboard-ary.png
    |   |-- dashboard-atencao.png
    |   |-- dashboard-configuracoes.png
    |   |-- dashboard-insights.png
    |   |-- dashboard-lead-modal.png
    |   |-- dashboard-pipeline.png
    |   |-- dashboard-receita.png
    |   |-- st-logo.png
    |   |-- summflux-black.png
    |   `-- summflux-white.png
    `-- video/
        `-- tutorial-instalacao-summflux.mp4
```

## Paginas

### `index.html`

Pagina principal com:

- hero de posicionamento;
- mensagem AI-first com foco em automacao comercial;
- prova de valor do produto;
- secao da Ary AI;
- demonstracao visual do CRM;
- explicacao do fluxo operacional;
- planos;
- FAQ;
- formulario de contato.

### `tutorial-instalacao.html`

Pagina de apoio com instrucoes para instalacao da extensao no Chrome e uso em WhatsApp Web e Gmail.

### `privacidade.html`

Politica de Privacidade com contexto da operacao SaaS, IA, extensao e tratamento de dados comerciais.

### `termos.html`

Termos de Uso com regras de planos, limites, responsabilidades e uso da plataforma.

## Stack

- HTML5
- CSS3
- JavaScript Vanilla

## Recursos implementados

- menu responsivo;
- carrossel de screenshots;
- lightbox com zoom;
- FAQ expansivel;
- animacoes de entrada no scroll;
- formulario integrado ao Formspree;
- estrutura estatica pronta para deploy.

## Diretriz de posicionamento

Toda atualizacao desta landing deve preservar estes pilares:

- SummFlux e IA para operacao comercial, nao apenas CRM;
- automacao e economia de tempo precisam aparecer antes de "gestao";
- WhatsApp Web e Gmail como canais de entrada;
- CRM nativo da SummFlux e integracoes externas;
- planos com logica de upgrade por canal, equipe, automacao e integracao;
- linguagem B2B clara, sofisticada e sem exagero visual.

## Estrutura de planos atual

- Starter: 300 analises por mes;
- Pro: 1.150 analises por mes;
- Business: 5.000 analises por mes.

## CTA principal

Os botoes de contratacao dos planos devem apontar para:

```text
https://app.summflux.com/signup
```

## Cuidados de conteudo

- evitar dados reais identificaveis nas imagens;
- revisar landing, tutorial e paginas legais sempre que o produto mudar;
- manter consistencia entre copy comercial, planos e funcionalidades reais ja disponiveis.

## Execucao local

Como o projeto e estatico, voce pode:

1. abrir o `index.html` direto no navegador; ou
2. usar Live Server no VS Code.

## Deploy

Deploy publicado na Vercel.

Fluxo recomendado:

1. versionar o projeto no repositorio;
2. conectar o repositorio na Vercel;
3. publicar sem build customizado.

## Contato

- Site: [https://www.summflux.com](https://www.summflux.com)
- App: [https://app.summflux.com](https://app.summflux.com)
- API: [https://api.summflux.com](https://api.summflux.com)

## Licenca

Uso interno da SummFlux. Todos os direitos reservados.
