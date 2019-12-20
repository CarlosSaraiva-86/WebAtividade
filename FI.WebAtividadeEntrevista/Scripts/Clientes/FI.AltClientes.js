var cliente = {};

var ben = {
    Nome: "",
    CPF: "",
    ID: 0
};

$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);

        for (var i in obj.Beneficiarios) {
            var newRow = $("<tr>"),
                idx = $("#tableBen").length;
            newRow.append($('<div class="col-md-4">' +
                '<label>' + obj.Beneficiarios[i].Nome + '</label>' +
                '</div>' +
                '<div class="col-md-4">' +
                '<label>' + obj.Beneficiarios[i].CPF + '</label>' +
                '</div>' +
                '<div>' +
                '<label id="lblId" style="display:none">' + obj.Beneficiarios[i].Id + '</label>' +
                '</div>' +
                '<div class="col-md-4">' +
                '<button type="button "onclick ="alterar(this)" class="btn btn-primary">Alterar</button>' +
                '<button type="button "onclick ="excluir(this)" class="btn btn-primary">Excluir</button>' +
                '</div>'));
            $("#tableBen").append(newRow);
        }
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

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
        cliente.Beneficiarios = obj.Beneficiarios;
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
                    window.location.href = urlRetorno;
                }
        });
    })

})

var count = 0;
function incluir() {
    ben.Nome = $("#linhaBen").find("#NomeBen").val();
    ben.CPF = $("#linhaBen").find("#CPFBen").val();
    ben.ID = count;
    obj.Beneficiarios.push(ben);
    var newRow = $("<tr>"),
        idx = $("#tableBen").length;
    newRow.append($('<div class="col-md-4">' +
        '<label>' + ben.Nome + '</label>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<label>' + ben.CPF + '</label>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<div>' +
        '<label id="lblId" style="display:none">' + ben.ID + '</label>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<button type="button "onclick ="alterar()" class="btn btn-primary">Alterar</button>' +
        '<button type="button "onclick ="excluir(this)" class="btn btn-primary">Excluir</button>' +
        '</div>'));
    $("#tableBen").append(newRow);
    count++;
};

function alterar(e) {
    var par = $(this);
    var obj = $(par).attr('obj');
    count = obj.Beneficiarios.Id;
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
}
