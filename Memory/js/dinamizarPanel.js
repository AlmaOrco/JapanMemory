var carta1, acertadas=0;

$(document).ready(cargarEnPanel);

function cargarEnPanel()
{
	//resuelta carga en nombre y puntuación.
	$('#huecoParaNombre').text($.cookie("name"));
	$('#huecoParaPuntos').text(0);
	/*cargará en la parrilla de juego .juego las líneas y columnas con las imagenes ocultas por defecto y con 
	la tapa por defecto*/
	creaRow();
	//controlará tiempo y fin del juego por tiempo excedido.
	timer();
}

function timer()
{
	var timer = 60;
	var sInterval = setInterval(function(){
			if (timer*1==0){
				finDelJuego();
				clearInterval(sInterval);
			}
			timer=timer-1;
			$("#huecoParaTiempo").text("Tiempo:"+timer);}, '1000');
}

function creaRow()
{
	switch ($.cookie("dificultad"))
	{
		case "1":
			var numLinea = 2;
			break;
		case "2":
			var numLinea = 4;
			break;
		case "3":
			var numLinea = 6;
			break
	}

	for (var i = 0; i < numLinea; i++)
	{
	$(".juego").append($("<div>").addClass("row linea"+i));
	}
	rellenaRow(numLinea);
}




//fx desordenadora
function randomArray(array)
{
	var currentIndex = array.length, tempValor, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		tempValor = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = tempValor;
	}
	return array;
}


function rellenaRow(numLinea)
{
	var numCartas = $.cookie("dificultad")*5, capacidad = 5, numLinea = numLinea;
	
	$.getJSON("http://52.38.70.7/memory_proyect/memory/index.php/cards/", function(data){}).
	done(function(data){
		
		//necesitaremos tener el número justo de cartas para poder efectuar la tarea.
		var arr = new Array();
		
		for (var i in data)
		{
			arr.push(data[i]);
		}
		//mezcla el json pasado a array (Revisado desarrollado a 6 manos, Ali, Héctor, Andrea)
		arr = randomArray(arr);

		arrayTemp = arr.slice(0, numCartas);
		arrayTemp = arrayTemp.concat(arrayTemp);
		arrayTemp = randomArray(arrayTemp);

		for (var i = 0; i < numLinea; i++)
		{
			var linea = $(".linea"+i);
			linea.append($('<div>').addClass("col-md-1"));
			
			for (var j = 0; j < capacidad; j++)
			{
				/*Añadimos los divs que pondremos en cada línea,
				* a estos, le añadimos las img con su correspondiente información.*/
				
				var tmp = arrayTemp.pop();
				//es necesario controlar la entrada de tmp, si no, calza error.
				linea.append($('<div>').addClass("col-md-2 huecoPaCarta")
					.append($('<img>').attr({"name":tmp.name,
											"id":tmp.id,
											"src":"../img/cartas/"+tmp.image,
											"alt":tmp.description,
											"style":"display:none"
											}).addClass("imagen"))
					.append($('<img>').attr('src', '../img/cartas/dorso.png').addClass("cubierta")));
			}
		}
		aniadeEvCubierta();
		aniadeEvImagen();
	});
}

function aniadeEvCubierta()
{
	$(".cubierta").click(function(){
				$(this).hide();
				$(this).prev().show();
				comprobarCarta($(this).prev());
			});
}

function aniadeEvImagen()
{
	$(".imagen").click(function(){
				$(this).hide();
				$(this).next().show();
			});
}

//por Alicia, Héctor, Andrea

function comprobarCarta(elementoRecibido)
{
	if (carta1 == null)
	{
		carta1 = elementoRecibido;
	}
	else
	{
		$('.cubierta').off("click");
		window.setTimeout(function(){
				if (carta1[0].src == elementoRecibido[0].src)
				{
					elementoRecibido.off("click");
					carta1.off("click");
					descCard(carta1);
					acertadas++;
					$('#huecoParaPuntos').text($('#huecoParaPuntos').text()*1+$('#huecoParaTiempo').text().replace("Tiempo:", "")*1);
					if (acertadas == $.cookie('dificultad')*5)
					{
						finDelJuego();
					}
				}
				else
				{
						carta1.hide().next().show();
						elementoRecibido.hide().next().show();
				}
				carta1 = null;
		                $('.cubierta').on('click');
		                aniadeEvCubierta();
			}, 500);
	}
}

//
function finDelJuego()
{
    //envía petición con las puntuaciones y nombre del jugador.
    $.post("http://52.38.70.7/memory_proyect/memory/index.php/players/create", {"name":$('#huecoParaNombre').text(), "score":$('#huecoParaPuntos').text()});

    window.alert("Puntuaciones:\n" + "name:" + $('#huecoParaNombre').text() + "\n" + "score:" + $('#huecoParaPuntos').text());

    window.location = "http://52.38.70.7/memory/contenido/puntuaciones.html";
}

function descCard(carta){

	$(".acertada").append($("<img>").attr("src",carta[0].src).addClass("miniatura"));
}
