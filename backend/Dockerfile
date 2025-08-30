FROM python:3.11-slim

# Устанавливаем зависимости
WORKDIR /proj
COPY requirements.txt* /proj/

# Если requirements.txt:
RUN pip install -r requirements.txt

# Копируем всё приложение
COPY . /app

# Добавляем PYTHONPATH
ENV PYTHONPATH=/app

# Запускаем uvicorn из корня проекта
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
