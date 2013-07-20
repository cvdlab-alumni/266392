
/***********************************************************************************
*
*    					Warren Platner - Tavolino da caffè
*
*   FEDERICO MIONE   matr.266392
************************************************************************************/

/* dichiarazione dei domini */
var domain = INTERVALS(1)(16);
var domain2d = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);

/* definizione colori */
var vitro = [30/255,144/255,255/255,0.4];

/* Arco di circonferenza bidimensionale parametrico rispetto a due raggi 
	r = raggio minore, R = raggio maggiore, alpha = arco di circonferenza */
function arc (alpha, r, R){
	var domain = DOMAIN([[0,alpha],[r,R]])([64,1]);

	var mapping = function(v) {
	var a = v[0];
	var r = v[1];

	return [r*COS(a), r*SIN(a)];
	}
	var model = MAP(mapping)(domain);

	return model;
}

function cerchioTondino (r,diam){

	var k = 1.6568;
	var rOut = r+diam;

	var c1 = CUBIC_HERMITE(S0)([[r,0,0],[0,r,0],[0,+k*r,0],[-k*r,0,0]]); // # 1° quadrante
	var c2 = CUBIC_HERMITE(S0)([[r,0,0],[0,-r,0],[0,-k*r,0],[-k*r,0,0]]); // # 2° quadrante
	var c3 = CUBIC_HERMITE(S0)([[-r,0,0],[0,-r,0],[0,-k*r,0],[+k*r,0,0]]); // # 3° quadrante
	var c4 = CUBIC_HERMITE(S0)([[-r,0,0],[0,r,0],[0,+k*r,0],[+k*r,0,0]]); // # 4° quadrante

	var c1a = CUBIC_HERMITE(S0)([[rOut,0,0],[0,rOut,0],[0,+k*rOut,0],[-k*rOut,0,0]]); // # 1° quadrante
	var c2a = CUBIC_HERMITE(S0)([[rOut,0,0],[0,-rOut,0],[0,-k*rOut,0],[-k*rOut,0,0]]); // # 2° quadrante
	var c3a = CUBIC_HERMITE(S0)([[-rOut,0,0],[0,-rOut,0],[0,-k*rOut,0],[+k*rOut,0,0]]); // # 3° quadrante
	var c4a = CUBIC_HERMITE(S0)([[-rOut,0,0],[0,rOut,0],[0,+k*rOut,0],[+k*rOut,0,0]]); // # 4° quadrante

	var sur1 = MAP(CUBIC_HERMITE(S1)([c1,c1a,[0,0,diam*2],[0,0,-diam*2]]))(domain2d);
	var sur1a = MAP(CUBIC_HERMITE(S1)([c1,c1a,[0,0,-diam*2],[0,0,diam*2]]))(domain2d);

	var sur2 = MAP(CUBIC_HERMITE(S1)([c2,c2a,[0,0,diam*2],[0,0,-diam*2]]))(domain2d);
	var sur2a = MAP(CUBIC_HERMITE(S1)([c2,c2a,[0,0,-diam*2],[0,0,diam*2]]))(domain2d);

	var sur3 = MAP(CUBIC_HERMITE(S1)([c3,c3a,[0,0,diam*2],[0,0,-diam*2]]))(domain2d);
	var sur3a = MAP(CUBIC_HERMITE(S1)([c3,c3a,[0,0,-diam*2],[0,0,diam*2]]))(domain2d);

	var sur4 = MAP(CUBIC_HERMITE(S1)([c4,c4a,[0,0,diam*2],[0,0,-diam*2]]))(domain2d);
	var sur4a = MAP(CUBIC_HERMITE(S1)([c4,c4a,[0,0,-diam*2],[0,0,diam*2]]))(domain2d);

	var cerchio = TRANSLATE([2])([diam/2])(STRUCT([sur1,sur1a,sur2,sur2a,sur3,sur3a,sur4,sur4a]));
	return cerchio;

}

var telaio = function() {
	var numPil = 90;

	var line1 = BEZIER(S0)([[5.409, 0, 4.698], [4.157, 0, 3.94], [4.09, 0, 3.969], [4.667, 0, 2.383]]);
	var line2 = BEZIER(S0)([[5.379, 0, 4.698], [4.147, 0, 3.95], [4.07, 0, 3.969], [4.652, 0, 2.383]]);

	var sur1 = MAP(CUBIC_HERMITE(S1)([line1,line2,[0,0.035,0],[0,-0.035,0]]))(domain2d);
	var sur2 = MAP(CUBIC_HERMITE(S1)([line1,line2,[0,-0.035,0],[0,+0.035,0]]))(domain2d);

	var pil1 = TRANSLATE([0,2])([-3.359,-2.383])(STRUCT([sur1,sur2]));
	var pilTot = STRUCT(REPLICA(numPil)([pil1,ROTATE([0,1])(2*PI/numPil)]))

	var tond1 = cerchioTondino(1.305,0.02);
	var tond2 = TRANSLATE([2])([0.236])(cerchioTondino(1.185,0.02));
	var tond3 = TRANSLATE([2])([2.227])(cerchioTondino(1.865,0.02));

	var telaio = STRUCT([pilTot,tond1,tond2,tond3]);
	return telaio;
}

var vetro = function(rmin,rmax,s) {
	var k = 1.6568;

	var c1 = CUBIC_HERMITE(S0)([[rmin,0,s],[0,rmin,s],[0,+k*rmin,s],[-k*rmin,0,s]]); // # 1° quadrante
	var c2 = CUBIC_HERMITE(S0)([[rmin,0,s],[0,-rmin,s],[0,-k*rmin,s],[-k*rmin,0,s]]); // # 2° quadrante
	var c3 = CUBIC_HERMITE(S0)([[-rmin,0,s],[0,-rmin,s],[0,-k*rmin,s],[+k*rmin,0,s]]); // # 3° quadrante
	var c4 = CUBIC_HERMITE(S0)([[-rmin,0,s],[0,rmin,s],[0,+k*rmin,s],[+k*rmin,0,s]]); // # 4° quadrante

	var c1a = CUBIC_HERMITE(S0)([[rmax,0,0],[0,rmax,0],[0,+k*rmax,0],[-k*rmax,0,0]]); // # 1° quadrante
	var c2a = CUBIC_HERMITE(S0)([[rmax,0,0],[0,-rmax,0],[0,-k*rmax,0],[-k*rmax,0,0]]); // # 2° quadrante
	var c3a = CUBIC_HERMITE(S0)([[-rmax,0,0],[0,-rmax,0],[0,-k*rmax,0],[+k*rmax,0,0]]); // # 3° quadrante
	var c4a = CUBIC_HERMITE(S0)([[-rmax,0,0],[0,rmax,0],[0,+k*rmax,0],[+k*rmax,0,0]]); // # 4° quadrante

	var supMol1 = MAP(CUBIC_HERMITE(S1)([c1,c1a,[0,0,0],[0,0,0]]))(domain2d); 
	var supMol2 = MAP(CUBIC_HERMITE(S1)([c2,c2a,[0,0,0],[0,0,0]]))(domain2d);
	var supMol3 = MAP(CUBIC_HERMITE(S1)([c3,c3a,[0,0,0],[0,0,0]]))(domain2d);
	var supMol4 = MAP(CUBIC_HERMITE(S1)([c4,c4a,[0,0,0],[0,0,0]]))(domain2d);

	var supVet1 = MAP(CUBIC_HERMITE(S1)([c1,c2,[0,0,0],[0,0,0]]))(domain2d); 
	var supVet2 = MAP(CUBIC_HERMITE(S1)([c3,c4,[0,0,0],[0,0,0]]))(domain2d); 
	var supVet1a = MAP(CUBIC_HERMITE(S1)([c1a,c2a,[0,0,0],[0,0,0]]))(domain2d); 
	var supVet2a = MAP(CUBIC_HERMITE(S1)([c3a,c4a,[0,0,0],[0,0,0]]))(domain2d); 

	var vetro= COLOR(vitro)(TRANSLATE([2])([4.698-2.383])(STRUCT([supMol1,supMol2,supMol3,supMol4,supVet1,supVet1a,supVet2,supVet2a])));
	return vetro;
}

var model = STRUCT([telaio(),vetro(2.7,2.831,0.05)]);

DRAW(model)