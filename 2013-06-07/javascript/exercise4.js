/*##########################################################################################
#                                                                                        #
#                                 HOMEWORK 2013-06-07                                    #
#                                                                                        #
#  exercise4.js                                                                          #
#                                                                                        #
#  Federico Mione matr.266392                                                            #
#########################################################################################*/


var domain2D = DOMAIN([[-60, 60], [-60, 60]])([22,22]);

var livelloDelMare = -2.1;

/* Array contenente le coordinate da riutilizzare per il posizionamento degli oggetti */
var coordinate = new Array();

/* Colori */
var gialloNapoli = [247/255,232/255,159/255];
var begei = [178/255,34/255,34/255];
var terraDiSiena = [233/255,116/255,81/255];

var marrone = [205/255,133/255,63/255];
var marroneScuro = [101/255,67/255,33/255];
var celeste = [0/255,127/255,255/255];
var verdeChiaro = [34/255,139/255,34/255];
var verdeScuro =  [85/255,104/255,50/255];

/* Arco di circonferenza bidimensionale parametrico rispetto a due raggi 
	r = raggio minore, R = raggio maggiore, alpha = arco di circonferenza */
function arc (alpha, r, R){
	var domain = DOMAIN([[0,alpha],[r,R]])([32,1]);

	var mapping = function(v) {
	var a = v[0];
	var r = v[1];

	return [r*COS(a), r*SIN(a)];
	}
	var model = MAP(mapping)(domain);

	return model;
}

var generateTerrain = function(punto){
	var x = punto[0];
	var y = punto[1];
	var z =  Math.random()*5 * COS(y) * SIN(x);

	/* Generazione area edificabile */
	if(x<55 && x>10 && y<0 && y>-50)
	{
		z = Math.random()*0.5 * COS(y) * SIN(x)
	}

	/* Generazione lago principale */
	if(x<20 && x>5 && y<20 && y>10)
	{
		z = -8+Math.random()*2 * COS(y) * SIN(x);
	}
	if(x<25 && x>15 && y<25 && y>15)
	{
		z = -6+Math.random() * COS(y) * SIN(x);
	}
	coordinate.push([x,y,z]);
	return [x, y, z];
}

var albero = function (color,scala) {
	
	/* Gestione random del colore */
	var coloreTronco = marroneScuro;
	var coloreChioma = verdeChiaro;
	var dominioAlbero = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);

	if(color<0.25){
	 	coloreTronco = marrone;
	 	var coloreChioma = verdeChiaro;
	}
	else{
		if(color<0.5){
			coloreChioma = verdeScuro;
			var coloreTronco = marroneScuro;
		}
		else{
			if(color<0.75)
			{
				coloreChioma = verdeScuro;
				coloreTronco = marrone;
			}
		}
	}

	/* Costruzione Tronco */
	var tronco = COLOR(coloreTronco)(EXTRUDE([1])(arc(2*PI, 0, 0.2)));

	/* Creazione chioma */
	var profiloChioma = BEZIER(S0)([[0.75,0,0],[0.75,0,0.7],[0.75,0,1],[0,0,3.5]]);
	var semiCerchio = BEZIER(S1)([[1.5,0,0],[1.5,2,0],[-1.5,2,0],[-1.5,0,0]]);
	var chiomaAperta = MAP(PROFILEPROD_SURFACE([profiloChioma,semiCerchio]))(dominioAlbero);
	var chiomaChiusa = STRUCT(REPLICA(2)([chiomaAperta, R([0,1])(PI)]));

	/* Creazione base chioma */
	var SemiCircBase1 = BEZIER(S0)([[1.1,0,0],[1.1,1.5,0],[-1.1,1.5,0],[-1.1,0,0]]);
	var SemiCircBase2 = BEZIER(S0)([[-1.1,0,0],[-1.1,-1.5,0],[1.1,-1.5,0],[1.1,0,0]]);
	var baseChioma = MAP(BEZIER(S1)([SemiCircBase1,SemiCircBase2]))(dominioAlbero);

	var chioma = T([2])([1])(STRUCT([baseChioma, chiomaChiusa]));

	var chiomaColorata = COLOR(coloreChioma)(chioma);

	/* Composizione albero */
	var albero = STRUCT([tronco, chiomaColorata]);
	var alberoScalato = S([0,1,2])([scala,scala,scala])(albero);

	return alberoScalato;
}

var inserisciAlberi = function (xmin,xmax,ymin,ymax) {

	for(i=0; i<coordinate.length; i++) {

		var coordX = coordinate[i][0];
		var coordY = coordinate[i][1];
		var coordZ = coordinate[i][2];
		var casual = Math.random();

		if(coordZ>=livelloDelMare && coordX>=xmin && coordX<=xmax && coordY>=ymin && coordY<=ymax) {
			
			var alberoGenerato = T([0,1,2])([coordX, coordY, coordZ])(albero(casual,1*casual));
			DRAW(alberoGenerato);
		}
	}
}

var inserisciAbitazioni = function (xmin,xmax,ymin,ymax) {

	for(i=0; i<coordinate.length; i++) {
		var colore1 = gialloNapoli;
		var colore2 = terraDiSiena;
		var colore3 = begei;

		var coordX = coordinate[i][0];
		var coordY = coordinate[i][1];
		var coordZ = coordinate[i][2];
		var casual1 = Math.random();
		var casual2 = Math.random();
		var casual3 = Math.random();
		/* Gestione random del colore */
		var dominioAlbero = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);

		var coloreCasa=colore1;
		if(casual2<0.55){
	 		coloreCasa = colore2;
		}
		else{
			if(casual2<0.75){
				coloreCasa = colore3;
			}
		}

		if(coordZ>=livelloDelMare && coordX>=xmin && coordX<=xmax && coordY>=ymin && coordY<=ymax && casual1>0.4 && casual2>0.3) {
			
			var casaGenerata = COLOR(coloreCasa)(T([0,1,2])([coordX, coordY, coordZ])(CUBOID([casual1*5,casual2*5,casual3*5])));
			DRAW(casaGenerata);
		}
	}
}


/* Generazione terreno */
var terrain = COLOR(marrone)(MAP(generateTerrain)(domain2D));

/* Generazione Acqua */
var lakeDraft = COLOR(celeste)(CUBOID([120,120,10]));
var water = TRANSLATE([0,1,2])([-60,-60,-10+livelloDelMare])(lakeDraft);

var model = STRUCT([terrain,water,inserisciAlberi(-60,10,-60,60),inserisciAbitazioni(10,30,-50,-30), inserisciAbitazioni(40,55,-30,-15)]);
DRAW(model);