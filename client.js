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
  
      var linkAcao = $("<a href='#'>")
        .text("Excluir")
        .click(function(event) {
          event.preventDefault();
          excluir(formaPagamento);
        });
  
      linha.append(
        $("<td>").text(formaPagamento.id),
        $("<td>").text(formaPagamento.descricao),
        $("<td>").append(linkAcao)
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

  function excluir(formaPagamento) {
    var url = "http://localhost:8180/formas-pagamento/" + formaPagamento.id;
  
    $.ajax({
      url: url,
      type: "delete",
  
      success: function(response) {
        consultar();
  
        alert("Forma de pagamento removida!");
      },
  
      error: function(error) {
        // tratando todos os erros da categoria 4xx
        if (error.status >= 400 && error.status <= 499) {
          var problem = JSON.parse(error.responseText);
          alert(problem.userMessage);
        } else {
          alert("Erro ao remover forma de pagamento!");
        }
      }
    });
  }
  
  
  $("#btn-consultar").click(consultar);
  $("#btn-cadastrar").click(cadastrar);