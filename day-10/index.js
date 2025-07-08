// Fetch data from JSON and display in table
fetch('product-info.json')
  .then(response => response.json())
  .then(data => {
    const productBody = document.getElementById('product-body');

    data.forEach(product => {
      addRowToTable(product.id, product.name, product.qty,product.price);
    });
  })
  .catch(error => console.error('Error:', error));

const productInput = document.getElementById('product');
const priceInput = document.getElementById('price'); 
const qtyInput = document.getElementById('qty');
const submitButton = document.getElementById('submit');

let editRowId = null; 


submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  const productName = productInput.value.trim();
  const qty = qtyInput.value.trim();
  const price=priceInput.value.trim();

  if (productName === '' || qty === '') {
    alert('Please fill in all fields');
    return;
  }

  if (editRowId !== null) {
    
    const row = document.querySelector(`tr[data-id='${editRowId}']`);
    row.children[1].innerText = productName;
    row.children[2].innerText = qty;
    row.children[3].innerText=price;
    submitButton.value = 'Add Product';
    editRowId = null;
  } else {
    
    const newId = generateUniqueId();
    addRowToTable(newId, productName, qty,price);
  }

  resetForm();
});

function addRowToTable(id, name, qty,price) {
  const productBody = document.getElementById('product-body');
  const row = document.createElement('tr');
  row.setAttribute('data-id', id);

  row.innerHTML = `
    <td>${id}</td>
    <td>${name}</td>
    <td>${qty}</td>
    <td>${price}</td>
    <td><button class="update-btn">UPDATE</button>
    <button class="delete-btn">DELETE</button></td>
  `;

  
  row.querySelector('.update-btn').addEventListener('click', () => {
    productInput.value = name;
    qtyInput.value = qty;
    priceInput.value=price;
    submitButton.value = 'Save Changes';
    editRowId = id;
  });

  
  row.querySelector('.delete-btn').addEventListener('click', () => {
    productBody.removeChild(row);
    resetForm();
  });

  productBody.appendChild(row);
}


function generateUniqueId() {
  return Date.now();
}

function resetForm() {
  productInput.value = '';
  priceInput.value = '';
  qtyInput.value = '';
  submitButton.value = 'Add Product';
  editRowId = null;
}