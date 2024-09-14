# Comando `git stash`

<a href="/home.md" style="text-decoration: none;">
    <button>Voltar</button>
</a>

O comando `git stash` é usado para salvar temporariamente as alterações feitas nos arquivos controlados pelo Git, sem precisar fazer um commit imediato. Isso é útil quando você precisa mudar de contexto (por exemplo, mudar de branch ou fazer um merge) e quer manter as alterações que ainda estão em andamento, sem comprometê-las em um commit.

## Funcionamento do `git stash` (sem argumentos)

Quando você executa `git stash` sem argumentos, ele realiza as seguintes ações:

- Salva as mudanças no estado de trabalho (arquivos modificados e arquivos rastreados pelo Git, que foram adicionados com `git add`) em uma pilha de "stash". Isso inclui as mudanças no diretório de trabalho e no índice (stage).
- Reverte o diretório de trabalho para o último commit limpo, ou seja, volta o estado dos arquivos para o ponto anterior às alterações que você fez.
- Armazena as alterações salvas em uma lista ou pilha que você pode recuperar mais tarde usando `git stash pop` ou `git stash apply`.

Ao executar `git stash` sem argumentos, ele simplesmente cria um "snapshot" do seu trabalho atual e limpa o diretório de trabalho.

## Situações em que `git stash` é recomendado:

- Quando você está no meio de um trabalho e precisa resolver outro problema em um branch diferente, mas não deseja fazer um commit das mudanças inacabadas.
- Antes de fazer um `git pull` ou `git merge` que pode resultar em conflitos.
- Quando você precisa rapidamente testar algo em outro branch, mas não quer perder o que está fazendo.

## Argumentos e flags aceitos por `git stash`:

1. **`git stash`**  
   Salva todas as mudanças rastreadas (arquivos modificados e staged) e limpa o diretório de trabalho.

2. **`git stash pop`**  
   Aplica o stash mais recente e o remove da pilha.

3. **`git stash apply`**  
   Aplica o stash mais recente, mas não o remove da pilha (as alterações ficam salvas até que você remova manualmente).

4. **`git stash list`**  
   Mostra a lista de todos os stashes que foram criados.

5. **`git stash drop [<stash>]`**  
   Remove um stash específico da lista. Se você não especificar o stash, o mais recente será removido.  
   Exemplo:
   ```bash
   git stash drop stash@{0}
    ```
6. **`git stash show [<stash>]`**  

    Mostra as diferenças do stash especificado em relação ao commit base. Se nenhum stash for especificado, mostra as diferenças do stash mais recente.

6. **`git stash clear`**  

    Remove todos os stashes da pilha.

7. **`git stash save "mensagem"`**  

    Uma forma mais antiga de guardar um stash com uma mensagem específica. Este comando foi substituído por git stash push.

8. **`git stash push -m "mensagem"`**  

    Cria um stash com uma descrição personalizada (uma boa prática para identificar rapidamente qual stash é o que você precisa).

9. **`git stash push --keep-index`**  

    Salva o stash, mas mantém o índice (staged files) intacto, ou seja, os arquivos que já foram adicionados ao stage com git add permanecem no stage.

10. **`git stash push --include-untracked`**  

    Inclui também os arquivos não rastreados (arquivos que ainda não foram adicionados ao controle de versão) no stash.

10. **`git stash push --all`**  

    Inclui todos os arquivos no stash, incluindo não rastreados e ignorados.

11. **`git stash branch <nome-do-branch>`**  

    Cria um novo branch a partir do commit onde o stash foi feito e aplica o stash automaticamente nesse novo branch. Isso é útil se você perceber que as mudanças guardadas no stash merecem seu próprio branch.

# Exemplo de uso do git stash em uma situação prática:

Suponha que você está desenvolvendo algo no branch ```feature-x```, mas precisa mudar para o branch ```master``` para corrigir um bug urgente

```bash

# Salvar as alterações inacabadas
git stash

# Mudar para o branch master
git checkout master

# Resolver o problema, commit das correções
git commit -m "Corrigir bug urgente"

# Voltar para o branch original
git checkout feature-x

# Recuperar as mudanças do stash
git stash pop

```

Isso evita que você perca o progresso das mudanças em ```feature-x``` e permite alternar entre branches de maneira segura.