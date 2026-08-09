# Проверки

Проверки описываются как отдельные сущности в папке:

```text
src/features/checker/model/checks/<check-name>/
  config.ts
  schema.ts
```

`schema.ts` отвечает за валидацию полей формы через Zod.

`config.ts` отвечает за UI формы и тело запроса:

- `id` - строковый идентификатор проверки.
- `title` - название проверки.
- `endpoint` - backend endpoint.
- `fields` - поля формы, если у проверки один режим.
- `modes` - вкладки формы, если у проверки несколько режимов.
- `schema` - схема валидации для обычной формы.
- `buildSubjectBody` - функция, которая собирает `subjectBody` для API.

Форма отправляет:

```ts
{ subjectBody: { ... } }
```

Для проверок с режимами:

```ts
{ type: "mode_id", subjectBody: { ... } }
```

## Как работает текущий поток

1. Страница проверки рендерит клиентский компонент:

```tsx
<CheckFormById configId="gibdd" />
```

2. `CheckFormById` находит нужный config по `configId`.

3. `CheckForm` строит поля или табы по config.

4. При отправке формы:

```ts
schema.safeParse(values)
```

5. Если данные валидны, собирается тело:

```ts
buildCheckSubjectBody(config, values, activeMode)
```

6. Запрос уходит в:

```ts
startCheck(config.endpoint, body)
```

## Проверка без режимов

Пример: ГИБДД.

```ts
export const gibddConfig: CheckConfig = {
  id: "gibdd",
  title: "Транспорт",
  endpoint: "/checks/gibdd",
  fields: [
    {
      name: "vin",
      label: "VIN",
      placeholder: "Введите VIN",
    },
  ],
  schema: gibddSchema,
  buildSubjectBody: (values) => ({ vin: pickString(values, "vin") }),
};
```

Форма отправит:

```json
{
  "subjectBody": {
    "vin": "XTA..."
  }
}
```

## Проверка с режимами

Пример: ФССП.

```ts
export const fsspConfig: CheckConfig = {
  id: "fssp",
  title: "ФССП",
  endpoint: "/checks/fssp",
  modes: [
    {
      id: "fio_dob",
      label: "ФИО + дата рождения",
      fields: [
        { name: "fio", label: "ФИО" },
        { name: "dob", label: "Дата рождения" },
      ],
      schema: fioDobSchema,
      buildSubjectBody: (values) => ({
        fio: pickString(values, "fio"),
        dob: pickString(values, "dob"),
      }),
    },
  ],
};
```

Форма отправит:

```json
{
  "type": "fio_dob",
  "subjectBody": {
    "fio": "Иванов Иван Иванович",
    "dob": "01.01.1980"
  }
}
```

## Как добавить новую проверку

Пример: проверка инвалидности авто по госномеру.

### 1. Создать папку

```text
src/features/checker/model/checks/disability-car/
  config.ts
  schema.ts
```

### 2. Описать схему

`schema.ts`

```ts
import { z } from "zod";

export const disabilityCarSchema = z.object({
  plate_number: z
    .string()
    .trim()
    .min(6, "Укажите госномер")
    .max(12, "Проверьте госномер"),
});
```

### 3. Описать config

`config.ts`

```ts
import type { CheckConfig } from "../../types";
import { pickString } from "../../schemas";
import { disabilityCarSchema } from "./schema";

export const disabilityCarConfig: CheckConfig = {
  id: "disability-car",
  title: "Реестр инвалидов",
  endpoint: "/checks/disability-car",
  fields: [
    {
      name: "plate_number",
      label: "Госномер авто",
      placeholder: "А123АА777",
    },
  ],
  schema: disabilityCarSchema,
  buildSubjectBody: (values) => ({
    plate_number: pickString(values, "plate_number"),
  }),
};
```

Форма отправит:

```json
{
  "subjectBody": {
    "plate_number": "А123АА777"
  }
}
```

### 4. Добавить config в общий список

`src/features/checker/model/checks/index.ts`

```ts
import { disabilityCarConfig } from "../checks/disability-car/config";

export const checkConfigs = [
  fsspConfig,
  gibddConfig,
  gistorgiConfig,
  bankruptcyConfig,
  innConfig,
  disabilityCarConfig,
];

export {
  bankruptcyConfig,
  disabilityCarConfig,
  fsspConfig,
  gibddConfig,
  gistorgiConfig,
  innConfig,
};
```

### 5. Подключить форму на страницу

```tsx
import { CheckFormById } from "@/features/checker";

export default function DisabilityRegistryPage() {
  return <CheckFormById configId="disability-car" />;
}
```

Если на странице также нужна история, нужно добавить соответствующий `CheckModule` и схемы результата в `entities/check`.

## Типы полей

Сейчас поддерживаются:

```ts
type FieldType = "text" | "date" | "checkbox";
```

Для текстового поля `type` можно не указывать.

```ts
{
  name: "vin",
  label: "VIN",
  placeholder: "Введите VIN"
}
```

Для checkbox:

```ts
{
  name: "osago",
  label: "Запрашивать ОСАГО",
  type: "checkbox"
}
```

## Важные правила

- `name` поля должен совпадать с ключом в Zod-схеме.
- `buildSubjectBody` должен возвращать именно те поля, которые ждёт backend.
- Если есть табы, у каждого режима должны быть свои `fields`, `schema` и `buildSubjectBody`.
- Для checks с `modes` тип активного режима автоматически передаётся в поле `type`.
- Через Server -> Client нельзя передавать весь config, потому что в нём есть Zod-схемы и функции. На страницах используй только `CheckFormById configId="..."`.
