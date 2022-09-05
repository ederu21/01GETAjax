(function () {

    $.ajax({
        type: 'GET',
        url:'https://restcountries.com/v3.1/name/mex', 
        //'https://5d6d-2806-106e-15-70f9-a4c3-f01-bc33-c341.ngrok.io/MWDispatcher-2.0/toa/solicitarAjusteVelocidad',
        dataType: 'json'
    }).done((data) => {
        console.log('Hecho Correcto');
        console.log(':::'+JSON.stringify(data));
        //let respuesta=JSON.stringify(data);        
        let respuesta=data;        
        console.log('data:::'+respuesta.length);

        let pais= respuesta[0];
        console.log('respuesta:::'+respuesta);
        console.log('tipo:::'+ typeof respuesta);
        //$("#picFoto").attr('src',data.picture);
        $("#txtNombre").val(respuesta[0].cca2);
         $("#txtDireccion").val(pais.name.common);
        $("#txtTelefono").val(data[0].altSpellings[2]);
       /*  $("#txtGenero").val(respuesta.ipResponse); */
    }
    ).fail(()=>{
        console.log("Fallo");
    }
    ).always(()=>{
        console.log('Completo');
    })








})();