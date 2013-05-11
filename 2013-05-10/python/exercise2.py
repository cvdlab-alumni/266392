##########################################################################################
#                                                                                        #
#                                 HOMEWORK 2013-05-10                                    #
#                                                                                        #
#  Exercise2.py                                                                          #
#                                                                                        #
#  Federico Mione matr.266392                                                            #
##########################################################################################
from pyplasm import *

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
VIEW(model)