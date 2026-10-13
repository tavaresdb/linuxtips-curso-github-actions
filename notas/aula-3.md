# Identificadores
Quando vários jobs coexistem no mesmo workflow sem `needs`, o GitHub tenta executá-los em paralelo. Em um pipeline com build, teste e deploy no mesmo arquivo, isso significa que deploy e teste rodariam ao mesmo tempo que o build — e falhariam porque os artefatos ainda não existem. A chave `needs` resolve isso declarando explicitamente de quais jobs um job depende antes de iniciar.

IDs de jobs são os próprios nomes definidos no YAML. O job `build` é referenciado como `jobs.build`; `quality-gate` vira `jobs.quality-gate`. Dois jobs com o mesmo nome quebram o workflow antes mesmo de executar. Já os steps aceitam `name` repetido sem erro imediato, o que pode gerar confusão ao referenciar um step específico — daí a importância da chave `id`, que deve ser única dentro do job.

Regras dos IDs: sempre minúsculo, sem espaços (use hífens para nomes compostos), não pode começar com número (mas pode conter números depois da primeira letra). Violar qualquer regra impede a execução.

# Composete Actions e ações personalizadas
A documentação do GitHub recomenda duas abordagens contra duplicação: workflows reutilizáveis (`workflow_call`) e ações compostas. Ambos são arquivos YAML, mas servem propósitos diferentes.

Uma ação composta é definida em `action.yml` na raiz de um repositório. Em vez da chave `jobs`, usa-se `runs` com `using: composite` e uma lista de `steps` sequenciais. Não há múltiplos jobs, nem execução paralela — tudo acontece dentro de um único step do workflow que a consome via `uses: owner/repo@tag`.

Caso de uso típico: encapsular instalação de ferramentas (por exemplo: download do binário Terraform, setup de CLI, etc.) que se repete em vários workflows. Se a lógica envolve múltiplos jobs, secrets compartilhados e visibilidade detalhada nos logs, workflows reutilizáveis costumam ser mais adequados.

Diferenças práticas:

Aspecto   | Workflow reutilizável                   | Ação composta
----------|-----------------------------------------|--------------------------------
Estrutura | Múltiplos jobs                          | Steps sequenciais
Logs      | Cada step visível                       | Execução interna menos granular
Secrets   | Compartilhamento via `secrets:`         | Limitado
Consumo   | `uses: ./.github/workflows/arquivo.yml` | `uses: owner/repo@tag`

Exemplos reais: Trivy (Aqua Security) e SSH Action são ações compostas — ao chamar `aquasecurity/trivy-action@0.28.0`, acessamos o `action.yml` com `runs.using: composite` e dezenas de steps internos, culminando na execução de um script `entrypoint.sh`.

Além do composite, existem outros tipos de ações personalizadas:
- JavaScript: `runs.using: node20`, código em TypeScript/JavaScript (por exemplo: `actions/checkout`).
- Docker: `runs.using: docker` com imagem e entrypoint (só funciona em runners Linux).

No Marketplace, JavaScript e Docker dominam; composite aparece em cenários mais específicos. O `actions/checkout` usa Node 20; o `docker/build-push-action` também. Projetos complexos podem misturar steps inline no composite com scripts externos — quando a lógica cresce demais, extrair para `.sh` melhora a manutenção.

Na prática corporativa, times de plataforma costumam consumir actions do Marketplace (AWS, GitHub oficial) e criar workflows reutilizáveis para pipelines de CI/CD da organização. Criar composite do zero é mais raro, salvo quando se publica ferramenta para a comunidade ou se encapsula setup muito específico e repetitivo.

> A regra prática: pacote de steps sequenciais para uma tarefa atômica → composite; orquestração com jobs, ambientes e secrets → workflow reutilizável.