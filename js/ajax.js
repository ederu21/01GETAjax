(function () {

    $.ajax({
        type: 'GET',
        url: 'https://restcountries.com/v3.1/all',
        //'https://5d6d-2806-106e-15-70f9-a4c3-f01-bc33-c341.ngrok.io/MWDispatcher-2.0/toa/solicitarAjusteVelocidad',
        dataType: 'json'
    }).done((data) => {
        console.log('data:::' + data.length);
        /* console.log('Hecho Correcto');
        console.log(':::'+JSON.stringify(data)); */
        //let respuesta=JSON.stringify(data);        
        /* let respuesta=data;        
        console.log('data:::'+respuesta.length);
        let pais= respuesta[0];
        console.log('respuesta:::'+respuesta);
        console.log('tipo:::'+ typeof respuesta); */
        //$("#picFoto").attr('src',data.picture);
        /* $("#txtNombre").val(respuesta[0].cca2);
         $("#txtDireccion").val(pais.name.common);
        $("#txtTelefono").val(data[0].altSpellings[2]); */
        /*  $("#txtGenero").val(respuesta.ipResponse); */
        $.each(data, function (key, registro) {
            $("#Select").append('<option value=' + (parseInt(key) + 1) + '>' + registro.name.common + '</option>');
        });

        data.forEach((registro, key) => {
            let content = "";
            content += '<tr>';
            content += '    <td>' + (parseInt(key) + 1) + '</td>';
            content += '    <td>' + registro.name.common + '</td>';
            content += '    <td class="text-center"><a href="" class="btn btn-danger"><i class="fa fa-trash-o"></i></a></td>';
            content += '    <td class="text-center"><a href="" class="btn btn-primary"><i class="fa fa-edit"></i></a></td>';
            content += '</tr>';

            $('#tblRegistros').append(content);
        })


        /*  */

    }
    ).fail(() => {
        console.log("Fallo");
    }
    ).always(() => {
        console.log('Completo');
    })

    const llamarFuncion = () => {
        /* alert('Presionado llamarFuncion'); */
        $("#tableData").css("display", "block");
        
    }

    $("#btnInsert").on("click", llamarFuncion);

    $("#Select").on("change", () => {
        let seleccion = $("#Select option:selected").text();
        console.log("Has seleccionado: - " + $("#Select option:selected").val() + '--' + seleccion);
        $.ajax({
            type: 'GET',
            url: 'https://restcountries.com/v3.1/name/' + seleccion,
            //'https://5d6d-2806-106e-15-70f9-a4c3-f01-bc33-c341.ngrok.io/MWDispatcher-2.0/toa/solicitarAjusteVelocidad',
            dataType: 'json'
        }).done((data) => {

            let datos = data;
            for (let i = 0; i < datos.length; i++) {
                let dato = datos[i];
                let latlng = '';
                if (dato.borders != undefined) {
                    $('#selectLanguages').empty();                    
                    for (let j = 0; j < dato.borders.length; j++) {
                        /* latlng += '<span class="label label-primary">' + dato.latlng[j] + '</span> '; */
                        //latlng = '<option value="' + (j + 1) + '">' + dato.latlng[j] + '</option>';
                        //console.log('latlng::::'+latlng);
                        //$('#selectLanguages').append(latlng);                        
                        $('#selectLanguages').append(
                            $("<option>", {
                                value: (j + 1),
                                text: dato.borders[j]
                            }));
                    }
                    //$("#selectLanguages").attr('disabled','false');
                    $('#selectLanguages').removeAttr('disabled');
                } else {
                    $('#selectLanguages').empty();
                    $("#selectLanguages").attr('disabled','true');
                    latlng = '<option value="0">No existen Paises Colindantes</option>';
                    $('#selectLanguages').append(latlng);
                }
                /* let content = "";
                content += '<tr>';
                content += '    <td>' + (i + 1) + '</td>';
                content += '    <td>' + dato.name.common + '</td>';
                content += '    <td>' + latlng + '</td>';
                content += '    <td class="text-center"><a href="" class="btn btn-danger"><i class="fa fa-trash-o"></i></a></td>';
                content += '    <td class="text-center"><a href="" class="btn btn-primary"><i class="fa fa-edit"></i></a></td>';
                content += '</tr>';

                $('#tblRegistros').append(content); */
            }

            console.log('data:::' + data);
        }).fail(() => {
            console.log("Fallo");
        }
        ).always(() => {
            console.log('Completo');
        });
    });
})();