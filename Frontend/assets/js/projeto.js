 const url = new URL(window.location.href);
  const parametro = url.searchParams.get('id_relatorio');
  const parametro2 = url.searchParams.get('id_user');
  const parametro3 = url.searchParams.get('id_viagem');
  let viagem_atual = parametro3||undefined
$(document).ready(function(){
  $('.pag-salvos').attr('href',`/salvos1.html?id_user=${parametro2}`)
  $('.pag-inicial').attr('href',`/pagina_inicial.html?user_id=${parametro2}`)
  $('.pag-ajuda').attr('href',`/pagina_inicial.html?user_id=${parametro2}`)
  $('.pag-comp').attr('href',`/comparacao.html?user_id=${parametro2}`)
  $('.navbar-brand').attr('href',`/pagina_inicial.html?user_id=${parametro2}`)
  $('.back').attr('href',`/pagina_inicial.html?user_id=${parametro2}`)
  $('.nome-viagem').html(`Viagem ${viagem_atual}`)

 
  
async function viagens(){ // função que controla as viagens
   const viagens =[]
   let idx = 0

   $('.salvos').click(function(){
    $(".salvar-footer").html('')
    $('.salvar-pastas').html('')
  
    fetch('/listsalvos?user=1').then(resp=>resp.json()).then(data=>{ // pega as pastas salvas
      if(data[0]){ // se houver pastas
        data.forEach(val=>{ // para cada pasta e adiciona pasta
        $('.salvar-pastas').append(` 
  
        <div class="form-check">
        <input class="form-check-input pastass" type="checkbox" value="${val.pasta}" id="flexCheckDefault" name="pasta-${val.pasta}">
        <label class="form-check-label" for="flexCheckDefault">
          ${val.pasta}
        </label>
      </div>
      `)
      })
      $('.salvar-footer').append(`<button class='btn btn-primary salvar-pasta' >Salvar</button>
      `)
      }else{ // se não houver pastas
        
          $('.salvar-pastas').append(`
    
          <h3 style="color:">Nenhuma pasta encontrada</h3>
          <p> Vá até a pagina de favoritos e crie uma para salvar este item</p>
        `)
        
        $('.salvar-footer').append(`<button class='btn button-primary salvar-pasta' data-bs-dismiss="modal">Fechar</button>
        `)
      }
      
      myModalAlternative3.show()
      const inputs = document.querySelectorAll(".pastass")
      console.log(inputs)
      $('.salvar-pasta').click(()=>{ // quando clicar em salvar
          inputs.forEach(val=>{ // para cada pasta
            if(val.checked){ // se estiver marcada
              $.post('/testeenvio',{pasta:val.value,id_item:viagens[idx],tipo:'viagens',id_user:parametro2,id_rel:parametro},function(data,status){
                $('.salvos').html(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-bookmark-check salvo" viewBox="0 0 16 16"style="right:-50px; position:absolute ; bottom:20px; ">
              <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            </svg>`) // muda o icone
            console.log($('.salvos').classList)
                myModalAlternative3.hide()
              })
            }
          })
      })
    })
    
  })
   
   

 let data = (!parametro3)?await $.ajax({ // pega as viagens
  url:'/projetos/viagens',
  method:'GET',
  data:{id_rel:parametro},
  contentType:'json',
  success:function(data,status){ // se houver viagens
    data.forEach((val,index)=>{
       $('.viagem').append(` <li class="dropdown-item f-1 V" id="${val.id_viagem}">${index+1}</li>`)
      viagens.push(val.id_viagem)
      })
      $('.viagem-atual').val(String(viagens[0]))
    console.log(data) 
    

  }

}):await $.ajax({ // se não houver viagens
  url:'/projetos/viagens',
  method:'GET',
  data:{id_rel:parametro},
  contentType:'json',
  success:function(data,status){ // se houver viagens
    data.forEach((val,index)=>{
       $('.viagem').append(` <li class="dropdown-item f-1 V" id="${val.id_viagem}">${index+1}</li>`)
      viagens.push(val.id_viagem)
      })
      $('.viagem-atual').val(String(parametro3))
    console.log(data) 
    

  }

})
viagem_atual =(!parametro3)? viagens[idx]:parametro3 // define a viagem atual
idx =viagens.indexOf(Number(viagem_atual)) // define o indice da viagem atual
console.log(idx)
$('.nome-viagem').html(`Viagem ${idx+1}`) // muda o nome da viagem atual
console.log(viagem_atual)
console.log(viagens)

   
   $('.V').click(function(){ // quando clicar em uma viagem
    console.log(viagens)

    console.log(viagens.indexOf(viagem_atual))
    viagem_atual = Number(this.id)
    idx =viagens.indexOf(viagem_atual)
    if($('.viagem-atual')[0].classList.contains('c-1')){ // se for a viagem 1
      obj_dados =[]  
      console.log('mudou')
  console.log('mudou')
  
      data_choques = {}
      deleteMarkers()
      deleteLine()
  
      fetch(`/choque1?id_vagao=${viagem_atual}&tipo=1`,{ // pega os choques da viagem
        method:'GET'
        
      }).then(resp => resp.json()).then(resp => { // transforma em json
        console.log(resp)
        resp.forEach(val=>{
          let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
          let datta =  new Date(a)
          obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
          data_choques[`id${val.id}`] = val
          data_choques[`id${val.id}`]['Data_Hora'] = datta
        })
        console.log(data_choques)
        setPoly(obj_dados,map1)
        setPoly(obj_dados,map2)
        setMarkers(map1, obj_dados,markers);
        setMarkers(map2,obj_dados,markers2);  
        $('.nome-viagem').html(`Viagem ${idx+1}`)
  
      })
  }
  if($('.viagem-atual')[0].classList.contains('c-2')){ // se for a viagem 2
      obj_dados =[]   
      data_choques = {}
      deleteLine()
      deleteMarkers()
     
      fetch(`/choque2?id_vagao=${viagem_atual}&tipo=2`).then(resp => resp.json()).then(resp => { // pega os choques da viagem
        console.log(resp)
        resp.forEach(val=>{
          let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
          let datta =  new Date(a)
          obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
          data_choques[`id${val.id}`] = val
          data_choques[`id${val.id}`]['Data_Hora'] = datta
        })
        setPoly(obj_dados,map1)
        setPoly(obj_dados,map2)
        console.log(data_choques)
        setMarkers(map1, obj_dados,markers);
        console.log(data_choques)
  
        setMarkers(map2,obj_dados,markers2); 
        console.log(data_choques)
        $('.nome-viagem').html(`Viagem ${idx+1}`)
  
  
      })
  }
  
  })
   $('.prox').click(function(){ // quando clicar em proximo
      if(!viagens[idx+1]){ // se não houver proxima viagem
        idx = 0
        viagem_atual = viagens[idx]
        $('.viagem-atual')[0].value=String(viagem_atual)
        $('.nome-viagem').html(`Viagem ${idx+1}`)
      }else{ idx++ // se houver proxima viagem
        viagem_atual = viagens[idx]
        $('.viagem-atual').val(String(viagem_atual))
        $('.nome-viagem').html(`Viagem ${idx+1}`)
      } 
      $.ajax({ // verifica se a viagem atual está salva
        url:'/verificarsalvo',
        method:'GET',
        data:{id_item:viagem_atual,tipo:'viagens'},
        success:function(data,status){ // se estiver salva
          console.log(data)
            if(!data[0]){ // se não estiver salva
              $('.salvos').html(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16"style="right:-50px; position:absolute ; bottom:20px; ">
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
      </svg>`)
            }else{ // se estiver salva
              $('.salvos').html(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-bookmark-check salvo" viewBox="0 0 16 16"style="right:-50px; position:absolute ; bottom:20px; ">
              <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            </svg>`)
            
            console.log($('.salvos')[0].classList)

            $('.salvo').click(function(){ // quando clicar em salvo
            })
            }
      
        }
      
      })
      if($('.viagem-atual')[0].classList.contains('c-1')){ // se for a viagem 1
    obj_dados =[]  
    console.log('mudou')
console.log('mudou')

    data_choques = {}
    deleteMarkers()
    deleteLine()

    fetch(`/choque1?id_vagao=${viagem_atual}&tipo=1`,{ // pega os choques da viagem
      method:'GET'
      
    }).then(resp => resp.json()).then(resp => { // transforma em json
      console.log(resp)
      resp.forEach(val=>{ // para cada choque
        let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
        let datta =  new Date(a)
        obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
        data_choques[`id${val.id}`] = val
        data_choques[`id${val.id}`]['Data_Hora'] = datta
      })
      console.log(data_choques)
      setPoly(obj_dados,map1)
      setPoly(obj_dados,map2)
      setMarkers(map1, obj_dados,markers);
      setMarkers(map2,obj_dados,markers2);  
      
    })
}
if($('.viagem-atual')[0].classList.contains('c-2')){ // se for a viagem 2
    obj_dados =[]   
    data_choques = {}
    deleteLine()
    deleteMarkers()
   
    fetch(`/choque2?id_vagao=${viagem_atual}&tipo=2`,{ // pega os choques da viagem
      method:'GET'
      
    }).then(resp => resp.json()).then(resp => { // transforma em json
      resp.forEach(val=>{ // para cada choque
        let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
        let datta =  new Date(a)
        obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
        data_choques[`id${val.id}`] = val
        data_choques[`id${val.id}`]['Data_Hora'] = datta
      })
      setPoly(obj_dados,map1)
      console.log(data_choques)
      setMarkers(map1, obj_dados,markers);
      console.log(data_choques)
      setPoly(obj_dados,map2)

      setMarkers(map2,obj_dados,markers2); 
      console.log(data_choques)

    })
}
      console.log(viagem_atual)
})
$('.ant').click(function(){ // quando clicar em anterior
  
      if(!viagens[idx-1]){ // se não houver viagem anterior
        idx = viagens.length -1
        viagem_atual = viagens[idx]
        $('.viagem-atual').val(String(viagem_atual))
        $('.nome-viagem').html(`Viagem ${idx+1}`)
      }else{ idx-- // se houver viagem anterior
        viagem_atual = viagens[idx]
        $('.viagem-atual').val(String(viagem_atual))
        $('.nome-viagem').html(`Viagem ${idx+1}`)
      }
      $.ajax({ // verifica se a viagem atual está salva
        url:'/verificarsalvo',
        method:'GET',
        data:{id_item:viagem_atual,tipo:'viagens'},
        success:function(data,status){
          console.log(data)
            if(!data[0]){ // se não estiver salva
              $('.salvos').html(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16"style="right:-50px; position:absolute ; bottom:20px; ">
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
      </svg>`)
            }else{ // se estiver salva
              $('.salvos').html(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16"style="right:-50px; position:absolute ; bottom:20px; ">
              <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            </svg>`)
            }
      
        }
      
      })
      if($('.viagem-atual')[0].classList.contains('c-1')){ // se for a viagem 1
    obj_dados =[]  
    console.log('mudou')
console.log('mudou')

    data_choques = {}
    deleteMarkers()
    deleteLine()

    fetch(`/choque1?id_vagao=${viagem_atual}&tipo=1`,{ // pega os choques da viagem
      method:'GET'
      
    }).then(resp => resp.json()).then(resp => { // transforma em json
      console.log(resp)
      resp.forEach(val=>{ // para cada choque
        let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
        let datta =  new Date(a)
        obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
        data_choques[`id${val.id}`] = val
        data_choques[`id${val.id}`]['Data_Hora'] = datta
      })
      console.log(data_choques)
      setPoly(obj_dados,map1)
      setPoly(obj_dados,map2)
      setMarkers(map1, obj_dados,markers);
      setMarkers(map2,obj_dados,markers2);  
      
    })
}
if($('.viagem-atual')[0].classList.contains('c-2')){ // se for a viagem 2
    obj_dados =[]   
    data_choques = {}
    deleteLine()
    deleteMarkers()
   
    fetch(`/choque2?id_vagao=${viagem_atual}&tipo=2`,{ // pega os choques da viagem
      method:'GET'
      
    }).then(resp => resp.json()).then(resp => { // transforma em json
      resp.forEach(val=>{ // para cada choque
        let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
        let datta =  new Date(a)
        obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
        data_choques[`id${val.id}`] = val
        data_choques[`id${val.id}`]['Data_Hora'] = datta
      })
      setPoly(obj_dados,map1)
      setPoly(obj_dados,map2)
      console.log(data_choques)
      setMarkers(map1, obj_dados,markers);
      console.log(data_choques)
      
      setMarkers(map2,obj_dados,markers2); 
      console.log(data_choques)

    })
}

      console.log(viagem_atual)
})
$.ajax({ // verifica se a viagem atual está salva
  url:'/verificarsalvo',
  method:'GET',
  data:{id_item:viagem_atual,tipo:'viagens'},
  success:function(data,status){ // se estiver salva
    console.log(data)
      if(!data[0]){ 
        $('.salvos').html(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16"style="right:-50px; position:absolute ; bottom:20px; ">
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
</svg>`)
      }else{ 
        $('.salvos').html(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16"style="right:-50px; position:absolute ; bottom:20px; ">
        <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
      </svg>`)
      }

  }

})
}
viagens()




})     





$('.viagem-atual').on("change",function(){ // quando mudar a viagem atual



})
let obj_dados1 = []
let markers = [];
let lines=[];
let markers2 = [];
let data_choques = {

}

let div = $('#testedivchart')[0]
let modal_data =[]
console.log(div)
const myModalAlternative = new bootstrap.Modal('#mapafull')
const myModalAlternative3 = new bootstrap.Modal('#salvar')

const myModalAlternative2 = new bootstrap.Modal('#222')
$('.f-1').click(function(){ // quando clicar em uma viagem
console.log(this.val())
$('.f').html(`${this.html}`)    })

$('.c').click(function(){ // quando clicar em um tipo de choque
  if($('body')[0].classList.contains('dark')){
    $('.c').css({"background-color":"#031423","color":"#f5f5f5"})
this.style.backgroundColor = "#02d8da"
this.style.color = "#f5f5f5"
  }else{
$('.c').css({"background-color":"rgb(18, 124, 181)","color":"#f5f5f5"})
this.style.backgroundColor = "#02d8da"
this.style.color = "#f5f5f5"
  }
console.log(this.style.backgroundColor)
console.log(this)

if(this.classList.contains('c-1')){ // se for o choque 1
    obj_dados =[]  
   
    data_choques = {}
    deleteMarkers()
    deleteLine()
    $(".viagem-atual").attr({
"class" : "viagem-atual c-1",

});
    console.log($('.viagem-atual'))
    fetch(`/choque1?id_vagao=${viagem_atual}&tipo=1`,{ // pega os choques da viagem
      method:'GET'
      
    }).then(resp => resp.json()).then(resp => { // transforma em json
      console.log(resp)
      resp.forEach(val=>{ // para cada choque
        let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
        let datta =  new Date(a)
        obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
        data_choques[`id${val.id}`] = val
        data_choques[`id${val.id}`]['Data_Hora'] = datta
      })
      console.log(data_choques)
      setPoly(obj_dados,map1)
      setPoly(obj_dados,map2)
      setMarkers(map1, obj_dados,markers);
      setMarkers(map2,obj_dados,markers2);  
      
    })
}
if(this.classList.contains('c-2')){ // se for o choque 2
    obj_dados =[]   
    data_choques = {}
    deleteLine()
    deleteMarkers()
    $(".viagem-atual").attr({ // muda a viagem atual
"class" : "viagem-atual c-2",

});
    fetch(`/choque2?id_vagao=${viagem_atual}&tipo=2`,{ // pega os choques da viagem
      method:'GET'
      
    }).then(resp => resp.json()).then(resp => { // transforma em json
      resp.forEach(val=>{ // para cada choque
        let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
        let datta =  new Date(a)
        obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
        data_choques[`id${val.id}`] = val
        data_choques[`id${val.id}`]['Data_Hora'] = datta
      })
      setPoly(obj_dados,map1)
      console.log(data_choques)
      setMarkers(map1, obj_dados,markers);
      console.log(data_choques)
      setPoly(obj_dados,map2)
      setMarkers(map2,obj_dados,markers2); 
      console.log(data_choques)

    })
}
if(this.classList.contains('c-p')){ // se for o choque 2
obj_dados=[]
data_choques = {}
deleteLine()

  deleteMarkers()
    fetch('/pico?id_vagao=2',{ // pega os choques da viagem
      method:'GET'
      
    }).then(resp => resp.json()).then(resp => {  // transforma em json
      

      resp.forEach(val=>{ // para cada choque
        
        obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
        data_choques[val.id] = val
      }) 
      setPoly(obj_dados,map1)
      setPoly(obj_dados,map2)
      setMarkers(map1, obj_dados,markers);
      setMarkers(map2,obj_dados,markers2);  

      

      window.initMap = initMap
    })
}
})

$('#map1').dblclick(function(){ // quando clicar no mapa
console.log(this)
myModalAlternative.show()
}) 
$('.bar').change(function(){ // quando mudar o tipo de gráfico
})
let map;

function initMap() { // inicia o mapa

map1 = new google.maps.Map(document.getElementById("map1"), { // inicia o mapa 1

center: { lat: -4.40454854, lng: -42.3425765 },      zoom: 5,
});

map2 = new google.maps.Map(document.getElementById("map2"), { // inicia o mapa 2
center: { lat: -4.40454854, lng: -42.3425765 },      zoom: 5,
fullscreenControl:false
});
}
function setPoly(obj,map){  // cria a linha

const flightPath = new google.maps.Polyline({ // cria a linha
path: obj,
geodesic: true,
strokeColor: "#FF0000",
strokeOpacity: 1.0,
strokeWeight: 3,

})
lines.push(flightPath)
flightPath.setMap(map);
}
function setMarkers(map,array,pontos) { // cria os marcadores

const image = {
url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
// This marker is 20 pixels wide by 32 pixels high.
size: new google.maps.Size(20, 32),
// The origin for this image is (0, 0).
origin: new google.maps.Point(0, 0),
// The anchor for this image is the base of the flagpole at (0, 32).
anchor: new google.maps.Point(0, 32),
};

const shape = { // cria o shape do marcador
coords: [1, 1, 1, 20, 18, 20, 18, 1],
type: "poly",
};

for (let i = 0; i < 5; i++) { // para cada choque
const beach = array[i];
console.log(beach)
let marker = new google.maps.Marker({
position: { lat: beach.lat, lng: beach.lng },
map,
icon: image,
shape: shape,
title:`${beach.id_choque}` ,

});

pontos.push(marker)
const infowindow = new google.maps.InfoWindow({
content: `id do choque:${beach.id_choque}`,
ariaLabel: "Uluru",
});      

marker.addListener("click", () => { // quando clicar no marcador
  $('.dadosmodal').html('')
  $('.dadosmodal-footer').html('')
modal_data =[]
modal_data=[['data','força', {'type': 'string', 'role': 'style'}]]
console.log(data_choques)
      
 let acc =  Object.values(data_choques).reduce((acc,val)=>{ // para cada choque
  console.log(acc)
      if(Math.abs(val.Latitude - data_choques[`id${marker.title}`]['Latitude'])<0.09 &&Math.abs(val.Longitude - data_choques[`id${marker.title}`]['Longitude'])<0.09 && val.id !== data_choques[`id${marker.title}`]['id'] ){ // se estiver no raio de 10km
        console.log(`
        val match:${val.id}
        clickado:${data_choques[`id${marker.title}`]['id']}
        
        `)
        return acc+=1
      }else{ // se não estiver no raio de 10km
        return acc
      }
 },0)
console.log(acc)
console.log(data_choques[`id${marker.title}`])
$('.dadosmodal').append(`<div style="display:flex;flex-direction:column">
<label>Quantidade de choques em um raio de 10km</label><h3>${acc+1}</h3>
<label>Data</label><h3>${data_choques[`id${marker.title}`]['Data_Hora']}</h3>
</div>
<div class="testee-items grid-container" ></div>
`)
Object.keys(data_choques[`id${marker.title}`]).forEach(val=>{
  if(val!== 'Data_Hora'&& val!=='id' &&val!=='tipo'&&val!=='id_viagem'){ // para cada dado do choque
    $('.testee-items').append(`
  <div class="col grid-item" ">
<label>${val}</label><p>${data_choques[`id${marker.title}`][val]}<p>
</div>
`)
  }
  if(val==='id_viagem'){ // se for o id da viagem
    $('.dadosmodal-footer').append(`<a href="/escritorio.html?id_viagem=${viagem_atual}&id_user=${parametro2}&id_rel=${parametro}"><button type="button" class="btn btn-primary">Ver mais dados</button></a>`)
  }
})

console.log(typeof(marker.title))
myModalAlternative2.show()

    
});
}
console.log(markers)
}
function hideLine(){ // esconde a linha
for (i=0; i<lines.length; i++) 
{                           
lines[i].setMap(null); //or line[i].setVisible(false);
}
}
function deleteLine(){ // deleta a linha
hideLine()
lines=[]
}
// Remove os marcadores do mapa mas deixa eles na array.
// Seta o mapa em base de todos os marcadores da array.
function setMapOnAll(map) {
for (let i = 0; i < markers.length; i++) {
markers[i].setMap(map);
console.log(i,'none')

}
for (let i = 0; i < markers2.length; i++) {
 
  markers2[i].setMap(map);
  console.log(i,'none')
  
  }
console.log(markers)
}

// Remove os marcadores do mapa mas mantem-os na array.
function hideMarkers() {
setMapOnAll(null);
}


// Deleta todos os marcadores na array.
function deleteMarkers() {
hideMarkers();
markers = [];
markers2=[];

}







$('.V').click(function(){ // quando clicar em uma viagem
  console.log(this.value)
  viagem_atual = this.value
  if($('.viagem-atual')[0].classList.contains('c-1')){ // se for a viagem 1
    obj_dados =[]  
    console.log('mudou')
console.log('mudou')

    data_choques = {}
    deleteMarkers()
    deleteLine()

    fetch(`/choque1?id_vagao=${viagem_atual}&tipo=1`,{ // pega os choques da viagem
      method:'GET'
      
    }).then(resp => resp.json()).then(resp => { // transforma em json
      console.log(resp)
      resp.forEach(val=>{ // para cada choque
        let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
        let datta =  new Date(a)
        obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
        data_choques[`id${val.id}`] = val
        data_choques[`id${val.id}`]['Data_Hora'] = datta
      })
      console.log(data_choques)
      setPoly(obj_dados,map1)
      setPoly(obj_dados,map2)
      setMarkers(map1, obj_dados,markers);
      setMarkers(map2,obj_dados,markers2);  
      
    })
}
if($('.viagem-atual')[0].classList.contains('c-2')){ // se for a viagem 2
    obj_dados =[]   
    data_choques = {}
    deleteLine()
    deleteMarkers()
   
    fetch(`/choque2?id_vagao=${viagem_atual}&tipo=2`,{ // pega os choques da viagem
      method:'GET'
      
    }).then(resp => resp.json()).then(resp => { // transforma em json
      resp.forEach(val=>{
        let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
        let datta =  new Date(a)
        obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
        data_choques[`id${val.id}`] = val
        data_choques[`id${val.id}`]['Data_Hora'] = datta
      })
      setPoly(obj_dados,map1)
      setPoly(obj_dados,map2)
      console.log(data_choques)
      setMarkers(map1, obj_dados,markers);
      console.log(data_choques)

      setMarkers(map2,obj_dados,markers2); 
      console.log(data_choques)

    })
}

})

$('.engate').click(function(){ // quando clicar em um tipo de engate
  
  if($('.viagem-atual')[0].classList.contains('c-1') && this.classList.contains('engate-E') ){ // se for a viagem 1 e o engate E
obj_dados =[]  


data_choques = {}
deleteMarkers()
deleteLine()

fetch(`/filtro?column=engate&filtro=E&viagem=${viagem_atual}&tipo=1`)
.then(resp => resp.json()).then(resp => { // pega os choques da viagem
  console.log(resp)
  resp.forEach(val=>{ // para cada choque
    let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
    let datta =  new Date(a)
    obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
    data_choques[`id${val.id}`] = val
    data_choques[`id${val.id}`]['Data_Hora'] = datta
  })
  console.log(data_choques)
  setPoly(obj_dados,map1)
  setPoly(obj_dados,map2)
  setMarkers(map1, obj_dados,markers);
  setMarkers(map2,obj_dados,markers2);  
  
})
}else if($('.viagem-atual')[0].classList.contains('c-1') && this.classList.contains('engate-F') ){ // se for a viagem 1 e o engate F
  obj_dados =[]  


data_choques = {}
deleteMarkers()
deleteLine()

fetch(`/filtro?column=engate&filtro=F&viagem=${viagem_atual}&tipo=1`)
  .then(resp => resp.json()).then(resp => { // pega os choques da viagem
  console.log(resp)
  resp.forEach(val=>{ // para cada choque
    let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
    let datta =  new Date(a)
    obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
    data_choques[`id${val.id}`] = val
    data_choques[`id${val.id}`]['Data_Hora'] = datta
  })
  console.log(data_choques)
  setPoly(obj_dados,map1)
  setPoly(obj_dados,map2)
  setMarkers(map1, obj_dados,markers);
  setMarkers(map2,obj_dados,markers2);  
  
})
}else if($('.viagem-atual')[0].classList.contains('c-1') && this.classList.contains('engate-all')){ // se for a viagem 1 e o engate all
  obj_dados =[]  
   
  data_choques = {}
  deleteMarkers()
  deleteLine()
  $(".viagem-atual").attr({
"class" : "viagem-atual c-1",

});
  console.log($('.viagem-atual'))
  fetch(`/choque1?id_vagao=${viagem_atual}&tipo=1`,{ // pega os choques da viagem
    method:'GET'
    
  }).then(resp => resp.json()).then(resp => { // transforma em json
    console.log(resp)
    resp.forEach(val=>{ // para cada choque
      let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
      let datta =  new Date(a)
      obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
      data_choques[`id${val.id}`] = val
      data_choques[`id${val.id}`]['Data_Hora'] = datta
    })
    console.log(data_choques)
    setPoly(obj_dados,map1)
    setPoly(obj_dados,map2)
    setMarkers(map1, obj_dados,markers);
    setMarkers(map2,obj_dados,markers2);  
    
  })
}

if($('.viagem-atual')[0].classList.contains('c-2') && this.classList.contains('engate-E') ){ // se for a viagem 2 e o engate E
  obj_dados =[]  
  
  
  data_choques = {}
  deleteMarkers()
  deleteLine()
  
  fetch(`/filtro?column=engate&filtro=E&viagem=${viagem_atual}&tipo=2`)
  .then(resp => resp.json()).then(resp => { // pega os choques da viagem
    console.log(resp)
    resp.forEach(val=>{ // para cada choque
      let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
      let datta =  new Date(a)
      obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
      data_choques[`id${val.id}`] = val
      data_choques[`id${val.id}`]['Data_Hora'] = datta
    })
    console.log(data_choques)
    setPoly(obj_dados,map1)
    setPoly(obj_dados,map2)
    setMarkers(map1, obj_dados,markers);
    setMarkers(map2,obj_dados,markers2);  
    
  })
  }else if($('.viagem-atual')[0].classList.contains('c-2') && this.classList.contains('engate-F')){ // se for a viagem 2 e o engate F
    obj_dados =[]  
  
  
  data_choques = {}
  deleteMarkers()
  deleteLine()
  
  fetch(`/filtro?column=engate&filtro=F&viagem=${viagem_atual}&tipo=2`)
  .then(resp => resp.json()).then(resp => { // pega os choques da viagem
    console.log(resp)
    resp.forEach(val=>{ // para cada choque
      let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
      let datta =  new Date(a)
      obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
      data_choques[`id${val.id}`] = val
      data_choques[`id${val.id}`]['Data_Hora'] = datta
    })
    console.log(data_choques)
    setPoly(obj_dados,map1)
    setPoly(obj_dados,map2)
    setMarkers(map1, obj_dados,markers);
    setMarkers(map2,obj_dados,markers2);  
    
  })
}else if($('.viagem-atual')[0].classList.contains('c-2') && this.classList.contains('engate-all')){ // se for a viagem 2 e o engate all
  obj_dados =[]   
  data_choques = {}
  deleteLine()
  deleteMarkers()
  $(".viagem-atual").attr({
"class" : "viagem-atual c-2",

});
  fetch(`/choque2?id_vagao=${viagem_atual}&tipo=2`,{ // pega os choques da viagem
    method:'GET'
    
  }).then(resp => resp.json()).then(resp => { // transforma em json
    resp.forEach(val=>{
      let a = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
      let datta =  new Date(a)
      obj_dados.push({lat:val.Latitude,lng:val.Longitude,id_choque:val.id})
      data_choques[`id${val.id}`] = val
      data_choques[`id${val.id}`]['Data_Hora'] = datta
    })
    setPoly(obj_dados,map1)
    setPoly(obj_dados,map2)
    console.log(data_choques)
    setMarkers(map1, obj_dados,markers);
    console.log(data_choques)

    setMarkers(map2,obj_dados,markers2); 
    console.log(data_choques)

  })
}
}) 

