import minimalmodbus
import os, sys, time
import requests
import json



instrument1 = minimalmodbus.Instrument('/dev/ttyUSB0', 1) # temperature & humidity (USBport, slave ID)
instrument1.serial.baudrate = 9600
instrument1.serial.parity = 'N'
instrument1.serial.stopbits = 1
instrument1.serial.timeout = 5
instrument1.serial.bytesize = 8

instrument2 = minimalmodbus.Instrument('/dev/ttyUSB0', 80) # gyro (USBport, slave ID)
instrument2.serial.baudrate = 9600
instrument2.serial.parity = 'N'
instrument2.serial.stopbits = 1
instrument2.serial.timeout = 5
instrument2.serial.bytesize = 8


# def restart():
#     os.execl(sys.executable, sys.executable, *sys.argv)
   

def senddata():
    while True:
        try:
            sensor_temp = instrument1.read_register(0,1)   # (sensor address, float)
            sensor_humid = instrument1.read_register(1,1)
            sensor_gyro_x = instrument2.read_register(61,2)
            sensor_gyro_y = instrument2.read_register(62,3)

            

            print("temperature: ", sensor_temp, "humidity: ", sensor_humid, "gyro_x: ", sensor_gyro_x, "gryo_y: ", sensor_gyro_y)

        
                
            a_temp = {
            "inputData": sensor_temp,
            "sensorManageId": 1
            }

            a_humid = {
                "inputData": sensor_humid,
                "sensorManageId": 2
            }

            a_dust = {
                "inputData": 10,
                "sensorManageId": 3
            }

            a_gas = {
                "inputData": 10,
                "sensorManageId": 4
            }


            headers = {'Content-Type': 'application/json; charset=utf-8'}

            

            url = "http://163.180.117.38:8281/api/sensor-data"
        

            response = requests.post(url, headers= headers, data=json.dumps(a_temp))
            response = requests.post(url, headers=headers, data=json.dumps(a_humid))
            response = requests.post(url, headers=headers, data=json.dumps(a_dust))
            response = requests.post(url, headers=headers, data=json.dumps(a_gas))
            print(response)

            print("전송  완  료!!")

            time.sleep(2)

        except Exception as e:
            print(e)

            
            # restart()
            



        time.sleep(2)    

if __name__ == "__main__":
    senddata()
