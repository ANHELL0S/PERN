#!/bin/bash

# Configuración
BASE_URL="http://localhost:3000/api"  # Cambia esto a la URL base que deseas probar
LOG_FILE="audit_security_test.log"  # Archivo de log para guardar resultados

# Colores para la salida
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'  # Sin color

# Mensaje inicial
echo -e "${BLUE}Iniciando pruebas de seguridad...${NC}\n" | tee "$LOG_FILE"
echo -e "${YELLOW}--------------------------------------------------${NC}\n" >> "$LOG_FILE"

# Limpiar el archivo de log al inicio
echo "Iniciando pruebas de seguridad..." >> "$LOG_FILE"

# Función para probar el acceso a los endpoints
function test_endpoint {
  local url=$1
  local expected_status=$2
  local method=${3:-GET}

  echo -e "${YELLOW}Probando $method en $url...${NC}" | tee -a "$LOG_FILE"
  RESPONSE=$(curl -X "$method" -s -o /dev/null -w "%{http_code}" "$url")

  if [ "$RESPONSE" -eq "$expected_status" ]; then
    echo -e "${GREEN}Acceso como se esperaba: $RESPONSE - La API responde correctamente.${NC}\n" | tee -a "$LOG_FILE"
  else
    echo -e "${RED}Error: Se esperaba $expected_status, se obtuvo: $RESPONSE - Respuesta inesperada.${NC}\n" | tee -a "$LOG_FILE"
    echo -e "${RED}Vulnerabilidad detectada en $url.${NC}\n" | tee -a "$LOG_FILE"
  fi
}

# Probar una solicitud válida en el endpoint de productos
test_endpoint "$BASE_URL/products/" 200

# Probar inyección SQL
INJECTION_PAYLOAD="'; SELECT * FROM products; --"
echo -e "${YELLOW}Probando inyección SQL en: ${BASE_URL}/products/${NC}" | tee -a "$LOG_FILE"
RESPONSE=$(curl -X GET -s -o /dev/null -w "%{http_code}" "${BASE_URL}/products/?payload=$INJECTION_PAYLOAD")
if [ "$RESPONSE" -eq 200 ]; then
  echo -e "${RED}Inyección SQL exitosa: $RESPONSE - La API no se protegió contra inyección SQL.${NC}\n" | tee -a "$LOG_FILE"
else
  echo -e "${GREEN}Inyección SQL fallida, respuesta: $RESPONSE - La API parece tener alguna protección.${NC}\n" | tee -a "$LOG_FILE"
fi

# Probar acceso no autorizado a endpoints privados
PRIVATE_ENDPOINTS=(
  "$BASE_URL/sale/"
  "$BASE_URL/users/"
  "$BASE_URL/ticket/"
  "$BASE_URL/client/"
  "$BASE_URL/kardex/"
  "$BASE_URL/profile/"
  "$BASE_URL/settings/"
  "$BASE_URL/economic/"
  "$BASE_URL/suppliers/"
  "$BASE_URL/notification/"
  "$BASE_URL/bill-product/"
  "$BASE_URL/services-digital/"
)

for endpoint in "${PRIVATE_ENDPOINTS[@]}"; do
  test_endpoint "$endpoint" 401  # Se espera 401 para acceso no autorizado
done

# Probar acceso a recursos protegidos sin autenticación
for endpoint in "${PRIVATE_ENDPOINTS[@]}"; do
  echo -e "${YELLOW}Probando acceso a recursos protegidos sin autenticación en: $endpoint${NC}" | tee -a "$LOG_FILE"
  RESPONSE=$(curl -X GET -s -o /dev/null -w "%{http_code}" "$endpoint")
  if [ "$RESPONSE" -eq 403 ]; then
    echo -e "${GREEN}Acceso prohibido como se esperaba: $RESPONSE - La API protege los recursos.${NC}\n" | tee -a "$LOG_FILE"
  else
    echo -e "${RED}Error: Se esperaba 403, se obtuvo: $RESPONSE - La API permite acceso a recursos protegidos.${NC}\n" | tee -a "$LOG_FILE"
    echo -e "${RED}Vulnerabilidad detectada: Acceso a recursos protegidos sin autenticación en $endpoint${NC}\n" | tee -a "$LOG_FILE"
  fi
done

# Probar inyecciones en cada endpoint
for endpoint in "${PRIVATE_ENDPOINTS[@]}"; do
  echo -e "${YELLOW}Probando inyección SQL en: $endpoint${NC}" | tee -a "$LOG_FILE"
  RESPONSE=$(curl -X GET -s -o /dev/null -w "%{http_code}" "${endpoint}?payload=$INJECTION_PAYLOAD")
  if [ "$RESPONSE" -eq 200 ]; then
    echo -e "${RED}Inyección SQL exitosa en $endpoint: $RESPONSE - La API no se protegió.${NC}\n" | tee -a "$LOG_FILE"
  else
    echo -e "${GREEN}Inyección SQL fallida en $endpoint, respuesta: $RESPONSE - La API parece tener alguna protección.${NC}\n" | tee -a "$LOG_FILE"
  fi
done

# Probar XSS (Cross-Site Scripting)
XSS_PAYLOAD="<script>alert('XSS');</script>"
for endpoint in "${PRIVATE_ENDPOINTS[@]}"; do
  echo -e "${YELLOW}Probando XSS en: $endpoint${NC}" | tee -a "$LOG_FILE"
  RESPONSE=$(curl -X POST -s -o /dev/null -w "%{http_code}" -d "payload=$XSS_PAYLOAD" "$endpoint")
  if [[ "$RESPONSE" -eq 200 ]]; then
    echo -e "${RED}XSS exitoso en $endpoint: $RESPONSE - La API no se protegió contra XSS.${NC}\n" | tee -a "$LOG_FILE"
  else
    echo -e "${GREEN}XSS fallido en $endpoint, respuesta: $RESPONSE - La API parece tener alguna protección.${NC}\n" | tee -a "$LOG_FILE"
  fi
done

# Mensaje final
echo -e "${YELLOW}--------------------------------------------------${NC}\n" | tee -a "$LOG_FILE"
echo -e "${BLUE}Finalizando pruebas de seguridad. Resultados registrados en ${LOG_FILE}.${NC}\n" | tee -a "$LOG_FILE"
