var cliente = {};
cliente.Beneficiarios = [];

var bene = {
    Nome: "",
    CPF: "",
    Id: 0
};

$(document).ready(function () {
    $('#formCadastro').submit(function (e) {

        cliente.NOME = $(this).find("#Nome").val();
        cliente.CEP = $(this).find("#CEP").val();
        cliente.Email = $(this).find("#Email").val();
        cliente.Sobrenome = $(this).find("#Sobrenome").val();
        cliente.Nacionalidade = $(this).find("#Nacionalidade").val();
        cliente.Estado = $(this).find("#Estado").val();
        cliente.Cidade = $(this).find("#Cidade").val();
        cliente.Logradouro = $(this).find("#Logradouro").val();
        cliente.Telefone = $(this).find("#Telefone").val();
        cliente.CPF = $(this).find("#CPF").val();


        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: cliente,
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                }
        });
    })
})
var count = 0;
function incluir() {
    bene.Nome = $("#linhaBen").find("#NomeBen").val();
    bene.CPF = $("#linhaBen").find("#CPFBen").val();
    bene.ID = count;
    cliente.Beneficiarios.push(bene);
    var newRow = $("<tr>"),
        idx = $("#tableBen").length;
    newRow.append($('<div id="linha"><div class="col-md-4">' +
        '<label>' + bene.Nome + '</label>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<label>' + bene.CPF + '</label>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<div>' +
        '<label id="lblId" style="display:none">' + bene.Id + '</label>' +
        '</div>' +
        '<button type="button" onclick ="alterar(this)" class="btn btn-primary">Alterar</button>' +
        '<button type="button" onclick="excluir(this)" class="btn btn-primary">Excluir</button>' +
        '</div></div>'));
    $("#tableBen").append(newRow);
    count++;
    $("#linhaBen").find("#NomeBen").val('');
    $("#linhaBen").find("#CPFBen").val('');
};

function alterar(e) {
    var par = $(this);
    var obj = $(par).attr('bene');
    count = obj.Id;
    var linha = $(e).parent().parent();
    linha.remove();
    $("#linhaBen").find("#NomeBen").val(obj.Nome);
    $("#linhaBen").find("#CPFBen").val(obj.CPF);
}

function excluir(e) {
    var par = $(e).parent().parent();
    var obj = $(this).attr('bene');
    var removeIndex = cliente.Beneficiarios.map(function (item) { return item.id; }).indexOf(obj.ID);
    cliente.Beneficiarios.splice(removeIndex, 1);
    par.remove();
}


function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
};
