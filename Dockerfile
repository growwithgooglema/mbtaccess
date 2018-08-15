FROM python:3.7-alpine

LABEL Name=mbtaccess Version=0.2.0
EXPOSE 80
ENV APP_PORT 80
ENV APP_HOST '0.0.0.0'

WORKDIR /app
ADD . /app

RUN python3 -m pip install -r requirements.txt
RUN python3 migrate.py
CMD ["python3", "app.py"]
