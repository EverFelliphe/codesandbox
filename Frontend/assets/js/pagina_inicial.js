$(document).ready(function(){
     
    //quando carrega o documento ele pega o parametro user_id da url que identifica o user
    const url = new URL(window.location.href);
    const parametro = url.searchParams.get('user_id');
    //faz uma requisição à api que responde os relatórios pertencentes ao usuario logado
    $.get(`/projeto/relatorio?id_empresa=${parametro}`,function(data,status){
        let i = 1
        /* para cada relatório encontrado ele cria uma celula contendo um link com o href redirecionando
        para a pagina de relatórios enviando o id do relatório selecionado
        */
        data.forEach(value =>{
            
            $('#lista_projetos').append(`
            <li   class=" w-100 list-unstyled btn d-flex align-items-center prj"  style="box-shadow:  26px 26px 51px #c2c2c2;border-radius:12px;background-color:#fafafa;height:52px ; margin-bottom:-12px; margin-top:-4px"
             data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="${value.id}" 
             ><a href="/relatorio?id_relatorio=${value.id}" style="font-size:16px;" class="navbar-brand ibm ms-3">PROJETO ${i}
    </li>   
     
            `)
            i++
        })
        $(document).ready(function(){
            $('[data-bs-toggle="tooltip"]').tooltip()
            $('.prj').click(function(){
               window.location.href= $(this).children().attr('href')
            })
        })
    })

      
      
})