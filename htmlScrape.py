from lxml import html
import requests
import json

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

jsonDict = dict()
open("listings.json", "w").close()

for n in range(0, len(buildings)):
    for x in range(0, slotsBuilding[n]):
        for y in range(0, 7):
            if (x == 0):
                #print('n: ', n, ', x: ', x, ', y: ', y)
                Entry = buildings[n][x+3+y]
                if (Entry != 'NA'):
                    jsonDict['day'] = y
                    jsonDict['time'] =buildings[n][x+1]
                    jsonDict['building'] = buildings[n][0]
                    jsonDict['room'] = buildings[n][x+2]
                    jsonDict['name'] = Entry
                    with open('listings.json', 'a') as file:
                        json.dump(jsonDict, file, sort_keys=True, indent=4)
                        file.write("\n")
            else:
                Entry = buildings[n][9*x+3+y]
                if (Entry != 'NA'):
                    jsonDict['day'] = y
                    jsonDict['time'] = buildings[n][9*x+1]
                    jsonDict['building'] = buildings[n][0]
                    jsonDict['room'] = buildings[n][9*x+2]
                    jsonDict['name'] = Entry
                    with open('listings.json', 'a') as file:
                        json.dump(jsonDict, file, sort_keys=True, indent=4)
                        file.write("\n")
                