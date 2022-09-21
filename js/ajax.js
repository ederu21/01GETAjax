(function () {
    swal("Texto del mensaje",{
        buttons: true,
        timer: 10000,
        background-color: rgba(43, 165, 137, 0.45),
      });
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
       

    }
    ).fail(() => {
        console.log("Fallo");
    }
    ).always(() => {
        console.log('Completo');
    })

    const llamarFuncion = () => {
        /* alert('Presionado llamarFuncion'); */
    ($('#tableData').css('display') == 'none')?
        $("#tableData").css("display", "block"):
        $("#tableData").css("display", "none");

        $('.fa.fa-refresh.fa-spin').css('display','inline-block');
    }

    $("#btnInsert").on("click", llamarFuncion);

    $("#Select").on("change", () => {
        let seleccion = $("#Select option:selected").text();
        console.log("Has seleccionado: - " + $("#Select option:selected").val() + '--' + seleccion);
        let nom,tel,dir;
        $.ajax({
            type: 'GET',
            url: 'https://restcountries.com/v3.1/name/' + seleccion,
            //'https://5d6d-2806-106e-15-70f9-a4c3-f01-bc33-c341.ngrok.io/MWDispatcher-2.0/toa/solicitarAjusteVelocidad',
            dataType: 'json',
            beforeSend: ()=>{
                $('#status').spin({radius:3,width:2,height:2,length:4});
                nom=$('#txtNombre').val();
                //let valores=$('input').serialize();
                let valores=$('input');
                console.log('valoresJson::::'+JSON.stringify(valores));
                console.log('valores::::'+valores[0]);
                
            },
            data: {nombre:nom},
            success:(info)=>{
                console.log('info::::'+JSON.stringify(info));
            },error:(jqXHR,estado,error)=>{
                /*error: timeout,
                         error,
                         abort,
                         parsererror*/
                console.log('errorError::::'+error);
                console.log('estadoError::::'+estado);
                console.log('jqXHRError::::'+jqXHR);
            },complete:(jqXHR,estado)=>{
                /*estado: success,
                         notmodified,
                         timeout,
                         error,
                         abort,
                         parsererror*/
                console.log('estadoComplete::::'+estado);
                console.log('jqXHRComplete::::'+jqXHR);
            },timeout:10000
        }).done((data) => {

            let datos = data;
            datos[0].status = '3  1-    2';
            let paresPpal = pares(datos[0].status);
            console.log('paresPpal0::::' + paresPpal[0]);
            console.log('paresPpal1::::' + paresPpal[1]);
            //datos[0].borders= ['3  1-    2','  QW'];
            let modemsP = modems(datos[0].borders);
            console.log('modems::::' + modemsP);
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
                    $("#selectLanguages").attr('disabled', 'true');
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
            $('.fa.fa-refresh.fa-spin').css('display','none');
            console.log('data:::' + data);
        }).fail(() => {
            console.log("Fallo");
        }
        ).always(() => {
            console.log('Completo');
        });
    });

    pares = (par) => {
        if (par == undefined || par == null) {
            par = '';
        }
        //pares= '3  1-    2';
       if (!par.includes('-')) {
            par += '-';
        }
        return par.replace(/\s+/g, '').split('-');
    }

    modems = (modems) => {
        if (modems == undefined || modems == null) {
            modems = '';
        }
        //modems = ['3  1-    2','  QW'];
        return modems.toString().replace(/,/g, ",\n");
    }

    var myStr = $(".original").text();
    var trimStr = $.trim(myStr);
    $(".trimmed").html(trimStr);

    /* $(document).ready(function(){
        $('form').submit(function(e){
            e.preventDefault();

            let dataForm=$(this).serializeArray();

            $.ajax({
                url: 'process.php',
                type: 'post',
                dataType: 'json',
                data: dataForm,
                beforeSend: ()=>{
                    $('.fa').css('display','inline');
                }
            }).done(()=>{

            }).fail(()=>{

            }).always(()=>{
                $('.fa').hide();
            })
        })
    }) */
   
})();