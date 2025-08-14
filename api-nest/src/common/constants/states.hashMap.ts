import { Estado } from 'generated/prisma';

// Com map, o Big O fica O(1), ou seja, para pesquisas envolvendo chaves (que é o que cada sigla de estado representa) é muito efetivo.

// Inclusive, todos os emails de responsáveis foram pesquisados utilizando o ChatGPT-5, ou seja, o culpado é ele se estiver errado, mas se tiver certo eu sou bom demais.

export const stateAndEmailMap: Record<Estado, string> = {
  AC: 'seprod.gab@gmail.com',
  AL: 'ouvidoria@agricultura.al.gov.br',
  AP: 'sdr@sdr.ap.gov.br',
  AM: 'sepror@sepror.am.gov.br',
  BA: 'https://www.seagri.ba.gov.br/content/fale-conosco', // formulário / fale-conosco da SEAGRI-BA
  CE: 'https://www.sda.ce.gov.br/contato', // contato/telefone da SDA-CE (sem e-mail público direto)
  ES: 'comunicacao@seag.es.gov.br', // SEAG-ES (tem gerências de infraestrutura rural)
  GO: 'comunicacao.agricultura@goias.gov.br', // SEAPA-GO (Gerência de Infraestrutura Rural: gir.agricultura@goias.gov.br)
  DF: 'ascom@seagri.df.gov.br', // Seagri-DF (também há ouvidoria)
  MA: 'https://www.sagrima.ma.gov.br/contato', // formulário/contato SEAGRIMA-MA
  MT: 'https://portal.mt.gov.br/app/catalog/agricultura-e-pecuaria', // serviços para solicitar obras de infraestrutura rural (Portal MT)
  MS: 'gabinete@seilog.ms.gov.br', // SEILOG-MS (Infraestrutura e Logística)
  MG: 'gabinete@agricultura.mg.gov.br', // Secretaria de Agricultura MG (contatos institucionais)
  PA: 'ouvidoria@emater.pa.gov.br', // EMATER-PA (extensão rural / ouvidoria)
  PB: 'https://www.seagric.pb.gov.br/fale-conosco', // SEAGRIC-PB (fale-conosco / serviços)
  PR: 'https://www.agricultura.pr.gov.br/fale-conosco', // SEAB-PR (formulário / contatos institucionais)
  PE: 'https://www.agricultura.pe.gov.br/contato', // SEAPAC-PE (contato / ouvidoria)
  PI: 'https://www.sebraelpi.com.br/contato', // (quando não há e-mail, apontei para canal oficial/secretaria)
  RJ: 'https://www.agricultura.rj.gov.br/fale-conosco', // SEAP- RJ (fale-conosco / ouvidoria)
  RN: 'https://www.seaprn.rn.gov.br/contato', // SEAP-RN (contato / ouvidoria)
  RS: 'https://www.agricultura.rs.gov.br/fale-conosco', // Secretaria Agricultura RS (formulário/contato)
  RO: 'https://rondonia.ro.gov.br/seagri/contato', // SEAGRI-RO (página institucional com contatos)
  RR: 'https://www.gov.br/rr/pt-br/assuntos/agricultura', // Página institucional (links para contatos locais)
  SC: 'https://www.epagri.sc.gov.br/contato', // EPAGRI-SC (extensão rural / contato)
  SP: 'imprensa.agricultura@sp.gov.br', // Secretaria Agricultura SP (imprensa/comunicação / fale-conosco no site)
  SE: 'https://www.seagri.se.gov.br/fale-conosco', // SEAGRI-SE (formulário/contato)
  TO: 'https://www.agricultura.to.gov.br/fale-conosco', // SEAGRO-TO (fale-conosco / contatos)
};
