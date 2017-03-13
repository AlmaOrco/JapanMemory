$(document).ready(carga);

function carga()
{	
	$("#inicio").click(function(e){
		/*es necesario enviar un evento -el del propio click en el boton, si no, 
		la acción por defecto del boton, que es submit, es la primera en 
		ejecutarse, inhabilitando el poder redireccionar*/

		$.cookie('name', "");
		$.cookie('dificultad', "");

		e.preventDefault();
		
		var n = $("#inputName").val(), d = $("input:checked").val();
		
		$.cookie('name', n);
		$.cookie('dificultad',d);
		
		location.replace('./contenido/panel.html');
	});
}
