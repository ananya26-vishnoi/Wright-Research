from django.shortcuts import render
from .models import *
from django.http import JsonResponse
from dotenv import load_dotenv 
load_dotenv()
import yfinance as yf
from datetime import datetime



def index(request):
    return render(request, 'index.html')

def get_stock_data(request):
    if 'ticker' not in request.GET or 'start_date' not in request.GET:
        res = {
            "status": "error",
            "message": "Missing required query parameters"
        }
        return JsonResponse(res, safe=False)
    
    ticker = request.GET.get('ticker')
    start_date = request.GET.get('start_date') # '2022-01-01'
    try:
        msft = yf.Ticker(ticker.upper())
        end_date = datetime.now().strftime('%Y-%m-%d')

        # FETCH HISTORICAL DATA
        msft_hist = msft.history(start=start_date, end=end_date)

        # ADD DATE COLUMN
        msft_hist['Date'] = msft_hist.index.strftime('%Y-%m-%d')

        # CONVERT TO JSON
        msft_hist_json = msft_hist.to_json(orient='records', date_format='iso')
        res = {
            "status": "success",
            "data": msft_hist_json
        }
        return JsonResponse(res, safe=False)
    except:
        res = {
            "status": "error",
            "message": "Invalid ticker symbol"
        }
    return JsonResponse(res, safe=False)

