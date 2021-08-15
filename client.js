function consultarRestaurantes() {
  $.ajax({
    url: "http://localhost:8180/restaurantes",
    type: "get",

    success: function(response) {
      $("#conteudo").text(JSON.stringify(response));
    }
  });
}

function fecharRestaurante() {
    $.ajax({
      url: "http://localhost:8180/restaurantes/1/fechamento",
      type: "put",
  
      success: function(response) {
        alert("Restaurante foi fechado!");
      }
    });
  }

$("#botao").click(consultarRestaurantes);
$("#botao-fechar").click(fecharRestaurante);