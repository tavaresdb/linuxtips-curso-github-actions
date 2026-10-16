# Desafio 2
O objetivo da aplicação é construir um medidor de força de senhas:

- Entrada: uma string de senha.
- Processo: verificação de tamanho e presença de caracteres maiúsculos, minúsculos, dígitos e símbolos.
- Saída: rótulo fraca, média ou forte.

O código e os testes já estão prontos. A missão é garantir que nada chegue à branch principal sem antes passar pelos testes. Para isso, precisamos criar um workflow GitHub Actions com as seguintes etapas:

- Lint: o pipeline começa com validação de lint (`npm run lint`) e também do Jest configurado no projeto. Essa é a porta de entrada: se o código não passar no lint, nada mais deve rodar.
- Testes com cobertura: só executa se o lint passar. Rode os testes e verifique a cobertura. A aplicação precisa atingir 80% ou mais de cobertura nos testes para liberar as etapas seguintes. Use `needs` para encadear o job de testes ao de lint e `if` ou lógica equivalente para bloquear o fluxo quando a cobertura for insuficiente.
- Build e push Docker: somente com cobertura igual ou acima de 80%, faça o build da imagem usando o Dockerfile fornecido e publique no GitHub Container Registry (GHCR). Lembre-se dos seguintes detalhes: login em `ghcr.io`, conversão do nome do repositório para minúsculas se necessário, permissão `packages: write` e tagueamento adequado da imagem.

A ideia central não é a complexidade da aplicação — é a relação de dependências. Jobs e steps devem respeitar a ordem: lint → testes (com gate de 80%) → Docker build/push. Cada condição é um quality gate que impede avanço prematuro.