function gerarCSV(cartelas){

    let csv = ""
    
    for(var i=0; i< cartelas.length; i++){
        var numCartelas = cartelas[i].split(",")
        csv += "<tr><td>"+(i+1)+"</td><td>"+numCartelas[0]+"</td><td>"+numCartelas[1]+"</td><td>"+numCartelas[2]+"</td><td>"+numCartelas[3]+"</td><td>"+numCartelas[4]+"</td><td>"+numCartelas[5]+"</td><td>"+numCartelas[6]+"</td><td>"+numCartelas[7]+"</td><td>"+numCartelas[8]+"</td><td>"+numCartelas[9]+"</td><td>"+numCartelas[10]+"</td><td>"+numCartelas[11]+"</td><td>"+numCartelas[12]+"</td><td>"+numCartelas[13]+"</td><td>"+numCartelas[14]+"</td><td>"+numCartelas[15]+"</td><td>"+numCartelas[16]+"</td><td>"+numCartelas[17]+"</td><td>"+numCartelas[18]+"</td><td>"+numCartelas[19]+"</td><td>"+numCartelas[20]+"</td><td>"+numCartelas[21]+"</td><td>"+numCartelas[22]+"</td><td>"+numCartelas[23]+"</td><td>"+numCartelas[24]+"</td></tr>";                          
    }

    console.log(csv)
    alert(csv)
}


function gerarBloco(numCartelas){
    const cartelas = new Array(numCartelas);
    cartelas[0]= gerarCartela();

    for (let index = 1; index < numCartelas; index++) {
        const cartela = gerarCartela();
        if(cartelas.indexOf(cartela) != -1){  
            index--;
        }else{
            cartelas[index] = cartela;
        }
    }

    return cartelas;
}

function gerarCartela () { 
    const matriz_B = new Array();
    const matriz_I = new Array();
    const matriz_N = new Array();
    const matriz_G = new Array();
    const matriz_O = new Array();
    gerarNumeros(1,16,matriz_B);
    gerarNumeros(16,31,matriz_I);
    gerarNumeros(31,46,matriz_N);
    gerarNumeros(46,61,matriz_G);
    gerarNumeros(61,76,matriz_O);
    const cartela= matriz_B +","+ matriz_I +","+ matriz_N +","+ matriz_G +","+ matriz_O;
    return cartela;
 }

function gerarNumeros(min,max,matriz){
    let cont=0;
    do {
        const num = getRndInteger(min,max);
        if(matriz.indexOf(num) != -1){  
            
        }else{
            matriz[cont]=num;
            cont++;
        }
    } while (cont <= 4);
    matriz.sort(compararNumeros);
}


function getRndInteger(min, max) {
     return Math.floor(Math.random() * (max - min)) + min;
}

function compararNumeros(a, b) {
    return a - b;
  }

function onGenerateClick() {
    const quantity = document.getElementById('quantity').value;
    //  const maxnumhouses = document.getElementById('maxnumhouses').value;

    const cartelas = gerarBloco(quantity);
    gerarCSV(cartelas);
}

