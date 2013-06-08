/*##########################################################################################
#                                                                                        #
#                                 HOMEWORK 2013-06-07                                    #
#                                                                                        #
#  exercise2.js                                                                          #
#                                                                                        #
#  Federico Mione matr.266392                                                            #
#########################################################################################*/

var domain2D = DOMAIN([[-60, 60], [-60, 60]])([22,22]);

/* Array contenente le coordinate da riutilizzare per il posizionamento degli oggetti */
var coordinate = new Array();

/* Colori */
var marrone = [205/255,133/255,63/255];
var celeste = [0/255,127/255,255/255];

var generateTerrain = function(punto){
	var x = punto[0];
	var y = punto[1];
	var z =  Math.random()*5 * COS(y) * SIN(x);

	/* Generazione lago principale */
	if(x<20 && x>5 && y<20 && y>10)
	{
		var z = -8+Math.random()*2 * COS(y) * SIN(x);
	}
	if(x<25 && x>15 && y<25 && y>15)
	{
		var z = -6+Math.random() * COS(y) * SIN(x);
	}
	coordinate.push([x,y,z]);
	return [x, y, z];
}

/* Generazione terreno */
var terrain = COLOR(marrone)(MAP(generateTerrain)(domain2D));

/* Generazione Acqua */
var lakeDraft = COLOR(celeste)(CUBOID([120,120,10]));
var water = TRANSLATE([0,1,2])([-60,-60,-12.1])(lakeDraft);

var model = STRUCT([terrain,water]);
DRAW(model);