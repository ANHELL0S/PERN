#!/bin/bash

# Configuración
URL="http://localhost:3000/api/auth/signin"  # URL del login
LOG_FILE="auth_sql_injection_test_known_id.log"  # Archivo para guardar resultados
IDENTIFICATION="0201985009"  # Identificación conocida

# Colores para la salida
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'  # Sin color

# Payloads de inyección SQL en el campo de contraseña
SQL_PAYLOADS=(
  "' OR 1=1 --"  # Bypass básico
  "' OR 'a'='a"  # Bypass con texto
  "'; DROP TABLE users; --"  # Intento de eliminación de tabla
  "' OR '1'='1' AND SLEEP(5)--"  # Inyección basada en tiempo
  "' UNION SELECT null, version(), null --"  # Inyección UNION para obtener la versión de la DB
  "' AND 1=(SELECT COUNT(*) FROM information_schema.tables)--"  # Inyección ciega de información de tablas
  "' AND (SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END)--"  # Inyección condicional
)

# Limpiar el archivo de log al inicio
echo "Iniciando pruebas avanzadas de inyección SQL con identification_card conocida ($IDENTIFICATION)..." > "$LOG_FILE"

# Mensaje inicial
echo -e "${BLUE}Iniciando pruebas avanzadas con identificación conocida: ${IDENTIFICATION}${NC}"

# Iniciar prueba con los payloads
for PAYLOAD in "${SQL_PAYLOADS[@]}"; do
  echo -e "${YELLOW}Probando payload SQL en contraseña: ${PAYLOAD}${NC}" | tee -a "$LOG_FILE"
  
  # Enviar la solicitud con la identificación conocida y el payload SQL en la contraseña
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$URL" \
    -H "Content-Type: application/json" \
    -d '{"identification_card": "'"$IDENTIFICATION"'", "password": "'"$PAYLOAD"'"}')
  
  # Verificar la respuesta
  if [ "$RESPONSE" -eq 200 ]; then
    echo -e "${RED}Vulnerabilidad detectada: Payload SQL en contraseña (${PAYLOAD})${NC}" | tee -a "$LOG_FILE"
    echo "Vulnerabilidad detectada con payload SQL en contraseña: ${PAYLOAD}" >> "$LOG_FILE"
  elif [ "$RESPONSE" -eq 500 ]; then
    echo -e "${RED}Error interno del servidor con payload (${PAYLOAD}), posible vulnerabilidad${NC}" | tee -a "$LOG_FILE"
    echo "Error interno del servidor con payload SQL: ${PAYLOAD}" >> "$LOG_FILE"
  else
    echo -e "${GREEN}Protección activa. Payload: ${PAYLOAD} (Código: $RESPONSE)${NC}" | tee -a "$LOG_FILE"
    echo "Protección activa. Payload: ${PAYLOAD} (Código: $RESPONSE)" >> "$LOG_FILE"
  fi
done

echo -e "${BLUE}Pruebas con identificación conocida finalizadas. Resultados guardados en ${LOG_FILE}${NC}"
