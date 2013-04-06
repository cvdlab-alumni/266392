
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

#Scheletro maison

building = STRUCT([pillars0,pillars1,pillars2,pillars3])

VIEW(building)
