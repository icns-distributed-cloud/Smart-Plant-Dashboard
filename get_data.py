import pymysql
import minimalmodbus
import os, sys, time
import datetime

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



conn = pymysql.connect(           # db imformation
        host  = "163.180.117.38",
        port = 3306,
        user = "root",
        passwd = "iloveicns",
        db = "smart-plant-dashboard")

now = time.localtime()

def restart():
    os.execl(sys.executable, sys.executable, *sys.argv)
    print("Restart")
    time.sleep(1)




with conn.cursor() as cur :
    sql = "insert into sensor_data(created_at, input_data, sensormanage_id) values(%s, %s, %s)"

    while True:
        try:
            sensor_temp = instrument1.read_register(0,1)   # (sensor address, float)
            sensor_humid = instrument1.read_register(1,1)
            sensor_gyro_x = instrument2.read_register(61,3)
            sensor_gyro_y = instrument2.read_register(62,3)

            print("temperature: ", sensor_temp, "humidity: ", sensor_humid, "gyro_x: ", sensor_gyro_x, "gryo_y: ", sensor_gyro_y)

            if sensor_temp is not None and sensor_humid is not None:   # insert data

                cur.execute(sql, (time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()), sensor_temp, 1))
                cur.execute(sql, (time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()), sensor_humid, 2))
                print("Data Save Success")
                conn.commit()
        
        except:
            restart()



        time.sleep(1)    



