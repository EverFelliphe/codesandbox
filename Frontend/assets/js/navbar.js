
   $(document).ready(function(){ // Função para executar quando o documento estiver pronto
            $('.prj').tooltip()
            $('.content').attr('class','content content-close')
            $("#checkbox").removeAttr("checked");
            $('#checkbox').click(function(){

        if($('.barra').hasClass('bar-close')){ // se a barra estiver fechada
              $('.barra').attr('class','barra bar-open')
          }else{ // se a barra estiver aberta
            $('.barra').attr('class','barra bar-close')
          }    

          if($('.content').hasClass('content-close')){ // se a barra estiver fechada
              $('.content').attr('class','content content-open')
          }else{ // se a barra estiver aberta
            $('.content').attr('class','content content-close')
          }    


       
  })
        })
