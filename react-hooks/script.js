'use strict';

(function () {
  'use strict';

  // =========================================================================
  // OFFICIAL REACT 19 DOCUMENTATION DATA (react.dev/reference)
  // =========================================================================
  const CATEGORIES = [
    {
      id: 'all',
      title: 'Усі хуки та API (19)',
      enTitle: 'All Built-in Hooks & APIs',
      docUrl: 'https://react.dev/reference/react/hooks',
      description:
        'Повний перелік 18 вбудованих хуків (з пакетів react та react-dom) та офіційного API use з документації React 19.',
    },
    {
      id: 'state',
      title: 'Хуки стану',
      enTitle: 'State Hooks',
      docUrl: 'https://react.dev/reference/react/hooks#state-hooks',
      description:
        'Стан дозволяє компоненту «запам’ятовувати» інформацію, наприклад введення користувача. Щоб додати стан до компонента, використовуйте один із цих хуків.',
    },
    {
      id: 'context',
      title: 'Хуки контексту',
      enTitle: 'Context Hooks',
      docUrl: 'https://react.dev/reference/react/hooks#context-hooks',
      description:
        'Контекст дозволяє компоненту отримувати інформацію від далеких батьківських компонентів без передачі її через пропси.',
    },
    {
      id: 'ref',
      title: 'Хуки посилань',
      enTitle: 'Ref Hooks',
      docUrl: 'https://react.dev/reference/react/hooks#ref-hooks',
      description:
        'Посилання (Refs) дозволяють компоненту зберігати певну інформацію, яка не використовується для рендерингу, наприклад DOM-вузол або ідентифікатор таймера.',
    },
    {
      id: 'effect',
      title: 'Хуки ефектів',
      enTitle: 'Effect Hooks',
      docUrl: 'https://react.dev/reference/react/hooks#effect-hooks',
      description:
        'Ефекти дозволяють компоненту підключатися до зовнішніх систем та синхронізуватися з ними (мережа, DOM браузера, анімації, сторонні бібліотеки).',
    },
    {
      id: 'performance',
      title: 'Хуки продуктивності',
      enTitle: 'Performance Hooks',
      docUrl: 'https://react.dev/reference/react/hooks#performance-hooks',
      description:
        'Поширений спосіб оптимізації продуктивності повторного рендерингу — пропуск непотрібної роботи або пріоритезація оновлень інтерфейсу без блокування.',
    },
    {
      id: 'other',
      title: 'Інші хуки та API React 19',
      enTitle: 'Other Hooks & React 19 APIs',
      docUrl: 'https://react.dev/reference/react/hooks#other-hooks',
      description:
        'Хуки для авторів бібліотек, серверних дій (Actions), оптимістичних оновлень у React 19, форми (react-dom) та API use для читання ресурсів.',
    },
  ];

  const HOOKS_DATA = [
    // 1. STATE HOOKS
    {
      name: 'useState',
      category: 'state',
      categoryLabel: 'State Hooks',
      pkg: 'react',
      syntax: 'const [state, setState] = useState(initialState);',
      description:
        'useState — це хук React, який дозволяє додати змінну стану до вашого компонента.',
      docUrl: 'https://react.dev/reference/react/useState',
      parameters: [
        {
          name: 'initialState',
          optional: false,
          desc: 'Значення, яке ви хочете задати для стану на початку. Це може бути значення будь-якого типу, але для функцій існує особлива поведінка: якщо ви передаєте функцію як initialState, React розглядатиме її як функцію-ініціалізатор (вона має бути чистою, не приймати аргументів і повертати значення будь-якого типу). React викличе її під час ініціалізації компонента та збереже повернуте значення.',
        },
      ],
      returnsSummary: '[currentState, setFunction]',
      returns:
        'useState повертає масив рівно з двох значень: 1) поточний стан (під час першого рендеру він збігається з переданим initialState); 2) функцію set (наприклад, setState), яка дозволяє оновити стан до іншого значення та запустити повторний рендеринг.',
      caveats: [
        'useState є хуком, тому його можна викликати лише на верхньому рівні вашого компонента або власних хуків. Його не можна викликати всередині циклів чи умов.',
        'У режимі Strict Mode React викличе вашу функцію-ініціалізатор двічі, щоб допомогти виявити випадкові нечистоти (це поведінка лише для розробки, на продакшені вона не впливає).',
        'Функція set оновлює змінну стану лише для НАСТУПНОГО рендеру. Якщо прочитати змінну стану одразу після виклику set-функції, вона все ще міститиме старе значення.',
        'Якщо нове значення, яке ви надаєте, ідентичне поточному стану (за результатами порівняння Object.is), React пропустить повторний рендеринг компонента та його дочірніх елементів.',
        'React групує (batches) оновлення стану та оновлює екран після завершення роботи всіх обробників подій.',
      ],
      example: [
        "import { useState } from 'react';",
        '',
        'function Counter() {',
        '  const [age, setAge] = useState(42);',
        "  const [name, setName] = useState('Taylor');",
        '',
        '  function handleClick() {',
        '    setAge(a => a + 1);',
        '  }',
        '',
        '  return (',
        '    <button onClick={handleClick}>',
        '      {name}, вік: {age}',
        '    </button>',
        '  );',
        '}',
      ].join('\n'),
    },
    {
      name: 'useReducer',
      category: 'state',
      categoryLabel: 'State Hooks',
      pkg: 'react',
      syntax:
        'const [state, dispatch] = useReducer(reducer, initialArg, init?);',
      description:
        'useReducer — це хук React, який дозволяє додати редюсер (reducer) до вашого компонента для керування складною логікою стану.',
      docUrl: 'https://react.dev/reference/react/useReducer',
      parameters: [
        {
          name: 'reducer',
          optional: false,
          desc: 'Функція-редюсер (state, action) => newState, яка визначає, як оновлюється стан. Вона має бути чистою, приймати стан і дію (action) як аргументи та повертати наступний стан.',
        },
        {
          name: 'initialArg',
          optional: false,
          desc: 'Значення, з якого обчислюється початковий стан. Може бути значенням будь-якого типу. Спосіб обчислення початкового стану залежить від наступного аргументу init.',
        },
        {
          name: 'init',
          optional: true,
          desc: 'Необов’язкова функція-ініціалізатор, яка має повернути початковий стан. Якщо її не вказано, початковий стан встановлюється в initialArg. Інакше початковий стан встановлюється як результат виклику init(initialArg).',
        },
      ],
      returnsSummary: '[state, dispatch]',
      returns:
        'useReducer повертає масив рівно з двох значень: 1) поточний стан (під час першого рендеру встановлюється в init(initialArg) або initialArg); 2) функцію dispatch, яка дозволяє оновити стан до іншого значення та запустити повторний рендеринг.',
      caveats: [
        'useReducer є хуком, тому його можна викликати лише на верхньому рівні компонента або власних хуків.',
        'Функція dispatch має стабільну ідентичність, тому її часто не потрібно вказувати в залежностях Effect, проте її включення не викличе повторного запуску ефекту.',
        'У Strict Mode React викличе вашу функцію-редюсер та функцію init двічі, щоб допомогти виявити випадкові побічні ефекти.',
        'Стан доступний лише для читання (read-only). Не змінюйте об’єкти чи масиви у стані напряму — завжди повертайте нові об’єкти з редюсера.',
      ],
      example: [
        "import { useReducer } from 'react';",
        '',
        'function reducer(state, action) {',
        '  switch (action.type) {',
        "    case 'incremented_age': {",
        '      return { name: state.name, age: state.age + 1 };',
        '    }',
        "    case 'changed_name': {",
        '      return { name: action.nextName, age: state.age };',
        '    }',
        '  }',
        "  throw Error('Unknown action: ' + action.type);",
        '}',
        '',
        'export default function Form() {',
        "  const [state, dispatch] = useReducer(reducer, { name: 'Taylor', age: 42 });",
        '  return (',
        "    <button onClick={() => dispatch({ type: 'incremented_age' })}>",
        '      Збільшити вік ({state.age})',
        '    </button>',
        '  );',
        '}',
      ].join('\n'),
    },

    // 2. CONTEXT HOOKS
    {
      name: 'useContext',
      category: 'context',
      categoryLabel: 'Context Hooks',
      pkg: 'react',
      syntax: 'const value = useContext(SomeContext);',
      description:
        'useContext — це хук React, який дозволяє зчитувати контекст та підписуватися на нього у вашому компоненті.',
      docUrl: 'https://react.dev/reference/react/useContext',
      parameters: [
        {
          name: 'SomeContext',
          optional: false,
          desc: 'Контекст, який ви попередньо створили за допомогою createContext. Сам контекст не містить інформації — він лише представляє тип інформації, яку ви можете надавати або зчитувати з компонентів.',
        },
      ],
      returnsSummary: 'Значення контексту (value)',
      returns:
        'useContext повертає значення контексту для компонента, що викликає хук. Воно визначається як значення value, передане до найближчого <SomeContext> (або <SomeContext.Provider>) вище за деревом компонентів. Якщо такого провайдера немає, повертається значення defaultValue, передане у createContext(defaultValue).',
      caveats: [
        'Виклик useContext у компоненті не зазнає впливу провайдерів, повернутих ТИМ САМИМ компонентом. Відповідний провайдер <SomeContext> має знаходитися ВИЩЕ за компонент, який викликає useContext.',
        'React автоматично повторно рендерить усі дочірні компоненти, що використовують певний контекст, починаючи з провайдера, який отримує нове значення value (порівняння виконується через Object.is).',
        'Пропуск повторних рендерів за допомогою memo не заважає дочірнім компонентам отримувати свіжі значення контексту.',
      ],
      example: [
        "import { createContext, useContext } from 'react';",
        '',
        "const ThemeContext = createContext('light');",
        '',
        'function Button() {',
        '  const theme = useContext(ThemeContext);',
        '  return <button className={theme}>Натисни мене</button>;',
        '}',
      ].join('\n'),
    },

    // 3. REF HOOKS
    {
      name: 'useRef',
      category: 'ref',
      categoryLabel: 'Ref Hooks',
      pkg: 'react',
      syntax: 'const ref = useRef(initialValue);',
      description:
        'useRef — це хук React, який дозволяє посилатися на значення, не потрібне для рендерингу.',
      docUrl: 'https://react.dev/reference/react/useRef',
      parameters: [
        {
          name: 'initialValue',
          optional: false,
          desc: 'Значення, яке ви хочете спочатку записати у властивість current об’єкта посилання. Це може бути значення будь-якого типу. Цей аргумент ігнорується після початкового рендеру.',
        },
      ],
      returnsSummary: 'Об’єкт { current }',
      returns:
        'useRef повертає об’єкт з єдиною властивістю current, спочатку встановленою в передане initialValue. На наступних рендерах useRef повертатиме той самий об’єкт.',
      caveats: [
        'Ви можете змінювати властивість ref.current напряму. На відміну від стану, вона є мутабельною. Однак якщо вона містить об’єкт, що використовується для рендерингу, не змінюйте його.',
        'Коли ви змінюєте властивість ref.current, React НЕ рендерить ваш компонент повторно. React не знає, коли ви її змінюєте, оскільки ref є звичайним об’єктом JavaScript.',
        'Не пишіть і не читайте ref.current під час рендерингу, за винятком початкової ініціалізації (наприклад, if (!ref.current) ref.current = new Thing()). Це робить поведінку компонента непередбачуваною.',
      ],
      example: [
        "import { useRef } from 'react';",
        '',
        'export default function Form() {',
        '  const inputRef = useRef(null);',
        '',
        '  function handleClick() {',
        '    inputRef.current.focus();',
        '  }',
        '',
        '  return (',
        '    <>',
        '      <input ref={inputRef} />',
        '      <button onClick={handleClick}>Фокус на полі</button>',
        '    </>',
        '  );',
        '}',
      ].join('\n'),
    },
    {
      name: 'useImperativeHandle',
      category: 'ref',
      categoryLabel: 'Ref Hooks',
      pkg: 'react',
      syntax: 'useImperativeHandle(ref, createHandle, dependencies?);',
      description:
        'useImperativeHandle — це хук React, який дозволяє налаштувати дескриптор (handle), що надається як ref для батьківського компонента.',
      docUrl: 'https://react.dev/reference/react/useImperativeHandle',
      parameters: [
        {
          name: 'ref',
          optional: false,
          desc: 'Пропс ref, який ви отримали як аргумент у вашому функціональному компоненті (у React 19 ref передається як звичайний пропс).',
        },
        {
          name: 'createHandle',
          optional: false,
          desc: 'Функція, яка не приймає аргументів і повертає об’єкт-дескриптор посилання (ref handle), який ви хочете відкрити назовні. Цей дескриптор може бути будь-якого типу (зазвичай об’єкт із методами).',
        },
        {
          name: 'dependencies',
          optional: true,
          desc: 'Список усіх реактивних значень, на які посилається код усередині createHandle (пропси, стан, змінні та функції, оголошені всередині тіла компонента).',
        },
      ],
      returnsSummary: 'undefined',
      returns: 'useImperativeHandle повертає undefined.',
      caveats: [
        'Починаючи з React 19, ref доступний як пропс. У React 18 та старіших версіях для отримання ref необхідно було обгортати компонент у forwardRef.',
        'Не зловживайте посиланнями (refs). Використовуйте ref лише для імперативних дій, які неможливо виразити у вигляді пропсів: наприклад, прокручування до вузла, фокусування вузла, запуск анімації, виділення тексту тощо.',
        'Якщо щось можна виразити через пропси (наприклад, передати isOpen замість виклику ref.open()), не використовуйте ref.',
      ],
      example: [
        "import { useRef, useImperativeHandle } from 'react';",
        '',
        'function MyInput({ ref }) {',
        '  const inputRef = useRef(null);',
        '',
        '  useImperativeHandle(ref, () => {',
        '    return {',
        '      focus() {',
        '        inputRef.current.focus();',
        '      },',
        '      scrollIntoView() {',
        '        inputRef.current.scrollIntoView();',
        '      },',
        '    };',
        '  }, []);',
        '',
        '  return <input ref={inputRef} />;',
        '}',
      ].join('\n'),
    },

    // 4. EFFECT HOOKS
    {
      name: 'useEffect',
      category: 'effect',
      categoryLabel: 'Effect Hooks',
      pkg: 'react',
      syntax: 'useEffect(setup, dependencies?);',
      description:
        'useEffect — це хук React, який дозволяє синхронізувати компонент із зовнішньою системою.',
      docUrl: 'https://react.dev/reference/react/useEffect',
      parameters: [
        {
          name: 'setup',
          optional: false,
          desc: 'Функція з логікою вашого Ефекту. Ваша функція setup може також необов’язково повертати функцію очищення (cleanup). Коли компонент додається в DOM, React запускає setup. Після кожного повторного рендеру зі зміненими залежностями React спочатку запускає функцію очищення (якщо ви її надали) зі старими значеннями, а потім запускає setup з новими значеннями.',
        },
        {
          name: 'dependencies',
          optional: true,
          desc: 'Список усіх реактивних значень, на які посилається код усередині setup (пропси, стан та всі змінні й функції, оголошені безпосередньо всередині тіла компонента). Якщо передати порожній масив [], ефект запуститься лише після початкового рендеру. Якщо не передавати масив взагалі — ефект запускатиметься після кожного рендеру.',
        },
      ],
      returnsSummary: 'undefined',
      returns: 'useEffect повертає undefined.',
      caveats: [
        'useEffect є хуком, тому його можна викликати лише на верхньому рівні компонента або власних хуків.',
        'Якщо ви не намагаєтеся синхронізуватися з якоюсь зовнішньою системою, вам, імовірно, не потрібен Effect (наприклад, для трансформації даних для рендерингу або обробки подій користувача).',
        'Коли увімкнено Strict Mode, React запустить один додатковий цикл setup + cleanup перед першим реальним налаштуванням (setup), щоб перевірити, чи правильно реалізовано очищення.',
        'Якщо деякі з ваших залежностей є об’єктами або функціями, визначеними всередині компонента, існує ризик, що вони спричинять надто частий перезапуск ефекту.',
        'Ефекти працюють ЛИШЕ на клієнті. Вони не запускаються під час серверного рендерингу (SSR).',
      ],
      example: [
        "import { useEffect } from 'react';",
        "import { createConnection } from './chat.js';",
        '',
        'function ChatRoom({ roomId }) {',
        '  useEffect(() => {',
        "    const connection = createConnection('https://localhost:1234', roomId);",
        '    connection.connect();',
        '    return () => {',
        '      connection.disconnect();',
        '    };',
        '  }, [roomId]);',
        '',
        '  return <h1>Ласкаво просимо до кімнати {roomId}!</h1>;',
        '}',
      ].join('\n'),
    },
    {
      name: 'useLayoutEffect',
      category: 'effect',
      categoryLabel: 'Effect Hooks',
      pkg: 'react',
      syntax: 'useLayoutEffect(setup, dependencies?);',
      description:
        'useLayoutEffect — це версія useEffect, яка спрацьовує до того, як браузер перемалює екран (наприклад, для вимірювання геометрії елементів).',
      docUrl: 'https://react.dev/reference/react/useLayoutEffect',
      parameters: [
        {
          name: 'setup',
          optional: false,
          desc: 'Функція з логікою вашого ефекту. Може повертати функцію очищення (cleanup). Перед тим, як браузер перемалює екран, React запустить setup, а при видаленні компонента або зміні залежностей — функцію очищення.',
        },
        {
          name: 'dependencies',
          optional: true,
          desc: 'Список усіх реактивних значень, на які посилається код усередині setup. React порівнює кожну залежність із попереднім значенням за допомогою Object.is.',
        },
      ],
      returnsSummary: 'undefined',
      returns: 'useLayoutEffect повертає undefined.',
      caveats: [
        'Код усередині useLayoutEffect та всі оновлення стану, заплановані з нього, блокують перемальовування екрана браузером. Надмірне використання робить додаток повільним. За можливості завжди надавайте перевагу useEffect.',
        'Ефекти в useLayoutEffect працюють лише на клієнті. Вони не виконуються під час серверного рендерингу (SSR).',
        'У режимі Strict Mode React запустить один додатковий цикл setup + cleanup перед першим реальним налаштуванням.',
      ],
      example: [
        "import { useState, useRef, useLayoutEffect } from 'react';",
        '',
        'function Tooltip() {',
        '  const ref = useRef(null);',
        '  const [tooltipHeight, setTooltipHeight] = useState(0);',
        '',
        '  useLayoutEffect(() => {',
        '    const { height } = ref.current.getBoundingClientRect();',
        '    setTooltipHeight(height);',
        '  }, []);',
        '',
        '  return <div ref={ref}>Підказка (висота: {tooltipHeight}px)</div>;',
        '}',
      ].join('\n'),
    },
    {
      name: 'useInsertionEffect',
      category: 'effect',
      categoryLabel: 'Effect Hooks',
      pkg: 'react',
      syntax: 'useInsertionEffect(setup, dependencies?);',
      description:
        'useInsertionEffect дозволяє вставляти елементи в DOM до того, як спрацюють будь-які ефекти макета (useLayoutEffect). Призначено для авторів CSS-in-JS бібліотек.',
      docUrl: 'https://react.dev/reference/react/useInsertionEffect',
      parameters: [
        {
          name: 'setup',
          optional: false,
          desc: 'Функція з логікою вашого ефекту. Може повертати функцію очищення. Спрацьовує синхронно безпосередньо перед мутацією DOM з боку React.',
        },
        {
          name: 'dependencies',
          optional: true,
          desc: 'Список усіх реактивних значень, на які посилається код усередині setup.',
        },
      ],
      returnsSummary: 'undefined',
      returns: 'useInsertionEffect повертає undefined.',
      caveats: [
        'useInsertionEffect призначений виключно для авторів бібліотек CSS-in-JS. Якщо ви не створюєте бібліотеку CSS-in-JS, натомість використовуйте useEffect або useLayoutEffect.',
        'Ефекти в useInsertionEffect працюють лише на клієнті і не виконуються під час серверного рендерингу.',
        'Зсередини useInsertionEffect не можна оновлювати стан (setState).',
        'На момент виконання useInsertionEffect посилання (refs) ще не прикріплені до DOM-вузлів, і сам DOM ще не оновлено.',
      ],
      example: [
        "import { useInsertionEffect } from 'react';",
        '',
        '// Всередині вашої CSS-in-JS бібліотеки',
        'let isInserted = new Set();',
        'function useCSS(rule) {',
        '  useInsertionEffect(() => {',
        '    if (!isInserted.has(rule)) {',
        '      isInserted.add(rule);',
        '      document.head.appendChild(getStyleForRule(rule));',
        '    }',
        '  });',
        '  return rule;',
        '}',
      ].join('\n'),
    },

    // 5. PERFORMANCE HOOKS
    {
      name: 'useMemo',
      category: 'performance',
      categoryLabel: 'Performance Hooks',
      pkg: 'react',
      syntax: 'const cachedValue = useMemo(calculateValue, dependencies);',
      description:
        'useMemo — це хук React, який дозволяє кешувати результат обчислення між повторними рендерами.',
      docUrl: 'https://react.dev/reference/react/useMemo',
      parameters: [
        {
          name: 'calculateValue',
          optional: false,
          desc: 'Функція, яка обчислює значення, що ви хочете закешувати. Вона має бути чистою, не приймати аргументів і повертати значення будь-якого типу. React викличе вашу функцію під час початкового рендеру. На наступних рендерах React поверне те саме значення знову, якщо залежності не змінилися.',
        },
        {
          name: 'dependencies',
          optional: false,
          desc: 'Список усіх реактивних значень, на які посилається код усередині calculateValue (пропси, стан та всі змінні й функції, оголошені безпосередньо всередині тіла компонента).',
        },
      ],
      returnsSummary: 'Закешований результат calculateValue',
      returns:
        'Під час початкового рендеру useMemo повертає результат виклику calculateValue без аргументів. Під час наступних рендерів він або поверне вже збережене значення з останнього рендеру (якщо залежності не змінилися), або знову викличе calculateValue і поверне новий результат.',
      caveats: [
        'Ви повинні покладатися на useMemo ЛИШЕ як на оптимізацію продуктивності. Якщо ваш код не працює без нього, спочатку знайдіть першопричину та виправте її.',
        'React не відкидатиме закешоване значення без вагомої причини, але в майбутньому або під час розробки (наприклад, при редагуванні файлу або призупиненні компонента) React може очистити кеш.',
        'У Strict Mode React викличе вашу функцію обчислення двічі під час розробки, щоб переконатися, що вона чиста.',
      ],
      example: [
        "import { useMemo } from 'react';",
        '',
        'function TodoList({ todos, tab }) {',
        '  const visibleTodos = useMemo(',
        '    () => filterTodos(todos, tab),',
        '    [todos, tab]',
        '  );',
        '  return <ul>{visibleTodos.map(t => <li key={t.id}>{t.text}</li>)}</ul>;',
        '}',
      ].join('\n'),
    },
    {
      name: 'useCallback',
      category: 'performance',
      categoryLabel: 'Performance Hooks',
      pkg: 'react',
      syntax: 'const cachedFn = useCallback(fn, dependencies);',
      description:
        'useCallback — це хук React, який дозволяє кешувати визначення функції між повторними рендерами.',
      docUrl: 'https://react.dev/reference/react/useCallback',
      parameters: [
        {
          name: 'fn',
          optional: false,
          desc: 'Значення функції, яке ви хочете закешувати. Вона може приймати будь-які аргументи та повертати будь-які значення. React поверне (не викличе!) вашу функцію назад під час початкового рендеру. На наступних рендерах React поверне ту саму функцію знову, якщо залежності не змінилися.',
        },
        {
          name: 'dependencies',
          optional: false,
          desc: 'Список усіх реактивних значень, на які посилається код усередині fn (пропси, стан та всі змінні й функції, оголошені всередині тіла компонента).',
        },
      ],
      returnsSummary: 'Закешована функція fn',
      returns:
        'Під час початкового рендеру useCallback повертає передану вами функцію fn. Під час наступних рендерів він поверне або вже збережену функцію fn з останнього рендеру (якщо залежності не змінилися), або функцію fn, передану під час поточного рендеру.',
      caveats: [
        'Ви повинні покладатися на useCallback ЛИШЕ як на оптимізацію продуктивності. Кешування функції має сенс лише тоді, коли ви передаєте її в компонент, обгорнутий у memo, або використовуєте як залежність іншого хука (наприклад, useEffect).',
        'У React useCallback(fn, deps) є повним аналогом useMemo(() => fn, deps).',
      ],
      example: [
        "import { useCallback } from 'react';",
        '',
        'function ProductPage({ productId, referrer }) {',
        '  const handleSubmit = useCallback((orderDetails) => {',
        "    post('/product/' + productId + '/buy', {",
        '      referrer,',
        '      orderDetails,',
        '    });',
        '  }, [productId, referrer]);',
        '',
        '  return <ShippingForm onSubmit={handleSubmit} />;',
        '}',
      ].join('\n'),
    },
    {
      name: 'useTransition',
      category: 'performance',
      categoryLabel: 'Performance Hooks',
      pkg: 'react',
      syntax: 'const [isPending, startTransition] = useTransition();',
      description:
        'useTransition — це хук React, який дозволяє рендерити частину інтерфейсу користувача у фоновому режимі без блокування UI.',
      docUrl: 'https://react.dev/reference/react/useTransition',
      parameters: [],
      returnsSummary: '[isPending, startTransition]',
      returns:
        'useTransition повертає масив рівно з двох елементів: 1) прапорець isPending (boolean), який повідомляє, чи є зараз активний перехід (Transition) у стані очікування; 2) функцію startTransition(action), яка дозволяє позначити оновлення стану як перехід.',
      caveats: [
        'useTransition є хуком, тому його можна викликати лише всередині компонентів або власних хуків. Якщо вам потрібно запустити перехід в іншому місці (наприклад, із бібліотеки даних), викличте окремий API startTransition.',
        'Ви можете обгорнути оновлення в startTransition, лише якщо маєте доступ до функції set цього стану. Якщо ви хочете запустити перехід у відповідь на пропс або власне значення хука, спробуйте натомість useDeferredValue.',
        'Функція, яку ви передаєте в startTransition, викликається синхронно, одразу позначаючи всі оновлення стану, що відбуваються під час її виконання, як переходи (Transitions).',
        'У React 19 функції, передані в startTransition, можуть бути асинхронними (async). Такі асинхронні переходи в документації називаються Actions. Оновлення стану після await наразі потрібно обгортати в додатковий startTransition.',
      ],
      example: [
        "import { useState, useTransition } from 'react';",
        '',
        'function TabContainer() {',
        '  const [isPending, startTransition] = useTransition();',
        "  const [tab, setTab] = useState('about');",
        '',
        '  function selectTab(nextTab) {',
        '    startTransition(() => {',
        '      setTab(nextTab);',
        '    });',
        '  }',
        '',
        "  return <button onClick={() => selectTab('posts')}>Вкладка: {tab}</button>;",
        '}',
      ].join('\n'),
    },
    {
      name: 'useDeferredValue',
      category: 'performance',
      categoryLabel: 'Performance Hooks',
      pkg: 'react',
      isNew19: true,
      syntax: 'const deferredValue = useDeferredValue(value, initialValue?);',
      description:
        'useDeferredValue — це хук React, який дозволяє відкласти оновлення частини інтерфейсу користувача.',
      docUrl: 'https://react.dev/reference/react/useDeferredValue',
      parameters: [
        {
          name: 'value',
          optional: false,
          desc: 'Значення, яке ви хочете відкласти. Може бути будь-якого типу.',
        },
        {
          name: 'initialValue',
          optional: true,
          desc: 'Необов’язкове значення (додано в React 19), яке використовуватиметься під час початкового рендеру компонента. Якщо цей параметр опущено, useDeferredValue не відкладатиме значення під час початкового рендеру.',
        },
      ],
      returnsSummary: 'Відкладене значення (deferredValue)',
      returns:
        'Під час початкового рендеру повернуте відкладене значення збігається з переданим value (або дорівнює initialValue, якщо його надано). Під час оновлень React спочатку спробує виконати повторний рендеринг зі старим значенням, а потім у фоновому режимі виконає рендеринг із новим значенням.',
      caveats: [
        'Значення, які ви передаєте в useDeferredValue, мають бути примітивними значеннями (як-от рядки чи числа) або об’єктами, створеними поза межами рендерингу. Якщо ви створюєте новий об’єкт під час рендерингу й одразу передаєте його в useDeferredValue, воно відрізнятиметься при кожному рендері, спричиняючи зайві фонові перерендери.',
        'Коли useDeferredValue отримує інше значення (порівняно через Object.is), на додаток до поточного рендеру він планує фоновий рендеринг у тлі. Цей фоновий рендеринг можна перервати: якщо надійде нове оновлення value, React перезапустить фоновий рендеринг із нуля.',
        'useDeferredValue інтегрується з <Suspense>. Якщо фонове оновлення, спричинене новим значенням, призупиняє UI, користувач не побачить fallback — натомість відображатиметься старе відкладене значення, доки дані не завантажаться.',
      ],
      example: [
        "import { useState, useDeferredValue } from 'react';",
        '',
        'function SearchPage() {',
        "  const [query, setQuery] = useState('');",
        '  const deferredQuery = useDeferredValue(query);',
        '',
        '  return (',
        '    <>',
        '      <input value={query} onChange={e => setQuery(e.target.value)} />',
        '      <SearchResults query={deferredQuery} />',
        '    </>',
        '  );',
        '}',
      ].join('\n'),
    },

    // 6. OTHER HOOKS & REACT 19 APIs
    {
      name: 'useDebugValue',
      category: 'other',
      categoryLabel: 'Other Hooks',
      pkg: 'react',
      syntax: 'useDebugValue(value, format?);',
      description:
        'useDebugValue — це хук React, який дозволяє додати мітку до власного хука (Custom Hook) у React DevTools.',
      docUrl: 'https://react.dev/reference/react/useDebugValue',
      parameters: [
        {
          name: 'value',
          optional: false,
          desc: 'Значення, яке ви хочете відобразити в React DevTools. Може бути будь-якого типу.',
        },
        {
          name: 'format',
          optional: true,
          desc: 'Необов’язкова функція форматування (value) => formattedValue. Коли компонент перевіряється в DevTools, React DevTools викличе функцію форматування з переданим value і відобразить повернуте відформатоване значення. Це дозволяє уникнути виконання дорогого форматування, доки компонент фактично не інспектується.',
        },
      ],
      returnsSummary: 'undefined',
      returns: 'useDebugValue повертає undefined.',
      caveats: [
        'Не додавайте значення налагодження до кожного власного хука. Це найкорисніше для власних хуків, які є частиною спільних бібліотек і мають складну внутрішню структуру даних, яку важко перевірити.',
      ],
      example: [
        "import { useDebugValue } from 'react';",
        '',
        'function useOnlineStatus() {',
        '  const isOnline = true;',
        "  useDebugValue(isOnline ? 'Online' : 'Offline');",
        '  return isOnline;',
        '}',
      ].join('\n'),
    },
    {
      name: 'useId',
      category: 'other',
      categoryLabel: 'Other Hooks',
      pkg: 'react',
      syntax: 'const id = useId();',
      description:
        'useId — це хук React для генерування унікальних ідентифікаторів, які можна передавати в атрибути доступності (Accessibility).',
      docUrl: 'https://react.dev/reference/react/useId',
      parameters: [],
      returnsSummary: 'Унікальний рядок ID (наприклад, «:r1:»)',
      returns:
        'useId повертає унікальний рядок ідентифікатора, пов’язаний із цим конкретним викликом useId у цьому конкретному компоненті.',
      caveats: [
        'useId є хуком, тому його можна викликати лише на верхньому рівні компонента або власних хуків.',
        'Не викликайте useId для генерування ключів (key) у списку. Ключі мають генеруватися з ваших даних.',
        'useId наразі не можна використовувати всередині асинхронних серверних компонентів (async Server Components).',
      ],
      example: [
        "import { useId } from 'react';",
        '',
        'function PasswordField() {',
        '  const passwordHintId = useId();',
        '  return (',
        '    <>',
        '      <label>',
        '        Пароль: <input type="password" aria-describedby={passwordHintId} />',
        '      </label>',
        '      <p id={passwordHintId}>Пароль має містити щонайменше 18 символів</p>',
        '    </>',
        '  );',
        '}',
      ].join('\n'),
    },
    {
      name: 'useSyncExternalStore',
      category: 'other',
      categoryLabel: 'Other Hooks',
      pkg: 'react',
      syntax:
        'const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);',
      description:
        'useSyncExternalStore — це хук React, який дозволяє підписатися на зовнішнє сховище даних (поза межами React).',
      docUrl: 'https://react.dev/reference/react/useSyncExternalStore',
      parameters: [
        {
          name: 'subscribe',
          optional: false,
          desc: 'Функція, яка приймає єдиний аргумент callback і підписує його на сховище. Коли сховище змінюється, воно має викликати наданий callback, що змусить React повторно викликати getSnapshot і, за потреби, перерендерити компонент. Функція subscribe має повертати функцію, яка скасовує підписку.',
        },
        {
          name: 'getSnapshot',
          optional: false,
          desc: 'Функція, яка повертає знімок (snapshot) даних у сховищі, потрібних компоненту. Поки сховище не змінилося, повторні виклики getSnapshot повинні повертати одне й те саме значення.',
        },
        {
          name: 'getServerSnapshot',
          optional: true,
          desc: 'Необов’язкова функція, яка повертає початковий знімок даних у сховищі. Використовується лише під час серверного рендерингу (SSR) та під час гідратації контенту, відрендереного сервером, на клієнті.',
        },
      ],
      returnsSummary: 'Поточний знімок (snapshot) сховища',
      returns:
        'Поточний знімок сховища, який ви можете використовувати у своїй логіці рендерингу.',
      caveats: [
        'Знімок сховища, який повертає getSnapshot, має бути незмінним (immutable). Якщо базове сховище містить змінювані дані, повертайте новий незмінний знімок, якщо дані змінилися, інакше повертайте останній закешований знімок.',
        'Якщо під час повторного рендеру передається інша функція subscribe, React повторно підпишеться на сховище за допомогою нової функції. Ви можете уникнути цього, оголосивши subscribe поза компонентом.',
        'Не рекомендується призупиняти рендеринг (Suspense) на основі значення сховища, повернутого useSyncExternalStore.',
      ],
      example: [
        "import { useSyncExternalStore } from 'react';",
        "import { todosStore } from './todoStore.js';",
        '',
        'function TodosApp() {',
        '  const todos = useSyncExternalStore(',
        '    todosStore.subscribe,',
        '    todosStore.getSnapshot',
        '  );',
        '  return <ul>{todos.map(t => <li key={t.id}>{t.text}</li>)}</ul>;',
        '}',
      ].join('\n'),
    },
    {
      name: 'useActionState',
      category: 'other',
      categoryLabel: 'Other Hooks (React 19)',
      pkg: 'react',
      isNew19: true,
      syntax:
        'const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);',
      description:
        'useActionState — це хук React 19, який дозволяє оновлювати стан на основі результату виконання дії форми (Form Action).',
      docUrl: 'https://react.dev/reference/react/useActionState',
      parameters: [
        {
          name: 'fn',
          optional: false,
          desc: 'Функція, яка викликається під час відправлення форми або натискання кнопки. Коли функція викликається, вона отримує попередній стан форми (спочатку переданий initialState, а згодом — попереднє повернуте значення) як свій перший аргумент, за яким слідують аргументи, які зазвичай отримує дія форми (наприклад, formData).',
        },
        {
          name: 'initialState',
          optional: false,
          desc: 'Значення, яке ви хочете задати для стану спочатку. Це може бути будь-яке серіалізоване значення. Цей аргумент ігнорується після першого виклику дії.',
        },
        {
          name: 'permalink',
          optional: true,
          desc: 'Необов’язковий рядок, що містить унікальну URL-адресу сторінки, яку змінює ця форма (для використання на сторінках із динамічним контентом у поєднанні з прогресивним покращенням до завантаження JS-бандлу).',
        },
      ],
      returnsSummary: '[state, formAction, isPending]',
      returns:
        'useActionState повертає масив рівно з трьох значень: 1) поточний стан (під час першого рендеру дорівнює initialState, після виклику дії — значенню, повернутому fn); 2) нову дію formAction, яку можна передати як пропс action у компонент <form> або formAction у <button>; 3) прапорець isPending (boolean), який вказує, чи є активний перехід (Transition).',
      caveats: [
        'У раніших канарних версіях React цей API був частиною React DOM і називався useFormState. У React 19 його перейменовано на useActionState та перенесено в пакет react.',
        'При використанні з фреймворком, що підтримує React Server Components, useActionState дозволяє зробити форми інтерактивними ще до завершення виконання JavaScript на клієнті.',
      ],
      example: [
        "import { useActionState } from 'react';",
        '',
        'async function increment(previousState, formData) {',
        '  return previousState + 1;',
        '}',
        '',
        'function StatefulForm() {',
        '  const [state, formAction, isPending] = useActionState(increment, 0);',
        '  return (',
        '    <form>',
        '      {state}',
        '      <button formAction={formAction} disabled={isPending}>',
        '        Збільшити',
        '      </button>',
        '    </form>',
        '  );',
        '}',
      ].join('\n'),
    },
    {
      name: 'useOptimistic',
      category: 'other',
      categoryLabel: 'Other Hooks (React 19)',
      pkg: 'react',
      isNew19: true,
      syntax:
        'const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);',
      description:
        'useOptimistic — це хук React 19, який дозволяє оптимістично оновлювати інтерфейс користувача під час виконання асинхронної дії (Action).',
      docUrl: 'https://react.dev/reference/react/useOptimistic',
      parameters: [
        {
          name: 'state',
          optional: false,
          desc: 'Значення, яке має повертатися на початку та щоразу, коли немає активної дії в стані очікування.',
        },
        {
          name: 'updateFn',
          optional: false,
          desc: 'Чиста функція (currentState, optimisticValue) => mergedState, яка приймає поточний стан і оптимістичне значення, передане в addOptimistic, і повертає отриманий оптимістичний стан.',
        },
      ],
      returnsSummary: '[optimisticState, addOptimistic]',
      returns:
        'useOptimistic повертає масив із двох елементів: 1) optimisticState — результуючий оптимістичний стан (дорівнює state, якщо немає активної дії, інакше дорівнює значенню, повернутому з updateFn); 2) функцію addOptimistic(optimisticValue), яку ви викликаєте всередині Transition або Action для запуску оптимістичного оновлення.',
      caveats: [
        'Функцію addOptimistic необхідно викликати всередині переходу (Transition) або дії форми (Form Action) — інакше React виведе попередження в консоль.',
        'Функція updateFn, яку ви передаєте в useOptimistic, повинна бути чистою функцією (не змінювати поточний стан).',
      ],
      example: [
        "import { useOptimistic } from 'react';",
        '',
        'function Thread({ messages, sendMessage }) {',
        '  const [optimisticMessages, addOptimisticMessage] = useOptimistic(',
        '    messages,',
        '    (state, newMessage) => [...state, { text: newMessage, sending: true }]',
        '  );',
        '',
        '  async function formAction(formData) {',
        "    addOptimisticMessage(formData.get('message'));",
        '    await sendMessage(formData);',
        '  }',
        '',
        '  return <form action={formAction}>{/* UI повідомлень */}</form>;',
        '}',
      ].join('\n'),
    },
    {
      name: 'useFormStatus',
      category: 'other',
      categoryLabel: 'React DOM Hooks (React 19)',
      pkg: 'react-dom',
      isNew19: true,
      syntax: 'const { pending, data, method, action } = useFormStatus();',
      description:
        'useFormStatus — це хук бібліотеки React DOM (React 19), який надає інформацію про статус відправлення останньої батьківської форми (<form>).',
      docUrl: 'https://react.dev/reference/react-dom/hooks/useFormStatus',
      parameters: [],
      returnsSummary: '{ pending, data, method, action }',
      returns:
        'Об’єкт status із чотирма властивостями: 1) pending (boolean) — true, якщо батьківська <form> перебуває в процесі відправлення; 2) data — об’єкт FormData, що містить дані, які відправляє батьківська <form> (або null); 3) method (рядок) — HTTP-метод, наприклад "get" або "post"; 4) action — посилання на функцію, передану в пропс action батьківської <form> (або null).',
      caveats: [
        'Хук useFormStatus повинен викликатися з компонента, який відрендерений УСЕРЕДИНІ елемента <form>.',
        'useFormStatus повертатиме інформацію про статус ЛИШЕ для батьківської <form>. Він НЕ поверне інформацію про статус для будь-якої <form>, відрендереної в тому самому компоненті або в дочірніх компонентах.',
      ],
      example: [
        "import { useFormStatus } from 'react-dom';",
        '',
        'function Submit() {',
        '  const { pending } = useFormStatus();',
        '  return (',
        '    <button type="submit" disabled={pending}>',
        "      {pending ? 'Надсилання...' : 'Надіслати'}",
        '    </button>',
        '  );',
        '}',
        '',
        'export default function App() {',
        '  return <form action={submitForm}><Submit /></form>;',
        '}',
      ].join('\n'),
    },

    // 7. BUILT-IN REACT API (use)
    {
      name: 'use',
      category: 'other',
      categoryLabel: 'Built-in React API (React 19)',
      pkg: 'react',
      isApi: true,
      isNew19: true,
      syntax: 'const value = use(resource);',
      description:
        'use — це API React 19 (не хук!), який дозволяє зчитувати значення ресурсу, такого як Promise або контекст (Context).',
      docUrl: 'https://react.dev/reference/react/use',
      parameters: [
        {
          name: 'resource',
          optional: false,
          desc: 'Джерело даних, з якого ви хочете прочитати значення. Ресурсом може бути об’єкт Promise або контекст React (створений через createContext).',
        },
      ],
      returnsSummary: 'Розв’язане значення Promise або контексту',
      returns:
        'API use повертає значення, прочитане з ресурсу, наприклад розв’язане (resolved) значення об’єкта Promise або значення контексту.',
      caveats: [
        'На відміну від хуків React, API use МОЖНА викликати всередині циклів та умовних операторів, таких як if.',
        'Як і хуки React, функція, яка викликає use, усе одно повинна бути компонентом React або хуком.',
        'При виклику з Promise API use інтегрується з <Suspense> та запобіжниками помилок (Error Boundaries): під час очікування Promise компонент призупиняється (suspends) і показується найближчий fallback із <Suspense>.',
        'API use не підтримує об’єкти Promise, створені безпосередньо під час рендерингу на клієнті — Promise має надходити з компонента або фреймворку, що підтримує кешування (наприклад, із Server Component).',
      ],
      example: [
        "import { use } from 'react';",
        '',
        'function MessageComponent({ messagePromise, show }) {',
        '  if (!show) return null;',
        '  // API use можна викликати після умови if!',
        '  const message = use(messagePromise);',
        '  const theme = use(ThemeContext);',
        '  return <p style={{ color: theme.color }}>{message}</p>;',
        '}',
      ].join('\n'),
    },
  ];

  // =========================================================================
  // STATE & DOM REFERENCES
  // =========================================================================
  let activeCategory = 'all';
  let onlyReact19 = false;
  let searchQuery = '';
  let currentModalIndex = 0;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function initApp() {
    const categoryFiltersEl = document.getElementById('categoryFilters');
    const hooksContainerEl = document.getElementById('hooksContainer');
    const searchInputEl = document.getElementById('searchInput');
    const react19FilterBtn = document.getElementById('react19FilterBtn');
    const emptyStateEl = document.getElementById('emptyState');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');

    const hookModal = document.getElementById('hookModal');
    const modalScrollBody = document.getElementById('modalScrollBody');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalCategoryBadge = document.getElementById('modalCategoryBadge');
    const modalPackageBadge = document.getElementById('modalPackageBadge');
    const modalNew19Badge = document.getElementById('modalNew19Badge');
    const modalApiBadge = document.getElementById('modalApiBadge');
    const modalHookName = document.getElementById('modalHookName');
    const modalDescription = document.getElementById('modalDescription');
    const modalSignature = document.getElementById('modalSignature');
    const modalParameters = document.getElementById('modalParameters');
    const modalReturns = document.getElementById('modalReturns');
    const modalCaveats = document.getElementById('modalCaveats');
    const modalCodeExample = document.getElementById('modalCodeExample');
    const modalDocLink = document.getElementById('modalDocLink');
    const modalDocLinkTop = document.getElementById('modalDocLinkTop');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const prevHookBtn = document.getElementById('prevHookBtn');
    const nextHookBtn = document.getElementById('nextHookBtn');
    const prevHookLabel = document.getElementById('prevHookLabel');
    const nextHookLabel = document.getElementById('nextHookLabel');

    // Render Category Tabs
    function renderFilters() {
      categoryFiltersEl.innerHTML = CATEGORIES.map(function (cat) {
        const isActive = activeCategory === cat.id;
        return (
          '<button type="button" data-category="' +
          escapeHtml(cat.id) +
          '" class="tab-btn' +
          (isActive ? ' active' : '') +
          '">' +
          escapeHtml(cat.title) +
          '</button>'
        );
      }).join('');

      categoryFiltersEl.querySelectorAll('button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeCategory = btn.getAttribute('data-category');
          renderFilters();
          renderHooks();
        });
      });
    }

    // Render Hook Cards grouped by Category
    function renderHooks() {
      const query = searchQuery.trim().toLowerCase();

      const filtered = HOOKS_DATA.filter(function (hook) {
        const matchesCat =
          activeCategory === 'all' || hook.category === activeCategory;
        const matches19 = !onlyReact19 || Boolean(hook.isNew19);
        const matchesParam = hook.parameters.some(function (p) {
          return (
            p.name.toLowerCase().includes(query) ||
            p.desc.toLowerCase().includes(query)
          );
        });
        const matchesSearch =
          !query ||
          hook.name.toLowerCase().includes(query) ||
          hook.description.toLowerCase().includes(query) ||
          hook.syntax.toLowerCase().includes(query) ||
          hook.returnsSummary.toLowerCase().includes(query) ||
          matchesParam;
        return matchesCat && matches19 && matchesSearch;
      });

      if (filtered.length === 0) {
        hooksContainerEl.innerHTML = '';
        emptyStateEl.classList.remove('hidden');
        return;
      }

      emptyStateEl.classList.add('hidden');

      const categoriesToShow = CATEGORIES.filter(function (c) {
        return (
          c.id !== 'all' &&
          (activeCategory === 'all' || c.id === activeCategory)
        );
      });

      hooksContainerEl.innerHTML = categoriesToShow
        .map(function (cat) {
          const hooksInCat = filtered.filter(function (h) {
            return h.category === cat.id;
          });
          if (hooksInCat.length === 0) return '';

          const cardsHtml = hooksInCat
            .map(function (hook) {
              const paramsHtml =
                hook.parameters.length > 0
                  ? hook.parameters
                      .map(function (p) {
                        return (
                          '<span class="param-pill">' +
                          escapeHtml(p.name + (p.optional ? '?' : '')) +
                          '</span>'
                        );
                      })
                      .join(' ')
                  : '<span style="color: var(--text-muted); font-style: italic; font-size: 0.75rem;">без параметрів</span>';

              return (
                '<article class="hook-card" data-hook="' +
                escapeHtml(hook.name) +
                '">' +
                '<div>' +
                '<div class="card-top">' +
                '<div class="badges-group">' +
                '<span class="badge badge-pkg">' +
                escapeHtml(hook.pkg) +
                '</span>' +
                (hook.isNew19
                  ? '<span class="badge badge-new19">React 19</span>'
                  : '') +
                (hook.isApi ? '<span class="badge badge-api">API</span>' : '') +
                '</div>' +
                '<span class="card-spec-hint">Специфікація →</span>' +
                '</div>' +
                '<h4 class="hook-title">' +
                escapeHtml(hook.name) +
                '</h4>' +
                '<div class="syntax-box"><code>' +
                escapeHtml(hook.syntax) +
                '</code></div>' +
                '<p class="hook-desc">' +
                escapeHtml(hook.description) +
                '</p>' +
                '<div class="quick-meta">' +
                '<div class="meta-row">' +
                '<span class="meta-label">Параметри:</span>' +
                paramsHtml +
                '</div>' +
                '<div>' +
                '<span class="meta-label">Повертає: </span>' +
                '<span class="returns-text">' +
                escapeHtml(hook.returnsSummary) +
                '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="card-footer">' +
                '<span class="card-footer-action">Parameters, Returns &amp; Caveats</span>' +
                '<a href="' +
                escapeHtml(hook.docUrl) +
                '" target="_blank" rel="noopener noreferrer" class="source-link card-ext-link">' +
                '<span>react.dev</span><span>↗</span>' +
                '</a>' +
                '</div>' +
                '</article>'
              );
            })
            .join('');

          return (
            '<section>' +
            '<div class="category-header">' +
            '<div>' +
            '<div class="category-title-row">' +
            '<h3>' +
            escapeHtml(cat.title) +
            '</h3>' +
            '<span class="category-en-badge">' +
            escapeHtml(cat.enTitle) +
            '</span>' +
            '</div>' +
            '<p class="category-desc">' +
            escapeHtml(cat.description) +
            '</p>' +
            '</div>' +
            '<a href="' +
            escapeHtml(cat.docUrl) +
            '" target="_blank" rel="noopener noreferrer" class="source-link">' +
            '<span>Розділ на react.dev</span><span>↗</span>' +
            '</a>' +
            '</div>' +
            '<div class="hooks-grid">' +
            cardsHtml +
            '</div>' +
            '</section>'
          );
        })
        .join('');

      // Prevent card modal open when clicking external react.dev link
      hooksContainerEl
        .querySelectorAll('.card-ext-link')
        .forEach(function (link) {
          link.addEventListener('click', function (e) {
            e.stopPropagation();
          });
        });

      // Open modal when clicking card
      hooksContainerEl.querySelectorAll('.hook-card').forEach(function (card) {
        card.addEventListener('click', function () {
          const name = card.getAttribute('data-hook');
          const idx = HOOKS_DATA.findIndex(function (h) {
            return h.name === name;
          });
          if (idx !== -1) openModal(idx);
        });
      });
    }

    // Open Detailed Modal
    function openModal(index) {
      currentModalIndex = index;
      const hook = HOOKS_DATA[index];

      modalCategoryBadge.textContent = hook.categoryLabel;
      modalPackageBadge.textContent =
        'import { ' + hook.name + " } from '" + hook.pkg + "'";

      if (hook.isNew19) {
        modalNew19Badge.classList.remove('hidden');
      } else {
        modalNew19Badge.classList.add('hidden');
      }

      if (hook.isApi) {
        modalApiBadge.classList.remove('hidden');
      } else {
        modalApiBadge.classList.add('hidden');
      }

      modalHookName.textContent = hook.name;
      modalDescription.textContent = hook.description;
      modalSignature.textContent = hook.syntax;

      if (hook.parameters.length === 0) {
        modalParameters.innerHTML =
          '<div class="returns-box" style="font-style: italic; color: var(--text-muted);">' +
          'Цей хук не приймає жодних параметрів.' +
          '</div>';
      } else {
        modalParameters.innerHTML = hook.parameters
          .map(function (p) {
            return (
              '<div class="param-card">' +
              '<div class="param-header">' +
              '<span class="param-name">' +
              escapeHtml(p.name) +
              '</span>' +
              (p.optional
                ? '<span class="badge badge-pkg">необов’язковий (optional)</span>'
                : '<span class="badge badge-cat">обов’язковий</span>') +
              '</div>' +
              '<p class="param-desc">' +
              escapeHtml(p.desc) +
              '</p>' +
              '</div>'
            );
          })
          .join('');
      }

      modalReturns.textContent = hook.returns;

      modalCaveats.innerHTML = hook.caveats
        .map(function (c) {
          return (
            '<li>' +
            '<span class="caveat-bullet">•</span>' +
            '<span>' +
            escapeHtml(c) +
            '</span>' +
            '</li>'
          );
        })
        .join('');

      // Use textContent so JSX tags (<form>, <input>, etc.) are rendered safely as plain text
      modalCodeExample.textContent = hook.example;

      modalDocLink.href = hook.docUrl;
      modalDocLinkTop.href = hook.docUrl;

      const prevIdx = (index - 1 + HOOKS_DATA.length) % HOOKS_DATA.length;
      const nextIdx = (index + 1) % HOOKS_DATA.length;
      prevHookLabel.textContent = HOOKS_DATA[prevIdx].name;
      nextHookLabel.textContent = HOOKS_DATA[nextIdx].name;

      copyCodeBtn.textContent = 'Копіювати код';
      hookModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      modalScrollBody.scrollTop = 0;
    }

    function closeModal() {
      hookModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Event Listeners
    closeModalBtn.addEventListener('click', closeModal);
    hookModal.addEventListener('click', function (e) {
      if (e.target === hookModal) closeModal();
    });

    prevHookBtn.addEventListener('click', function () {
      const prevIdx =
        (currentModalIndex - 1 + HOOKS_DATA.length) % HOOKS_DATA.length;
      openModal(prevIdx);
    });

    nextHookBtn.addEventListener('click', function () {
      const nextIdx = (currentModalIndex + 1) % HOOKS_DATA.length;
      openModal(nextIdx);
    });

    document.addEventListener('keydown', function (e) {
      if (!hookModal.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') {
        const prevIdx =
          (currentModalIndex - 1 + HOOKS_DATA.length) % HOOKS_DATA.length;
        openModal(prevIdx);
      }
      if (e.key === 'ArrowRight') {
        const nextIdx = (currentModalIndex + 1) % HOOKS_DATA.length;
        openModal(nextIdx);
      }
    });

    copyCodeBtn.addEventListener('click', function () {
      const text = modalCodeExample.textContent || '';
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        copyCodeBtn.textContent = 'Скопійовано!';
      } catch (err) {
        copyCodeBtn.textContent = 'Помилка копіювання';
      }
      document.body.removeChild(textarea);
      setTimeout(function () {
        copyCodeBtn.textContent = 'Копіювати код';
      }, 2000);
    });

    react19FilterBtn.addEventListener('click', function () {
      onlyReact19 = !onlyReact19;
      react19FilterBtn.classList.toggle('active', onlyReact19);
      renderHooks();
    });

    searchInputEl.addEventListener('input', function (e) {
      searchQuery = e.target.value;
      renderHooks();
    });

    resetFiltersBtn.addEventListener('click', function () {
      activeCategory = 'all';
      onlyReact19 = false;
      searchQuery = '';
      searchInputEl.value = '';
      react19FilterBtn.classList.remove('active');
      renderFilters();
      renderHooks();
    });

    // Initial render
    renderFilters();
    renderHooks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
