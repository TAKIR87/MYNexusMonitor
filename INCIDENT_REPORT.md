Инцидент №1: Отсутствует .gitignore
──────────────────────────────────
СИМПТОМ:
   При попытке инициализации репозитория и добавления файлов
   отсутствует файл .gitignore, что может привести к попаданию
   чувствительных данных (логи, виртуальное окружение, .env) в
   систему контроля версий.

ПРИЧИНА:
   В исходном репозитории не был предусмотрен .gitignore.

РЕШЕНИЕ:
   Создан файл .gitignore в корне проекта со стандартными
   правилами для Python (исключены venv/, __pycache__/, .env,
   logs/, *.log и т.д.).

КОММИТ:
   fix(env): add .gitignore

   Инцидент №2: Несовместимость SQLAlchemy с Python 3.13
──────────────────────────────────
СИМПТОМ:
   При запуске uvicorn возникает ошибка AssertionError в sqlalchemy.sql.elements
   с сообщением о TypingOnly и атрибутах __firstlineno__, __static_attributes__.

ПРИЧИНА:
   SQLAlchemy 2.0.25 не поддерживает Python 3.13 из-за изменений в модуле typing.

РЕШЕНИЕ:
   Версия SQLAlchemy обновлена до 2.0.36 (или выше) в requirements.txt.
   Выполнена команда: pip install --upgrade sqlalchemy.

КОММИТ:
   fix(deps): update sqlalchemy to >=2.0.36 for Python 3.13 compatibility