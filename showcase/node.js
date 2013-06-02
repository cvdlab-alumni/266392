!(function (exports){

  var fs = require('fs');

  var plasm_lib = require('plasm.js');
  var obj = plasm_lib.plasm;
  var fun = plasm_lib.plasm_fun;
  var plasm = obj.plasm;
  var Plasm = obj.Plasm;

  var root = this;

  Object.keys(fun).forEach(function (k) { 
    root[k] = fun[k];
  });

  var p = new Plasm();
  fun.PLASM(p);


  var scmodel = (function () {


/***********************************************************************************
*
*                 CANNONE XVII SECOLO
*
*
*   FEDERICO MIONE   matr.266392
************************************************************************************/

/* dichiarazione dei domini */
var domain1 = INTERVALS(1)(64);
var domain2d = PROD1x1([INTERVALS(1)(64),INTERVALS(1)(64)]);

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

var sphere = function(r) {
  var domain = DOMAIN([[0, PI], [0, 2*PI]])([50,50]);

  var mapping = function(v) {
    var a = v[0];
    var b = v[1];

    var u = r*SIN(a)*COS(b);
    var v = r*SIN(a)*SIN(b);
    var w = r*COS(a);

    return [u,v,w];
  }
  return MAP(mapping)(domain)
}


function chassis(depth) {
  var chassis1a = BEZIER(S0)([[2.179, 0, 4.539], [4.760, 0, 4.255]]);
  var chassis2a = BEZIER(S0)([[5.308, 0, 3.929], [4.760, 0, 4.255]]);
  var chassis3a = BEZIER(S0)([[5.308, 0, 3.929], [5.394, 0, 4.108], [6.292, 0, 3.603], [7.093, 0, 3.307]]);
  var chassis4a = BEZIER(S0)([[7.093, 0, 3.307], [7.886, 0, 3.501]]);
  var chassis5a = BEZIER(S0)([[7.101, 0, 3.708], [7.826, 0, 3.841]]);
  var chassis6a = BEZIER(S0)([[4.782, 0, 4.885], [4.760, 0, 4.255]]);
  var chassis7a = BEZIER(S0)([[4.782, 0, 4.885], [7.101, 0, 3.708]]);
  var chassis8a = BEZIER(S0)([[2.241, 0, 5.204], [4.782, 0, 4.885]]);
  var chassis9a = BEZIER(S0)([[2.179, 0, 4.539], [2.241, 0, 5.204]]);
  var chassis10a = BEZIER(S0)([[7.886, 0, 3.501], [7.826, 0, 3.841]]);

  var chassis1b= BEZIER(S0)([[2.179, depth, 4.539], [4.760, depth, 4.255]]);
  var chassis2b = BEZIER(S0)([[5.308, depth, 3.929], [4.760, depth, 4.255]]);
  var chassis3b = BEZIER(S0)([[5.308, depth, 3.929], [5.394, depth, 4.108], [6.292, depth, 3.603], [7.093, depth, 3.307]]);
  var chassis4b = BEZIER(S0)([[7.093, depth, 3.307], [7.886, depth, 3.501]]);
  var chassis5b = BEZIER(S0)([[7.101, depth, 3.708], [7.826, depth, 3.841]]);
  var chassis6b = BEZIER(S0)([[4.782, depth, 4.885], [4.760, depth, 4.255]]);
  var chassis7b = BEZIER(S0)([[4.782, depth, 4.885], [7.101, depth, 3.708]]);
  var chassis8b = BEZIER(S0)([[2.241, depth, 5.204], [4.782, depth, 4.885]]);
  var chassis9b = BEZIER(S0)([[2.179, depth, 4.539], [2.241, depth, 5.204]]);
  var chassis10b = BEZIER(S0)([[7.886, depth, 3.501], [7.826, depth, 3.841]]);

  var sup1a = MAP(BEZIER(S1)([chassis4a,chassis5a]))(domain2d); 
  var sup2a = MAP(BEZIER(S1)([chassis1a,chassis8a]))(domain2d); 
  var sup3a = MAP(BEZIER(S1)([chassis3a,chassis7a]))(domain2d); 
  var sup4a = MAP(BEZIER(S1)([chassis2a,chassis6a]))(domain2d); 

  var sup1b = MAP(BEZIER(S1)([chassis4b,chassis5b]))(domain2d); 
  var sup2b = MAP(BEZIER(S1)([chassis1b,chassis8b]))(domain2d); 
  var sup3b = MAP(BEZIER(S1)([chassis3b,chassis7b]))(domain2d); 
  var sup4b = MAP(BEZIER(S1)([chassis2b,chassis6b]))(domain2d); 

  var sup1c = MAP(BEZIER(S1)([chassis1a,chassis1b]))(domain2d); 
  var sup2c = MAP(BEZIER(S1)([chassis2a,chassis2b]))(domain2d); 
  var sup3c = MAP(BEZIER(S1)([chassis3a,chassis3b]))(domain2d); 
  var sup4c = MAP(BEZIER(S1)([chassis4a,chassis4b]))(domain2d); 
  var sup5c = MAP(BEZIER(S1)([chassis5a,chassis5b]))(domain2d); 
  var sup6c = MAP(BEZIER(S1)([chassis6a,chassis6b]))(domain2d);
  var sup7c = MAP(BEZIER(S1)([chassis7a,chassis7b]))(domain2d); 
  var sup8c = MAP(BEZIER(S1)([chassis8a,chassis8b]))(domain2d); 
  var sup9c = MAP(BEZIER(S1)([chassis9a,chassis9b]))(domain2d); 
  var sup10c = MAP(BEZIER(S1)([chassis10a,chassis10b]))(domain2d); 

  var chassis1 = COLOR([0.58,0.29,0])(STRUCT([sup1a,sup2a,sup3a,sup4a,sup1b,sup2b,sup3b,sup4b,sup1c,sup2c,sup3c,sup4c,sup5c,sup6c,sup7c,sup8c,sup9c,sup10c]));
  var chassis2 = TRANSLATE([1])([1.2])(chassis1);

  var travPost = CUBOID([0.6,1.2,0.15]);
  var travAnt = CUBOID([1,1.2,0.15]);

  var traversaPostDraft =TRANSLATE([0,1,2])([7.2,0.1 ,3.45])(ROTATE([0,2])(-PI/18)(travPost));
  var traversaAntDraft =TRANSLATE([0,1,2])([3.4,0.1 ,4.45])(ROTATE([0,2])(PI/24)(travAnt));

  var traversaPost = COLOR([0.7,0.29,0])(traversaPostDraft);
  var traversaAnt = COLOR([0.7,0.29,0])(traversaAntDraft);

  var sostegnoCannaDraft = EXTRUDE([1.2])(arc(2*PI,0,0.18)); 
  var sostegnoCanna = TRANSLATE([0,1,2])([3.9,0.2 ,4.8])(ROTATE([1,2])(-PI/2)(sostegnoCannaDraft))

  var traverse = STRUCT([traversaAnt,traversaPost]);
  var chassis = STRUCT([chassis1,chassis2,traverse, sostegnoCanna]);
  return chassis;
}

/* Definzione della canna e del relativo supporto */
function pipe() {

  var domain = DOMAIN([[0,1],[0,2*PI]])([60,60]);
  var pip1 = BEZIER(S0)([[0,0,0],[0.254,0,0.054],[-0.198,0,0.258],[0.362,0,0.392]]);
  var pip2 = BEZIER(S0)([[0.362,0,0.392],[0.437,0,0.469],[0.297,0,0.511],[0.320,0,0.577]]);
  var pip3 = BEZIER(S0)([[0.320,0,0.577],[0.293,0,4.454]]);
  var pip4 = BEZIER(S0)([[0.293,0,4.454],[0.379,0,4.538],[0.285,0,4.550],[0.258,0,4.727]]);
  var pip5 = BEZIER(S0)([[0.258,0,4.727],[0.181,0,4.727]]);
  var pip6 = BEZIER(S0)([[0.181,0,4.727],[0.154,0,0.792]]);
  var pip7 = BEZIER(S0)([[0.154,0,0.792],[0.156,0,0.681],[0.077,0,0.608],[0.008,0,0.623]]);
  var pipeLine =STRUCT([pip1,pip2,pip3,pip4,pip5,pip6,pip7]);
  var pipe1 = MAP(ROTATIONAL_SURFACE(pip1))(domain);
  var pipe2 = MAP(ROTATIONAL_SURFACE(pip2))(domain);
  var pipe3 = MAP(ROTATIONAL_SURFACE(pip3))(domain);
  var pipe4 = MAP(ROTATIONAL_SURFACE(pip4))(domain);
  var pipe5 = MAP(ROTATIONAL_SURFACE(pip5))(domain);
  var pipe6 = MAP(ROTATIONAL_SURFACE(pip6))(domain);
  var pipe7 = MAP(ROTATIONAL_SURFACE(pip7))(domain);
  var pipeTot = STRUCT([pipe1,pipe2,pipe3,pipe4,pipe5,pipe6,pipe7]);
  var pipe = TRANSLATE([0,1,2])([4.961,0.75 ,4.9])(ROTATE([0,2])(-PI/2.3)(pipeTot));

  return pipe;
}

/* Desinizione delle ruote e del relativo asse */
function ruote() {
  var domain = DOMAIN([[0,1],[0,2*PI]])([64,64]);
  var sostegnoRuoteDraft = EXTRUDE([2])(arc(2*PI,0,0.08)); 
  var sostegnoRuote = TRANSLATE([0,1,2])([2.9,-0.3 ,4.8])(ROTATE([1,2])(-PI/2)(sostegnoRuoteDraft))
  var ruota_ext = COLOR([0.7,0.29,0])(EXTRUDE([0.30])(arc(2*PI,1.01,1.23))); // 0.30 = spessore della ruota
  var rinforzo_metallo = COLOR([0.184,0.2,0.207])(TRANSLATE([2])([0.025])(EXTRUDE([0.25])(arc(2*PI,1.23,1.248))));

  /* parti della borchia */
  var tamburo = COLOR([0.7,0.29,0])(EXTRUDE([0.15])(arc(2*PI,0.16,0.34)));
  var perno = COLOR([0.7,0.29,0])(EXTRUDE([0.19])(arc(2*PI,0.08,0.16)));
  var vite = COLOR([0.7,0.29,0])(EXTRUDE([0.2])(arc(2*PI,0,0.08)));
  var copri_vite = BEZIER(S0)([[0.08,0, 0.2], [0.095,0, 0.23], [0.04,0, 0.245], [0,0,0.245]]);
  var mapping = ROTATIONAL_SURFACE(copri_vite);
  var tondino = COLOR([0.184,0.2,0.207])(MAP(mapping)(domain));

  /* raggi */
  var rag = TRANSLATE([0,2])([0.34,0.075-0.0375])(CUBOID([0.67,0.075,0.075]));
  var raggio = ROTATE([1,2])(PI/4)(rag);
  var raggi = COLOR([0.7,0.29,0])(STRUCT(REPLICA(12)([raggio,ROTATE([0,1])(2*PI/12)])));

  /* morsetti */
  var mors = TRANSLATE([0,2])([1.01-0.038,-0.03])(CUBOID([0.256+0.018,0.06,0.366]));
  var morsetto = ROTATE([0,1])(PI/4.5)(mors);
  var morsetti = COLOR([0.184,0.2,0.207])(STRUCT(REPLICA(12)([morsetto,ROTATE([0,1])(2*PI/12)])));

  var borchia_raggi = STRUCT([tamburo,perno,vite,tondino,raggi]);

  var ruota1Draft = STRUCT([ruota_ext,rinforzo_metallo,TRANSLATE([2])([0.075])(borchia_raggi),morsetti]);
  var ruota1 = TRANSLATE([0,1,2])([2.9,-0.1 ,4.8])(ROTATE([1,2])(PI/2)(ruota1Draft));
  var ruota2Draft = ROTATE([1,2])(-PI/2)(ruota1Draft);
  var ruota2 = TRANSLATE([0,1,2])([2.9,1.59 ,4.8])(ruota2Draft);
  var ruote = STRUCT([ruota1,ruota2,sostegnoRuote]);

  return ruote;
}

/* definizione dell'ambientazione */
function scenario() {
  var terreno = COLOR([0.301,0.612,0.208])(TRANSLATE([0,1,2])([-10,-10 ,2.807])(CUBOID([20,20,0.5])));

  var ball1=TRANSLATE([2])([0.181])(sphere(0.181));
  var ball2=TRANSLATE([0,1,2])([-0.181,0.181,0.181+0.3])(sphere(0.181));
  var ball3=TRANSLATE([0,1,2])([-0.181*2,0.181*2,0.181+0.6])(sphere(0.181));

  var ball4=STRUCT(REPLICA(4)([ball1,TRANSLATE([1])([0.362])]));
  var ball16=STRUCT(REPLICA(4)([ball4,TRANSLATE([0])([-0.362])]))
  var ball2floor3=STRUCT(REPLICA(3)([ball2,TRANSLATE([1])([0.362])]));
  var ball2floor=STRUCT(REPLICA(3)([ball2floor3,TRANSLATE([0])([-0.362])]))
  var ball3floor2=STRUCT(REPLICA(2)([ball3,TRANSLATE([1])([0.362])]));
  var ball3floor=STRUCT(REPLICA(2)([ball3floor2,TRANSLATE([0])([-0.362])]))
  var ball4floor=TRANSLATE([0,1,2])([-0.181*3,0.181*3,0.181+0.9])(sphere(0.181))

  var balls = TRANSLATE([2])([2.807+0.5])(STRUCT([ball16,ball2floor,ball3floor,ball4floor]));

  var scenario = STRUCT([terreno,balls]);
  return scenario;
}

var modelDraft = STRUCT([chassis(0.3),pipe(),ruote(),scenario()]);
var model = TRANSLATE([0,1,2])([0,0,-3.307])(modelDraft);


  return model
  })();

  exports.author = 'm4v3r1ck';
  exports.category = 'weapon';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));