document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('product-form');
  const feedback = document.getElementById('form-feedback');
  const list = document.getElementById('product-list');
  const submitBtn = document.getElementById('submit-btn');

  let products = [];
  let editIndex = null;

  // Carrega os produtos do localStorage e renderiza na lista
  const loadProducts = () => {
    products = JSON.parse(localStorage.getItem('products')) || [];
    renderProducts();
  };

  // Salva os produtos no localStorage
  const saveProducts = () => {
    localStorage.setItem('products', JSON.stringify(products));
  };

  // Renderiza a lista de produtos na tela
  const renderProducts = () => {
    list.innerHTML = '';
    if (products.length === 0) {
      const emptyMsg = document.createElement('li');
      emptyMsg.textContent = 'Nenhum produto cadastrado.';
      emptyMsg.style.fontStyle = 'italic';
      emptyMsg.style.color = '#5a6a29';
      emptyMsg.style.textAlign = 'center';
      list.appendChild(emptyMsg);
      return;
    }
    products.forEach((product, index) => {
      const li = document.createElement('li');
      li.setAttribute('tabindex', '0');
      li.setAttribute('aria-label', `${product.name}, preço ${product.price} reais, categoria ${product.category}, descrição ${product.description}`);

      const productInfo = document.createElement('div');
      productInfo.className = 'product-info';

      const nameEl = document.createElement('div');
      nameEl.className = 'product-name';
      nameEl.textContent = product.name;

      const detailsEl = document.createElement('div');
      detailsEl.className = 'product-details';
      detailsEl.textContent = `Preço: R$ ${parseFloat(product.price).toFixed(2)} | Categoria: ${product.category}`;

      const descEl = document.createElement('div');
      descEl.className = 'product-details';
      descEl.textContent = `Descrição: ${product.description}`;

      productInfo.appendChild(nameEl);
      productInfo.appendChild(detailsEl);
      productInfo.appendChild(descEl);

      const btnGroup = document.createElement('div');
      btnGroup.className = 'btn-group';

      const editBtn = document.createElement('button');
      editBtn.className = 'action-btn';
      editBtn.setAttribute('aria-label', `Editar produto ${product.name}`);
      editBtn.textContent = 'Editar';
      editBtn.addEventListener('click', () => editProduct(index));

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'action-btn';
      deleteBtn.setAttribute('aria-label', `Excluir produto ${product.name}`);
      deleteBtn.textContent = 'Excluir';
      deleteBtn.addEventListener('click', () => deleteProduct(index));

      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(deleteBtn);

      li.appendChild(productInfo);
      li.appendChild(btnGroup);

      list.appendChild(li);
    });
  };

  // Limpa a mensagem de feedback exibida para o usuário
  const clearFeedback = () => {
    feedback.textContent = '';
    feedback.className = 'feedback';
    feedback.style.display = 'none';
  };

  // Exibe mensagem de feedback ao usuário (erro ou sucesso)
  const showFeedback = (message, type = 'error') => {
    feedback.textContent = message;
    feedback.className = 'feedback ' + (type === 'error' ? 'error' : 'success');
    feedback.style.display = 'block';
    // Esconde automaticamente a mensagem de sucesso após 4 segundos
    if(type === 'success'){
      setTimeout(() => {
        clearFeedback();
      }, 4000);
    }
  };

  // Limpa os campos do formulário e reseta estado de edição
  const clearForm = () => {
    form.reset();
    editIndex = null;
    submitBtn.textContent = 'Cadastrar Produto';
    submitBtn.setAttribute('aria-label', 'Cadastrar produto');
  };

  // Valida os dados do produto antes de cadastrar ou editar
  const validateForm = (data) => {
    if(!data.name.trim()){
      return 'O campo Nome é obrigatório.';
    }
    if(data.price === '' || isNaN(data.price) || parseFloat(data.price) < 0){
      return 'O campo Preço deve ser um número positivo.';
    }
    if(!data.category.trim()){
      return 'O campo Categoria é obrigatório.';
    }
    if(!data.description.trim()){
      return 'O campo Descrição é obrigatório.';
    }
    return null;
  };

  // Adiciona um novo produto ou atualiza um produto existente
  const addOrUpdateProduct = (product) => {
    if(editIndex !== null){
      products[editIndex] = product;
      showFeedback('Produto atualizado com sucesso!', 'success');
    } else {
      products.push(product);
      showFeedback('Produto cadastrado com sucesso!', 'success');
    }
    saveProducts();
    renderProducts();
    clearForm();
  };

  // Preenche o formulário com os dados do produto para edição
  const editProduct = (index) => {
    const product = products[index];
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-description').value = product.description;
    editIndex = index;
    submitBtn.textContent = 'Atualizar Produto';
    submitBtn.setAttribute('aria-label', 'Atualizar produto');
    clearFeedback();
    window.scrollTo({top: 0, behavior: 'smooth'});
    document.getElementById('product-name').focus();
  };

  // Exclui um produto da lista após confirmação do usuário
  const deleteProduct = (index) => {
    if(confirm(`Tem certeza que deseja excluir o produto "${products[index].name}"?`)){
      products.splice(index, 1);
      saveProducts();
      renderProducts();
      showFeedback('Produto excluído com sucesso!', 'success');
    }
  };

  // Evento ao enviar o formulário: valida e adiciona/edita produto
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFeedback();
    const productData = {
      name: form['product-name'].value.trim(),
      price: form['product-price'].value.trim(),
      category: form['product-category'].value.trim(),
      description: form['product-description'].value.trim()
    };
    const errorMsg = validateForm(productData);
    if(errorMsg){
      showFeedback(errorMsg, 'error');
      return;
    }
    addOrUpdateProduct(productData);
  });

  // Carrega os produtos assim que a página é carregada
  loadProducts();
});
