# BancaKids App - Frontend

App móvil para padres que permite acompañar el aprendizaje financiero de sus hijos/as a través de una alcancía conectada (IoT). Este repositorio contiene la UI pixel-perfect del diseño en Pencil, construida como demo interactiva E2E y base de producción lista para integrar con el backend.

## Stack

- **React Native** + **Expo SDK 51** con **Expo Router** (file-based navigation, typed routes).
- **NativeWind 4** (Tailwind CSS para React Native) con tokens extraídos del archivo `.pen`.
- **TypeScript** estricto.
- **React Hook Form** para formularios con validación (Login, Cargar, Crear meta, OTP, WiFi, Perfil, Evaluación).
- **Zustand** para stores de flujo (Cargar, Celebrar, Onboarding, Intentos de misión, Sesión).
- **AsyncStorage** para gating del onboarding de primera vez.
- **phosphor-react-native** para iconografía consistente.
- **expo-linear-gradient** + `Animated` API nativa para celebraciones, pulses y confetti.

## Arquitectura de carpetas

```
app/                           Rutas (Expo Router file-based)
  (onboarding)/                Splash, Login, Yape, OTP, Prioridades, Pairing, WiFi, Celebración
  (tabs)/                      Home, Cargar, Enseñar, Monitorear (Bottom Tab Navigator)
  flujo-cargar/                Monto → Motivo → Quién envía → Confirmación → Celebración
  ejecutar-mision/[id]/        Guía Padre → Cuento → Guía Misión → Activa → Feedback → Evaluación → Insight → Completada → Redo → Práctica IA
  celebrar/                    Motivo → Modo → Cargar/Experiencia/Mensaje → Éxito
  meta/                        List + detail + crear + editar + completada + celebración (romper chanchito)
  capacidad/                   Metas de aprendizaje + detalle por capacidad
  config/                      Hub + Batería + WiFi + WiFi Manual (4 estados) + Voz + Perfil + Notificaciones + Privacidad + Ayuda
  insights/                    Historial por competencia con filtro

src/
  api/
    mocks/                     📌 Data simulada — ver sección "Para el equipo Backend"
    client.ts                  Capa de API con latencia + flag de simulación de errores
  components/                  UI primitives (Button, Card, Chip, ProgressBar, IconCircle, Logo, BottomSheet, ...) + states/
  hooks/                       useAsyncResource (loading/error/success), useOnboardingStatus
  store/                       Zustand stores por flujo
  theme/tokens.ts              Colores, radius, spacing, gradients extraídos del .pen
  types/                       Tipos compartidos (Mission, SavingGoal, Insight, Competencia, ...)
  utils/format.ts              formatCurrency (S/.), formatRelativeDate, percent
```

## Para el equipo Backend

> **Toda la data simulada está en `src/api/mocks/`.** El frontend ya consume esta data a través de `src/api/client.ts`, que expone un objeto `api` con métodos asíncronos. Cuando el backend esté listo, solo deben reemplazar el cuerpo de esas funciones por `fetch()` reales manteniendo la misma firma y tipo de retorno.

### Contrato

| Método del client | Endpoint REST sugerido | Retorno |
|-------------------|------------------------|---------|
| `api.getParent()` | `GET /me` | `Parent` |
| `api.getChild()` | `GET /child` | `Child` (con `balance` calculado) |
| `api.getTransactions()` | `GET /transactions` | `Transaction[]` |
| `api.getMissions()` | `GET /missions` | `Mission[]` |
| `api.getGoals()` | `GET /goals` | `SavingGoal[]` |
| `api.getCompetencias()` | `GET /competencies` | `Competencia[]` |
| `api.getWeeklySummary()` | `GET /summary/weekly` | `WeeklySummary` |
| `api.getInsights()` | `GET /insights` | `Insight[]` |
| `api.getNotifications()` | `GET /notifications` | `Notification[]` |
| `api.cargarDinero(amount, motivo, sender)` | `POST /transactions/charge` | `Transaction` |
| `api.login(email, password)` | `POST /auth/login` | `{ token, parent }` |

Los tipos están en `src/types/index.ts`. Los mocks respetan coherencia matemática (por ejemplo, el saldo del niño es la suma exacta de `mockTransactions`).

### Simulación de errores (QA)

`src/api/client.ts` exporta `__setFailMode(true)` para que todas las llamadas lancen `NETWORK_ERROR`. Útil para validar los estados `ErrorState` + `reload()` en cada pantalla que usa `useAsyncResource`.

### Estados del Design System

Las pantallas que cargan data implementan 4 estados mapeados del .pen:

- `<LoadingSkeleton />` — mientras `status === "loading"`
- `<ErrorState onRetry={reload} />` — en fallos
- `<EmptyState />` — cuando la respuesta es `[]`
- `<SuccessToast />` — tras acciones exitosas

## Correr en local

```bash
npm install
npx expo start          # dev server (requiere watchman instalado en macOS)
npx expo export -p web  # build estático para producción web
```

El build web genera el bundle en `dist/`. La app se puede servir con cualquier host estático (GitHub Pages, Vercel, S3 + CloudFront).

## Testing E2E manual

1. **Flujo primera vez:** login con cualquier email → Yape → OTP → Prioridades (selecciona 3) → Pairing QR → WiFi → Celebración. Al finalizar se persiste `hasCompletedOnboarding` en AsyncStorage.
2. **Flujo recurrente:** cerrar sesión desde Config → login de nuevo → saltará directo al Home.
3. **Resetear demo:** Config → "DEMO / DEV → Resetear demo" vuelve al splash limpio.
4. **Flujo Cargar:** Home → "Cargar dinero" → Monto → Motivo → Quién envía → Confirmación (1s loading) → Celebración.
5. **Flujo Misión (intento 1):** Enseñar → "Valorar el valor del dinero" → Iniciar → Guía Padre → Cuento → Guía Misión → Activa → Feedback alcancía → Feedback padre → Evaluación modal → Insight → Completada → Redo.
6. **Flujo Misión (intento 2+):** Desde Redo, elegir Cuento / Misión / Escenario IA. Los escenarios IoT rotan entre 3 variantes por intento.
7. **Romper chanchito:** Monitorear → Metas → Patines (completada) → "Romper chanchito 🎉" → confirma transferencia BCP simulada.

## Licencia

Uso interno BCP. No redistribuir.
