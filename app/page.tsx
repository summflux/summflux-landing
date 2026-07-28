import Script from "next/script";
import { landingHtml } from "../lib/landing-html";

const currentLandingHtml = landingHtml
  .replace(
    "Usuário adicional: R$ 29,90/mês, sob contratação comercial.",
    "Usuário adicional: R$ 29,90/mês, contratado pelo dashboard. Cada usuário cria a própria senha e recebe um workspace individual."
  )
  .replace(
    '<a href="#ary-ai">Ary AI</a>',
    '<a href="#produto">RealityOS</a><a href="#ary-ai">Ary AI</a>'
  )
  .replace(
    '<span class="eyebrow">IA comercial para WhatsApp e CRM</span>',
    '<span class="eyebrow">RealityOS para operações comerciais</span>'
  )
  .replace(
    "<h1>A Ary conversa com seus leads, identifica quem quer comprar e mantém o CRM atualizado.</h1>",
    "<h1>Encontre risco e dinheiro perdido entre conversas, promessas, execução e pagamento.</h1>"
  )
  .replace(
    '<p class="lead">Ela responde com base nas regras da sua empresa, qualifica cada oportunidade, organiza follow-ups e chama o time quando a negociação precisa de uma pessoa.</p>',
    '<p class="lead">A SummFlux transforma conversas em fatos operacionais: identifica compromissos, conecta responsáveis e evidências, prioriza desvios e acompanha cada promessa até o resultado financeiro.</p>'
  )
  .replace(
    "WhatsApp oficial quando habilitado · CRM da SummFlux ou integração externa · Configuração por empresa",
    "RealityOS + Ary · Evidências rastreáveis · Políticas e aprovação humana · Dados separados por empresa"
  )
  .replace(
    "Atendimento e qualificação com IA",
    "Promessas conectadas à execução"
  )
  .replace(
    "CRM próprio ou integração externa",
    "Risco e exposição explicáveis"
  )
  .replace(
    "WhatsApp e Gmail em uma única operação",
    "Decisões com memória e governança"
  )
  .replace(
    "Inteligência aplicada à conversa",
    "Da conversa para a realidade operacional"
  )
  .replace(
    "De uma conversa solta para uma oportunidade pronta para agir.",
    "Cada sinal importante vira um objeto conectado, com origem, responsável e próximo passo."
  )
  .replace(
    "A Ary não entrega apenas um resumo. Ela separa os sinais que ajudam o vendedor a entender o momento da negociação e decidir o próximo passo.",
    "A Ary interpreta a conversa; o RealityOS preserva o que foi observado, prometido, decidido e entregue. Assim, o time age sobre evidências em vez de depender de memória ou planilhas paralelas."
  )
  .replace(
    "O que muda na rotina comercial",
    "Um sistema operacional para a realidade da empresa"
  )
  .replace(
    "Contexto para agir sem transformar a operação em mais uma planilha.",
    "Do compromisso ao caixa, sem perder a origem de cada fato."
  )
  .replace(
    "<h3>Próxima ação recomendada</h3><p>A equipe entende o que fazer e por que aquela ação é importante para a oportunidade.</p>",
    "<h3>Promise-to-Cash</h3><p>Compromissos assumidos em conversas seguem até execução, cobrança e recebimento.</p>"
  )
  .replace(
    "<h3>Objeções identificadas</h3><p>Preço, prazo, integração e outras travas aparecem antes que a negociação esfrie.</p>",
    "<h3>Guard para decisões</h3><p>Premissas, custo, resultado esperado, revisão e critério de parada ficam registrados.</p>"
  )
  .replace(
    "<h3>Pipeline e receita visíveis</h3><p>Vendedores e gestores acompanham etapa, valor e chance de avanço em um só lugar.</p>",
    "<h3>Action Center</h3><p>Riscos e desvios são ordenados por urgência, evidência e impacto financeiro.</p>"
  )
  .replace(
    "<h3>Pipeline sempre atualizado</h3><p>Quando a oportunidade se qualifica, o contexto comercial acompanha o lead no CRM.</p>",
    "<h3>Políticas antes da ação</h3><p>Descontos, prazos e ações sensíveis podem exigir aprovação humana rastreável.</p>"
  )
  .replace(
    "Veja a Ary funcionando em uma conversa da sua operação.",
    "Veja o RealityOS e a Ary conectando uma conversa ao resultado."
  )
  .replace(
    "Conte rapidamente como seu time vende hoje e receba uma demonstração direcionada ao seu processo comercial.",
    "Conte onde sua operação perde contexto entre promessa, execução e dinheiro e receba uma demonstração direcionada."
  )
  .replace(
    "IA comercial para atender, qualificar e organizar oportunidades no WhatsApp, Gmail e CRM, com mais contexto para vendedores e gestores.",
    "RealityOS comercial para conectar conversas, promessas, decisões, execução, cobrança e resultado — com a Ary como interface inteligente."
  );

export default function LandingPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: currentLandingHtml }} />
      <Script src="/assets/js/app.js" strategy="afterInteractive" />
    </>
  );
}
