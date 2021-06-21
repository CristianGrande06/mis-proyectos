(()=>{
    'use strict'


    let deck = [];
    const tipos      =['C','D','H','S'],
          especiales =['A','J','Q','K'];

    let puntosJugador     =0,
        puntosComputadora =0;
        

    // referencias HTML

    const btnPedir             = document.querySelector('#btnPedir'),
          btnDetener           = document.querySelector('#btnDetener'),
          btnNuevo             = document.querySelector('#btnNuevo'),
          puntosHTML           = document.querySelectorAll('small'),
          divCartasJugador     = document.querySelector('#jugador-cartas'),
          divCartascomputadora = document.querySelector('#computadora-cartas');

     const inicializarJuego = () =>{
           creardeck();
    }

    const creardeck=()=>{

        deck =[];
        for(let i =2; i<=10; i++){
            for (let tipo of tipos) {
                deck.push(i+tipo);
            }
        }
        for (let tipo of tipos){
            for (let esp of especiales){
                deck.push(esp+tipo);
            }
        }
        return _.shuffle(deck);   // debuelve la baraja rebuelta;
    }

   
    const pedirCarta=()=>{

        if (deck.length ===0){
            throw 'No hay mas artas'
        }
        return deck.pop();
    }

    const valorCarta = (carta) =>{

        const valor= carta.substring(0, carta.length -1);       // corta el string desde la poscicion 0 hasta el penultimo.

        return (isNaN(valor))? 
                (valor=== 'A')? 10 : 11
                : valor *1;

        //  if ( isNaN(valor)){             //regresa true si no es un numero
            
        //     puntos = (valor==='A') ? 10 : 11;

        // }else{
        //     puntos=valor *1;            // vuelve el valor a numero
        // }

        // console.log(puntos);
    }

    // const valor=valorCarta(pedirCarta());
    // console.log(valor)
    const acumularPuntos =() =>{

    };

    const turnoComputadora = (puntosMinimos) =>{

    do {
        const carta= pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText=puntosComputadora;   //puntosHTML en la posicion 0 es la primera etiqueta small del html.

        const imgCarta = document.createElement('img');  // crea una etiqueta img.
        imgCarta.src= `assets/cartas/${carta}.png`;      // busca la carta.  
        imgCarta.classList.add('cartas');                 // agrega la clase con los estilos.
        divCartascomputadora.append(imgCarta);               // agrega al final otra carta.

        if (puntosMinimos >21){
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && puntosMinimos<=21);


    setTimeout(()=>{

        (puntosComputadora===puntosMinimos) ? alert('Nadie gana')      :
        (puntosMinimos>21)                  ? alert('Computadora Gana') : 
        (puntosComputadora>21)              ? alert('Jugador Gana')    : alert ('Computadora Gana');
    
        // if (puntosComputadora===puntosMinimos){
        //     alert('Nadie gana');
        // }else if (puntosMinimos>21){
        //     alert('Computadora Gana');
        // }else if(puntosComputadora>21){
        //     alert('Jugador Gana');
        // }else{
        //     alert('Computadora Gana');
        // }
        

    }, 30);

    }

    // Eventos

    btnPedir.addEventListener('click', ()=>{

        const carta= pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);

        puntosHTML[0].innerText=puntosJugador;   //puntosHTML en la posicion 0 es la primera etiqueta small del html.

        const imgCarta = document.createElement('img');  // crea una etiqueta img.
        imgCarta.src= `assets/cartas/${carta}.png`;      // busca la carta.  
        imgCarta.classList.add('cartas');                 // agrega la clase con los estilos.
        divCartasJugador.append(imgCarta);               // agrega al final otra carta.

        if (puntosJugador>21){

            console.warn('lo siento, perdiste');
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);

        }else if (puntosJugador===21) {
            console.warn('21 Genial');
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);
        } 
    });


    btnDetener.addEventListener('click', ()=>{

        btnPedir.disabled=true;
        btnDetener.disabled=true;

        turnoComputadora(puntosJugador);

    })

    btnNuevo.addEventListener('click',()=>{
        
        // deck=[]
        // deck= creardeck();
        inicializarJuego ();
        puntosJugador=0;
        puntosComputadora=0;

        puntosHTML[0].innerText= 0;
        puntosHTML[1].innerText= 0;

        divCartascomputadora.innerHTML='';
        divCartasJugador.innerHTML='';

        btnPedir.disabled=false;
        btnDetener.disabled=false;
        
    })


})();