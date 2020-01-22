from flask import escape, helpers
import json
import numpy as np
import pandas as pd
import cv2
import requests
from PIL import Image
from base64 import b64decode, b64encode


def storage_upload(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    request_json = request.get_json()
    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"]='./kdghacks-517c5fd7a3b5.json' 
        from google.cloud import storage
        client = storage.Client()
        bucket = client.get_bucket('bocchi_storage')

        return f'Hello World!'