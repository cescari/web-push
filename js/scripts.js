var cookieIni = ReadCookie();

if (typeof cookieIni === 'undefined') {
    Push.create("CEB virtual domain", {
        body: "Bienvenido al dominio virtual de Carlos Escario Bajo. ¡ATENCION! Esta" +
            " web emplea cookies para su funcionamiento.",
        icon: "./img/logo-unir.png",
        requireInteraction: true,
        timeout: 5000,
        onClose: function() {
            'use strict';
            if (!cookieIni) alertBox();
        },
        serviceWorker: './serviceWorker.js',
    });
} else {
    Push.create("CEB virtual domain", {
        body: "Ya rellenaste tu encuesta, estas son tus selecciones.",
        icon: "./img/logo-unir.png",
        requireInteraction: false,
        onClose: function() {
            'use strict';
            webPushNewNotice();
        },
        serviceWorker: './serviceWorker.js',
    });
}

function webPushNewNotice() {
    'use strict';
    Push.create("CEB virtual domain", {
        body: "Gracias.Volveremos a contar contigo en el futuro.",
        icon: "./img/logo-unir.png",
        timeout: 5000,
        serviceWorker: './serviceWorker.js',
    });
}

var alertBox = function() {
    'use strict';
    if (window.confirm('¿Quieres participar en nuestra encuesta?')) {
        document.cookie = "cescari=true;";
        Push.create("CEB virtual domain", {
            body: "Rellena los datos adjuntos.",
            icon: "./img/logo-unir.png",
            timeout: 5000,
            serviceWorker: './serviceWorker.js',
        });
    } else {
        document.cookie = "cescari=false;";
        webPushNewNotice();
    }
};

function ReadCookie() {
    'use strict';
    var cookiearray = document.cookie.split(';'),
        name, value;

    for (var i = 0; i < cookiearray.length; i++) {
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
        if (name.trim() === 'cescari') {
            return (name.trim() == 'cescari');
        }
    }
}

$(function() {
    $.getJSON("options.json", function(json) {
        $('#correo').prop('checked', json.correo);
        $('#prensa').prop('checked', json.prensa);
        $('#television').prop('checked', json.television);
        $('#vallas').prop('checked', json.vallas);
        $('#folletos').prop('checked', json.folletos);
        $('#radio').prop('checked', json.radio);
        $('#internet').prop('checked', json.internet);
        $('#otro').prop('checked', json.otro);
        if(json.producto === "y")
            $('#y').prop('checked', true);
        else if(json.producto === "n")
            $('#n').prop('checked', true);
        $('#' + json.rating).prop('checked', true);
    });
})
