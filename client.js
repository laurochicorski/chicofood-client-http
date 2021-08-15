function consultar() {
    $.ajax({
      url: "http://localhost:8180/formas-pagamento",
      type: "get",
  
      success: function(response) {
        preencherTabela(response);
      }
    });
  }
  
  function preencherTabela(formasPagamento) {
    $("#tabela tbody tr").remove();
  
    $.each(formasPagamento, function(i, formaPagamento) {
      var linha = $("<tr>");
  
      linha.append(
        $("<td>").text(formaPagamento.id),
        $("<td>").text(formaPagamento.descricao)
      );
  
      linha.appendTo("#tabela");
    });
  }

  function cadastrar(){
      var formaPagamento = JSON.stringify({
        "descricao": $("#campo-descricao").val()
      });

      $.ajax({
        url: "http://localhost:8180/formas-pagamento",
        type: "post",
        data: formaPagamento,
        contentType: "application/json",
    
        success: function(response) {
          alert("Forma de pagamento adicionada");
        },
        error: function(error) {
            if (error.status = 400) {
                var problem = JSON.parse(error.responseText);
                alert(problem.userMessage);
            } else {
                alert("Erro ao cadastrar forma de pagamento");
            }
        }
      });
      
  }
  
  
  $("#btn-consultar").click(consultar);
  $("#btn-cadastrar").click(cadastrar);