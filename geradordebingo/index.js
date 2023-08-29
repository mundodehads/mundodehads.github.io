function gerarBloco(numCartelas){
	const cartelasCsv = [['\\Numero','N1','N2','N3','N4','N5','N6','N7','N8','N9','N10','N11','N12','N13','N14','N15','N16','N17','N18','N19','N20','N21','N22','N23','N24','N25\\']]
    	
    for (let index = 1; index <= numCartelas; index++) {
        const cartela = gerarCartela();
        if(cartelasCsv.indexOf(cartela) != -1){  
            index--;
        }else{
			cartelasCsv.push([`\\${index}`, ...cartela.split(',')]);
        }
    }
    return cartelasCsv;
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
	
    const cartela= matriz_B +","+ matriz_I +","+ matriz_N +","+ matriz_G +","+ matriz_O+"\\";
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
    const cartelas = gerarBloco(quantity);

	exportToRtf('export.rtf', cartelas)
}

function exportToRtf(filename, rows) {
	var processRow = function (row) {
		var finalVal = '';
		for (var j = 0; j < row.length; j++) {
			var innerValue = row[j] === null ? '' : row[j].toString();
			if (row[j] instanceof Date) {
				innerValue = row[j].toLocaleString();
			};
			var result = innerValue.replace(/"/g, '""');
			if (result.search(/("|,|\n)/g) >= 0)
				result = '"' + result + '"';
			if (j > 0)
				finalVal += '\\\\';
			finalVal += result;
		}
		return finalVal + '\n';
	};

	var csvFile = '';
	for (var i = 0; i < rows.length; i++) {
		csvFile += processRow(rows[i]);
	}

	var blob = new Blob([csvFile], { type: 'text/rtf;charset=utf-8;' });
	if (navigator.msSaveBlob) {
		navigator.msSaveBlob(blob, filename);
	} else {
		var link = document.createElement("a");
		if (link.download !== undefined) {
			var url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", filename);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
}
   
    
    


