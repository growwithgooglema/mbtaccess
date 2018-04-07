#!/usr/bin/env python3

import re

import pandas as pd


def get_list(url):
    """
    Grab the list of university located at the given URL.
    We're cheating here because we know that the link is a
    wikipedia page with a table that contains the data.
    So, we're using pandas to grab the contents of the table
    and turn them into a json file.

    :type: str
    :param: url: URL to the Wikipedia article with the list of universities
    :rtype: str
    :return: Returns a json string
    """
    universities = pd.read_html(url, header=0)[0]
    universities.columns = list(map(lambda col: re.sub(
        r'\[[^\]]\]', '', col).lower(), universities))
    clean_data = universities.drop(
        columns=[c for c in universities if c.startswith('unnamed')])
    return clean_data.to_json(orient='records')


if __name__ == '__main__':
    article_url = (
        "https://en.wikipedia.org/wiki/List_of_colleges_and_universities_in_metropolitan_Boston")
    print(get_list(article_url), file=open("universities.json", "w"))
