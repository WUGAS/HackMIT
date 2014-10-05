import os
import hashlib
import hmac
import urllib2
import time
import json

#This code sample demonstrates a GET and a POST call to the Coinbase API
#Before implementation, set environmental variables with the names API_KEY and API_SECRET.

def make_request(url, body=None):
  opener = urllib2.build_opener()
  nonce = int(time.time() * 1e6)
  os.environ['API_SECRET'] = 'hBBArWmKPcz7kOQJPFGllRIcwus2w7Bi'
  os.environ['API_KEY'] = 'prgctATJ4Q2A160N'
  message = str(nonce) + url + ('' if body is None else body)
  signature = hmac.new(os.environ['API_SECRET'], message, hashlib.sha256).hexdigest()


  headers = {'ACCESS_KEY' : os.environ['API_KEY'],
             'ACCESS_SIGNATURE': signature,
             'ACCESS_NONCE': nonce,
             'Accept': 'application/json'}

  # If we are passing data, a POST request is made. Note that content_type is specified as json.
  if body:
    headers.update({'Content-Type': 'application/json'})
    req = urllib2.Request(url, data=body, headers=headers)

  # If body is nil, a GET request is made.
  else:
    req = urllib2.Request(url, headers=headers)

  try:
    return opener.open(req)
  except urllib2.HTTPError as e:
    print e
    return e

# Example of a GET request, where body is nil.
# print make_request('https://coinbase.com/api/v1/account/balance').read()


# Example of a POST request.

# Required parameters for POST /api/v1/buttons
# button_params = {
#   'button': {
#     'name' : 'test',
#     'price_string' : '1.23',
#     'price_currency_iso' : 'USD'
#   }
# }

#POST /api/v1/buttons
# print make_request('https://coinbase.com/api/v1/buttons', body=json.dumps(button_params)).read()

#GET currency exchange rate
def exchange(usdToConvert):
  jsonString = make_request('https://api.coinbase.com/v1/currencies/exchange_rates').read()
  try:
    btcToUsd = float(json.loads(jsonString)['usd_to_btc'])
    btcToPay = usdToConvert * btcToUsd
    print btcToPay
    return btcToPay
  except (ValueError, KeyError, TypeError) as e:
    print 'JSON FORMAT ERROR'
    return e

#GET balance
def getBalance():
  jsonString = make_request('https://coinbase.com/api/v1/account/balance').read()
  try:
    num = float(json.loads(jsonString)['amount'])
    return num
  except (ValueError, KeyError, TypeError) as e:
    print 'JSON FORMAT ERROR'
    return e

def sendBTC(email, num):
  trans_params = {
    'transaction': {
      'to' : email,
      'amount' : num,
      'notes' : 'TESTING transaction'
    }
  }
  jsonResult = make_request('https://api.coinbase.com/v1/transactions/send_money', body=json.dumps(trans_params)).read()
  print jsonResult

  

# exchange(3)
# sendBTC('gregorychan2016@u.northwestern.edu', .0001)