const url = new URL(window.location.href);
let id_viagem =url.searchParams.get('id_viagem');
let id_rel =url.searchParams.get('id_rel');
let id_user =url.searchParams.get('id_user');
$(document).ready(function() {
  $('.pag-salvos').attr('href',`/salvos1.html?id_user=${id_user}`)
  $('.pag-inicial').attr('href',`/pagina_inicial.html?user_id=${id_user}`)
  $('.pag-ajuda').attr('href',`/pagina_inicial.html?user_id=${id_user}`)
  $('.pag-comp').attr('href',`/pagina_inicial.html?user_id=${id_user}`)
  $('.navbar-brand').attr('href',`/pagina_inicial.html?user_id=${id_user}`)
  $('.voltar').attr('href',`/projeto.html?id_viagem=${id_viagem}&id_relatorio=${id_rel}&id_user=${id_user}`)
     // Variaveis, abrir ocorrencias
     let ocShow = '.choq-tip-1'


    // Botão abrir ocorrências
   $('.cst-btn-1').on("click", function(event) { 
        $('.choq-tip-1').show();
        $('.cst-btn-1').hide();
        $('.cst-btn-1-1').show();
        $('.choq-tip-2').show();
        $('.p-c').show();

   });

   // Botão fechar ocorrências
   $('.cst-btn-1-1').on("click", function(event) {
        $('.choq-tip-1').hide();
        $('.cst-btn-1').show();
        $('.cst-btn-1-1').hide();
        $('.cst-range1').hide();
        $('.cst-range2').hide();
        $('.cst-range3').hide();
        $('.choq-tip-2').hide();
        $('.p-c').hide();
        $('.chq-t-1f').hide();
        $('.chq-t-1a').show();
        $('.chq-t-2f').hide();
        $('.chq-t-2a').show();
        $('.p-cf').hide();
        $('.p-ca').show();
   });

   // Botão abrir choque tipo 1 ocorrencias

   $('.chq-t-1a').on("click", function(event) {
    $('.cst-range1').show();
    $('.chq-t-1a').hide();
    $('.chq-t-1f').show()

   });

   // Botao fechar choque tipo 1 ocorrencia

   $('.chq-t-1f').on("click", function(event) {
    $('.cst-range1').hide();
    $('.chq-t-1a').show();
    $('.chq-t-1f').hide()

   });

   // Botao abrir choque tipo 2 ocorrencia

   $('.chq-t-2a').on("click", function(event) {
    $('.cst-range2').show();
    $('.chq-t-2a').hide();
    $('.chq-t-2f').show();
   })

   // Botao fechar choque tipo 2 ocorrencia

   $('.chq-t-2f').on("click", function(event) {
    $('.cst-range2').hide();
    $('.chq-t-2a').show();
    $('.chq-t-2f').hide();
   })

   // Botao abrir ponto critico

   $('.p-ca').on("click", function(event) {
    $('.cst-range3').show();
    $('.p-ca').hide();
    $('.p-cf').show();

   })

   // Botao fechar ponto critico

   $('.p-cf').on("click", function(event) {
    $('.cst-range3').hide();
    $('.p-ca').show();
    $('.p-cf').hide();
    
    
   })

   // Botao abrir tipos de dados

   $('.cst-btn-2').on("click", function(event) {
     $('.cst-btn-2').hide();
     $('.cst-btn-2-2').show();
     $('.histograma').show();
     $('.markov').show();
     $('.grafico').show();
   })

   // Botao fechar tipos de dados

   $('.cst-btn-2-2').on("click", function(event) {
     $('.cst-btn-2').show();
     $('.cst-btn-2-2').hide();
     $('.histograma').hide();
     $('.markov').hide();
     $('.grafico').hide();
   })

   // Botao abrir pico

   $('.cst-btn-3').on("click", function(event) {
     $('.cst-btn-3').hide();
     $('.cst-btn-3-2').show();
     $('.cst-range4').show();
   })

   // Botao fechar pico

   $('.cst-btn-3-2').on("click", function(event) {
     $('.cst-range4').hide();
     $('.cst-btn-3').show();
     $('.cst-btn-3-2').hide();
   })




   // Código filtragem

   // Função para exibir os resultados


// Função para criar o gráfico
function criarGrafico(resultados, container, idViagem) {
  var checkboxHistograma = document.getElementById('checkbox-histograma'); // Seleciona o checkbox do histograma
  var checkboxGrafico = document.getElementById('checkbox-grafico'); // Seleciona o checkbox do gráfico
  var checkboxTipo1 = document.getElementById('checkbox-c-1'); // Seleciona o checkbox do tipo 1
  var checkboxTipo2 = document.getElementById('checkbox-c-2'); // Seleciona o checkbox do tipo 2

  var div = document.createElement('div');
  div.style.width = '400px'; // Defina a largura do gráfico
  div.style.height = '300px'; // Defina a altura do gráfico

  container.innerHTML = ''; // Limpa o conteúdo anterior
  container.appendChild(div);

  google.charts.load('current', { packages: ['corechart'] }); // Carrega o pacote de gráficos do Google
  google.charts.setOnLoadCallback(drawChart); // Chama a função drawChart para desenhar o gráfico

  function drawChart() { // Função para desenhar o gráfico
    var viagemResultados = resultados.filter(function (resultado) { // Filtra os resultados pela viagem
      return resultado.id_viagem === idViagem;
    }).sort(function (a, b) { // Ordena os resultados pela F_max
      return a['Data_Hora'] - b['Data_Hora'];
    });


    var data = new google.visualization.DataTable(); // Cria a DataTable
    data.addColumn('date', 'data_hora');
    data.addColumn('number', 'Força - Tipo 1');
    data.addColumn({ type: 'string', role: 'style' }); // Adiciona coluna para definir estilo da linha do tipo 1
    data.addColumn('number', 'Força - Tipo 2');
    data.addColumn({ type: 'string', role: 'style' }); // Adiciona coluna para definir estilo da linha do tipo 2

    

    viagemResultados.forEach(function (resultado) { // Itera sobre os resultados
      if (resultado.tipo === 1) { // Verifica se o resultado é do tipo 1
        data.addRow([ // Adiciona uma linha à DataTable
          resultado['Data_Hora'],
          parseFloat(resultado.F_max),
          'color: red', // Estilo da linha do tipo 1 (vermelho)
          null,
          null
        ]);
      }
    });

    viagemResultados.forEach(function (resultado) { // Itera sobre os resultados
      if (resultado.tipo === 2) { // Verifica se o resultado é do tipo 2
        data.addRow([ // Adiciona uma linha à DataTable
          resultado['Data_Hora'],
          null,
          null,
          parseFloat(resultado.F_max),
          'color: blue' // Estilo da linha do tipo 2 (azul)
        ]);
      }
    });

    var options = { // Opções do gráfico
      title: 'Gráfico F_max por Data - Viagem ' + idViagem,
      hAxis: { title: 'Data' },
      vAxis: { title: 'Força' },
      legend: 'bottom',
      animation: {
        startup: true,
        duration: 1000,
        easing: 'inAndOut'
      },
      series: { // Define os estilos das linhas
        0: { lineWidth: 2, type: 'line', curveType: 'function' }, // Estilo da linha do tipo 1
        1: { lineWidth: 2, type: 'line', curveType: 'function' }  // Estilo da linha do tipo 2
      }
    };

    var chart;
    if (checkboxHistograma.checked) { // Verifica se o checkbox do histograma está marcado
      options.series[0].type = 'bars'; // Define o tipo de gráfico como histograma para o tipo 1
      options.series[1].type = 'bars'; // Define o tipo de gráfico como histograma para o tipo 2

      chart = new google.visualization.ColumnChart(div);
    } else {
      chart = new google.visualization.LineChart(div);
    } 
    if (!checkboxTipo1.checked) { // Verifica se o checkbox do tipo 1 está marcado
      for (var i = 0; i < data.getNumberOfRows(); i++) { // Itera sobre as linhas da DataTable
        data.setValue(i, 2, null); // Define o valor da coluna da série 1 como nulo
      }
      for (var i = 0; i < data.getNumberOfRows(); i++) { // Itera sobre as linhas da DataTable
        data.setValue(i, 1, null); // Define o valor da coluna da série 1 como nulo
      }
    }
    if (!checkboxTipo2.checked) { // Verifica se o checkbox do tipo 2 está marcado
      for (var i = 0; i < data.getNumberOfRows(); i++) { // Itera sobre as linhas da DataTable
        data.setValue(i, 3, null); // Define o valor da coluna da série 2 como nulo
      }
    }

    chart.draw(data, options);

    checkboxHistograma.addEventListener('change', function () { // Manipulador de evento para o checkbox do histograma
      if (checkboxHistograma.checked) { // Verifica se o checkbox do histograma está marcado
        options.series[0].type = 'bars'; // Define o tipo de gráfico como histograma para o tipo 1
        options.series[1].type = 'bars'; // Define o tipo de gráfico como histograma para o tipo 2

        chart = new google.visualization.ColumnChart(div); // Cria um novo gráfico de colunas
      } else if (checkboxGrafico.checked) { // Verifica se o checkbox do gráfico está marcado
        options.series[0].type = 'line'; // Mantém o tipo de gráfico como linha para o tipo 1
        options.series[1].type = 'line'; // Mantém o tipo de gráfico como linha para o tipo 2

        chart = new google.visualization.LineChart(div);
      }
      
      chart.draw(data, options);
    });

    checkboxGrafico.addEventListener('change', function () { // Manipulador de evento para o checkbox do gráfico
      if (checkboxGrafico.checked && !checkboxHistograma.checked) { // Verifica se o checkbox do gráfico está marcado e o do histograma não
        options.series[0].type = 'line'; // Define o tipo de gráfico como linha para o tipo 1
        options.series[1].type = 'line'; // Define o tipo de gráfico como linha para o tipo 2

        chart = new google.visualization.LineChart(div);
        

        chart.draw(data, options);
      }
    });

    checkboxTipo1.addEventListener('change', function () { // Manipulador de evento para o checkbox do tipo 1
      if (checkboxTipo1.checked) { // Verifica se o checkbox do tipo 1 está marcado
        options.series[0].lineWidth = 2; // Define a espessura da linha do tipo 1
        if (checkboxHistograma.checked) { // Verifica se o checkbox do histograma está marcado
          options.series[0].type = 'bars'; // Define o tipo de gráfico como histograma para o tipo 1
        }
      } if (checkboxTipo2.checked && !checkboxTipo1.checked){ // Verifica se o checkbox do tipo 2 está marcado e o do tipo 1 não
        for (var i = 0; i < data.getNumberOfRows(); i++) { // Itera sobre as linhas da DataTable
          data.setValue(i, 2, null); // Define o valor da coluna da série 1 como nulo
        }
        for (var i = 0; i < data.getNumberOfRows(); i++) { // Itera sobre as linhas da DataTable
          data.setValue(i, 1, null); // Define o valor da coluna da série 1 como nulo
        }
      
      
      } else { // Verifica se o checkbox do tipo 1 não está marcado
        options.series[0].type = 'line'; // Mantém o tipo de gráfico como linha para o tipo 1
        for (var i = data.getNumberOfRows() - 1; i >= 0; i--) {
          var tipo2Value = data.getValue(i, 2); // Verifica se a coluna da série 2 possui um valor
          if (tipo2Value !== null) {
            data.removeRow(i); // Remove a linha da DataTable
          }
        }
        for (var i = data.getNumberOfRows() - 1; i >= 0; i--) { // Itera sobre as linhas da DataTable
          var tipo2Value = data.getValue(i, 1); // Verifica se a coluna da série 2 possui um valor
          if (tipo2Value !== null) { // Verifica se a coluna da série 2 possui um valor
            data.removeRow(i); // Remove a linha da DataTable
          }
        }
      }

      chart.draw(data, options);
    });
    
    checkboxTipo2.addEventListener('change', function () { // Manipulador de evento para o checkbox do tipo 2
      if (checkboxTipo2.checked) { // Verifica se o checkbox do tipo 2 está marcado
        
        options.series[1].lineWidth = 2; // Define a espessura da linha do tipo 2
        if (checkboxHistograma.checked) { // Verifica se o checkbox do histograma está marcado
          options.series[1].type = 'bars'; // Define o tipo de gráfico como histograma para o tipo 2
        }
      } if (checkboxTipo2.checked && !checkboxTipo1.checked){ // Verifica se o checkbox do tipo 2 está marcado e o do tipo 1 não
        for (var i = 0; i < data.getNumberOfRows(); i++) { // Itera sobre as linhas da DataTable
          data.setValue(i, 2, null); // Define o valor da coluna da série 1 como nulo
        }
        for (var i = 0; i < data.getNumberOfRows(); i++) { // Itera sobre as linhas da DataTable
          data.setValue(i, 1, null); // Define o valor da coluna da série 1 como nulo
        }
      
      
      
      
      } else { // Verifica se o checkbox do tipo 2 não está marcado
        
        options.series[1].type = 'line'; // Mantém o tipo de gráfico como linha para o tipo 2
        for (var i = data.getNumberOfRows() - 1; i >= 0; i--) { // Itera sobre as linhas da DataTable
          var tipo2Value = data.getValue(i, 3); // Verifica se a coluna da série 2 possui um valor
          if (tipo2Value !== null) { // Verifica se a coluna da série 2 possui um valor
            data.removeRow(i); // Remove a linha da DataTable
          }
        }

        
      }

      chart.draw(data, options);
    });
  }
}



var obj = { // Objeto para armazenar os resultados
  tipo1: [],
  tipo2: []
};

// Função para exibir os resultados
function mostrarIdViagem(resultados) { // Recebe o objeto com os resultados
  
  console.log(resultados)
  var resultadosContainer = document.getElementById('resultados-container');
  resultadosContainer.innerHTML = ''; // Limpa o conteúdo anterior

  if (resultados.tipo1.length > 0 || resultados.tipo2.length > 0) { // Verifica se há resultados
    var uniqueIds = [];
    var ul = document.createElement('ul');
    ul.classList.add('lista-resultados', 'list-group'); // Adiciona classes CSS à lista

    var resultadosCombinados = resultados.tipo1.concat(resultados.tipo2);

    resultadosCombinados.forEach(function(resultado) { // Itera sobre os resultados
      if (!uniqueIds.includes(resultado.id_viagem)) {
        uniqueIds.push(resultado.id_viagem); // Adiciona o ID da viagem ao array
        var li = document.createElement('li');
        li.classList.add('list-group-item', 'list-group-item-primary', 'mb-2', 'custom-font'); // Adiciona classes CSS e Bootstrap aos itens da lista
        ul.appendChild(li);

        // Chama a função criarGrafico para criar o gráfico
        criarGrafico(resultadosCombinados, li, resultado.id_viagem); 
      }
    });

    resultadosContainer.appendChild(ul); // Adiciona a lista ao container
  } else {
    var p = document.createElement('h4');
    p.textContent = 'Nenhum resultado encontrado.';
    resultadosContainer.appendChild(p);
  }
}

// Função para fazer a requisição Ajax
function enviarSolicitacaoAjax(url, valoresSliders, tipo) {
   // Recebe a URL, os valores dos sliders e o tipo de resultado
  valoresSliders.id_viagem= id_viagem
  
  $.ajax({ // Faz a requisição Ajax
    url: url,
    method: 'GET',
    data: valoresSliders,
    success: function(response) {
      if(response[0]){
        response.forEach(val=>{
          console.log(val['Data_Hora'])
          let b = (parseFloat(val.Data_Hora) - 25569) * 86400 * 1000
        let datta =  new Date(b)
        
          val['Data_Hora'] = datta
        })
      obj[tipo] = response; // Armazena os resultados no objeto
      mostrarIdViagem(obj);    // Chama a função mostrarIdViagem para exibir os resultados
    }},
    error: function(error) {
      console.error(error);
    }
  })
}
   

// Manipuladores de eventos para os sliders
$('#slider1, #slider8').on('input', function() {
  if ($('#checkbox-c-1').is(':checked')) {
    var sliderF1 = $('#slider1').val();
    var sliderF2 = $('#slider8').val();

    var valoresSliders = {
      sliderF1: sliderF1,
      sliderF2: sliderF2
    };

    enviarSolicitacaoAjax('/mapData/choque/f1', valoresSliders, 'tipo1'); // Chama a função para fazer a requisição Ajax para o tipo 1
  }
});

$('#slider3, #slider10').on('input', function() {
  if ($('#checkbox-c-2').is(':checked')) {
    var sliderF11 = $('#slider3').val();
    var sliderF22 = $('#slider10').val();

    var valoresSliders = {
      sliderF11: sliderF11,
      sliderF22: sliderF22
    };

    enviarSolicitacaoAjax('/mapData/choque/f2', valoresSliders, 'tipo2'); // Chama a função para fazer a requisição Ajax para o tipo 2
  }
});

$('#slider5, #slider12').on('input', function() {
  if ($('#checkbox-p-c').is(':checked')) {
    var sliderPC1 = $('#slider5').val();
    var sliderPC2 = $('#slider12').val();

    var valoresSliders = {
      sliderPC1: sliderPC1,
      sliderPC2: sliderPC2
    };

    enviarSolicitacaoAjax('/mapData/choque/pc', valoresSliders, 'tipo1'); // Chama a função para fazer a requisição Ajax para o tipo 1
  }
});

$('#slider7, #slider14').on('input', function() {
  if ($('#checkbox-pc').is(':checked')) {
    var sliderP1 = $('#slider7').val();
    var sliderP2 = $('#slider14').val();

    var valoresSliders = {
      sliderP1: sliderP1,
      sliderP2: sliderP2
    };

    enviarSolicitacaoAjax('/mapData/choque/p', valoresSliders, 'tipo2'); // Chama a função para fazer a requisição Ajax para o tipo 2
  }
});

});

