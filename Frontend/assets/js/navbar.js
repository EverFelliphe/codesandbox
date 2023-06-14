     $('#checkbox').click(function(){

        if($('.barra').hasClass('bar-close')){
              $('.barra').attr('class','barra bar-open')
          }else{
            $('.barra').attr('class','barra bar-close')
          }    

          if($('.content').hasClass('content-close')){
              $('.content').attr('class','content content-open')
          }else{
            $('.content').attr('class','content content-close')
          }    


       
  })
   $(document).ready(function(){
            $('.prj').tooltip()
        })
