
# Requisitos e Casos de Teste

## Requisitos Funcionais

### Histórias de Usuário

1. **Cadastro de Produto**  
   Como usuário, quero cadastrar um novo produto para controlar meu estoque pessoal, informando Nome, Preço, Categoria e Descrição.

2. **Visualização de Produtos**  
   Como usuário, quero visualizar a lista de produtos cadastrados para acompanhar os itens disponíveis.

3. **Edição de Produto**  
   Como usuário, quero poder editar os dados de um produto existente para corrigir ou atualizar informações.

4. **Exclusão de Produto**  
   Como usuário, quero excluir produtos da lista para manter o cadastro atualizado e relevante.

5. **Validação de Dados**  
   Como usuário, quero que o sistema valide os dados do formulário para garantir que informações obrigatórias e corretas sejam inseridas.

6. **Feedback Visual**  
   Como usuário, quero receber mensagens visuais claras de sucesso ou erro após realizar ações como cadastrar, editar ou excluir produtos.

## Casos de Teste Manuais

### CT001
**Caso de Teste:** Cadastro com todos os dados válidos  
**Procedimento:** Preencher Nome, Preço, Categoria e Descrição corretamente e clicar em "Cadastrar Produto".  
**Resultado Esperado:** Produto é incluído na lista e mensagem "Produto cadastrado com sucesso!" aparece.

---

### CT002
**Caso de Teste:** Cadastro com campo obrigatório vazio  
**Procedimento:** Deixar o campo "Nome" vazio e tentar cadastrar produto.  
**Resultado Esperado:** Exibe mensagem de erro "O campo Nome é obrigatório." e produto não é salvo.

---

### CT003
**Caso de Teste:** Cadastro com preço inválido  
**Procedimento:** Informar preço negativo ou valor não numérico no campo "Preço" e tentar cadastrar.  
**Resultado Esperado:** Exibe mensagem de erro "O campo Preço deve ser um número positivo." e produto não é salvo.

---

### CT004
**Caso de Teste:** Edição de produto  
**Procedimento:** Selecionar um produto para editar, alterar os dados e salvar a alteração.  
**Resultado Esperado:** Produto atualizado na lista e mensagem "Produto atualizado com sucesso!" aparece.

---

### CT005
**Caso de Teste:** Exclusão de produto  
**Procedimento:** Clicar em "Excluir" para remover um produto da lista e confirmar a exclusão.  
**Resultado Esperado:** Produto é removido da lista e mensagem "Produto excluído com sucesso!" aparece.

---

### CT006
**Caso de Teste:** Validação do formulário  
**Procedimento:** Tentar submeter formulário com qualquer campo obrigatório vazio.  
**Resultado Esperado:** Mensagem de erro apropriada é exibida e o produto não é salvo.
