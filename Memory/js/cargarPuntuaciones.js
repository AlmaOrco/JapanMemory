$(document).ready(carga);

function carga()
{	
	$("#fin").click(function(e){
		e.preventDefault();

		location.replace('../index.html');
	});
	cargarPuntuaciones();
}

function cargarPuntuaciones(){
	$.getJSON("http://52.38.70.7/memory_proyect/memory/index.php/players/", function(data){}).done(function(data){
        var arrPuntos = new Array();
        for (var i in data)
        {
            arrPuntos.push(data[i]);
        }
        console.log(arrPuntos.length);

        if(arrPuntos.length > 10){
        	// Recortamos el array de puntuaciones.
        	arrPuntos.splice(10);
        }
        console.log(arrPuntos.length);

       	$("#puntuaciones").append($("<tr>").addClass("filaT"));
       	$(".filaT").append($("<th>").append("#"));
       	$(".filaT").append($("<th>").append("Nombre"));
       	$(".filaT").append($("<th>").append("Puntuación"));

        for (var i in arrPuntos)
        {
        	$("#puntuaciones").append($("<tr>").addClass("fila"+i));
        	$(".fila"+i).append($("<td>").append(i*1+1));
        	$(".fila"+i).append($("<td>").append(arrPuntos[i].name));
        	$(".fila"+i).append($("<td>").append(arrPuntos[i].score));
        }
    });
}
