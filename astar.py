#!/usr/bin/env python
# -*- coding:UTF-8 -*-
'''
Created on 2015-10-27

@author: Administrator
'''
import collections
UP = 1
DOWN = 2
LEFT = 3
RIGHT = 4

class Queue:
	def __init__(self):
		self.elements = collections.deque()
	
	def empty(self):
		return len(self.elements) == 0

	def put(self, x):
		self.elements.append(x)

	def get(self):
		return self.elements.popleft()
class Graph:
	def __init__(self):
		self.edges = {}
	def neighbors(self, id):
		return self.edges[id]
	
import heapq

class PriorityQueue:
	def __init__(self):
		self.elements = []
	
	def empty(self):
		return len(self.elements) == 0
	
	def put(self, item, priority):
		heapq.heappush(self.elements, (priority, item))
	
	def get(self):
		return heapq.heappop(self.elements)[1]
def heuristic(a, b):
	(x1, y1) = a
	(x2, y2) = b
	return abs(x1 - x2) + abs(y1 - y2)

def a_star_search(graph, start, goal):
	frontier = PriorityQueue()
	frontier.put(start, 0)
	came_from = {}
	cost_so_far = {}
	came_from[start] = None
	cost_so_far[start] = 0
	print start, goal
	i = 0
	direction = DOWN
	while not frontier.empty():
		i += 1
		if i == 80:
			break
		current = frontier.get()
		
		if current == goal:
			break
		a = graph.neighbors(current)
		tmp = []
		for nextPoint in a:
			new_cost = cost_so_far[current] + graph.cost(current, nextPoint)
			priority = new_cost + heuristic(goal, nextPoint)
			tmp.append((nextPoint, new_cost, priority))
			#print nextPoint, new_cost, priority
		print i, tmp, len(tmp)
		minPriority = 1000000000
		nextPointList = []
		for ppoint, new_cost, Pro in tmp:
			if ppoint in came_from:
				continue
			if Pro < minPriority:
				minPriority = Pro
				nextPointList = [(ppoint)]
			elif Pro == minPriority:
				nextPointList.append(ppoint)
		if direction == UP:
			nextPoint_2 = (current[0], current[1] - 1)
		if direction == DOWN:
			nextPoint_2 = (current[0], current[1] + 1)
		if direction == LEFT:
			nextPoint_2 = (current[0] - 1, current[1])
		if direction == RIGHT:
			nextPoint_2 = (current[0] + 1, current[1])
		if nextPoint_2 not in nextPointList:
			nextPoint_2 = nextPointList[-1]
		if nextPoint_2 not in cost_so_far:# or new_cost < cost_so_far[nextPoint_2]:
			cost_so_far[nextPoint_2] = new_cost
			frontier.put(nextPoint_2, Pro)
			came_from[nextPoint_2] = current
			
			if current[0] == nextPoint_2[0] - 1:
				direction = RIGHT
			elif current[0] == nextPoint_2[0] + 1:
				direction = LEFT
			elif current[1] == nextPoint_2[1] + 1:
				direction = DOWN
			elif current[1] == nextPoint_2[1] + 1:
				direction = UP
					
	print came_from
#	print cost_so_far
	return came_from, cost_so_far


#print the path
def draw_grid(graph, width=2, **style):
	#print 'graph.height == ', graph.height
	for y in range(graph.height):
		for x in range(graph.width):
			print "%%-%ds" % width % draw_tile(graph, (x, y), style, width),
		print ""

def draw_tile(graph, mid, style, width):
	r = "."
	if 'number' in style and mid in style['number']: 
		r = "%d" % style['number'][mid]
	if 'start' in style and mid == style['start']: r = "A"
	elif 'goal' in style and mid == style['goal']: r = "Z"
	elif 'path' in style and mid in style['path']: r = "@"
	elif 'point_to' in style and style['point_to'].get(mid, None) is not None:
		(x1, y1) = mid
		(x2, y2) = style['point_to'][mid]
		if x2 == x1 + 1: r = u"\u2192"
		if x2 == x1 - 1: r = u"\u2190"
		if y2 == y1 + 1: r = u"\u2193"
		if y2 == y1 - 1: r = u"\u2191"
	
	if mid in graph.walls: r = "#" * width
	return r


class SquareGrid:
	def __init__(self, width, height):
		self.width = width
		self.height = height
		self.walls = []
		self.direction = UP
	
	def in_bounds(self, id):
		(x, y) = id
		return 0 <= x < self.width and 0 <= y < self.height
	
	def passable(self, id):
		return id not in self.walls
	
	def neighbors(self, id):
		(x, y) = id
		results = [(x + 1, y), (x, y - 1), (x - 1, y), (x, y + 1)]
		if (x + y) % 2 == 0: results.reverse() # aesthetics
		#检查点是否在边界上
		results = filter(self.in_bounds, results)
		#检查点是否在障碍物上
		results = filter(self.passable, results)
		
		return results
		

class GridWithWeights(SquareGrid):
	def __init__(self, width, height):
		SquareGrid.__init__(self, width, height)
		self.weights = {}
	
	def cost(self, a, b):
		return self.weights.get(b, 1)







if __name__ == '__main__':
	diagram4 = GridWithWeights(10, 10)
	diagram4.walls = [(1, 7), (1, 8), (2, 7), (2, 8), (3, 7), (3, 8), (4, 8), (5, 8), (6, 8)]
	diagram4.weights = {loc: 2 for loc in [(3, 4), (3, 5), (4, 1), (4, 2),
										(4, 3), (4, 4), (4, 5), (4, 6),
										(4, 7), (4, 8), (5, 1), (5, 2),
										(5, 3), (5, 4), (5, 5), (5, 6),
										(5, 7), (5, 8), (6, 2), (6, 3),
										(6, 4), (6, 5), (6, 6), (6, 7),
										(7, 3), (7, 4), (7, 5)]}
	aim = (3, 9)
	draw_grid(diagram4, width=3, start=(1, 4), goal=aim)
	print ""
	came_from, cost_so_far = a_star_search(diagram4, (1, 4), aim)
	draw_grid(diagram4, width=3, point_to=came_from, start=(1, 4), goal=aim)
	#print ""
	#draw_grid(diagram4, width=3, number=cost_so_far, start=(1, 4), goal=(7, 6))
	
	
	
