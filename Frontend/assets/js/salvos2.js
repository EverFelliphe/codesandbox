// Obter os elementos do DOM
var modalButtons = document.querySelectorAll('.openModalBtn');
var modals = document.querySelectorAll('.modal');
var closeButtons = document.querySelectorAll('.close');

// Adicionar eventos de clique aos botões de abrir modal
modalButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var modalId = button.getAttribute('data-modal-id');
    openModal(modalId);
  });
});

// Adicionar eventos de clique aos botões de fechar
closeButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var modal = button.closest('.modal');
    closeModal(modal);
  });
});

// Função para abrir um modal pelo ID
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = 'block';
}

// Função para fechar um modal
function closeModal(modal) {
  modal.style.display = 'none';
}

