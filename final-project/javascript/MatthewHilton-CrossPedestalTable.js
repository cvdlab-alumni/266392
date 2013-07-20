/***********************************************************************************
*
*    					Matthew Hilton - Cross Pedestal Table 
*
*
*   FEDERICO MIONE   matr.266392
************************************************************************************/

/* dichiarazione dei domini */
var domain = INTERVALS(1)(16);
var domain2d = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);

/* definizione colori */
var marroneChiaro = [205/255,133/255,63/255];
var vitro = [30/255,144/255,255/255,0.4];

/* Arco di circonferenza bidimensionale parametrico rispetto a due raggi 
	r = raggio minore, R = raggio maggiore, alpha = arco di circonferenza */
function arc (alpha, r, R){
	var domain = DOMAIN([[0,alpha],[r,R]])([128,1]);

	var mapping = function(v) {
	var a = v[0];
	var r = v[1];

	return [r*COS(a), r*SIN(a)];
	}
	var model = MAP(mapping)(domain);

	return model;
}

var telaio = function(spess) {

	var line1 = BEZIER(S0)([[1.436,0, 1.586], [1.643,0, 1.586]]);
	var line2 = BEZIER(S0)([[1.643,0, 1.586], [2.681,0, 3.134]]);
	var line3 = BEZIER(S0)([[2.681,0, 3.134], [2.727,0, 3.271], [2.895,0, 3.3], [2.991,0, 3.182]]);
	var line4 = BEZIER(S0)([[2.991,0, 3.182],[5.032,0, 1.596]]);
	var line5 = BEZIER(S0)([[5.032,0, 1.596], [5.287,0, 1.596]]);
	var line6 = BEZIER(S0)([[4.232,0, 2.913], [5.287,0, 1.596]]);
	var line7 = BEZIER(S0)([[4.232,0, 2.913], [4.146,0, 2.986], [4.153,0, 3.062], [4.239,0, 3.161]]);
	var line8 = BEZIER(S0)([[4.239,0, 3.161], [5.376,0, 4.865]]);
	var line9 = BEZIER(S0)([[5.376,0, 4.865], [5.056,0, 4.865]]);
	var line10 = BEZIER(S0)([[3.858,0, 3.593], [5.056,0, 4.865]]);
	var line11 = BEZIER(S0)([[3.496,0, 3.556], [3.603,0, 3.442], [3.716,0, 3.426], [3.858,0, 3.593]]);
	var line12 = BEZIER(S0)([[3.496,0, 3.556], [1.63,0, 4.86]]);
	var line13 = BEZIER(S0)([[1.63,0, 4.86], [1.336,0, 4.86]]);
	var line14 = BEZIER(S0)([[2.18,0, 3.82], [1.336,0, 4.86]]);
	var line15 = BEZIER(S0)([[2.231,0, 3.558], [2.292,0, 3.671], [2.285,0, 3.736], [2.18,0, 3.82]]);
	var line16 = BEZIER(S0)([[1.436,0, 1.586],[2.231,0, 3.558]]);

	var line17 = BEZIER(S0)([[2.18,0, 3.82],[3.496,0, 3.556]]);
	var line18 = BEZIER(S0)([[2.991,0, 3.182],[4.232,0, 2.913]]);

	var line1s = BEZIER(S0)([[1.436,spess, 1.586], [1.643,spess, 1.586]]);
	var line2s = BEZIER(S0)([[1.643,spess, 1.586], [2.681,spess, 3.134]]);
	var line3s = BEZIER(S0)([[2.681,spess, 3.134], [2.727,spess, 3.271], [2.895,spess, 3.3], [2.991,spess, 3.182]]);
	var line4s = BEZIER(S0)([[2.991,spess, 3.182], [5.032,spess, 1.596]]);
	var line5s = BEZIER(S0)([[5.032,spess, 1.596], [5.287,spess, 1.596]]);
	var line6s = BEZIER(S0)([[4.232,spess, 2.913], [5.287,spess, 1.596]]);
	var line7s = BEZIER(S0)([[4.232,spess, 2.913], [4.146,spess, 2.986], [4.153,spess, 3.062], [4.239,spess, 3.161]]);
	var line8s = BEZIER(S0)([[4.239,spess, 3.161], [5.376,spess, 4.865]]);
	var line9s = BEZIER(S0)([[5.376,spess, 4.865], [5.056,spess, 4.865]]);
	var line10s = BEZIER(S0)([[3.858,spess, 3.593], [5.056,spess, 4.865]]);
	var line11s = BEZIER(S0)([[3.496,spess, 3.556], [3.603,spess, 3.442], [3.716,spess, 3.426], [3.858,spess, 3.593]]);
	var line12s = BEZIER(S0)([[3.496,spess, 3.556], [1.63,spess, 4.86]]);
	var line13s = BEZIER(S0)([[1.63,spess, 4.86], [1.336,spess, 4.86]]);
	var line14s = BEZIER(S0)([[2.18,spess, 3.82], [1.336,spess, 4.86]]);
	var line15s = BEZIER(S0)([[2.231,spess, 3.558], [2.292,spess, 3.671], [2.285,spess, 3.736], [2.18,spess, 3.82]]);
	var line16s = BEZIER(S0)([[1.436,spess, 1.586],[2.231,spess, 3.558]]);

	var lat1 = MAP(BEZIER(S1)([line1,line1s]))(domain2d);
	var lat2 = MAP(BEZIER(S1)([line2,line2s]))(domain2d);
	var lat3 = MAP(BEZIER(S1)([line3,line3s]))(domain2d);
	var lat4 = MAP(BEZIER(S1)([line4,line4s]))(domain2d);
	var lat5 = MAP(BEZIER(S1)([line5,line5s]))(domain2d);
	var lat6 = MAP(BEZIER(S1)([line6,line6s]))(domain2d);
	var lat7 = MAP(BEZIER(S1)([line7,line7s]))(domain2d);
	var lat8 = MAP(BEZIER(S1)([line8,line8s]))(domain2d);
	var lat9 = MAP(BEZIER(S1)([line9,line9s]))(domain2d);
	var lat10 = MAP(BEZIER(S1)([line10,line10s]))(domain2d);
	var lat11 = MAP(BEZIER(S1)([line11,line11s]))(domain2d);
	var lat12 = MAP(BEZIER(S1)([line12,line12s]))(domain2d);
	var lat13 = MAP(BEZIER(S1)([line13,line13s]))(domain2d);
	var lat14 = MAP(BEZIER(S1)([line14,line14s]))(domain2d);
	var lat15 = MAP(BEZIER(S1)([line15,line15s]))(domain2d);
	var lat16 = MAP(BEZIER(S1)([line16,line16s]))(domain2d);

	var sup1a = MAP(BEZIER(S1)([line2,line16]))(domain2d);
	var sup2a = MAP(BEZIER(S1)([line4,line6]))(domain2d);
	var sup3a = MAP(BEZIER(S1)([line8,line10]))(domain2d);
	var sup4a = MAP(BEZIER(S1)([line12,line14]))(domain2d);
	var sup5a = MAP(BEZIER(S1)([line3,line15]))(domain2d);
	var sup6a = MAP(BEZIER(S1)([line7,line15]))(domain2d);
	var sup7a = MAP(BEZIER(S1)([line7,line11]))(domain2d);
	var sup8a = MAP(BEZIER(S1)([line17,line18]))(domain2d);

	var laterali = STRUCT([lat1,lat2,lat3,lat4,lat5,lat6,lat7,lat8,lat9,lat10,lat11,lat12,lat13,lat14,lat15,lat16]);
	var supA = STRUCT([sup1a,sup2a,sup3a,sup4a,sup5a,sup6a,sup7a,sup8a]);
	var supB = TRANSLATE([1])([spess])(supA);

	var telaio1 = TRANSLATE([0,1,2])([-3.364,-spess/2,-1.586])(COLOR(marroneChiaro)(STRUCT([laterali,supA,supB])));
	var telaio2 = ROTATE([0,1])(PI/2)(telaio1);

	var telaioTot = STRUCT([telaio1,telaio2]);

	return telaioTot;
}

var vetro = function(r,s) {
	var vetro = COLOR(vitro)(TRANSLATE([2])([3.274])(EXTRUDE([s])(arc(2*PI,0,r))));
	return vetro;
}

var model = STRUCT([telaio(0.209),vetro(2.836,0.066)]);

DRAW(model);
