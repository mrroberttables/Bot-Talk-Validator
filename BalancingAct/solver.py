import itertools

target = 105
groupSize = 4
numbers = {59,22,10,14,56,40,8,6,29,24,26,21}

def findsubsets(s, n):
	return list(itertools.combinations(s,n))

subsets = findsubsets(numbers,groupSize)
sums = [sum(j) for j in subsets]
indices = [x for x, z in enumerate(sums) if z == target]

for i in indices:
	print(subsets[i])

	8,14,24,59
	40,10,26,29
	6,21,22,56