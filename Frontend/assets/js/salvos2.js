const url = new URL(window.location.href);
let id_user =url.searchParams.get('id_user');
let tipo =url.searchParams.get('tipo');
let pasta =url.searchParams.get('pasta');


$(document).ready(function(){ // Função para executar quando o documento estiver pronto
    $('.pag-salvos').attr('href',`/salvos1.html?id_user=${id_user}`)
    $('.pag-inicial').attr('href',`/pagina_inicial.html?user_id=${id_user}`)
    $('.pag-ajuda').attr('href',`/pagina_inicial.html?user_id=${id_user}`)
    $('.pag-comp').attr('href',`/pagina_inicial.html?user_id=${id_user}`)
    $('.navbar-brand').attr('href',`/pagina_inicial.html?user_id=${id_user}`)
    $('.back').attr('href',`/salvos1.html?id_user=${id_user}`)


    var campos = ''
    $.ajax({ // ajax para pegar os dados do usuário
        url:'/items',
        method:'get',
        data:{user:id_user,pasta:pasta},
        success:function(data,status){ // se der certo
            console.log(data)
                data.forEach(element => { // percorre os dados
                    if(element.tipo === 'viagens'){ // se for viagem
                        
                        $('.dropdown-menu').append(`<li><a class="dropdown-item" href='/projeto.html?id_viagem=${element.id_item}&id_relatorio=${element.id_rel}&id_user=${element.id_user}'>Relatório ${element.id_rel}:viagem${element.id_item}</a></li>`)
                        campos+= `<div class="grid-item">
                  
                        <div class="col">
                          <div class="card" id="card-id" >
                          <a  href='/projeto.html?id_viagem=${element.id_item}&id_relatorio=${element.id_rel}&id_user=${element.id_user}'' style="text-decoration: none !important;color:black">
                            <img src="./Referências/hist1.png" alt="imagem">
                            <div class="card-body ">
                              <h5 class="card-title"> Relatório ${element.id_rel}:viagem${element.id_item}</h5>
                            </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      
                         `
                      }
                      if(element.tipo === 'grrafico'){ // se for grafico
                        $('.dropdown-menu').append(`<li><a class="dropdown-item" href='/salvos2.html?id_user=${id_user}&pasta="${element.pasta}"'>Relatório ${element.id_rel}:grafico ${element.id_item}</a></li>`)
                        campos+= `<div class="grid-item">
                  
                        <div class="col">
                          <div class="card" id="card-id" >
                          <a  href='/projeto.html?id_viagem=${element.id_item}&id_relatorio=${element.id_rel}&id_user=${element.id_user}'' style="text-decoration: none !important;color:black">
                            <img src="./Referências/hist1.png" alt="imagem">
                            <div class="card-body ">
                              <h5 class="card-title"> Relatório ${element.id_rel}:viagem${element.id_item}</h5>
                            </div>
                            </a>
                          </div>
                        </div>
                      </div>
                         `
                      }
                    
                    });$('.grid-container').append(campos)
                    }
                   
               
        

       
          })
    })

    