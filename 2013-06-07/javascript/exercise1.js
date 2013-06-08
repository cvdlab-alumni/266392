/*##########################################################################################
#                                                                                        #
#                                 HOMEWORK 2013-06-07                                    #
#                                                                                        #
#  exercise1.js                                                                          #
#                                                                                        #
#  Federico Mione matr.266392                                                            #
#########################################################################################*/

var domain2D = DOMAIN([[-60, 60], [-60, 60]])([22,22]);

/* Array contenente le coordinate da riutilizzare per il posizionamento degli oggetti */
var coordinate = new Array();

/* Colori */
var marrone = [205/255,133/255,63/255];

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

var terrain = COLOR(marrone)(MAP(generateTerrain)(domain2D));

var model = STRUCT([terrain]);

DRAW(model);