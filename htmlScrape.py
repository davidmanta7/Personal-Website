from lxml import html
import requests

class Event:
    def __init__(self, day, time, building, room, name, duration, category):
        self.day = day
        self.time = time
        self.building = building
        self.room = room
        self.name = name
        self.duration = duration
        self.category = category

page = requests.get('http://recsports.ufl.edu/classes/weekly-class-schedule')
tree = html.fromstring(page.content)

eventList = tree.xpath('//*[self::td or self::h4 or self::h2]/text()')
eventList = [x.replace('\n', 'Entry') for x in eventList]
eventList = [x.replace('\xa0', 'NA') for x in eventList]
eventList = eventList[eventList.index('Standard Schedule')+1:]

links = tree.xpath('//a[@href]/text()')
events = [link.replace('\n', '') for link in links if ('\n' in link)]
events = list(filter(None, events))

for x in events:
    entry = eventList.index('Entry')
    if entry:
        eventList[entry] = x


buildingIndex = [index for index, value in enumerate(eventList) if value == 'Time']

buildings = [0,1,2]
buildings[0] = eventList[buildingIndex[0]-1:buildingIndex[1]-1]
buildings[1] = eventList[buildingIndex[1]-1:buildingIndex[2]-1]
buildings[2] = eventList[buildingIndex[2]-1:]

for x in range(0, len(buildings)):
    buildings[x] = [y for y in buildings[x] if y not in ['Time', 'Room', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']]

slotsBuilding = [0,1,2]
for x in range(0, len(buildings)):
    slotsBuilding[x] = int((len(buildings[x]) - 1)/9)

for n in range(0, len(buildings)):
    for x in range(0, slotsBuilding[n]):
        for y in range(0, 7):
            if (x == 0):
                #print('n: ', n, ', x: ', x, ', y: ', y)
                Entry = buildings[n][x+3+y]
                if (Entry != 'NA'):
                    print('Day: ', y, ', Time: ', buildings[n][x+1], ', Building: ',  buildings[n][0], ', Room: ', buildings[n][x+2],', Event Name: ', Entry)
            else:
                Entry = buildings[n][9*x+3+y]
                if (Entry != 'NA'):
                    print('Day: ', y, ', Time: ', buildings[n][9*x+1], ', Building: ', buildings[n][0],', Room: ', buildings[n][9*x+2], ', Event Name: ', Entry)
                