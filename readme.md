# Avaliação de Desempenho com K6

![kasjkajsk](/assets/teste.png)



## Visão Geral
Este documento apresenta uma avaliação de desempenho para um endpoint específico dentro de um projeto web, utilizando a ferramenta de teste de carga K6. O objetivo foi avaliar o comportamento do sistema sob estresse, simulando acessos de múltiplos usuários simultâneos.

## Detalhes do Teste
O cenário envolveu a simulação de 10 usuários virtuais (VUs) acessando o endpoint continuamente por 30 segundos. Abaixo está o script usado para o teste:

\`\`\`javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  let res = http.get('http://localhost:3001/link-lists/uploaded-file/file_model.csv');

  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(Math.random() * 2 + 1);
}
\`\`\`

## Resultados
O teste forneceu dados críticos como tempo de resposta e taxa de sucesso das requisições, iluminando o desempenho do sistema sob carga.

## Ferramenta K6
O K6 se destaca como uma poderosa ferramenta de teste de carga que possibilita a simulação de tráfego de rede em aplicações web, permitindo avaliar o desempenho sob diversas condições de carga.

## Conhecimentos Adquiridos
- **Tráfego de Usuários Simulado**: Exploramos métodos para gerar tráfego de usuários controlado e simulado para testar a robustez do sistema.
- **Análise de Resposta**: Reconhecemos a importância de analisar as respostas do servidor, incluindo tempos de resposta e códigos de status, para avaliar a qualidade do serviço sob estresse.
- **Planejamento de Testes**: Ganhamos insights sobre como planejar e conduzir testes de carga que mimetizam condições reais de uso.
- **Monitoramento de Métricas**: Aprendemos a monitorar métricas de desempenho chave durante os testes para assegurar a estabilidade e performance do sistema.

## Conclusão
Os testes com o K6 destacaram a capacidade de resposta do endpoint frente a um tráfego aumentado, identificando áreas para potencial melhoria de desempenho. Adicionar imagens dos resultados do teste proporcionaria uma compreensão visual dos dados coletados, enriquecendo o relatório.
