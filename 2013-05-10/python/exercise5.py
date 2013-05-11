
from pyplasm import *


##########################################################################################
#                                                                                        #
#                                 HOMEWORK 2013-05-10                                    #
#                                                                                        #
#  Exercise2.py                                                                          #
#                                                                                        #
#  Federico Mione matr.266392                                                            #
##########################################################################################

domain = INTERVALS(1)(30)

# Proiezioni piano x-y (z=0)
xy1 = BEZIER(S1)([[8.7,0],[8.7,5],[6.4,3.8],[4.9,3.85]])
xy2 = BEZIER(S1)([[4.9,3.85],[1.8,3.7],[-0.7,3.6],[-5.3,3.65]])
xy3 = BEZIER(S1)([[-5.3,3.65],[-7.9,3.35],[-8.4,3.05],[-8.7,0]])
pro_half_sup_x_y = STRUCT([MAP(xy1)(domain),MAP(xy2)(domain),MAP(xy3)(domain)])
pro_half_inf_x_y = R([2,3])(PI)(pro_half_sup_x_y)
pro_x_y = STRUCT([pro_half_sup_x_y,pro_half_inf_x_y])

# Proiezioni piano y-z
yz1 = BEZIER(S1)([[0,0,-2],[0,1.8,-2]])
yz2 = BEZIER(S1)([[0,1.8,-2],[0,2.1,-1.8]])
yz3 = BEZIER(S1)([[0,2.1,-1.8],[0,2.4,-1.6],[0,3.9,-2.4],[0,3.67,0]])
yz4 = BEZIER(S1)([[0,3.67,0],[0,3.8,1],[0,3.1,0.95],[0,3,1.15]])
yz5 = BEZIER(S1)([[0,3,1.15],[0,2.05,2.3],[0,2.05,2.1],[0,0,2.2]])
pro_half_dx_y_z = STRUCT([MAP(yz1)(domain),MAP(yz2)(domain),MAP(yz3)(domain),MAP(yz4)(domain),MAP(yz5)(domain)])
pro_half_sx_y_z = R([1,2])(PI)(pro_half_dx_y_z)
pro_y_z = STRUCT([pro_half_dx_y_z,pro_half_sx_y_z])

# Proiezioni piano x-z
xz1 = BEZIER(S1)([[-8.7,0,-0.65],[-7.1,0,0],[-5.7,0,0.6],[-4,0,0.7]])
xz2 = BEZIER(S1)([[-4,0,0.7],[0,0,2.4],[-0.1,0,2.7],[8.05,0,1]])
xz3 = BEZIER(S1)([[8.05,0,1],[8.8,0,1.05],[8.3,0,0.3],[8.8,0,-0.3]])
xz4 = BEZIER(S1)([[8.8,0,-0.3],[8.9,0,-1.4],[8.25,0,-1.95],[7.3,0,-1.9]])
xz5 = BEZIER(S1)([[7.3,0,-1.9],[7.2,0,-0.7],[6.8,0,0.05],[5.6,0,0.1]])
xz6 = BEZIER(S1)([[5.6,0,0.1],[4.6,0,-0.1],[4.15,0,-0.8],[4.1,0,-2]])
xz7 = BEZIER(S1)([[4.1,0,-2],[1.5,0,-2.2],[-0.6,0,-2.15],[-3,0,-2.1]])
xz8 = BEZIER(S1)([[-3,0,-2.1],[-2.6,0,-1.45],[-3.1,0,0],[-4.4,0,0.1]])
xz9 = BEZIER(S1)([[-4.4,0,0.1],[-5.7,0,-0.05],[-6,0,-1.15],[-5.9,0,-1.9]])
xz10 = BEZIER(S1)([[-5.9,0,-1.9],[-8,0,-2.15],[-8.6,0,-1.85],[-8.7,0,-0.65]])
pro_x_z = STRUCT([MAP(xz1)(domain),MAP(xz2)(domain),MAP(xz3)(domain),MAP(xz4)(domain),MAP(xz5)(domain),MAP(xz6)(domain),MAP(xz7)(domain),MAP(xz8)(domain),MAP(xz9)(domain),MAP(xz10)(domain)])

model = STRUCT([pro_x_y,pro_y_z,pro_x_z])
#VIEW(model)

##########################################################################################
#                                                                                        #
#                                 HOMEWORK 2013-05-10                                    #
#                                                                                        #
#  Exercise3.py                                                                          #
#                                                                                        #
#  Federico Mione matr.266392                                                            #
##########################################################################################

def cilindro(r, R, h) : 
	def origin(coordinate) :
		x,y,z = coordinate
		dom2D = PROD([INTERVALS(2*PI)(64), DIFFERENCE([INTERVALS(R)(1),INTERVALS(r)(1)])])
		def mapping (v) : 
			a = v[0]
			r = v[1]
			return [r*COS(a), r*SIN(a)]		
		model1 = PROD([MAP(mapping)(dom2D),Q(h/2)])
		model2 = PROD([MAP(mapping)(dom2D),Q(-h/2)])
		struct_model = STRUCT([model1,model2])
		result=TRANSLATE([1,2,3])([x,y,z])(struct_model)
		return result
	return origin

def cerchione(origin):
	x,y,z=origin
	def cilExt(cilindroExt):
		r,R,h=cilindroExt
		def mozzo(cilindroInt):
			rin,Rin,hin=cilindroInt	
			cilinInt=cilindro(rin,Rin,hin)([x,y,h/2-h/10])
			cilindroExtern=cilindro(r,R,h)([x,y,z])
			struct_model = STRUCT([cilinInt,cilindroExtern])
			return struct_model
		return mozzo
	return cilExt




def tyre (centro):
	x,y,z = centro
	def raggio(raggi):
		rin,rout = raggi
		def aperturaInt(apertura):
			a = apertura
			def spessore(spessori):
				c,d = spessori
				def subdivision(sub):
					N = sub
					k = 1.6568
					domain = INTERVALS(1)(sub)
					dom2D = PROD([domain,domain])
					c1 = CUBICHERMITE(S1)([[x+rin,y,z+a],[x,y+rin,z+a],[0,+k*rin,0],[-k*rin,0,0]]) # 1° quadrante
					c2 = CUBICHERMITE(S1)([[x+rin,y,z+a],[x,y-rin,z+a],[0,-k*rin,0],[-k*rin,0,0]]) # 2° quadrante
					c3 = CUBICHERMITE(S1)([[x-rin,y,z+a],[x,y-rin,z+a],[0,-k*rin,0],[+k*rin,0,0]]) # 3° quadrante
					c4 = CUBICHERMITE(S1)([[x-rin,y,z+a],[x,y+rin,z+a],[0,+k*rin,0],[+k*rin,0,0]]) # 4° quadrante
					c5 = CUBICHERMITE(S1)([[x+rout,y,z],[x,y+rout,z],[0,+k*rout,0],[-k*rout,0,0]]) # 1° quadrante
					c6 = CUBICHERMITE(S1)([[x+rout,y,z],[x,y-rout,z],[0,-k*rout,0],[-k*rout,0,0]]) # 2° quadrante
					c7 = CUBICHERMITE(S1)([[x-rout,y,z],[x,y-rout,z],[0,-k*rout,0],[+k*rout,0,0]]) # 3° quadrante
					c8 = CUBICHERMITE(S1)([[x-rout,y,z],[x,y+rout,z],[0,+k*rout,0],[+k*rout,0,0]]) # 4° quadrante
					c9 = CUBICHERMITE(S1)([[x+rin,y,z-a],[x,y+rin,z-a],[0,+k*rin,0],[-k*rin,0,0]]) # 1° quadrante
					c10 = CUBICHERMITE(S1)([[x+rin,y,z-a],[x,y-rin,z-a],[0,-k*rin,0],[-k*rin,0,0]]) # 2° quadrante
					c11 = CUBICHERMITE(S1)([[x-rin,y,z-a],[x,y-rin,z-a],[0,-k*rin,0],[+k*rin,0,0]]) # 3° quadrante
					c12 = CUBICHERMITE(S1)([[x-rin,y,z-a],[x,y+rin,z-a],[0,+k*rin,0],[+k*rin,0,0]]) # 4° quadrante
					sup1a = CUBICHERMITE(S2)([c1,c5,[0,0,c],[0,0,-d]])
					sup2a = CUBICHERMITE(S2)([c2,c6,[0,0,c],[0,0,-d]])
					sup3a = CUBICHERMITE(S2)([c3,c7,[0,0,c],[0,0,-d]])
					sup4a = CUBICHERMITE(S2)([c4,c8,[0,0,c],[0,0,-d]])
					sup1b = CUBICHERMITE(S2)([c9,c5,[0,0,-c],[0,0,d]])
					sup2b = CUBICHERMITE(S2)([c10,c6,[0,0,-c],[0,0,d]])
					sup3b = CUBICHERMITE(S2)([c11,c7,[0,0,-c],[0,0,d]]) 
					sup4b = CUBICHERMITE(S2)([c12,c8,[0,0,-c],[0,0,d]])
					struct_superficie = STRUCT([MAP(sup1a)(dom2D), MAP(sup2a)(dom2D), MAP(sup3a)(dom2D), MAP(sup4a)(dom2D),MAP(sup1b)(dom2D), MAP(sup2b)(dom2D), MAP(sup3b)(dom2D), MAP(sup4b)(dom2D)])
					return struct_superficie
				return subdivision
			return spessore
		return aperturaInt
	return raggio

domain = INTERVALS(1)(30)
dom2D = PROD([domain,domain])
#definizione ruote posteriori
ruota =tyre([0,0,0])([1,1.3])(0.7)([1,2])(20)
cc = cerchione([0,0,0])([0.95,1.10,1.5])([0.05,0.25,0.15])
rag1a=BEZIER(S1)([[0.2,-0.1,0.65],[0.2,-0.1,0.8],[0.5,-0.1,0.8],[1.00,-0.1,0.55]])
rag1b=BEZIER(S1)([[0.2,0.1,0.65],[0.2,0.1,0.8],[0.5,0.1,0.8],[1.00,0.1,0.55]])
rag1c=BEZIER(S1)([[0.2,-0.1,0.55],[0.2,-0.1,0.7],[0.5,-0.1,0.7],[1.00,-0.1,0.45]])
rag1d=BEZIER(S1)([[0.2,0.1,0.55],[0.2,0.1,0.7],[0.5,0.1,0.7],[1.00,0.1,0.45]])
sup_rag1a=BEZIER(S2)([rag1a,rag1b])
sup_rag1b=BEZIER(S2)([rag1c,rag1d])
sup_rag1c=BEZIER(S2)([rag1a,rag1c])
sup_rag1d=BEZIER(S2)([rag1b,rag1d])
razza1=STRUCT([MAP(sup_rag1a)(dom2D),MAP(sup_rag1b)(dom2D),MAP(sup_rag1c)(dom2D),MAP(sup_rag1d)(dom2D)])
razza2= R([1,2])(2*PI/5)(razza1)
razza3= R([1,2])(2*PI/5)(razza2)
razza4= R([1,2])(2*PI/5)(razza3)
razza5= R([1,2])(2*PI/5)(razza4)
razze = STRUCT([razza1,razza2,razza3,razza4,razza5])
ruota_post = STRUCT([COLOR(BLACK)(ruota),cc,razze])
ruota_post_sx = TRANSLATE([1,2,3])([5.6,-3.2,-1.2])(R([2,3])(PI/2)(ruota_post))
ruota_post_dx = TRANSLATE([1,2,3])([5.6,3.2,-1.2])(R([2,3])(-PI/2)(ruota_post))
#definizione ruote anteriori
ruota_ant =tyre([0,0,0])([1,1.3])(0.5)([1,2])(20)
cc_ant = cerchione([0,0,0])([0.95,1.10,1.25])([0.05,0.25,0.15])
rag1a=BEZIER(S1)([[0.2,-0.1,0.55],[0.2,-0.1,0.7],[0.5,-0.1,0.7],[1.00,-0.1,0.45]])
rag1b=BEZIER(S1)([[0.2,0.1,0.55],[0.2,0.1,0.7],[0.5,0.1,0.7],[1.00,0.1,0.45]])
rag1c=BEZIER(S1)([[0.2,-0.1,0.45],[0.2,-0.1,0.6],[0.5,-0.1,0.6],[1.00,-0.1,0.35]])
rag1d=BEZIER(S1)([[0.2,0.1,0.45],[0.2,0.1,0.6],[0.5,0.1,0.6],[1.00,0.1,0.35]])
sup_rag1a=BEZIER(S2)([rag1a,rag1b])
sup_rag1b=BEZIER(S2)([rag1c,rag1d])
sup_rag1c=BEZIER(S2)([rag1a,rag1c])
sup_rag1d=BEZIER(S2)([rag1b,rag1d])
razza1=STRUCT([MAP(sup_rag1a)(dom2D),MAP(sup_rag1b)(dom2D),MAP(sup_rag1c)(dom2D),MAP(sup_rag1d)(dom2D)])
razza2= R([1,2])(2*PI/5)(razza1)
razza3= R([1,2])(2*PI/5)(razza2)
razza4= R([1,2])(2*PI/5)(razza3)
razza5= R([1,2])(2*PI/5)(razza4)
razze_ant = STRUCT([razza1,razza2,razza3,razza4,razza5])
ruota_ant = STRUCT([COLOR(BLACK)(ruota_ant),cc_ant,razze_ant])
ruota_ant_sx = TRANSLATE([1,2,3])([-4.5,-3.1,-1.2])(R([2,3])(PI/2)(ruota_ant))
ruota_ant_dx = TRANSLATE([1,2,3])([-4.5,3.1,-1.2])(R([2,3])(-PI/2)(ruota_ant))

ruote=STRUCT([ruota_post_sx,ruota_post_dx,ruota_ant_dx,ruota_ant_sx])
model_ruot=STRUCT([model,ruote])

VIEW(model_ruot)

##########################################################################################
#                                                                                        #
#                                 HOMEWORK 2013-05-10                                    #
#                                                                                        #
#  Exercise4.py                                                                          #
#                                                                                        #
#  Federico Mione matr.266392                                                            #
##########################################################################################

def cilin(r, R, h) : 
	def origin(coordinate) :
		x,y,z = coordinate
		dom2D = PROD([INTERVALS(2*PI)(64), DIFFERENCE([INTERVALS(R)(1),INTERVALS(r)(1)])])
		def mapping (v) : 
			a = v[0]
			r = v[1]
			return [r*COS(a), r*SIN(a)]		
		model1 = PROD([MAP(mapping)(dom2D),Q(h/2)])
		model2 = PROD([MAP(mapping)(dom2D),Q(-h/2)])
		struct_model = STRUCT([model1,model2])
		result=TRANSLATE([1,2,3])([x,y,z])(struct_model)
		return result
	return origin


def anello (centro):
	x,y,z = centro
	def raggio(raggi):
		rin,rout = raggi
		def spessore(spessori):
			c,d = spessori
			def subdivision(sub):
				N = sub
				k = 1.6568
				domain = INTERVALS(1)(sub)
				dom2D = PROD([domain,domain])
				c1 = CUBICHERMITE(S1)([[x+rin,y,z],[x,y+rin,z],[0,+k*rin,0],[-k*rin,0,0]]) # 1° quadrante
				c2 = CUBICHERMITE(S1)([[x+rin,y,z],[x,y-rin,z],[0,-k*rin,0],[-k*rin,0,0]]) # 2° quadrante
				c3 = CUBICHERMITE(S1)([[x-rin,y,z],[x,y-rin,z],[0,-k*rin,0],[+k*rin,0,0]]) # 3° quadrante
				c4 = CUBICHERMITE(S1)([[x-rin,y,z],[x,y+rin,z],[0,+k*rin,0],[+k*rin,0,0]]) # 4° quadrante
				c5 = CUBICHERMITE(S1)([[x+rout,y,z],[x,y+rout,z],[0,+k*rout,0],[-k*rout,0,0]]) # 1° quadrante
				c6 = CUBICHERMITE(S1)([[x+rout,y,z],[x,y-rout,z],[0,-k*rout,0],[-k*rout,0,0]]) # 2° quadrante
				c7 = CUBICHERMITE(S1)([[x-rout,y,z],[x,y-rout,z],[0,-k*rout,0],[+k*rout,0,0]]) # 3° quadrante
				c8 = CUBICHERMITE(S1)([[x-rout,y,z],[x,y+rout,z],[0,+k*rout,0],[+k*rout,0,0]]) # 4° quadrante
				sup1a = CUBICHERMITE(S2)([c1,c5,[0,0,c],[0,0,-d]])
				sup2a = CUBICHERMITE(S2)([c2,c6,[0,0,c],[0,0,-d]])
				sup3a = CUBICHERMITE(S2)([c3,c7,[0,0,c],[0,0,-d]])
				sup4a = CUBICHERMITE(S2)([c4,c8,[0,0,c],[0,0,-d]])
				sup1b = CUBICHERMITE(S2)([c1,c5,[0,0,-c],[0,0,d]])
				sup2b = CUBICHERMITE(S2)([c2,c6,[0,0,-c],[0,0,d]])
				sup3b = CUBICHERMITE(S2)([c3,c7,[0,0,-c],[0,0,d]]) 
				sup4b = CUBICHERMITE(S2)([c4,c8,[0,0,-c],[0,0,d]])
				struct_superficie = STRUCT([MAP(sup1a)(dom2D), MAP(sup2a)(dom2D), MAP(sup3a)(dom2D), MAP(sup4a)(dom2D),MAP(sup1b)(dom2D), MAP(sup2b)(dom2D), MAP(sup3b)(dom2D), MAP(sup4b)(dom2D)])
				return struct_superficie
			return subdivision
		return spessore
	return raggio

domain = INTERVALS(1)(30)
dom2D = PROD([domain,domain])
cilindroInt = COLOR([0.7,0.7,0.7])(cilin(0,0.3,0.2)([0,0,-0.1]))
cilindroExt = COLOR([0.7,0.7,0.7])(cilin(0.3,0.4,0.3)([0,0,-0.1]))
rag1a=BEZIER(S1)([[0.2,-0.06,0.65],[0.2,-0.06,0.8],[0.5,-0.06,0.8],[1.00,-0.06,0.55]])
rag1b=BEZIER(S1)([[0.2,0.06,0.65],[0.2,0.06,0.8],[0.5,0.06,0.8],[1.00,0.06,0.55]])
rag1c=BEZIER(S1)([[0.2,-0.04,0.55],[0.2,-0.04,0.7],[0.5,-0.04,0.7],[1.00,-0.04,0.45]])
rag1d=BEZIER(S1)([[0.2,0.04,0.55],[0.2,0.04,0.7],[0.5,0.04,0.7],[1.00,0.04,0.45]])
sup_rag1a=BEZIER(S2)([rag1a,rag1b])
sup_rag1b=BEZIER(S2)([rag1c,rag1d])
sup_rag1c=BEZIER(S2)([rag1a,rag1c])
sup_rag1d=BEZIER(S2)([rag1b,rag1d])
raggio1= R([1,3])(PI)(STRUCT([MAP(sup_rag1a)(dom2D),MAP(sup_rag1b)(dom2D),MAP(sup_rag1c)(dom2D),MAP(sup_rag1d)(dom2D)]))
raggio2= TRANSLATE([2])([0.25])(raggio1)
raggio=TRANSLATE([2,3])([-0.12,0.55])(STRUCT([raggio1,raggio2]))
raggi = COLOR([0.7,0.7,0.7])(STRUCT(NN(3)([raggio,R([1,2])(2*PI/3)])))
anelloVol = COLOR([0.1,0.1,0.1])(anello([0,0,0.05])([1,1.2])([0.6,0.6])(20))
vol = R([1,2])(PI)(STRUCT([anelloVol,cilindroInt,cilindroExt,raggi]))
volante= S([1,2,3])([0.7,0.7,0.7])(TRANSLATE([1,2])([-2.1,-1.9])(R([1,3])(-PI/2+PI/6)(vol)))

car = STRUCT([volante,model,ruote])


##########################################################################################
#                                                                                        #
#                                 HOMEWORK 2013-05-10                                    #
#                                                                                        #
#  Exercise5.py                                                                          #
#                                                                                        #
#  Federico Mione matr.266392                                                            #
##########################################################################################

import scipy
from  scipy import*
#from lar import *  
					
def larExtrude(model,pattern):
    V,FV = model
    d = len(FV[0])
    offset = len(V)
    m = len(pattern)
    outcells = []
    for cell in FV:
        # create the indices of vertices in the cell "tube"
        tube = [v + k*offset for k in range(m+1) for v in cell]
        # take groups of d+1 elements, via shifting by one
        rangelimit = len(tube)-d
        cellTube = [tube[k:k+d+1] for k in range(rangelimit)]
        outcells += [scipy.reshape(cellTube,newshape=(m,d,d+1)).tolist()]
    outcells = AA(CAT)(TRANS(outcells))
    outcells = [group for k,group in enumerate(outcells) if pattern[k]>0 ]
    coords = list(cumsum([0]+(AA(ABS)(pattern))))
    outVerts = VERTEXTRUDE((V,coords))
    newModel = outVerts, CAT(outcells)
    return newModel


def VERTEXTRUDE((V,coords)):
    """
        Utility function to generate the output model vertices in a multiple extrusion of a LAR model.
        V is a list of d-vertices (each given as a list of d coordinates).
        coords is a list of absolute translation parameters to be applied to V in order
        to generate the output vertices.
        
        Return a new list of (d+1)-vertices.
    """
    return CAT(AA(COMP([AA(AR),DISTR]))(DISTL([V,coords])))


# Questa funzione mi permette di ottenere un dominio simpliciale(triangolare)
def GRID (args):
	model= ([[]],[[0]])
	for k,step in enumerate(args):
		model = larExtrude(model,step*[1])
	V, cells = model
	verts = AA(list)(scipy.array(V)/AA(float)(args))
	return MKPOL([verts,AA(AA(lambda h:h+1))(cells),None])


dom2D = GRID([25,25])
domain = INTERVALS(1)(60)

# Proiezioni piano x-y (z=0)
x1 = BEZIER(S1)([[-8.3,0,-0.35],[-8.1,2.5,-0.5],[-6.3,0.85,0.05],[-3.5,2.8,0.75]])
x2 = BEZIER(S1)([[-3.5,2.8,0.75],[-4.5,2.1,0.6],[-4.4,0,0.7]])
x3 = BEZIER(S1)([[-4.4,0,0.7],[-4.5,-2.1,0.6],[-3.5,-2.8,0.75]])
x4 = BEZIER(S1)([[-3.5,-2.8,0.75],[-6.3,-0.85,0.05],[-8.1,-2.5,-0.5],[-8.3,0,-0.35]])
x5 = BEZIER(S1)([[-4.4,0,0.7],[-5,0,0.7],[-7.2,0,0.1],[-8.3,0,-0.35]])
cov1a = STRUCT([MAP(x1)(domain),MAP(x2)(domain),MAP(x3)(domain),MAP(x4)(domain),MAP(x5)(domain)])

sup_cov1a=BEZIER(S2)([x5,x1,x2])

cov1=STRUCT([MAP(sup_cov1a)(dom2D)])
cover = COLOR([1,0,0])(STRUCT([cov1]))

car = STRUCT([model,cover,volante,ruote])
VIEW(car)
