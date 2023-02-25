
/*ENCONTRAR A ALTURA E A LARGURA DA PÁGINA E REDIMENSIONÁ-LA PARA DIVERSOS TAMANHOS DE  
TELAS, OU SEJA, TORNÁ-LA DINÂMICA.*/

var altura = 0
var largura = 0

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

//_____________________________________________________________________________________

//CONFIGURAÇÕES DA PÁGINA INICIAL: NÍVEL DO JOGO
function iniciarJogo() {
	var nivel = document.getElementById('nivel').value

	if(nivel === '') {
		alert('Selecione um nível para iniciar o jogo')
		return false
	}

	window.location.href = "index.html?" + nivel
}

//_____________________________________________________________________________________

//APLICANDO O NÍVEL DE DIFICULDADE SELECIONADO
var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
	//1500
	criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {
	//1000
	criaMosquitoTempo = 1000
} else if(nivel === 'chucknorris') {
	//750
	criaMosquitoTempo = 750
}

//_____________________________________________________________________________________

//ADICIONANDO O CRONÔMETRO
var tempo = 15

var cronometro = setInterval(function() {

	tempo -= 1

	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'

	} else {
		document.getElementById('cronometro').innerHTML = tempo
	}

}, 1000)

//_____________________________________________________________________________________

var vidas = 1

function posicaoRandomica() {

	//REMOVER O MOSQUITO ANTERIOR (CASO EXISTA) - FAZER APARECER UM POR UM A CADA 1s.
	if(document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		//CONTROLAR AS VIDAS
		if(vidas > 3) {

			window.location.href = 'fim_de_jogo.html'
		} else {
			document.getElementById('vida' + vidas).src = "imagens/coracao_vazio.png"

			vidas++
		}
	}
	
	//ESTABELECENDO UMA POSIÇÃO RANDÔMICA PARA O MOSQUITO
	var posicaoX = Math.floor(Math.random() * largura) - 90 //Math.floor: arredonda os valores para baixo a fim de eliminar as casas decimáis.
	var posicaoY = Math.floor(Math.random() * altura) - 90 //Esse - 90 é um decremento para não aparecer barra de rolagem quando a imagem, que possui 50px, se aproximar no canto da tela. 

	//Operador ternário: para retirar valores negativos e o mosquito não sair da tela.
	posicaoX = posicaoX < 0 ? 0 : posicaoX // ? = se não
	posicaoY = posicaoY < 0 ? 0 : posicaoY // : = do contrário

	console.log(posicaoX, posicaoY)

	//CRIAR O ELEMENTO HTML DE FORMA PROGRAMÁTICA / DINÂMICA
	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosquito.png'
	mosquito.className = tamanhoAleatório() + ' ' + ladoAleatorio()
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	
	//REMOVER O MOSQUITO NO MOMENTO DO CLIQUE
	mosquito.onclick = function() {
		this.remove()
	}

	document.body.appendChild(mosquito)
}

//_____________________________________________________________________________________

//CRIANDO TAMANHOS DIFERENTES PARA OS MOSQUITOS
function tamanhoAleatório() {
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe) {
		case 0:
			return 'mosquito1'

		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}

//_____________________________________________________________________________________

//ORIENTAÇÃO DA IMAGEM (MOSQUITO OLHANDO PARA ESQUERDA E PARA DIREITA)
function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)
	
	switch(classe) {
		case 0:
			return 'ladoA'

		case 1:
			return 'ladoB'
	}
}





