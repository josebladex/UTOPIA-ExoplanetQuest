# Definir las constantes
SNR0 = 100  # Relación señal-ruido inicial
R_star = 1  # Radio de la estrella (asumido como el Sol) [R_sun]
RP = 1  # Radio del planeta (asumido como la Tierra) [R_Earth]
PS = 1  # Distancia planeta-estrella (asumido como la distancia Tierra-Sol) [AU]
ES = 10  # Distancia al sistema planetario (asumido 10 parsecs) [pc]
ESmax = 15  # Distancia máxima donde se puede separar el planeta

# Función para calcular el SNR para un diámetro de telescopio dado
def calcular_snr(D, ES=10):
    # Fórmula del SNR según el enunciado
    snr = SNR0 * ((R_star * RP * (D / 6)) / ((ES / 10) * PS)) ** 2
    return snr

# Función para verificar si el exoplaneta es separable de su estrella
def es_separable(D, PS, ESmax):
    # Fórmula para la distancia máxima donde puede separarse el planeta de la estrella
    es_separacion = ESmax * (D / 6) / PS
    return es_separacion >= ES

# Función principal para determinar exoplanetas caracterizables
def exoplanetas_caracterizables(tamaños_telescopio, PS):
    resultados = []
    for D in tamaños_telescopio:
        snr = calcular_snr(D)
        separable = es_separable(D, PS, ESmax)
        
        if snr > 5 and separable:
            resultados.append((D, snr, separable))
    
    return resultados

# Ejecutar la app con diámetros de telescopio entre 5 y 15 metros
tamaños_telescopio = range(5, 16)  # Diámetros entre 5 y 15 metros
PS_actual = 1  # Distancia Tierra-Sol [AU]

resultados = exoplanetas_caracterizables(tamaños_telescopio, PS_actual)

# Mostrar resultados
for resultado in resultados:
    print(f"Diámetro del telescopio: {resultado[0]} m")
    print(f"SNR: {resultado[1]:.2f}")
    print(f"Es separable: {'Sí' if resultado[2] else 'No'}")
    print("-" * 30)
