# Base Components

Базовые компоненты - самые простые переиспользуемые элементы интерфейса.

`BaseButton.vue`

Первая кнопка Graphene.
Поддерживает варианты `primary` и `secondary`, размеры `sm`, `md`, `lg`, состояние `disabled`.

Компонент использует семантические токены и не задает скругление по умолчанию.

`BaseInput.vue`

Базовое поле ввода Graphene.
Поддерживает размеры `sm`, `md`, `lg`, состояния `default`, `hover`, `focused`, `filled`, `invalid`, `disabled`, label и helper text.

Для правой зоны действия поддерживает slot `trailing`.
