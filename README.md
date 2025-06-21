# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

# If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in project.

src/
├── assets/ # للملفات الثابتة (الصور، الأيقونات، الخطوط، SVG)
│ ├── fonts/
│ ├── images/
│ └── svg/
├── components/ # مكونات واجهة المستخدم (UI Components) - عامة وقابلة لإعادة الاستخدام
│ # هذه هي "الذرات" و "الجزيئات" في تصميم Atomic Design
│ ├── Button/ # مثال: مكون زر إذا كان يتكون من عدة ملفات (Button.jsx, index.js, Button.module.css)
│ │ ├── Button.jsx
│ │ └── index.js # لتسهيل الاستيراد: import Button from 'components/Button';
│ ├── Card.jsx
│ ├── Modal.jsx
│ ├── Spinner.jsx
│ ├── ThemedButton.jsx # مثل هذا الزر المُخصص للسمة
│ ├── Timer.jsx # المكونات التي تعرض فقط UI (وليست تحكم أو منطق معقد)
│ ├── TodoList.jsx
│ └── Navigation.jsx # تم نقلها هنا، كونها جزءًا من الـ UI الأعلى، تُستخدم ضمن الـ Header
├── contexts/ # سياقات React (Contexts) - لإدارة الحالة الشاملة
│ ├── ThemeContext.js
│ ├── LanguageContext.js
│ └── index.js
├── hooks/ # دوال Hooks المخصصة (Custom Hooks) - لمنطق قابل لإعادة الاستخدام
│ ├── useDocumentTitle.js
│ ├── useAuth.js
│ └── index.js
├── layouts/ # مكونات التخطيط (Layout Components) - تحدد الهيكل العام للصفحات
│ # هذه هي "القوالب" أو "الكائنات" في Atomic Design
│ ├── MainLayout.jsx # التخطيط الرئيسي لتطبيقك (يحتوي على Header, Content Area, Footer)
│ ├── Header.jsx # المكون الذي يمثل رأس الصفحة (يحتوي على Navigation)
│ ├── Content.jsx # مكون يمثل منطقة المحتوى الرئيسية (يمكن دمجه داخل MainLayout أو Routes)
│ ├── Footer.jsx # المكون الذي يمثل تذييل الصفحة
│ └── AuthLayout.jsx # مثال: إذا كان لديك تخطيط مختلف لصفحات المصادقة
├── pages/ # مكونات الصفحات (Page Components) - تُعرض بواسطة React Router
│ # هذه هي "الصفحات" في Atomic Design، وتستخدم المكونات والتخطيطات
│ ├── HomePage.jsx # أو PropsPage.jsx بناءً على المثال السابق
│ ├── UseStatePage.jsx
│ ├── UseEffectPage.jsx
│ ├── UseRefPage.jsx
│ ├── UseContextPage.jsx
│ ├── NotFoundPage.jsx # صفحة 404
│ └── UserProfilePage.jsx # إذا كانت UserProfile تعرض صفحة كاملة
├── services/ # خدمات API أو خدمات خارجية (لجلب البيانات، المصادقة)
│ ├── userService.js
│ ├── authService.js
│ └── api.js # عميل API مركزي
├── utils/ # دوال مساعدة عامة (Helper Functions) - لا علاقة لها بـ React مباشرة
│ ├── helpers.js # مثل تنسيق التواريخ، التعامل مع الكوكيز، الخ...
│ ├── validators.js # دوال التحقق من صحة المدخلات
│ ├── constants.js # الثوابت العامة في التطبيق
│ └── localStorage.js # إذا كانت لديك دوال مساعدة للتعامل مع LocalStorage
├── examples/ # **جديد**: لمكونات الأمثلة أو التجريبية التي لا تُستخدم في الإنتاج
│ ├── DisplayInfo.jsx
│ ├── FocusInput.jsx
│ ├── MouseTracker.jsx
│ ├── PreviousValueDisplay.jsx
│ ├── SafeCounter.jsx
│ ├── TimerControl.jsx
│ └── NoInternetMessage.jsx
├── App.jsx # المكون الرئيسي للتطبيق (يُغلف الـ Contexts والتخطيط الرئيسي)
├── index.js # نقطة الدخول (ReactDOM.createRoot)
└── index.css # الأنماط العامة أو استيراد Tailwind
