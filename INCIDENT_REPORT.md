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

   Инцидент №3: Отсутствует зависимость pydantic-settings
──────────────────────────────────
СИМПТОМ:
   При запуске uvicorn возникает ошибка ModuleNotFoundError: No module named 'pydantic_settings'.
   Ошибка возникает в файле core/config.py при попытке импорта из pydantic_settings.

ПРИЧИНА:
   В проекте используется pydantic_settings для управления конфигурацией, но этот пакет отсутствует в requirements.txt и не был установлен.

РЕШЕНИЕ:
   В requirements.txt добавлена строка: pydantic-settings>=2.0.0
   Выполнена команда: pip install -r requirements.txt

КОММИТ:
   fix(deps): add pydantic-settings for configuration management

   Инцидент №4: Неверный порт PostgreSQL
──────────────────────────────────
СИМПТОМ:
   При запуске uvicorn возникает ошибка:
   psycopg2.OperationalError: connection to server at "localhost" (::1), port 5433 failed: Connection refused

ПРИЧИНА:
   В файле .env в строке DATABASE_URL указан порт 5433, тогда как реально PostgreSQL работает на порту 5432 (подтверждено командой netstat).

РЕШЕНИЕ:
   В файле .env порт исправлен с 5433 на 5432.

КОММИТ:
   fix(env): correct PostgreSQL port from 5433 to 5432

   Инцидент №5: Неверный пароль пользователя PostgreSQL
──────────────────────────────────
СИМПТОМ:
   При запуске uvicorn после исправления порта возникает ошибка:
   psycopg2.OperationalError: FATAL: password authentication failed for user "postgres"

ПРИЧИНА:
   В файле .env указан неверный пароль для пользователя postgres.

РЕШЕНИЕ:
   В .env заменён пароль на правильный (подтверждён через успешное подключение psql).

КОММИТ:
   fix(env): correct PostgreSQL password in .env