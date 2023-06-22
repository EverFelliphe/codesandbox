const url = new URL(window.location.href);
let id_user =url.searchParams.get('id_user');
$(document).ready(function(){
  $('.pag-salvos').attr('href',`/salvos1.html?id_user=${id_user}`)
  $('.pag-inicial').attr('href',`/pagina_inicial.html?user_id=${id_user}`)
  $('.pag-ajuda').attr('href',`/pagina_inicial.html?user_id=${id_user}`)
  $('.pag-comp').attr('href',`/pagina_inicial.html?user_id=${id_user}`)
  $('.navbar-brand').attr('href',`/pagina_inicial.html?user_id=${id_user}`)
  $('.back').attr('href',`/pagina_inicial.html?user_id=${id_user}`)



    var campos = ''
    $.ajax({ // ajax para pegar os dados do usuário
        url:'/listsalvos',
        method:'get',
        data:{user:id_user},
        success:function(data,status){ // se der certo
            console.log(data)
                data.forEach(element => { // percorre os dados
                    $('.dropdown-menu').append(`<li><a class="dropdown-item" href='/salvos2.html?id_user=${id_user}&pasta=${element.pasta}'>${element.pasta}</a></li>`)
                  campos+= ` <div class="grid-item">
                  
                    <div class="col">
                      <div class="card" id="card-id" >
                      <a href='/salvos2.html?id_user=${id_user}&pasta=${element.pasta}' style="text-decoration: none !important;color:black">
                      <div>  
                      <div class="card-body ${element.tipo}"id="${element.pasta}">
                          <h5 class="card-title">${element.pasta}</h5>
                        </div>
                      <img src="./Referências/hist4.png" alt="imagem">
                        
                        </a>
                        </div>
                      </div>
                    </div>
                  </div>
                   
                  `
                });
                campos+= `     <div class="grid-item">
                <div class="col" >
                  <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" style="background-color: transparent; border-color: transparent;">   
                    <div class="card-more" id="card-more-id">
                        <div class="card-body">
                            <p>+</p>
                          <h5 class="card-title">Criar nova pasta</h5>
                        </div>
                      </div>
                  </button>
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title " id="exampleModalLabel">Criar Pasta</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <p>Nome da pasta que você deseja criar:</p>
                          <input class="past-creat-input" placeholder=' Como "Viagens impotantes" ou "Dados para analisar depois"' type="text" id="nome-pasta">
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                          <button type="button" class="btn btn-primary criar" style="background-color: #15b9bf;">Criar Pasta</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div class="grid-item">          
                 </div>
                </div>`
            $('.grid-container').append(campos)
            
        $('.criar').click(function(){ // quando clicar no botão de criar pasta
            const myModalAlternative3 = new bootstrap.Modal('#exampleModal')

        var nome_pasta=$('#nome-pasta').val()
        console.log(nome_pasta)
        $.ajax({ // ajax para criar a pasta
            url:'/criarpasta',
            method:'post',
            data:{user:id_user,pasta:nome_pasta},
            success:function(data,status){
                myModalAlternative3.hide()
               window.location.href = `/salvos1.html?id_user=1`
                console.log(data) 
                
            
              }
        })
    })
   
          }
    })

    $('.card-body').click(function(){
      console.log(this)
    }) 
})