$(document).ready(function () {
    var loading = $('#loadingDiv').hide();
    $(document)
            .ajaxStart(function () {
                loading.show();
            })
            .ajaxStop(function () {
                loading.hide();
            });
    buscar_datos();


});

function buscar_datos() {
    $.ajax({
        url: '/mostrar_datos',
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function (data, status) {
            var obj = JSON.parse(JSON.stringify(data))
            $("#datos tbody").html("");
            if (obj.ERROR == "1") {
                $("#datos tbody").append('<tr><td>No hay Coindidencias</td></tr>');
            } else {
                childs = '';
                $.each(obj.DATA, function (key, value) {
                    childs += '<tr>';
                    childs += '<td> ' + value + ' </td>';
                    childs += '<td> ' + (parseInt(key) + 1) + ' </td>';
                    childs += '<td> ';
                    if (key != '0') {
                        childs += '<a data-id="' + key + '" class="btn btn-new subir_prioridad"> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">  <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"></path></svg></a>';
                    }
                    if (key != obj.SIZE - 1) {
                        childs += '<a data-id="' + key + '" class="btn btn-show bajar_prioridad"> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">  <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/></svg></a>';
                    }
                    childs += '<a data-id="' + key + '" href="borrar_actividad/' + key + '" class="btn btn-danger"> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">  <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg></a>';
                    childs += '</td> ';
                    childs += '</tr>';
                });

                $("#datos tbody").append(childs);

                $(".subir_prioridad").click(subir_prioridad);
                $(".bajar_prioridad").click(bajar_prioridad);
            }
        },
        error: function (xhr, textStatus, errorThrown) {

        }
    });
}

function subir_prioridad() {
    modificar_prioridad($(this).attr("data-id"), 1);
}

function bajar_prioridad() {
    modificar_prioridad($(this).attr("data-id"), 2);
}

function modificar_prioridad(actividad, prioridad) {
    $.ajax({
        url: '/modificar_prioridad',
        type: 'POST',
        dataType: 'json',
        data: {actividad: actividad, prioridad: prioridad},
        async: true,
        success: function (data, status) {
            var obj = JSON.parse(JSON.stringify(data))

            if (obj.ERROR != "1") {
                buscar_datos();
            }
        },
        error: function (xhr, textStatus, errorThrown) {

        }
    });
}