#!/bin/bash

# Número de repeticiones
REPEAT=100

# Archivos a subir
FILES=("./files/Factura.xml" "./files/factura2.xml")

# URL del servidor
URL="http://localhost:3000/api/products/uploadXML"

# Inicializamos contadores y métricas
success_count=0
fail_count=0
total_time=0
min_time=1000000  # Inicializar con un número grande
max_time=0
timings=()  # Array para almacenar los tiempos de respuesta

# Archivo de log
LOG_FILE="audit_test_performance.log"
echo "Iniciando la prueba de carga" > "$LOG_FILE"

# Función para subir el archivo y capturar el estado
upload_file() {
  for FILE in "${FILES[@]}"; do
    # Realizar la subida y capturar código de estado HTTP y tiempo de subida
    start_time=$(date +%s%3N)  # Tiempo en milisegundos
    http_status=$(curl -X POST "$URL" -F "file=@$FILE" -s -o /dev/null -w "%{http_code}")
    end_time=$(date +%s%3N)
    elapsed_time=$((end_time - start_time))  # Tiempo de subida en milisegundos

    # Sumar el tiempo total
    total_time=$((total_time + elapsed_time))
    timings+=($elapsed_time)  # Almacenar el tiempo

    # Verificar el código de estado HTTP para éxito o fallo
    if [ "$http_status" -eq 200 ]; then
      ((success_count++))
      log_message="Petición: $i - $http_status $elapsed_time ms (Archivo: $FILE) - Éxito"
      echo "$log_message" >> "$LOG_FILE"
    else
      ((fail_count++))
      log_message="Petición: $i - $http_status $elapsed_time ms (Archivo: $FILE) - Fallo"
      echo "$log_message" >> "$LOG_FILE"
    fi

    # Actualizar min y max
    if [ $elapsed_time -lt $min_time ]; then
      min_time=$elapsed_time
    fi
    if [ $elapsed_time -gt $max_time ]; then
      max_time=$elapsed_time
    fi
  done
}

# Repetir el proceso de subida secuencialmente
for ((i=1; i<=REPEAT; i++)); do
  upload_file  # Ejecutar las subidas secuencialmente
done

# Mostrar las métricas finales solo en la consola
average_time=$((total_time / (REPEAT * ${#FILES[@]})))
success_rate=$((success_count * 100 / (success_count + fail_count)))

echo "-------------------"
echo "MÉTRICAS FINALES"
echo "-------------------"
echo "Total de subidas exitosas: $success_count"
echo "Total de subidas fallidas: $fail_count"
echo "Tasa de éxito: $success_rate%"
echo "Tiempo total: ${total_time} ms"
echo "Promedio de tiempo por subida: ${average_time} ms"
echo "Tiempo mínimo de subida: ${min_time} ms"
echo "Tiempo máximo de subida: ${max_time} ms"

# Mensaje final
echo "Registro completo en $LOG_FILE"
