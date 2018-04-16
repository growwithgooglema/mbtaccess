FROM python

COPY . /src/.

EXPOSE 8000

CMD python3 -m http.server 8000 -b localhost