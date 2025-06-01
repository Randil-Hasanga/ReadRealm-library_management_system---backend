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

#Best First ---------------------------------------
from queue import PriorityQueue
v = 14
graph = [[] for i in range(v)]

def best_first_search(actual_src, target, n):
    visited = [False] * n
    pq = PriorityQueue()
    pq.put((0, actual_src))
    visited[actual_src] = True

    while not pq.empty():
        u = pq.get()[1]
        print(u, end=" ")
        if u == target:
            break

        for v,c in graph[u]:
            if not visited[v]:
                visited[v] = True
                pq.put((c, v))
    print()

def addedge(x,y, cost):
    graph[x].append((y, cost))
    graph[y].append((x, cost))

addedge(0,1,3)
addedge(0,2,6)
addedge(0,3,5)
addedge(1,4,9)
addedge(1,5,8)
addedge(2,6,12)
addedge(2,7,14)
addedge(3,8,7)
addedge(8,9,5)
addedge(8,10,6)
addedge(9,11,1)
addedge(9,12,10)
addedge(9,13,2)

source = 0
target = 9
best_first_search(source, target,v)

# tables ------------------------------------------
def negation(p):
    return not p

def conjunction(p, q):
    return p and q

def disjunction(p, q):
    return p or q

def implication(p, q):
    return not p or q

def bi_implication(p, q):
    return (not p or q) and (not q or p)

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
x = numpy.mean(speed) # std, var , percentile(speed, 75) #75 means 75%
print(x)

#mode
from scipy import stats

speed = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]
x = stats.mode(speed)

print(x)

# standard deviation
import numpy

speed = [86, 87, 88, 86, 87, 85, 86]
x = numpy.std(speed)
print(x)

#Linear Regression ----------------------------------------------
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

#ANN ----------------------------------------
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

try:
    df = pd.read_csv('your_data.csv')
except FileNotFoundError:
    print("Error: 'your_data.csv' not found. Please upload the file or provide the correct path.")
    # You might want to exit or handle this error appropriately
    # For demonstration, let's create a dummy dataframe
    data = {'feature1': np.random.rand(100),
            'feature2': np.random.rand(100),
            'target': np.random.randint(0, 2, 100)}
    df = pd.DataFrame(data)
    print("Using a dummy dataset for demonstration.")

# Assuming the last column is the target variable and others are features
X = df.drop(df.columns[-1], axis=1)
y = df[df.columns[-1]]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

ann = MLPClassifier(hidden_layer_sizes=(10, 5), activation='relu', solver='adam', max_iter=500, random_state=42)

# Train the ANN
ann.fit(X_train, y_train)

# Make predictions
y_pred = ann.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
conf_matrix = confusion_matrix(y_test, y_pred)
class_report = classification_report(y_test, y_pred)

print(f"Accuracy: {accuracy:.2f}")
print("\nConfusion Matrix:")
print(conf_matrix)
print("\nClassification Report:")
print(class_report)   

#SVR ----------------------------------------

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, precision_score, recall_score, f1_score

# Load data from CSV
try:
    df = pd.read_csv('your_dataset.csv')  # Replace with your CSV file path
except FileNotFoundError:
    print("Error: 'your_dataset.csv' not found. Using dummy data for demonstration.")
    data = {
        'feature1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'feature2': [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        'target': [0, 0, 0, 1, 1, 1, 0, 0, 1, 1]
    }
    df = pd.DataFrame(data)

# Define features and target columns
features = ['feature1', 'feature2']  # Update this based on your dataset
target = 'target'                    # Update this based on your dataset

# Split dataset into features (X) and target (y)
X = df[features]
y = df[target]

# Split data into training and testing sets (75% train, 25% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# Initialize the Support Vector Machine classifier with a linear kernel
svm_model = SVC(kernel='linear', random_state=42)

# Train the model
svm_model.fit(X_train, y_train)

# Predict on the test set
y_pred = svm_model.predict(X_test)

# Calculate evaluation metrics
accuracy = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)
cr = classification_report(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

# Print evaluation results
print(f"Accuracy: {accuracy:.2f}")
print("\nConfusion Matrix:")
print(cm)
print("\nClassification Report:")
print(cr)
print(f"Precision: {precision:.2f}")
print(f"Recall: {recall:.2f}")
print(f"F1 Score: {f1:.2f}")
`;
  }
}
