# Geral
O controle de alterações permite registrar todo o histórico de modificações de um projeto, identificando quem realizou cada mudança e quando ela ocorreu. Além disso, possibilita restaurar versões anteriores quando necessário, aumentando a segurança e facilitando o trabalho colaborativo de forma organizada e rastreável.

## Diferença entre modelo centralizado e distribuído

### Modelo Centralizado
- Todo o código fica armazenado em um único servidor central.
- Os desenvolvedores dependem desse servidor para acessar e registrar alterações.
- Possui limitações relacionadas à disponibilidade, flexibilidade e autonomia dos desenvolvedores.

### Modelo Distribuído
- Cada desenvolvedor possui uma cópia completa do repositório em sua máquina.
- Permite trabalhar localmente mesmo sem conexão com o servidor remoto.
- Oferece maior flexibilidade, segurança e autonomia.
- Facilita a criação de branches e a realização de merges antes do compartilhamento das alterações com a equipe.

# Github Actions
O GitHub Actions é a plataforma de automação e CI/CD do GitHub, lançada em 2018. Ela permite executar builds, testes e deploys diretamente a partir do repositório, sem a necessidade de ferramentas externas.

As automações são definidas em arquivos YAML chamados workflows. Um workflow é composto por etapas automatizadas executadas em resposta a eventos.

Dentro de um workflow existem um ou mais jobs, que podem ser executados de forma sequencial ou paralela para realizar tarefas relacionadas ao ciclo de vida da aplicação.

As Actions são componentes reutilizáveis que executam tarefas específicas dentro dos workflows, como configurar ambientes, executar comandos, autenticar em serviços ou publicar artefatos.

Ao integrar versionamento, automação e entrega de software em uma única plataforma, o GitHub Actions reduz tarefas manuais, aumenta a padronização dos processos e acelera o desenvolvimento e a entrega de aplicações.

# Jobs e steps
Um job é uma unidade de execução dentro de um workflow, composta por um ou mais steps. Cada job é executado em um ambiente isolado (como uma máquina virtual) e pode rodar em paralelo com outros jobs, a menos que haja dependências definidas.

Já os steps são as instruções individuais dentro de um job — elas são executadas sequencialmente e podem incluir comandos de shell ou ações reutilizáveis (actions) da comunidade ou da própria equipe.

Enquanto os jobs organizam o fluxo geral do processo, os steps detalham cada ação necessária para completar uma tarefa, como instalar dependências, rodar testes ou realizar um deploy.