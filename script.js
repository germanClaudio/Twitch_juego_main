let puntos = 0;
let puntosNecesarios = 15;
let segundos = 10;

	document.getElementById("tiempo").textContent = segundos;
	document.getElementById("puntosParaGanar"). textContent = puntosNecesarios;

const sumarPuntos = ()=>{

	if (puntos == puntosNecesarios) {
		let timerInterval;
		let segSobra = "";
		let segundoSingular = "";

		document.getElementById("robot").textContent = "ˣ_ˣ";  //ˣᴖˣ

		if ( segundos === 1 ) {
			segSobra = "sobró";
			segundoSingular = "segundo";
		} else {
			segSobra = "sobraron";
			segundoSingular = "segundos";
		}

		Swal.fire({
			title: 'Genial!',
			text: `Ganaste el juego!! y te ${segSobra}: ${segundos} ${segundoSingular}`,
			icon: 'success',
			timer: 20000,
			timerProgressBar: true,
			confirmButtonText: 'OK',
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: `Jugar de Nuevo en <p id="unMinuto"></p> segundos`,
			denyButtonText: `Salir`,
			
			didOpen: () => {
				const b = document.getElementById("unMinuto");
				timerInterval = setInterval(() => {
				  b.textContent = (Swal.getTimerLeft()/1000).toFixed(0)
				}, 1000)
			  },


		}).then((result) => {
		if (result.isConfirmed) {
			puntos = 0;
			segundos = 10;
			window.location = "/index.html";
		} else if (result.isDenied) {
			window.close();
		}
	  });
	
		segundos = 20;
	}
	else puntos ++;
	document.getElementById("puntos").textContent = puntos
}

const moverPersonaje = ()=>{
	const bot = document.querySelector(".bot");
	randomX = Math.random()*500;
	randomY = Math.random()*500;
	bot.style.top = `${randomY}px`;
	bot.style.left = `${randomX}px`;
}

document.querySelector(".bot").addEventListener("mouseenter",()=>{
	sumarPuntos();
	moverPersonaje();
});


	setInterval(()=>{
		segundos--;
		document.getElementById("tiempo").textContent = segundos;
		if (segundos === 0) {
			//alert("Se te acabó el tiempo!!");
			Swal.fire({
				title: 'Fallaste!',
				text: `Se te acabó el tiempo!! y solo sumaste: ${puntos} puntos`,
				icon: 'error',
				showDenyButton: true,
				showCancelButton: false,
				confirmButtonText: 'Jugar de Nuevo en <p id="unMinuto"></p> segundos',
				denyButtonText: `Salir`,
				timer: 20000,
				timerProgressBar: true,

				didOpen: () => {
					const b = document.getElementById("unMinuto");
					timerInterval = setInterval(() => {
					  b.textContent = (Swal.getTimerLeft()/1000).toFixed(0)
					}, 1000)
					
				  },

		}).then((result) => {
			if (result.isConfirmed) {
				puntos = 0;
				document.getElementById("puntos").textContent = puntos;
				segundos = 10;
				window.location = "/index.html";
			} else if (result.isDenied) {
				window.close();
			}
		});
		
			segundos = 20;
		}
	} ,1000);

