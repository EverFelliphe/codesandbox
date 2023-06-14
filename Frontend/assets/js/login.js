$('#botaoir').click(function(){
    const user = $('#usuario').val()
    const senha = $('#senha').val()
    //faz a requisição para a api do login enviando o user e senha preenchido
    $.post('/login',{
usuario:user,
senha:senha    
},function(data, status){
    //se a msgm for erro ele adiciona a mensagem na div que contem a classe error
    //se for success ele redirecion a url para a pagina inicial e envia junto o id do usuario
if(data.msg === 'success'){
    
    $('.error').addClass('alert alert-success').html('logado com sucesso')
    window.location.href = `/meus_projetos?user_id=${data.id}`
}else{
    
    $('.error').addClass('alert alert-danger').html(data.msg)
}
})
})