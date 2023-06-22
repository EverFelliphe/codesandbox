const chk = document.getElementById('chk')

chk.addEventListener('change', () => { // Função para executar quando o documento estiver pronto
  document.body.classList.toggle('dark') // se o corpo tiver a classe dark, ele tira, se não tiver, ele coloca
})