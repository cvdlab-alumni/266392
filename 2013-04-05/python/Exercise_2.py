
#--------CITROHAN MAISON--------

#---definizione pilastri piano terra

#pilastri esterni piano terra
pilastro1 = STRUCT(NN(5)([CYLINDER([1.25,25])(64),T([1])([27.5])]))
pilastro2 = T([1,2])([110,52.5])(CYLINDER([1.25,25])(64))

externalPillars = STRUCT([pilastro1,pilastro2])

#pilastri interni piano terra
pilastro3 = T([2])([52.5])(CYLINDER([1.25,25])(64))

pilastro4 = INSR(PROD)(AA(QUOTE)([[-26.25,2.5,-25,2.5,-25,2.5],[-51.25,2.5],[25]]))
internalPillars = STRUCT([pilastro3,pilastro4])

pillars0 = STRUCT([externalPillars,internalPillars])


#---definizione pilastri primo piano

pilastro5 = INSR(PROD)(AA(QUOTE)([[2.5,-25,2.5,-25,2.5,-25,2.5,-25,2.5],[2.5],[25]]))
pilastro6 = INSR(PROD)(AA(QUOTE)([[2.5,-25,2.5,-25,2.5,-25,-2.5,-25,2.5],[-2.5,-50,2.5],[25]]))
pilastro7 = T([1,2])([83.75,53.75])(CYLINDER([1.25,25])(64))

pillars1 = T([1,2,3])([-1.25,-1.25,25])(STRUCT([pilastro5,pilastro6,pilastro7]))


#---definizione pilastri secondo piano

pilastro8 = INSR(PROD)(AA(QUOTE)([[2.5,-25,2.5,-25,2.5,-25,-2.5,-25,2.5],[2.5],[25]]))
pilastro9 = INSR(PROD)(AA(QUOTE)([[2.5,-25,2.5,-25,2.5,-25,2.5,-25,2.5],[-2.5,-50,2.5],[25]]))

pillars2 = T([1,2,3])([-1.25,-1.25,50])(STRUCT([pilastro8,pilastro9]))


#---definizione pilastri terzo piano

pilastro10 = INSR(PROD)(AA(QUOTE)([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5],[2.5],[25]]))
pilastro11 = INSR(PROD)(AA(QUOTE)([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5],[-2.5,-50,2.5],[25]]))
pilastro12 = INSR(PROD)(AA(QUOTE)([[1.5,-26.5,1.5],[-53.5,1.5],[25]]))

pillars3 = T([1,2,3])([-1.25,-1.25,75])(STRUCT([pilastro10,pilastro11,pilastro12]))


#---pillars

pillars = STRUCT([pillars0,pillars1,pillars2,pillars3])

# definizione solaio piano terra

floor0a = INSR(PROD)(AA(QUOTE)([[-14.5,70.5],[-22.15,-1.25,26.6,7.5,9.5],[2]]))
floor0b = INSR(PROD)(AA(QUOTE)([[-14.5,12],[-19.4,4],[2]]))
floor0c = INSR(PROD)(AA(QUOTE)([[-14.5,-70.5,10.12],[-1.25,-22.15,-17.5,26.1],[2]]))
floor0d = T([1,2])([95.12,53.95])(CYLINDER([13.05,2])(64))
floor0e = T([1,2])([20.5,19.4])(CYLINDER([6,2])(64))

floor0 = T([1,2])([-1.25,-1.25])(STRUCT([floor0a,floor0b,floor0c, floor0d, floor0e]))

# definizione solaio primo piano
floor1a = INSR(PROD)(AA(QUOTE)([[112.5],[2.5,16.5],[3]]))
floor1b = INSR(PROD)(AA(QUOTE)([[8,35.3,-16,53.2],[-2.5,-16.5,17],[3]]))
floor1c = INSR(PROD)(AA(QUOTE)([[112.5],[-2.5,-16.5,-17,18],[3]]))
floor1d = INSR(PROD)(AA(QUOTE)([[25.28,-35.2,52.02],[-2.5,-16.5,-17,-18,10.5,2.5],[3]]))

balcone = T([1,3])([-11.5,1.04])(INSR(PROD)(AA(QUOTE)([[11.5],[-2.5,-50,10.7],[1.96]])))

floor1 = T([1,2,3])([-1.25,-1.25,25])(STRUCT([floor1a,floor1b,floor1c,floor1d,balcone]))


# definizione solaio secondo piano
floor2D = MKPOL([[[57.5,2.5],[112.5,0],[112.5,67],[46.98,67],[46.98,53.75]],[[1,2,3],[1,3,5],[3,4,5]],None])
floor2a = PROD([floor2D,Q(3)])

floor2 = T([1,2,3])([-1.25,-1.25,50])(floor2a)

# definizione solaio terzo piano
floor3a = INSR(PROD)(AA(QUOTE)([[112.5],[55],[3]]))
floor3b = INSR(PROD)(AA(QUOTE)([[55,2.5,-30.5,24.5],[-55,9.5],[3]]))
floor3c = INSR(PROD)(AA(QUOTE)([[112.5],[-64.5,2.5],[3]]))
floor3 = T([1,2,3])([-1.25,-1.25,75])(STRUCT([floor3a,floor3b,floor3c]))

# definizione solaio tetto

roof1 = INSR(PROD)(AA(QUOTE)([[-55,57.5],[67],[5.04]]))
roof2 = INSR(PROD)(AA(QUOTE)([[55],[-53.5,13.5],[5.04]]))

floor4 = T([1,2,3])([-1.25,-1.25,100])(STRUCT([roof1,roof2]))

#---floors

floors = STRUCT([floor0, floor1, floor2, floor3, floor4])

#Scheletro maison

building = STRUCT([pillars,floors])

VIEW(building)
