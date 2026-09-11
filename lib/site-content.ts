export const locales = ["ru", "en", "zh-hans"] as const;

export type Locale = (typeof locales)[number];
export type PracticeKey = "creative" | "products" | "systems";

export const practiceKeys: PracticeKey[] = [
  "creative",
  "products",
  "systems",
];

export const localeLabels: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  "zh-hans": "中文",
};

export const htmlLang: Record<Locale, string> = {
  ru: "ru",
  en: "en",
  "zh-hans": "zh-Hans",
};

export const ogLocales: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
  "zh-hans": "zh_CN",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = "") {
  return `/${locale}${path.replace(/\/$/, "")}/`;
}

export function localizedAlternates(path = "") {
  return {
    ru: localePath("ru", path),
    en: localePath("en", path),
    "zh-Hans": localePath("zh-hans", path),
    "x-default": path ? localePath("en", path) : "/",
  };
}

export const practiceAccents: Record<PracticeKey, string> = {
  creative: "cyan",
  products: "blue",
  systems: "lime",
};

export const caseImages = [
  "/media/cases/creative.jpg",
  "/media/cases/video.jpg",
  "/media/cases/product.jpg",
  "/media/cases/brand.jpg",
];

const generatedCaseImages = {
  miniApp: "/media/cases/miniapp.png",
  crmAi: "/media/cases/crm-ai.png",
  dashboard: "/media/cases/dashboard.png",
};

export type LocalizedContent = {
  meta: { title: string; description: string };
  nav: {
    practices: string;
    work: string;
    method: string;
    contact: string;
    menu: string;
    language: string;
  };
  home: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    capabilityLine: string[];
    practicesEyebrow: string;
    practicesTitle: string;
    practicesLead: string;
    integrationEyebrow: string;
    integrationTitle: string;
    integrationLead: string;
    integrationBadge: string;
    integrationSteps: string[];
    workEyebrow: string;
    workTitle: string;
    workLead: string;
    allWork: string;
    methodEyebrow: string;
    methodTitle: string;
    methodLead: string;
    standardsEyebrow: string;
    standardsTitle: string;
    standards: string[];
  };
  practices: Record<PracticeKey, PracticeContent>;
  method: { number: string; title: string; description: string }[];
  cases: CaseContent[];
  work: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    deliverablesLabel: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    telegram: string;
    email: string;
  };
  footer: {
    statement: string;
    practices: string;
    contacts: string;
    legal: string;
  };
};

export type PracticeContent = {
  shortTitle: string;
  cardTitle: string;
  cardDescription: string;
  cardTag: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  capabilities: { title: string; description: string }[];
  deliverablesEyebrow: string;
  deliverablesTitle: string;
  deliverables: string[];
  signalLabels: string[];
  processEyebrow: string;
  processTitle: string;
  relatedTitle: string;
};

export type CaseContent = {
  category: string;
  title: string;
  description: string;
  deliverables: string[];
  image: string;
  alt: string;
  accent: string;
  visual: "creative" | "image" | "product" | "systems" | "video" | "brand" | "dashboard";
};

const ru: LocalizedContent = {
  meta: {
    title: "CREAX.digital — AI-агентство цифровых решений",
    description:
      "AI-контент, сайты, Mini Apps, дашборды, CRM и AI-автоматизация для бизнеса. Три направления — одна команда и единый результат.",
  },
  nav: {
    practices: "Направления",
    work: "Кейсы",
    method: "Как работаем",
    contact: "Обсудить задачу",
    menu: "Меню",
    language: "Выбор языка",
  },
  home: {
    eyebrow: "AI-агентство цифровых решений",
    title: "AI-контент, digital-продукты и автоматизация для бизнеса",
    lead:
      "Создаём изображения и видео, разрабатываем сайты и Mini Apps, внедряем дашборды, CRM и AI-агентов.",
    primaryCta: "Обсудить задачу",
    secondaryCta: "Выбрать направление",
    capabilityLine: ["AI Production", "Web & Mini Apps", "B2B Systems"],
    practicesEyebrow: "Три практики CREAX",
    practicesTitle: "От идеи до работающей системы",
    practicesLead:
      "Подключаем одно направление или собираем кросс-функциональную команду под запуск целиком.",
    integrationEyebrow: "Единый контур",
    integrationTitle: "Полный цикл запуска — в одном контуре",
    integrationLead:
      "Упаковываем новый продукт, создаём для него контент и сайт, подключаем CRM и AI-агента — весь путь от идеи до обработки обращений остаётся в одной системе.",
    integrationBadge: "FULL-CYCLE DELIVERY",
    integrationSteps: [
      "Позиционирование и контент",
      "Сайт или Mini App",
      "CRM и аналитика",
      "AI-автоматизация",
    ],
    workEyebrow: "Выбранные проекты",
    workTitle: "Работы, которые говорят сами за себя",
    workLead:
      "В каждом кейсе показываем задачу, логику решения и состав результата — без лишнего шума и раскрытия конфиденциальных данных.",
    allWork: "Смотреть кейсы",
    methodEyebrow: "Метод CREAX",
    methodTitle: "Прозрачный процесс без лишних звеньев",
    methodLead:
      "Под каждую задачу формируем нужный состав компетенций, но управляем проектом как единой системой.",
    standardsEyebrow: "Рабочие стандарты",
    standardsTitle: "Профессиональная среда для задач бизнеса",
    standards: [
      "NDA и конфиденциальность",
      "Права на результат закрепляются договором",
      "AI-разработка с экспертным контролем",
      "Документация и передача материалов",
    ],
  },
  practices: {
    creative: {
      shortTitle: "AI-контент",
      cardTitle: "AI-контент и продакшн",
      cardDescription:
        "Изображения, видео, брендинг и рекламные креативы для digital-каналов.",
      cardTag: "IMAGE · VIDEO · BRAND",
      metaTitle: "AI-контент и AI-продакшн",
      metaDescription:
        "AI-изображения, AI-видео, брендинг, key visuals и рекламные креативы для бизнеса.",
      eyebrow: "CREAX / Creative",
      title: "AI-контент и AI-продакшн: изображения, видео и креативы",
      lead:
        "Строим визуальный язык бренда и выпускаем digital-контент сериями — от концепции и key visual до готовых форматов для кампании.",
      capabilitiesEyebrow: "Что делаем",
      capabilitiesTitle: "Контент под задачу и канал",
      capabilities: [
        {
          title: "AI-изображения",
          description:
            "Key visuals, продуктовые сцены, иллюстрации, персонажи и серии изображений в едином стиле.",
        },
        {
          title: "AI-видео",
          description:
            "Концепции, раскадровки, генеративные сцены, motion и сборка роликов для digital-размещений.",
        },
        {
          title: "Брендинг и дизайн",
          description:
            "Айдентика, visual system, презентационные материалы и дизайн для точек контакта.",
        },
        {
          title: "Креативы для performance",
          description:
            "Наборы гипотез и адаптаций для рекламы, соцсетей, маркетплейсов и спецпроектов.",
        },
      ],
      deliverablesEyebrow: "На выходе",
      deliverablesTitle: "Готовая система материалов",
      deliverables: [
        "Креативная концепция и референсная рамка",
        "Мастер-материалы и адаптации",
        "Исходники и спецификация форматов",
        "Рекомендации по дальнейшему масштабированию",
      ],
      signalLabels: ["Узнаваемость", "Вовлечение", "Конверсия"],
      processEyebrow: "Процесс",
      processTitle: "От визуальной гипотезы до серии",
      relatedTitle: "Связать контент с digital-продуктом",
    },
    products: {
      shortTitle: "Web & Mini Apps",
      cardTitle: "Сайты, web apps и Mini Apps",
      cardDescription:
        "Маркетинговые сайты, сервисы и Telegram Mini Apps — от UX до запуска.",
      cardTag: "UX · CODE · LAUNCH",
      metaTitle: "Разработка сайтов, web apps и Telegram Mini Apps",
      metaDescription:
        "Дизайн и разработка сайтов, web apps и Telegram Mini Apps для продуктов, продаж и сервиса.",
      eyebrow: "CREAX / Products",
      title: "Разработка сайтов, web apps и Telegram Mini Apps",
      lead:
        "Проектируем понятный пользовательский путь, создаём сильный интерфейс и доводим продукт до стабильного запуска.",
      capabilitiesEyebrow: "Что разрабатываем",
      capabilitiesTitle: "Digital-продукты без лишней сложности",
      capabilities: [
        {
          title: "Маркетинговые сайты",
          description:
            "Лендинги и корпоративные сайты с ясным позиционированием, SEO-структурой и измеримыми сценариями.",
        },
        {
          title: "Web apps",
          description:
            "Клиентские кабинеты, конфигураторы, каталоги и сервисы со сложной бизнес-логикой.",
        },
        {
          title: "Telegram Mini Apps",
          description:
            "Mini Apps для продаж, лояльности, контента и внутренних процессов с интеграцией в Telegram.",
        },
        {
          title: "UX/UI и дизайн-системы",
          description:
            "Исследование сценариев, прототипирование, интерфейс и масштабируемые компоненты продукта.",
        },
      ],
      deliverablesEyebrow: "На выходе",
      deliverablesTitle: "Продукт, готовый к использованию",
      deliverables: [
        "Архитектура и интерактивный прототип",
        "UI-дизайн и адаптивные состояния",
        "Разработка, интеграции и аналитика",
        "Тестирование, запуск и документация",
      ],
      signalLabels: ["Понятный путь", "Удержание", "Масштаб"],
      processEyebrow: "Процесс",
      processTitle: "От бизнес-сценария до релиза",
      relatedTitle: "Подключить CRM и AI-автоматизацию",
    },
    systems: {
      shortTitle: "B2B-системы",
      cardTitle: "Дашборды, CRM и AI-агенты",
      cardDescription:
        "Внутренние системы, интеграции и агентная автоматизация под реальные процессы.",
      cardTag: "DATA · CRM · AGENTS",
      metaTitle: "Дашборды, CRM и AI-автоматизация",
      metaDescription:
        "Кастомные дашборды, CRM, интеграции и AI-агенты для автоматизации бизнес-процессов.",
      eyebrow: "CREAX / Systems",
      title: "Дашборды, CRM и AI-автоматизация для бизнеса",
      lead:
        "Соединяем данные, процессы и AI-инструменты в понятный рабочий контур — без очередного разрозненного сервиса.",
      capabilitiesEyebrow: "Что внедряем",
      capabilitiesTitle: "Системы под ваш процесс",
      capabilities: [
        {
          title: "Дашборды и аналитика",
          description:
            "Единые панели показателей, мониторинг процессов и отчётность на данных из нескольких источников.",
        },
        {
          title: "CRM и внутренние кабинеты",
          description:
            "Кастомные рабочие места для продаж, сервиса, производства и управления проектами.",
        },
        {
          title: "AI-агенты",
          description:
            "Агенты для обработки обращений, поиска по базе знаний, подготовки документов и координации задач.",
        },
        {
          title: "Интеграции и автоматизация",
          description:
            "Связка API, мессенджеров, CRM, таблиц и внутренних систем в сквозные сценарии.",
        },
      ],
      deliverablesEyebrow: "На выходе",
      deliverablesTitle: "Управляемый цифровой контур",
      deliverables: [
        "Карта процесса и архитектура решения",
        "Интерфейсы, роли и бизнес-логика",
        "Интеграции, AI-сценарии и журналирование",
        "Документация, обучение и поддержка запуска",
      ],
      signalLabels: ["Прозрачность", "Скорость", "Контроль"],
      processEyebrow: "Процесс",
      processTitle: "От аудита процесса до внедрения",
      relatedTitle: "Упакуем систему в удобный интерфейс",
    },
  },
  method: [
    {
      number: "01",
      title: "Разбираем задачу",
      description:
        "Фиксируем бизнес-цель, аудиторию, ограничения и критерии готовности.",
    },
    {
      number: "02",
      title: "Проектируем решение",
      description:
        "Собираем архитектуру, прототип или креативную рамку и согласуем объём.",
    },
    {
      number: "03",
      title: "Создаём и проверяем",
      description:
        "Работаем короткими циклами, показываем прогресс и проверяем ключевые состояния.",
    },
    {
      number: "04",
      title: "Запускаем и передаём",
      description:
        "Готовим финальные материалы, документацию и понятный следующий шаг.",
    },
  ],
  cases: [
    {
      category: "AI campaign content",
      title: "AI-контент для запуска продукта",
      description:
        "Концепция, key visuals и серия адаптаций, которая сохраняет характер бренда во всех digital-каналах.",
      deliverables: ["Creative concept", "AI images", "Format adaptations"],
      image: caseImages[0],
      alt: "Арт-система AI-контента для запуска продукта",
      accent: "cyan",
      visual: "creative",
    },
    {
      category: "Telegram Mini App",
      title: "Mini App для клиентского сервиса",
      description:
        "Онбординг, ключевые пользовательские сценарии и понятный интерфейс внутри привычной среды Telegram.",
      deliverables: ["UX/UI", "Mini App", "Integrations"],
      image: generatedCaseImages.miniApp,
      alt: "Интерфейс Telegram Mini App в кейсе CREAX.digital",
      accent: "blue",
      visual: "product",
    },
    {
      category: "CRM & AI automation",
      title: "CRM-контур с AI-агентом для входящих обращений",
      description:
        "Единый pipeline, автоматическая квалификация запросов и рабочий дашборд для команды продаж.",
      deliverables: ["CRM", "AI agent", "Dashboard"],
      image: generatedCaseImages.crmAi,
      alt: "CRM и дашборд автоматизации в кейсе CREAX.digital",
      accent: "lime",
      visual: "systems",
    },
    {
      category: "Generative video",
      title: "AI-видео от сценария до финального монтажа",
      description:
        "Визуальная концепция, раскадровка, генеративные планы и сборка ролика в едином ритме.",
      deliverables: ["Storyboard", "AI video", "Motion & edit"],
      image: caseImages[1],
      alt: "Кадр из генеративного видео в кейсе CREAX.digital",
      accent: "violet",
      visual: "video",
    },
    {
      category: "Brand system",
      title: "Айдентика для digital-среды",
      description:
        "Знак, типографика и гибкая визуальная система для сайта, контента и презентаций.",
      deliverables: ["Identity", "Visual system", "Guidelines"],
      image: caseImages[3],
      alt: "Элементы фирменного стиля в кейсе CREAX.digital",
      accent: "lime",
      visual: "brand",
    },
    {
      category: "Business intelligence",
      title: "Дашборд для управленческой аналитики",
      description:
        "Единая панель с ключевыми метриками, динамикой показателей и данными из нескольких бизнес-систем.",
      deliverables: ["Dashboard", "Data integration", "Analytics"],
      image: generatedCaseImages.dashboard,
      alt: "Дашборд управленческой аналитики в кейсе CREAX.digital",
      accent: "cyan",
      visual: "dashboard",
    },
  ],
  work: {
    metaTitle: "Кейсы AI-контента, сайтов и автоматизации",
    metaDescription:
      "Выбранные проекты CREAX.digital: AI-контент, Mini Apps, CRM, AI-автоматизация, видео и брендинг.",
    eyebrow: "CREAX / Work",
    title: "Работы, в которых решение важнее имени",
    lead:
      "Мы обезличиваем часть кейсов и не публикуем конфиденциальные данные. Показываем тип задачи, подход и состав результата.",
    deliverablesLabel: "Состав работ",
  },
  contact: {
    eyebrow: "Начать проект",
    title: "Расскажите, что хотите создать",
    lead:
      "Опишите задачу, цель или идею — поможем превратить её в контент, digital-продукт или работающую систему.",
    telegram: "Написать в Telegram",
    email: "Отправить email",
  },
  footer: {
    statement: "AI-контент, digital-продукты и автоматизация для бизнеса.",
    practices: "Направления",
    contacts: "Контакты",
    legal: "CREAX.digital. Все права защищены.",
  },
};

const en: LocalizedContent = {
  meta: {
    title: "CREAX.digital — AI-native digital agency",
    description:
      "AI content production, websites, Mini Apps, dashboards, CRM systems and AI agent automation for business.",
  },
  nav: {
    practices: "Capabilities",
    work: "Work",
    method: "How we work",
    contact: "Start a project",
    menu: "Menu",
    language: "Choose language",
  },
  home: {
    eyebrow: "AI-native digital agency",
    title: "AI Content, Digital Products & Intelligent Automation",
    lead:
      "We create images and video, build websites and Mini Apps, and deliver custom dashboards, CRM systems and AI agent automation.",
    primaryCta: "Start a project",
    secondaryCta: "Explore capabilities",
    capabilityLine: ["AI Production", "Web & Mini Apps", "B2B Systems"],
    practicesEyebrow: "Three CREAX practices",
    practicesTitle: "From first idea to a working system",
    practicesLead:
      "Engage one specialist practice or bring together a cross-functional delivery team for the entire launch.",
    integrationEyebrow: "One delivery system",
    integrationTitle: "One product. One connected launch cycle",
    integrationLead:
      "We position the offer, produce the content, build the digital product, then connect CRM and an AI agent—keeping the journey from idea to inbound operations in one system.",
    integrationBadge: "FULL-CYCLE DELIVERY",
    integrationSteps: [
      "Positioning & content",
      "Website or Mini App",
      "CRM & analytics",
      "AI automation",
    ],
    workEyebrow: "Selected work",
    workTitle: "Work that makes the value visible",
    workLead:
      "Each case focuses on the challenge, the thinking and the delivered system—without noise or exposure of confidential details.",
    allWork: "View selected work",
    methodEyebrow: "The CREAX method",
    methodTitle: "A clear process with fewer handoffs",
    methodLead:
      "We assemble the right mix of capabilities for every brief and run the project as one connected delivery system.",
    standardsEyebrow: "Delivery standards",
    standardsTitle: "A professional environment for business-critical work",
    standards: [
      "NDA and confidential delivery",
      "Clear ownership of final assets",
      "AI-powered delivery with expert oversight",
      "Documentation and structured handover",
    ],
  },
  practices: {
    creative: {
      shortTitle: "AI Content",
      cardTitle: "AI Content Production",
      cardDescription:
        "Images, video, brand design and campaign creative for digital channels.",
      cardTag: "IMAGE · VIDEO · BRAND",
      metaTitle: "AI Content Production: Images, Video & Creative",
      metaDescription:
        "AI image generation, AI video production, brand design and campaign creative for businesses and agencies.",
      eyebrow: "CREAX / Creative",
      title: "AI Content Production: Images, Video & Campaign Creative",
      lead:
        "We develop a distinct visual language and scale it into content systems—from a concept and key visual to channel-ready campaign assets.",
      capabilitiesEyebrow: "Capabilities",
      capabilitiesTitle: "Content designed for the brief and the channel",
      capabilities: [
        {
          title: "AI image generation",
          description:
            "Key visuals, product scenes, illustrations, characters and consistent image series.",
        },
        {
          title: "AI video production",
          description:
            "Concepts, storyboards, generative scenes, motion design and final edits for digital campaigns.",
        },
        {
          title: "Brand design",
          description:
            "Identity systems, visual direction, decks and brand touchpoints built for digital use.",
        },
        {
          title: "Performance creative",
          description:
            "Testable creative routes and channel adaptations for paid social, marketplaces and launches.",
        },
      ],
      deliverablesEyebrow: "What you get",
      deliverablesTitle: "A production-ready content system",
      deliverables: [
        "Creative direction and reference framework",
        "Master assets and channel adaptations",
        "Source files and format specifications",
        "Guidance for ongoing content scaling",
      ],
      signalLabels: ["Recognition", "Engagement", "Conversion"],
      processEyebrow: "Process",
      processTitle: "From visual hypothesis to a scalable series",
      relatedTitle: "Connect the content to a digital product",
    },
    products: {
      shortTitle: "Web & Mini Apps",
      cardTitle: "Websites, Web Apps & Mini Apps",
      cardDescription:
        "Marketing sites, digital services and Telegram Mini Apps—from UX to launch.",
      cardTag: "UX · CODE · LAUNCH",
      metaTitle: "Web Development, Web Apps & Telegram Mini Apps",
      metaDescription:
        "UX, UI and development for marketing websites, web applications and Telegram Mini Apps.",
      eyebrow: "CREAX / Products",
      title: "Web Development, Web Apps & Telegram Mini Apps",
      lead:
        "We clarify the user journey, build a confident interface and deliver a stable product ready for real users.",
      capabilitiesEyebrow: "What we build",
      capabilitiesTitle: "Digital products without needless complexity",
      capabilities: [
        {
          title: "Marketing websites",
          description:
            "Landing pages and company websites with sharp positioning, SEO structure and measurable journeys.",
        },
        {
          title: "Web applications",
          description:
            "Customer portals, configurators, catalogues and workflow tools with custom business logic.",
        },
        {
          title: "Telegram Mini Apps",
          description:
            "Mini Apps for sales, loyalty, content and internal workflows, integrated with Telegram.",
        },
        {
          title: "UX/UI and design systems",
          description:
            "Journey mapping, prototyping, interface design and reusable product components.",
        },
      ],
      deliverablesEyebrow: "What you get",
      deliverablesTitle: "A product ready for real-world use",
      deliverables: [
        "Information architecture and interactive prototype",
        "Responsive UI and component states",
        "Development, integrations and analytics",
        "Testing, launch and documentation",
      ],
      signalLabels: ["Clear journey", "Retention", "Scale"],
      processEyebrow: "Process",
      processTitle: "From business journey to release",
      relatedTitle: "Add CRM and AI automation",
    },
    systems: {
      shortTitle: "B2B Systems",
      cardTitle: "Dashboards, CRM & AI Agents",
      cardDescription:
        "Internal systems, integrations and agentic automation shaped around real operations.",
      cardTag: "DATA · CRM · AGENTS",
      metaTitle: "Custom Dashboards, CRM & AI Agent Automation",
      metaDescription:
        "Custom dashboards, CRM systems, integrations and AI agent automation for business operations.",
      eyebrow: "CREAX / Systems",
      title: "Custom Dashboards, CRM & AI Agent Automation",
      lead:
        "We connect data, workflows and AI tools into one usable operational layer—not another disconnected SaaS subscription.",
      capabilitiesEyebrow: "What we implement",
      capabilitiesTitle: "Systems built around your process",
      capabilities: [
        {
          title: "Dashboards and analytics",
          description:
            "Unified KPI views, operational monitoring and reporting across multiple data sources.",
        },
        {
          title: "CRM and internal portals",
          description:
            "Custom workspaces for sales, service, production and project operations.",
        },
        {
          title: "AI agents",
          description:
            "Agents for inbound requests, knowledge search, document drafting and task coordination.",
        },
        {
          title: "Integrations and automation",
          description:
            "Connected workflows across APIs, messaging, CRM, spreadsheets and internal tools.",
        },
      ],
      deliverablesEyebrow: "What you get",
      deliverablesTitle: "An operational system you can control",
      deliverables: [
        "Process map and solution architecture",
        "Interfaces, roles and business logic",
        "Integrations, AI workflows and audit logs",
        "Documentation, training and launch support",
      ],
      signalLabels: ["Visibility", "Speed", "Control"],
      processEyebrow: "Process",
      processTitle: "From workflow audit to adoption",
      relatedTitle: "We’ll turn the system into an intuitive product",
    },
  },
  method: [
    {
      number: "01",
      title: "Frame the challenge",
      description:
        "Align on the business goal, audience, constraints and definition of done.",
    },
    {
      number: "02",
      title: "Design the solution",
      description:
        "Shape the architecture, prototype or creative direction and confirm scope.",
    },
    {
      number: "03",
      title: "Build and validate",
      description:
        "Work in short cycles, show progress early and review critical states with people.",
    },
    {
      number: "04",
      title: "Launch and hand over",
      description:
        "Prepare final assets, documentation and a clear path for the next iteration.",
    },
  ],
  cases: [
    {
      category: "AI campaign content",
      title: "AI content for a product launch",
      description:
        "A creative concept, key visuals and channel adaptations that keep one distinct brand character.",
      deliverables: ["Creative concept", "AI images", "Format adaptations"],
      image: caseImages[0],
      alt: "An animated AI content system for a product launch",
      accent: "cyan",
      visual: "creative",
    },
    {
      category: "Telegram Mini App",
      title: "A Mini App for customer service",
      description:
        "Onboarding, core user journeys and a clear interface delivered inside the familiar Telegram environment.",
      deliverables: ["UX/UI", "Mini App", "Integrations"],
      image: generatedCaseImages.miniApp,
      alt: "A Telegram Mini App interface by CREAX.digital",
      accent: "blue",
      visual: "product",
    },
    {
      category: "CRM & AI automation",
      title: "A CRM workflow with an AI agent for inbound requests",
      description:
        "One pipeline, automated request qualification and an operational dashboard for the sales team.",
      deliverables: ["CRM", "AI agent", "Dashboard"],
      image: generatedCaseImages.crmAi,
      alt: "A CRM and automation dashboard by CREAX.digital",
      accent: "lime",
      visual: "systems",
    },
    {
      category: "Generative video",
      title: "AI video from storyboard to final edit",
      description:
        "Visual direction, storyboard, generative shots and motion assembled into one coherent film.",
      deliverables: ["Storyboard", "AI video", "Motion & edit"],
      image: caseImages[1],
      alt: "A frame from a generative video project by CREAX.digital",
      accent: "violet",
      visual: "video",
    },
    {
      category: "Brand system",
      title: "A brand identity built for digital use",
      description:
        "A mark, typography and a flexible visual system for websites, content and presentations.",
      deliverables: ["Identity", "Visual system", "Guidelines"],
      image: caseImages[3],
      alt: "Digital brand identity elements by CREAX.digital",
      accent: "lime",
      visual: "brand",
    },
    {
      category: "Business intelligence",
      title: "An executive analytics dashboard",
      description:
        "One operational view for core KPIs, performance trends and data connected across business systems.",
      deliverables: ["Dashboard", "Data integration", "Analytics"],
      image: generatedCaseImages.dashboard,
      alt: "An executive analytics dashboard by CREAX.digital",
      accent: "cyan",
      visual: "dashboard",
    },
  ],
  work: {
    metaTitle: "AI Content, Web & Automation Work",
    metaDescription:
      "Selected CREAX.digital projects across AI content, Mini Apps, CRM, AI automation, video and brand systems.",
    eyebrow: "CREAX / Work",
    title: "Work where the solution matters more than the name",
    lead:
      "We anonymise selected projects and never expose confidential data. Each case focuses on the challenge, the approach and the deliverables.",
    deliverablesLabel: "Deliverables",
  },
  contact: {
    eyebrow: "Start a project",
    title: "Tell us what you want to build",
    lead:
      "Share the challenge, goal or early idea—we’ll help turn it into content, a digital product or an operational system.",
    telegram: "Message on Telegram",
    email: "Send an email",
  },
  footer: {
    statement: "AI content, digital products and intelligent automation for business.",
    practices: "Capabilities",
    contacts: "Contact",
    legal: "CREAX.digital. All rights reserved.",
  },
};

const zh: LocalizedContent = {
  meta: {
    title: "CREAX.digital — AI原生数字解决方案机构",
    description:
      "为企业提供AIGC内容制作、网站与Mini App开发、数据看板、CRM系统和AI智能体自动化服务。",
  },
  nav: {
    practices: "业务方向",
    work: "案例",
    method: "合作流程",
    contact: "咨询项目",
    menu: "菜单",
    language: "选择语言",
  },
  home: {
    eyebrow: "AI原生数字解决方案机构",
    title: "为企业提供AIGC内容、数字产品与AI自动化",
    lead:
      "提供AI图片与视频制作、网站与应用开发，以及数据看板、CRM系统和AI智能体解决方案。",
    primaryCta: "咨询项目",
    secondaryCta: "查看业务方向",
    capabilityLine: ["AIGC内容制作", "Web & Mini Apps", "企业数字化系统"],
    practicesEyebrow: "CREAX三大业务方向",
    practicesTitle: "从创意到可落地的数字系统",
    practicesLead:
      "可选择单项专业服务，也可由我们组建跨领域团队，完成从内容到产品与系统的整体交付。",
    integrationEyebrow: "一体化交付",
    integrationTitle: "一个产品，一套完整交付闭环",
    integrationLead:
      "从产品定位、内容制作和网站开发，到连接CRM与AI智能体，将创意、上线和客户跟进整合在同一套系统中。",
    integrationBadge: "全流程交付",
    integrationSteps: [
      "品牌定位与内容",
      "网站或Mini App",
      "CRM与数据分析",
      "AI自动化",
    ],
    workEyebrow: "精选项目",
    workTitle: "让成果本身说明价值",
    workLead:
      "每个案例重点呈现业务问题、解决思路与交付成果，同时避免无关信息和客户保密数据。",
    allWork: "查看案例",
    methodEyebrow: "CREAX合作方法",
    methodTitle: "流程清晰，减少沟通损耗",
    methodLead:
      "针对每个项目配置合适的专业能力，并以统一的交付机制推进项目。",
    standardsEyebrow: "交付标准",
    standardsTitle: "适用于企业项目的专业协作环境",
    standards: [
      "支持NDA与保密交付",
      "合同明确最终成果的使用权",
      "AI驱动交付与专家审核",
      "完整文档与规范化交接",
    ],
  },
  practices: {
    creative: {
      shortTitle: "AIGC内容",
      cardTitle: "AIGC内容与AI制作",
      cardDescription: "面向数字渠道的AI图片、AI视频、品牌设计与广告创意。",
      cardTag: "AI图片 · AI视频 · 品牌",
      metaTitle: "AIGC内容制作：AI图片、AI视频与广告创意",
      metaDescription:
        "为企业提供AI图片生成、AI视频制作、品牌视觉与广告创意服务。",
      eyebrow: "CREAX / Creative",
      title: "AIGC内容制作：AI图片、AI视频与广告创意",
      lead:
        "从创意概念和主视觉出发，建立统一的品牌视觉语言，并批量制作适配不同数字渠道的内容。",
      capabilitiesEyebrow: "服务内容",
      capabilitiesTitle: "围绕业务目标与渠道制作内容",
      capabilities: [
        {
          title: "AI图片生成",
          description: "主视觉、产品场景、插画、角色设计及统一风格的系列图片。",
        },
        {
          title: "AI视频制作",
          description: "创意概念、分镜、生成式镜头、动态设计与数字广告视频剪辑。",
        },
        {
          title: "品牌视觉设计",
          description: "品牌识别系统、视觉方向、提案材料与数字触点设计。",
        },
        {
          title: "效果广告素材",
          description: "适用于信息流广告、社交媒体、电商平台和新品发布的创意组合。",
        },
      ],
      deliverablesEyebrow: "交付成果",
      deliverablesTitle: "可直接投放与延展的内容系统",
      deliverables: [
        "创意方向与参考框架",
        "主视觉与渠道适配素材",
        "源文件与格式规范",
        "后续规模化制作建议",
      ],
      signalLabels: ["品牌认知", "用户互动", "转化潜力"],
      processEyebrow: "合作流程",
      processTitle: "从视觉假设到系列化内容",
      relatedTitle: "将内容连接到数字产品",
    },
    products: {
      shortTitle: "Web & Mini Apps",
      cardTitle: "网站、Web App与Mini App",
      cardDescription:
        "营销网站、数字服务与Telegram Mini App，从UX设计到正式上线。",
      cardTag: "UX · 开发 · 上线",
      metaTitle: "网站开发、Web App与Telegram Mini App开发",
      metaDescription:
        "提供营销网站、Web App和Telegram Mini App的UX/UI设计与开发服务。",
      eyebrow: "CREAX / Products",
      title: "网站开发、Web App与Telegram Mini App开发",
      lead:
        "梳理清晰的用户路径，设计专业界面，并将产品稳定交付到真实业务环境。",
      capabilitiesEyebrow: "开发范围",
      capabilitiesTitle: "减少不必要复杂度的数字产品",
      capabilities: [
        {
          title: "营销网站",
          description: "具备清晰定位、SEO结构和转化路径的落地页与企业网站。",
        },
        {
          title: "Web App",
          description: "客户门户、配置工具、目录系统及包含定制业务逻辑的在线服务。",
        },
        {
          title: "Telegram Mini App",
          description: "面向销售、会员、内容和内部流程，并与Telegram生态连接的Mini App。",
        },
        {
          title: "UX/UI与设计系统",
          description: "用户流程、交互原型、界面设计和可扩展的产品组件。",
        },
      ],
      deliverablesEyebrow: "交付成果",
      deliverablesTitle: "可投入真实使用的数字产品",
      deliverables: [
        "信息架构与交互原型",
        "响应式UI及组件状态",
        "开发、系统集成与数据分析",
        "测试、上线与技术文档",
      ],
      signalLabels: ["清晰路径", "用户留存", "规模扩展"],
      processEyebrow: "合作流程",
      processTitle: "从业务场景到正式发布",
      relatedTitle: "连接CRM与AI自动化",
    },
    systems: {
      shortTitle: "企业数字化系统",
      cardTitle: "数据看板、CRM与AI智能体",
      cardDescription: "围绕真实业务流程搭建内部系统、数据集成与智能自动化。",
      cardTag: "数据 · CRM · AI智能体",
      metaTitle: "数据看板、CRM系统与AI智能体自动化",
      metaDescription:
        "为企业定制数据看板、CRM系统、API集成与AI智能体自动化解决方案。",
      eyebrow: "CREAX / Systems",
      title: "数据看板、CRM系统与AI智能体自动化",
      lead:
        "将数据、业务流程与AI工具连接为统一、易用的工作系统，减少分散软件带来的重复操作。",
      capabilitiesEyebrow: "解决方案",
      capabilitiesTitle: "围绕企业流程搭建系统",
      capabilities: [
        {
          title: "数据看板与商业分析",
          description: "整合多个数据源，统一展示核心指标、运营状态和管理报表。",
        },
        {
          title: "CRM与内部管理平台",
          description: "面向销售、客户服务、生产和项目管理的定制工作平台。",
        },
        {
          title: "AI智能体",
          description: "用于客户咨询、知识库检索、文档生成和任务协同的AI智能体。",
        },
        {
          title: "系统集成与自动化",
          description: "连接API、消息工具、CRM、表格和内部系统，形成端到端流程。",
        },
      ],
      deliverablesEyebrow: "交付成果",
      deliverablesTitle: "可管理、可追踪的数字化工作系统",
      deliverables: [
        "业务流程图与解决方案架构",
        "界面、权限与业务逻辑",
        "系统集成、AI流程与操作日志",
        "技术文档、培训与上线支持",
      ],
      signalLabels: ["流程透明", "执行速度", "运营控制"],
      processEyebrow: "合作流程",
      processTitle: "从流程诊断到系统落地",
      relatedTitle: "我们将系统打造为更易用的产品界面",
    },
  },
  method: [
    {
      number: "01",
      title: "明确业务问题",
      description: "对齐业务目标、目标用户、项目限制与验收标准。",
    },
    {
      number: "02",
      title: "设计解决方案",
      description: "制定系统架构、交互原型或创意方向，并确认项目范围。",
    },
    {
      number: "03",
      title: "制作并验证",
      description: "采用短周期交付，尽早展示进度，并由专业人员审核关键环节。",
    },
    {
      number: "04",
      title: "上线与交接",
      description: "整理最终成果、项目文档与后续迭代路径。",
    },
  ],
  cases: [
    {
      category: "AIGC广告内容",
      title: "面向产品发布的AIGC内容",
      description: "通过创意概念、主视觉与渠道适配，在不同数字触点保持统一品牌特征。",
      deliverables: ["创意概念", "AI图片", "渠道适配"],
      image: caseImages[0],
      alt: "CREAX.digital制作的产品发布AIGC动态视觉系统",
      accent: "cyan",
      visual: "creative",
    },
    {
      category: "Telegram Mini App",
      title: "面向客户服务的Mini App",
      description: "在用户熟悉的Telegram环境中完成新手引导、核心流程与清晰界面设计。",
      deliverables: ["UX/UI", "Mini App", "系统集成"],
      image: generatedCaseImages.miniApp,
      alt: "CREAX.digital设计的Telegram Mini App界面",
      accent: "blue",
      visual: "product",
    },
    {
      category: "CRM与AI自动化",
      title: "用于客户咨询的CRM与AI智能体流程",
      description: "统一销售pipeline、自动识别客户需求，并为业务团队提供运营数据看板。",
      deliverables: ["CRM", "AI智能体", "数据看板"],
      image: generatedCaseImages.crmAi,
      alt: "CREAX.digital设计的CRM与自动化数据看板",
      accent: "lime",
      visual: "systems",
    },
    {
      category: "生成式视频",
      title: "从分镜到成片的AI视频制作",
      description: "完成视觉方向、分镜、生成式镜头与动态剪辑的一体化制作。",
      deliverables: ["分镜", "AI视频", "动态与剪辑"],
      image: caseImages[1],
      alt: "CREAX.digital生成式视频项目画面",
      accent: "violet",
      visual: "video",
    },
    {
      category: "品牌视觉系统",
      title: "面向数字场景的品牌识别",
      description: "标志、字体及适用于网站、内容与提案材料的灵活视觉系统。",
      deliverables: ["品牌识别", "视觉系统", "规范指南"],
      image: caseImages[3],
      alt: "CREAX.digital品牌视觉设计元素",
      accent: "lime",
      visual: "brand",
    },
    {
      category: "商业智能",
      title: "管理层数据分析看板",
      description: "将核心指标、趋势变化与多个业务系统的数据整合到统一管理界面。",
      deliverables: ["数据看板", "数据集成", "商业分析"],
      image: generatedCaseImages.dashboard,
      alt: "CREAX.digital设计的管理层数据分析看板",
      accent: "cyan",
      visual: "dashboard",
    },
  ],
  work: {
    metaTitle: "AIGC内容、网站与AI自动化案例",
    metaDescription:
      "CREAX.digital精选项目：AIGC内容、Mini App、CRM、AI自动化、视频与品牌视觉系统。",
    eyebrow: "CREAX / Work",
    title: "重视解决方案，而不是项目名称",
    lead:
      "部分案例采用匿名展示，并严格保护客户的保密信息。内容重点为业务问题、解决方式与交付成果。",
    deliverablesLabel: "交付内容",
  },
  contact: {
    eyebrow: "启动项目",
    title: "告诉我们您想打造什么",
    lead:
      "无论是业务问题、目标或早期想法，我们都能帮助您将其转化为内容、数字产品或可运行的业务系统。",
    telegram: "通过Telegram联系",
    email: "发送邮件",
  },
  footer: {
    statement: "为企业提供AIGC内容、数字产品与AI自动化。",
    practices: "业务方向",
    contacts: "联系我们",
    legal: "CREAX.digital。保留所有权利。",
  },
};

export const content: Record<Locale, LocalizedContent> = {
  ru,
  en,
  "zh-hans": zh,
};
