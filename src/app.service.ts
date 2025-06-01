import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
#BFS ---------------------------------------
graph = {
    '5' : ['3', '7'],
    '3' : ['2', '4'],
    '7' : ['8'],
    '2' : [],
    '4' : ['8'],
    '8' : []
}

visited = []
queue = []

def bfs(visited, graph , node):
    visited.append(node)
    queue.append(node)

    while queue:
        m = queue.pop(0)
        print(m, end=" ")

        for neighbour in graph[m]:
            if neighbour not in visited:
                visited.append(neighbour)
                queue.append(neighbour)

print("Following are Breadth-First Search")
bfs(visited, graph, '5')

#DFS --------------------------------------------
graph = {
    '5' : ['3', '7'],
    '3' : ['2', '4'],
    '7' : ['8'],
    '2' : [],
    '4' : ['8'],
    '8' : []
}

visited = set()

def dfs(visited, graph, node):
    if node not in visited:
        print(node, end=' ')
        visited.add(node)
        for neighbor in graph[node]:
            dfs(visited, graph, neighbor)

print("Following is the Depth-First Search")
dfs(visited, graph, '5')

# tables ------------------------------------------
print("p    q   a")
for p in [True, False]:
    for q in [True, False]:
        a = bi_implication(p, q)
        print(p, q, a)

#K means ------------------------------------------
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

x = [4, 5, 10, 4, 3, 11, 14, 6, 10, 12]
y = [21, 19, 24, 17, 16, 25, 24, 22, 21, 21]

data = list(zip(x, y))
print(data)

inertias = []
for i in range(1, 11):
    kmeans = KMeans(n_clusters=i, random_state=42)
    kmeans.fit(data)
    inertias.append(kmeans.inertia_)

plt.plot(range(1, 11), inertias, marker='o')
plt.title('Elbow Method')
plt.xlabel('Number of clusters')
plt.ylabel('Inertia')
plt.show()

# Fit KMeans with chosen number of clusters (2 here)
kmeans = KMeans(n_clusters=2, random_state=42)
kmeans.fit(data)

plt.scatter(x, y, c=kmeans.labels_)
plt.title('K-Means Clustering with 2 clusters')
plt.xlabel('x')
plt.ylabel('y')
plt.show()

#mean median----------------------------------------------
import numpy

speed = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]
x = numpy.mean(speed) # std, var -- percentile(speed,)
print(x)

from scipy import stats

speed = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]
x = stats.mode(speed)

print(x)

# standard deviation
import numpy

speed = [86, 87, 88, 86, 87, 85, 86]
x = numpy.std(speed)
print(x)

#Linear Regression
import matplotlib.pyplot as plt
from scipy import stats

# Data points
x = [5, 7, 8, 7, 2, 17, 2, 9, 4, 11, 12, 9, 6]
y = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]

# Perform linear regression
slope, intercept, r, p, std_err = stats.linregress(x, y)

# Define the regression function
def myfunc(x):
    return slope * x + intercept

# Generate predicted y values for the x data points
mymodel = list(map(myfunc, x))

# Plot the original data points
plt.scatter(x, y)

# Plot the regression line
plt.plot(x, mymodel, color='red')

# Labels and title
plt.xlabel('X values')
plt.ylabel('Y values')
plt.title('Linear Regression of X vs Y')

# Show the plot
plt.show()

# Predict y value for x = 10
predicted_speed = myfunc(10)
print(f"Predicted value at x=10: {predicted_speed}")

# Optional: print regression stats
print(f"Slope: {slope}")
print(f"Intercept: {intercept}")
print(f"Correlation coefficient (r): {r}")
print(f"P-value: {p}")
print(f"Standard error: {std_err}")

`;
  }
}
