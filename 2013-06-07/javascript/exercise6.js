/*##########################################################################################
#                                                                                        #
#                                 HOMEWORK 2013-06-07                                    #
#                                                                                        #
#  exercise6.js                                                                          #
#                                                                                        #
#  Federico Mione matr.266392                                                            #
#########################################################################################*/


/* V: array dei vertici del modello  */ 

var V = new Array()

V= [[8,6],
	[-1,0],
	[3,0],
	[6,0],
	[0,8],
	[3,3],
	[6,1],
	[13,6],
	[3,5]];

/* FV: matrice compatta delle facce 2D del modello  */
var FV = new Array()

FV = [[5,6,7,8],
	[0,5,8],
[0,4,5],
[1,2,4,5],
[2,3,5,6],
[0,8,7],[3,6,7],[1,2,3],[0,1,4]]

var lar_to_obj = function(v,fv){  
	var p=" Vertici V:\n";

	for(var i=0; i<V.length, i++)
	{
		p=p+"v"+i+": x="+V[i][0]+" y="+V[i][1]+"\n";
	}

	p=p+"\n";
	p=p+"Facce 2D:\n";
	for(var i=0; i<FV.length, i++)
	{
		for(var i=0; i<FV.length, i++)
		{
			
		}

	}

	return p;

}

